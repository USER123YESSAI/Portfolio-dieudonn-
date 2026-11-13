"use client";

import { Activity } from "lucide-react";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const nutritionSkills = skills.filter(
    (skill) => skill.categorie === "nutrition" || skill.categorie === "dietetique",
  );
  const domains = nutritionSkills.length > 0
    ? [...new Set(nutritionSkills.map((skill) => skill.nom))]
    : ["Nutrition", "Diététique"];

  return (
    <section id="competences" className="py-20 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Label: —— COMPÉTENCES */}
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--label-color)" }}>
            COMPÉTENCES
          </span>
        </div>

        {/* Big Serif Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom mb-12" style={{ color: "var(--heading-color)" }}>
          Domaines de formation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {domains.map((domain) => (
            <div
              key={domain}
              className="rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-colors duration-300"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--bg-subtle)", color: "var(--primary)" }}
              >
                <Activity size={20} />
              </div>
              <h3 className="text-lg font-bold font-serif-custom" style={{ color: "var(--heading-color)" }}>
                {domain}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
