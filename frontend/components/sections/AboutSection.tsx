"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, MapPin, GraduationCap, Leaf } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/MotionPrimitives";
import { getAssetUrl } from "@/lib/api";
import type { SiteSettings } from "@/types";

interface AboutSectionProps {
  settings: SiteSettings;
}

const defaultQualities = [
  {
    title: "Nutrition",
    desc: "Un domaine au cœur de ma formation universitaire.",
  },
  {
    title: "Diététique",
    desc: "Une formation consacrée aux liens entre alimentation et bien-être.",
  },
];

export default function AboutSection({ settings }: AboutSectionProps) {
  const photoUrl =
    getAssetUrl(settings.about_photo || settings.profile_photo) || "/images/profil-dieudonne.jpeg";
  const [imgSrc, setImgSrc] = useState(photoUrl);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setImgSrc(photoUrl);
    setRetryCount(0);
  }, [photoUrl]);

  const handleImageError = () => {
    if (retryCount < 3 && photoUrl !== "/images/profil-dieudonne.jpeg") {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setImgSrc(`${photoUrl}${photoUrl.includes("?") ? "&" : "?"}retry=${Date.now()}`);
      }, 3000);
    } else {
      setImgSrc("/images/profil-dieudonne.jpeg");
    }
  };

  const title =
    settings.about_title || "Un parcours consacré à la nutrition et à la diététique.";
  const description =
    settings.about_text ||
    "Titulaire d'une Licence en Nutrition et Diététique, je souhaite poursuivre mon parcours professionnel dans ce domaine.";
  const languages =
    settings.about_languages || "";
  const location = settings.location || "";

  return (
    <section id="a-propos" className="py-20 sm:py-24 transition-colors duration-300 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Presentation + Photo + Optional Location */}
          <Reveal className="lg:col-span-6 space-y-6">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-[1px]"
                style={{ backgroundColor: "var(--label-color)" }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--label-color)" }}
              >
                À PROPOS
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-custom tracking-tight leading-tight"
              style={{ color: "var(--heading-color)" }}
            >
              {title}
            </h2>

            {/* Photo & Bio layout */}
            <div className="flex flex-col sm:flex-row gap-6 items-start pt-2">
              {/* Photo Box */}
              <div className="relative shrink-0 w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden shadow-md group"
                   style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                <Image
                  src={imgSrc}
                  alt="Portrait de Dieudonné Routouang Souloukna"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 144px, 160px"
                  onError={handleImageError}
                />
              </div>

              {/* Text & Location */}
              <div className="space-y-4 flex-1">
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: "var(--body-text)" }}
                >
                  {description}
                </p>

                {location && (
                  <div className="inline-flex items-center gap-2 text-sm font-semibold pt-1"
                       style={{ color: "var(--heading-color)" }}>
                    <MapPin size={17} style={{ color: "var(--accent)" }} className="shrink-0" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Academic badge highlight */}
            <div
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xs"
              style={{
                backgroundColor: "var(--icon-bg)",
                border: "1px solid var(--border)",
                color: "var(--heading-color)",
              }}
            >
              <GraduationCap size={16} style={{ color: "var(--primary)" }} />
              <span>Licence en Nutrition et Diététique</span>
            </div>
          </Reveal>

          {/* Right Column: Areas of study + Optional Languages */}
          <StaggerContainer className="lg:col-span-6 space-y-4 lg:pt-8" staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {defaultQualities.map((q, idx) => (
                <StaggerItem
                  key={idx}
                  className="p-6 rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-start gap-4 group"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: "var(--icon-bg)",
                      color: idx === 0 ? "var(--primary)" : "var(--accent)",
                    }}
                  >
                    {idx === 0 ? <Leaf size={18} /> : <CheckCircle2 size={18} />}
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold font-serif-custom mb-1.5 transition-colors"
                      style={{ color: "var(--heading-color)" }}
                    >
                      {q.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: "var(--body-text)" }}
                    >
                      {q.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>

            {languages && <StaggerItem
              className="p-5 sm:p-6 rounded-2xl shadow-xs transition-colors duration-300 flex items-center gap-3"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: "var(--primary)" }}
              />
              <p className="text-sm font-medium" style={{ color: "var(--heading-color)" }}>
                <strong className="font-semibold">Langues :</strong>{" "}
                <span style={{ color: "var(--body-text)" }}>{languages}</span>
              </p>
            </StaggerItem>}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
