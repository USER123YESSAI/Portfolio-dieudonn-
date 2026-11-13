import PublicLayout from "@/components/layout/PublicLayout";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { getProjects, getSettings } from "@/lib/api";
import { DEFAULT_SETTINGS, isCurrentOwnerSettings, normalizeSiteSettings } from "@/lib/defaults";
import type { Metadata } from "next";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Services et réalisations",
  description:
    "Découvrez les services et réalisations de Dieudonné Routouang Souloukna dans le domaine de la nutrition et de la diététique.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  let settings = DEFAULT_SETTINGS;
  let projects: Project[] = [];

  try {
    const [fetchedSettings, fetchedProjects] = await Promise.all([getSettings(), getProjects()]);
    settings = normalizeSiteSettings(fetchedSettings);
    if (isCurrentOwnerSettings(fetchedSettings) && fetchedProjects && Array.isArray(fetchedProjects)) {
      projects = fetchedProjects;
    }
  } catch {
    // API unavailable
  }

  return (
    <PublicLayout settings={settings}>
      <div className="py-8">
        <ProjectsGrid projects={projects} showFilters={true} />
      </div>
    </PublicLayout>
  );
}
