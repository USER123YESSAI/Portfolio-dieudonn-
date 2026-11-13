# Portfolio Professionnel — Dieudonné Routouang Souloukna

Portfolio professionnel dédié à la Nutrition et à la Diététique, conçu avec **Next.js (App Router, Tailwind CSS, TypeScript)** et une API REST avec **Node.js (Express, Sequelize, MySQL)**.

---

## 🌟 Fonctionnalités

- **Section Accueil & Présentation :** Hero captivant avec navigation fluide et liens sociaux.
- **Section À propos :** Présentation et portrait personnalisés.
- **Domaines de formation :** Mise en avant de la Nutrition et de la Diététique.
- **Projets & Réalisations :** Grille filtrable pour publier des réalisations lorsqu'elles sont disponibles.
- **Parcours interactif :** Formation, expériences et certifications renseignées.
- **Téléchargement sécurisé du CV :** Accès au CV protégé par mot de passe avec boîte modale interactive.
- **Espace Administrateur complet :**
  - Authentification JWT avec limitation de débit (anti-brute force).
  - Gestion des projets, compétences, expériences, formations et certifications.
  - Boîte de réception des messages de contact avec indicateur de messages non lus.
  - Gestion des photos (profil & à propos) et configuration du mot de passe du CV.
- **Dark / Light Mode :** Persistance du thème choisi sans scintillement (FOUC).

Les contenus de démonstration non confirmés (expériences, projets et certifications) ne sont pas préremplis.

---

## 🛠️ Stack Technique

- **Frontend :** Next.js 16, React 19, TypeScript, Tailwind CSS, Lucide React
- **Backend :** Node.js, Express 5, Sequelize ORM, MySQL, JWT, Bcrypt, Multer
- **Déploiement :**
  - **Frontend :** Vercel
  - **Backend :** Render
  - **Base de données :** Aiven (MySQL Cloud avec chiffrement SSL)

---

## 🚀 Démarrage en local

### 1. Prérequis
- Node.js (v18+)
- MySQL (local ou distant)

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env # Configurer vos accès MySQL
npm run seed        # Initialiser les tables et les données
npm run dev         # Démarrer le serveur sur http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev         # Démarrer le client sur http://localhost:3000
```

En production, configurez `NEXT_PUBLIC_SITE_URL` avec l'URL publique canonique afin que les métadonnées, le sitemap et le fichier robots utilisent le bon domaine.

---

## 📄 Licence
Tous droits réservés © 2026 Dieudonné Routouang Souloukna.
# Portfolio-dieudonn-
