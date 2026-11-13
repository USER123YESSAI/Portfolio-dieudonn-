"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, GraduationCap } from "lucide-react";
import { getAssetUrl } from "@/lib/api";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const photoUrl =
    getAssetUrl(settings.profile_photo ?? undefined) || "/images/profil-dieudonne.jpeg";
  const [imgSrc, setImgSrc] = useState(photoUrl);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setImgSrc(photoUrl);
    setRetryCount(0);
  }, [photoUrl]);

  const handleImageError = () => {
    // Si Render est en phase de réveil (cold start ~30s), retenter 3 fois avant de basculer sur le fallback
    if (retryCount < 3 && photoUrl !== "/images/profil-dieudonne.jpeg") {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setImgSrc(`${photoUrl}${photoUrl.includes("?") ? "&" : "?"}retry=${Date.now()}`);
      }, 3000);
    } else {
      setImgSrc("/images/profil-dieudonne.jpeg");
    }
  };

  const emailAddress = settings.email || "routouangdieudonnesouloukna@gmail.com";

  return (
    <section id="accueil" className="relative pt-12 sm:pt-16 pb-0 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pb-16">
          {/* Left Column: Typography, Bio, and Contact */}
          <div className="lg:col-span-7 space-y-6">
            {/* Professional Field */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--label-color)" }}>
                NUTRITION & DIÉTÉTIQUE
              </span>
            </div>

            {/* Serif Name Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif-custom tracking-tight leading-[1.05]" style={{ color: "var(--heading-color)" }}>
              Dieudonné <br />
              Routouang Souloukna
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl font-serif-custom italic" style={{ color: "var(--accent-text)" }}>
              {settings.hero_title || "Nutrition et Diététique"}
            </h2>

            {/* Bio text */}
            <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "var(--body-text)" }}>
              {settings.bio ||
                "Titulaire d'une Licence en Nutrition et Diététique, je souhaite mettre ma formation au service de projets qui valorisent une alimentation équilibrée et le bien-être."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/journey"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white font-semibold text-sm rounded shadow-sm transition-all hover:opacity-90 hover:shadow-md group"
                style={{ backgroundColor: "var(--btn-primary-bg)" }}
              >
                <span>Mon parcours</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent font-semibold text-sm rounded transition-all hover:bg-white/10"
                style={{ color: "var(--btn-secondary-text)", border: "1px solid var(--btn-secondary-border)" }}
              >
                <Mail size={15} />
                <span>Me contacter</span>
              </Link>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-6 pt-2 text-sm font-medium" style={{ color: "var(--body-text)" }}>
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-1.5 transition-colors hover:opacity-80"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Photo Card with education badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96">
              {/* Subtle background frame offset */}
              <div className="absolute inset-0 rounded-3xl -rotate-2 transform" style={{ backgroundColor: "var(--card)" }} />

              {/* Photo Image Card */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid var(--border)" }}>
                <Image
                  src={imgSrc}
                  alt="Dieudonné Routouang Souloukna"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, 320px"
                  priority
                  onError={handleImageError}
                />
              </div>

              {/* Floating Bottom-Left Education Card */}
              <div className="absolute -bottom-5 left-4 px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2.5 z-10" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--primary)" }}>
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--heading-color)" }}>
                    Formation
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--body-text)" }}>
                    {settings.hero_subtitle || "Licence en Nutrition et Diététique"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional profile highlights */}
      <div className="w-full border-t border-b mt-8" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3">
          <div className="py-6 px-4 text-center border-r" style={{ borderColor: "var(--border)" }}>
            <div className="text-2xl sm:text-3xl font-bold font-serif-custom" style={{ color: "var(--heading-color)" }}>
              Licence
            </div>
            <div className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--body-text)" }}>
              Nutrition et Diététique
            </div>
          </div>

          <div className="py-6 px-4 text-center border-r" style={{ borderColor: "var(--border)" }}>
            <div className="text-2xl sm:text-3xl font-bold font-serif-custom" style={{ color: "var(--heading-color)" }}>
              Nutrition
            </div>
            <div className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--body-text)" }}>
              Domaine professionnel
            </div>
          </div>

          <div className="py-6 px-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold font-serif-custom" style={{ color: "var(--heading-color)" }}>
              Diététique
            </div>
            <div className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--body-text)" }}>
              Champ de formation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
