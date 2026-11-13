"use client";

import { useEffect, useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { Reveal } from "@/components/ui/MotionPrimitives";
import { getProjects, getSettings, getSkills } from "@/lib/api";
import { DEFAULT_SETTINGS, isCurrentOwnerSettings, normalizeSiteSettings } from "@/lib/defaults";
import type { SiteSettings, Skill, Project } from "@/types";

interface HomePageClientProps {
  initialSettings: SiteSettings;
  initialSkills: Skill[];
  initialProjects: Project[];
}

export default function HomePageClient({
  initialSettings,
  initialSkills,
  initialProjects,
}: HomePageClientProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Synchronisation dynamique côté client pour garantir l'affichage immédiat des mises à jour admin
  useEffect(() => {
    getSettings()
      .then((freshSettings) => {
        if (!isCurrentOwnerSettings(freshSettings)) {
          setSettings(DEFAULT_SETTINGS);
          setSkills([]);
          setProjects([]);
          return;
        }
        setSettings((prev) => ({ ...prev, ...normalizeSiteSettings(freshSettings) }));

        return Promise.all([getSkills(), getProjects()]).then(([freshSkills, freshProjects]) => {
          if (freshSkills && freshSkills.length > 0) {
            setSkills(freshSkills);
          }
          if (freshProjects && Array.isArray(freshProjects) && freshProjects.length > 0) {
            setProjects(freshProjects);
          }
        });
      })
      .catch(() => {});
  }, []);

  return (
    <PublicLayout settings={settings}>
      <Hero settings={settings} />
      <AboutSection settings={settings} />
      <SkillsSection skills={skills} />
      <ProjectsGrid projects={projects} showFilters={true} />

      {settings.career_goal && (
        <section className="py-20 sm:py-24 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <Reveal
              className="relative rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto transition-colors duration-300 shadow-sm overflow-hidden"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }}
              />
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--label-color)" }}>
                  OBJECTIF
                </span>
                <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold font-serif-custom mb-5"
                style={{ color: "var(--heading-color)" }}
              >
                Objectif professionnel
              </h2>
              <p
                className="text-base sm:text-xl leading-relaxed max-w-2xl mx-auto italic font-serif-custom"
                style={{ color: "var(--body-text)" }}
              >
                &ldquo;{settings.career_goal}&rdquo;
              </p>
            </Reveal>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
