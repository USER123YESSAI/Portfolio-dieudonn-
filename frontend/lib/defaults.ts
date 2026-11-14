import type { SiteSettings } from "@/types";

export const DEFAULT_SETTINGS: SiteSettings = {
  site_title: "Dieudonné Routouang Souloukna — Spécialiste en Nutrition et Diététique",
  site_description:
    "Portfolio professionnel de Dieudonné Routouang Souloukna, diplômé d'une Licence en Nutrition et Diététique.",
  hero_title: "Spécialiste en Nutrition et Diététique",
  hero_subtitle: "Licence en Nutrition et Diététique",
  bio: "Titulaire d'une Licence en Nutrition et Diététique, je souhaite mettre ma formation au service de projets qui valorisent une alimentation équilibrée et le bien-être.",
  career_goal:
    "Je souhaite m'investir dans un environnement professionnel lié à la nutrition et à la diététique, et contribuer à des initiatives autour de l'alimentation et du bien-être.",
  email: "routouangdieudonnesouloukna@gmail.com",
  phone: "",
  location: "",
  social_links: {
    github: "",
    linkedin: "",
  },
  profile_photo: "/images/profil5.png",
  about_photo: "/images/profil5.png",
  about_title: "Un parcours consacré à la nutrition et à la diététique.",
  about_text:
    "Ma formation en Nutrition et Diététique nourrit mon intérêt pour l'alimentation équilibrée et le bien-être. Je souhaite poursuivre mon parcours dans ce domaine et contribuer à des projets qui le mettent en valeur.",
  about_languages: "",
};

export function isCurrentOwnerSettings(settings?: SiteSettings): boolean {
  const email = settings?.email?.trim().toLowerCase();
  return !email || email === DEFAULT_SETTINGS.email?.toLowerCase();
}

export function normalizeSiteSettings(settings?: SiteSettings): SiteSettings {
  return isCurrentOwnerSettings(settings)
    ? { ...DEFAULT_SETTINGS, ...settings }
    : DEFAULT_SETTINGS;
}
