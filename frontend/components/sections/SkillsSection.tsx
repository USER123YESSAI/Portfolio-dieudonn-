"use client";

import { Leaf, HeartPulse, Apple, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MOTION_EASE, Reveal, StaggerContainer, StaggerItem, VIEWPORT_ONCE } from "@/components/ui/MotionPrimitives";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryLabels: Record<string, string> = {
  nutrition: "Nutrition",
  dietetique: "Diététique",
};

const fallbackDomains: Skill[] = [
  { id: -1, nom: "Nutrition", categorie: "nutrition", niveau: 0 },
  { id: -2, nom: "Diététique", categorie: "dietetique", niveau: 0 },
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const nutritionSkills = skills.filter(
    (skill) => skill.categorie === "nutrition" || skill.categorie === "dietetique",
  );

  // Dédupliquer par nom tout en conservant catégorie et niveau
  const uniqueSkills = nutritionSkills.reduce<Skill[]>((acc, current) => {
    if (!acc.some((item) => item.nom.toLowerCase() === current.nom.toLowerCase())) {
      acc.push(current);
    }
    return acc;
  }, []);

  const displayedSkills = uniqueSkills.length > 0 ? uniqueSkills : fallbackDomains;
  const gridColsClass =
    displayedSkills.length >= 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 max-w-4xl";

  const icons = [Leaf, HeartPulse, Apple, Sparkles];

  return (
    <section id="competences" className="py-20 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Label & Heading */}
        <Reveal className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--label-color)" }}>
              COMPÉTENCES
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom mb-4" style={{ color: "var(--heading-color)" }}>
            Domaines de formation
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--body-text)" }}>
            Des compétences fondamentales dédiées à la nutrition, à l&apos;équilibre alimentaire et au bien-être.
          </p>
        </Reveal>

        {/* Skills Grid */}
        <StaggerContainer className={`grid ${gridColsClass} gap-6`} staggerDelay={0.09}>
          {displayedSkills.map((skill, idx) => {
            const Icon = icons[idx % icons.length];
            const isDietetique = skill.categorie === "dietetique";
            const catLabel = categoryLabels[skill.categorie] || "Formation";

            return (
              <StaggerItem
                key={skill.id || skill.nom}
                className="relative rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-5 overflow-hidden group"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              >
                {/* Top subtle accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: isDietetique
                      ? "linear-gradient(90deg, var(--accent), var(--primary))"
                      : "linear-gradient(90deg, var(--primary), var(--badge-primary))",
                  }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: "var(--icon-bg)",
                      color: isDietetique ? "var(--accent)" : "var(--primary)",
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: "var(--bg-subtle)",
                      color: isDietetique ? "var(--accent-text)" : "var(--label-color)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {catLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif-custom mb-1" style={{ color: "var(--heading-color)" }}>
                    {skill.nom}
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: "var(--body-text)" }}>
                    {isDietetique
                      ? "Approche diététique et équilibre nutritionnel"
                      : "Connaissances scientifiques en nutrition et santé"}
                  </p>
                </div>

                {skill.niveau > 0 && (
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span style={{ color: "var(--body-text)" }}>Maîtrise</span>
                      <span style={{ color: "var(--primary)" }}>{skill.niveau}%</span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--progress-track)" }}
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{ duration: 0.75, delay: 0.15, ease: MOTION_EASE }}
                        className="h-full rounded-full origin-left"
                        style={{
                          width: `${Math.min(100, Math.max(0, skill.niveau))}%`,
                          background: "linear-gradient(90deg, var(--progress-fill-start), var(--progress-fill-end))",
                        }}
                      />
                    </div>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
