require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const { sequelize, User, Setting } = require("./models");
const apiRoutes = require("./routes/api.routes");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler");
const { restoreMediaFromDB, syncDiskUploadsToDB } = require("./utils/mediaService");

// ── Validation des variables d'environnement critiques ─────────────────────
if (!process.env.JWT_SECRET) {
  console.error("ERREUR FATALE : JWT_SECRET n'est pas défini dans .env");
  process.exit(1);
}

// ── Création automatique des répertoires d'upload (pour Render) ────────────
const uploadDirs = [
  path.join(__dirname, "uploads"),
  path.join(__dirname, "uploads", "projects"),
  path.join(__dirname, "uploads", "profile"),
  path.join(__dirname, "uploads", "cv"),
];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

// ── Sécurité HTTP headers ────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// ── CORS ─────────────────────────────────────────────────────────────────────
const getAllowedOrigins = () => {
  const envOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
    : [];
  return [
    ...envOrigins,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];
};

app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origine (ex: curl, Postman, SSR serveur)
      if (!origin) return callback(null, true);

      const allowed = getAllowedOrigins();
      const isAllowedExact = allowed.includes(origin);
      // Autorise les déploiements preview de Vercel (*.vercel.app)
      const isVercelPreview = /^https:\/\/[a-zA-Z0-9_-]+\.vercel\.app$/.test(origin);

      if (isAllowedExact || isVercelPreview) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// ── Logging ──────────────────────────────────────────────────────────────────
app.use(morgan("dev"));

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Servir les uploads avec restauration automatique depuis la BDD (résiste aux redémarrages de Render) ──
app.get("/uploads/:folder/:filename", async (req, res, next) => {
  const { folder, filename } = req.params;
  const localPath = path.join(__dirname, "uploads", folder, filename);

  // 1. Si le fichier existe déjà sur le disque local, le servir directement
  if (fs.existsSync(localPath)) {
    return res.sendFile(localPath);
  }

  // 2. Si le conteneur Render gratuit a redémarré et effacé le fichier éphémère,
  // le restaurer instantanément depuis la base de données Aiven MySQL
  try {
    const restored = await restoreMediaFromDB(folder, filename);
    if (restored) {
      res.setHeader("Content-Type", restored.mimetype || "application/octet-stream");
      res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
      return res.send(restored.buffer);
    }
  } catch (err) {
    console.error("Erreur récupération media:", err);
  }

  next();
});

// ── Fichiers statiques (uploads) avec cache agressif (30 jours) ─────────────
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "30d",
    immutable: true,
    etag: true,
  })
);

// ── Rate limiter sur la route d'authentification (anti brute-force) ──────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // max 5 tentatives par fenêtre
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.",
  },
  skipSuccessfulRequests: true, // ne compte pas les connexions réussies
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API Portfolio opérationnelle" });
});

app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api/admin", adminRoutes);

// ── Gestion des erreurs ───────────────────────────────────────────────────────
app.use(errorHandler);

// ── Initialisation sécurisée du compte admin au démarrage (si base vide) ────
const bootstrapAdminIfNeeded = async () => {
  const userCount = await User.count();
  if (userCount > 0) return;

  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.log("Aucun utilisateur en base : définissez ADMIN_EMAIL et ADMIN_PASSWORD pour créer l'admin.");
    return;
  }

  await User.create({
    nom: "Dieudonné Routouang Souloukna",
    email: adminEmail,
    mot_de_passe: await bcrypt.hash(adminPassword, 12),
    role: "admin",
  });
  console.log("Compte administrateur initialisé automatiquement.");

  const settingCount = await Setting.count();
  if (settingCount === 0) {
    await Setting.bulkCreate([
      { cle: "site_title", valeur: "Dieudonné Routouang Souloukna — Spécialiste en Nutrition et Diététique" },
      { cle: "site_description", valeur: "Portfolio professionnel de Dieudonné Routouang Souloukna, diplômé d'une Licence en Nutrition et Diététique." },
      { cle: "hero_title", valeur: "Spécialiste en Nutrition et Diététique" },
      { cle: "hero_subtitle", valeur: "Licence en Nutrition et Diététique" },
      { cle: "bio", valeur: "Titulaire d'une Licence en Nutrition et Diététique, je souhaite mettre ma formation au service de projets qui valorisent une alimentation équilibrée et le bien-être." },
      { cle: "career_goal", valeur: "Je souhaite m'investir dans un environnement professionnel lié à la nutrition et à la diététique, et contribuer à des initiatives autour de l'alimentation et du bien-être." },
      { cle: "email", valeur: adminEmail },
      { cle: "profile_photo", valeur: "/images/profil5.png" },
      { cle: "about_photo", valeur: "/images/profil5.png" },
      { cle: "about_title", valeur: "Un parcours consacré à la nutrition et à la diététique." },
      { cle: "about_text", valeur: "Ma formation en Nutrition et Diététique nourrit mon intérêt pour l'alimentation équilibrée et le bien-être. Je souhaite poursuivre mon parcours dans ce domaine et contribuer à des projets qui le mettent en valeur." },
    ]);
  }
};

// ── Démarrage ─────────────────────────────────────────────────────────────────
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion MySQL établie.");

    // Préserver strictement les tables et données existantes
    await sequelize.sync();
    console.log("Modèles synchronisés (tables et données existantes préservées).");

    await bootstrapAdminIfNeeded();

    // Sauvegarder automatiquement tous les uploads existants dans MySQL
    await syncDiskUploadsToDB();

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Impossible de démarrer le serveur:", error.message);
    process.exit(1);
  }
};

start();
