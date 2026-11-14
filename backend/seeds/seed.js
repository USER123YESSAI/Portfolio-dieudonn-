require("dotenv").config();
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const { sequelize, User, Setting } = require("../models");

const seed = async () => {
  try {
    await sequelize.sync();
    await sequelize.getQueryInterface().changeColumn("skills", "categorie", {
      type: DataTypes.ENUM(
        "nutrition",
        "dietetique",
        "langages",
        "frameworks",
        "outils",
        "soft_skills"
      ),
      allowNull: false,
    });

    const existingUsers = await User.count();
    if (existingUsers > 0) {
      console.log("ℹ️ Des données existent déjà dans la base. Le seed est ignoré pour protéger vos données.");
      process.exit(0);
    }

    const admin = await User.create({
      nom: "Dieudonné Routouang Souloukna",
      email: process.env.ADMIN_EMAIL || "routouangdieudonnesouloukna@gmail.com",
      mot_de_passe: await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin123!", 12),
      role: "admin",
    });

    await Setting.bulkCreate([
      {
        cle: "site_title",
        valeur: "Dieudonné Routouang Souloukna — Spécialiste en Nutrition et Diététique",
      },
      {
        cle: "site_description",
        valeur:
          "Portfolio professionnel de Dieudonné Routouang Souloukna, diplômé d'une Licence en Nutrition et Diététique.",
      },
      {
        cle: "hero_title",
        valeur: "Spécialiste en Nutrition et Diététique",
      },
      {
        cle: "hero_subtitle",
        valeur: "Licence en Nutrition et Diététique",
      },
      {
        cle: "bio",
        valeur:
          "Titulaire d'une Licence en Nutrition et Diététique, je souhaite mettre ma formation au service de projets qui valorisent une alimentation équilibrée et le bien-être.",
      },
      {
        cle: "career_goal",
        valeur:
          "Je souhaite m'investir dans un environnement professionnel lié à la nutrition et à la diététique, et contribuer à des initiatives autour de l'alimentation et du bien-être.",
      },
      {
        cle: "email",
        valeur: "routouangdieudonnesouloukna@gmail.com",
      },
      {
        cle: "phone",
        valeur: "",
      },
      {
        cle: "location",
        valeur: "",
      },
      {
        cle: "social_links",
        valeur: JSON.stringify({ github: "", linkedin: "", twitter: "" }),
      },
      {
        cle: "about_title",
        valeur: "Un parcours consacré à la nutrition et à la diététique.",
      },
      {
        cle: "about_text",
        valeur:
          "Ma formation en Nutrition et Diététique nourrit mon intérêt pour l'alimentation équilibrée et le bien-être. Je souhaite poursuivre mon parcours dans ce domaine et contribuer à des projets qui le mettent en valeur.",
      },
      {
        cle: "about_languages",
        valeur: "",
      },
      {
        cle: "profile_photo",
        valeur: "/images/profil5.png",
      },
      {
        cle: "about_photo",
        valeur: "/images/profil5.png",
      },
    ]);

    console.log("Portfolio initialisé pour Dieudonné Routouang Souloukna.");
    console.log(`Admin: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error("Erreur seed:", error);
    process.exit(1);
  }
};

seed();
