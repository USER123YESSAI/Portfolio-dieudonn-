import PublicLayout from "@/components/layout/PublicLayout";
import Timeline from "@/components/sections/Timeline";
import {
  getExperiences,
  getEducations,
  getCertifications,
  getSettings,
} from "@/lib/api";
import { DEFAULT_SETTINGS, isCurrentOwnerSettings, normalizeSiteSettings } from "@/lib/defaults";
import type { Metadata } from "next";
import type { Education, Experience, Certification } from "@/types";

export const metadata: Metadata = {
  title: "Parcours",
  description: "Formation en Nutrition et Diététique et parcours professionnel de Dieudonné Routouang Souloukna.",
};

export const revalidate = 60;

export default async function JourneyPage() {
  let settings = DEFAULT_SETTINGS;
  let experiences: Experience[] = [];
  let educations: Education[] = [];
  let certifications: Certification[] = [];

  try {
    const [fetchedSettings, fetchedExp, fetchedEdu, fetchedCert] = await Promise.all([
      getSettings(),
      getExperiences(),
      getEducations(),
      getCertifications(),
    ]);
    settings = normalizeSiteSettings(fetchedSettings);
    if (isCurrentOwnerSettings(fetchedSettings)) {
      if (fetchedExp) experiences = fetchedExp;
      if (fetchedEdu) educations = fetchedEdu;
      if (fetchedCert) certifications = fetchedCert;
    }
  } catch {
    // API unavailable
  }

  if (educations.length === 0) {
    educations = [
      {
        id: 0,
        intitule: "Licence en Nutrition et Diététique",
        etablissement: "",
        date_debut: "",
      },
    ];
  }

  return (
    <PublicLayout settings={settings}>
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Label: —— PARCOURS */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--label-color)" }}>
              PARCOURS
            </span>
          </div>

          <div className="mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold font-serif-custom mb-4" style={{ color: "var(--heading-color)" }}>
              Formation et expériences
            </h1>
            <p className="text-base sm:text-lg" style={{ color: "var(--body-text)" }}>
              Formation en nutrition et diététique. Les expériences et certifications seront ajoutées lorsqu’elles auront été communiquées.
            </p>
          </div>
          <Timeline
            experiences={experiences}
            educations={educations}
            certifications={certifications}
          />
        </div>
      </section>
    </PublicLayout>
  );
}
