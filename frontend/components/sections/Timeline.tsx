"use client";

import { Award, Briefcase, GraduationCap, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { MOTION_EASE, StaggerContainer, StaggerItem, VIEWPORT_ONCE } from "@/components/ui/MotionPrimitives";
import { formatDate } from "@/lib/utils";
import type { Experience, Education, Certification } from "@/types";

interface TimelineProps {
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
}

type TimelineItem = {
  id: string;
  type: "experience" | "education" | "certification";
  title: string;
  subtitle: string;
  start?: string | null;
  end?: string | null;
  description?: string;
  link?: string;
};

export default function Timeline({
  experiences,
  educations,
  certifications,
}: TimelineProps) {
  const items: TimelineItem[] = [
    ...experiences.map((e) => ({
      id: `exp-${e.id}`,
      type: "experience" as const,
      title: e.poste,
      subtitle: e.entreprise,
      start: e.date_debut,
      end: e.date_fin,
      description: e.description,
    })),
    ...educations.map((e) => ({
      id: `edu-${e.id}`,
      type: "education" as const,
      title: e.intitule,
      subtitle: e.etablissement,
      start: e.date_debut,
      end: e.date_fin,
      description: e.description,
    })),
    ...certifications.map((c) => ({
      id: `cert-${c.id}`,
      type: "certification" as const,
      title: c.nom,
      subtitle: c.organisme,
      start: c.date_obtention,
      end: null,
      link: c.lien_justificatif,
    })),
  ].sort((a, b) => new Date(b.start || 0).getTime() - new Date(a.start || 0).getTime());

  const icons = {
    experience: Briefcase,
    education: GraduationCap,
    certification: Award,
  };

  const badgeStyles: Record<TimelineItem["type"], React.CSSProperties> = {
    experience: {
      backgroundColor: "var(--accent)",
      color: "#ffffff",
    },
    education: {
      backgroundColor: "var(--primary)",
      color: "#ffffff",
    },
    certification: {
      backgroundColor: "var(--icon-bg)",
      color: "var(--label-color)",
      border: "1px solid var(--border)",
    },
  };

  const badgeLabels = {
    experience: "Expérience",
    education: "Formation",
    certification: "Certification",
  };

  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.85, ease: MOTION_EASE }}
        className="absolute left-6 top-4 bottom-4 w-[2px] hidden sm:block origin-top"
        style={{
          background: "linear-gradient(to bottom, var(--primary), var(--border), transparent)",
        }}
      />

      <StaggerContainer className="space-y-8" staggerDelay={0.1}>
        {items.map((item) => {
          const Icon = icons[item.type];
          const isEducation = item.type === "education";
          return (
            <StaggerItem key={item.id} className="relative flex gap-6 group">
              {/* Icon marker */}
              <div
                className="hidden sm:flex w-12 h-12 rounded-2xl items-center justify-center shrink-0 z-10 shadow-xs transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: isEducation ? "var(--primary)" : "var(--icon-bg)",
                  border: isEducation ? "1px solid var(--primary)" : "1px solid var(--border)",
                  color: isEducation ? "#ffffff" : "var(--icon-color)",
                }}
              >
                <Icon size={20} />
              </div>

              {/* Card content */}
              <div
                className="relative rounded-2xl p-6 sm:p-8 flex-1 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                      <span
                        className="text-xs px-3 py-1 rounded-full font-semibold tracking-wide"
                        style={badgeStyles[item.type]}
                      >
                        {badgeLabels[item.type]}
                      </span>
                      {item.start && (
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                          style={{ backgroundColor: "var(--bg-subtle)", color: "var(--body-text)" }}
                        >
                          <Calendar size={12} style={{ color: "var(--primary)" }} />
                          {formatDate(item.start)} — {formatDate(item.end)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xl sm:text-2xl font-serif-custom" style={{ color: "var(--heading-color)" }}>
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-sm font-semibold mt-1" style={{ color: "var(--primary)" }}>
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm sm:text-base leading-relaxed mt-3" style={{ color: "var(--body-text)" }}>
                    {item.description}
                  </p>
                )}

                {item.link && item.link !== "#" && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4 px-4 py-2 rounded-full transition-all hover:opacity-90"
                    style={{ color: "var(--primary)", backgroundColor: "var(--icon-bg)", border: "1px solid var(--border)" }}
                  >
                    Voir le certificat
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
