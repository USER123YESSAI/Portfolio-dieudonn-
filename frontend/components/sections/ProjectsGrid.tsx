"use client";

import { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/MotionPrimitives";
import type { Project } from "@/types";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  showFilters?: boolean;
}

export default function ProjectsGrid({
  projects,
  showFilters = true,
}: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const portfolioProjects = projects.filter((project) =>
    ["Nutrition", "Diététique", "Autre"].includes(project.categorie || ""),
  );

  const allCategories = useMemo(() => {
    const defaultOrder = ["Nutrition", "Diététique", "Autre"];
    const presentCats = [
      ...new Set(portfolioProjects.map((p) => p.categorie).filter(Boolean)),
    ] as string[];
    const combined = [
      ...defaultOrder.filter((c) => presentCats.includes(c)),
      ...presentCats.filter((c) => !defaultOrder.includes(c)),
    ];
    return ["Tous", ...combined];
  }, [portfolioProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return portfolioProjects;
    return portfolioProjects.filter((project) => project.categorie === activeCategory);
  }, [portfolioProjects, activeCategory]);

  return (
    <section id="projets" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Label & Heading */}
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--label-color)" }}>
              SERVICES &amp; RÉALISATIONS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom mb-6" style={{ color: "var(--heading-color)" }}>
            Nutrition, diététique <span className="italic font-serif-custom">&amp;</span> réalisations
          </h2>
        </Reveal>

        {/* Filter Pills Row */}
        {showFilters && (
          <Reveal delay={0.08} className="flex flex-wrap items-center gap-2 mb-10">
            {allCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className="relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 border cursor-pointer"
                  style={isActive ? {
                    color: "white",
                    borderColor: "var(--primary)",
                  } : {
                    backgroundColor: "var(--card)",
                    color: "var(--body-text)",
                    borderColor: "var(--border)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full -z-0"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </Reveal>
        )}

        {/* Projects 3-Column Grid */}
        {filteredProjects.length > 0 ? (
          <StaggerContainer key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="font-bold text-lg mb-1 font-serif-custom" style={{ color: "var(--heading-color)" }}>
              Aucun service ou projet n&apos;est renseigné pour le moment
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--body-text)" }}>
              Les informations seront ajoutées lorsqu&apos;elles auront été confirmées.
            </p>
            <button
              onClick={() => setActiveCategory("Tous")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white text-xs font-semibold rounded-full shadow-xs transition-all hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <RotateCcw size={13} />
              <span>Afficher tout</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
