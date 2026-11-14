"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, GraduationCap, Leaf, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { BotanicalFloat, MOTION_EASE, StaggerContainer, StaggerItem } from "@/components/ui/MotionPrimitives";
import { getAssetUrl } from "@/lib/api";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const photoUrl =
    getAssetUrl(settings.profile_photo ?? undefined) || "/images/profil5.png";
  const [imgSrc, setImgSrc] = useState(photoUrl);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setImgSrc(photoUrl);
    setRetryCount(0);
  }, [photoUrl]);

  const handleImageError = () => {
    // Si Render est en phase de réveil (cold start ~30s), retenter 3 fois avant de basculer sur le fallback
    if (retryCount < 3 && photoUrl !== "/images/profil5.png") {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setImgSrc(`${photoUrl}${photoUrl.includes("?") ? "&" : "?"}retry=${Date.now()}`);
      }, 3000);
    } else {
      setImgSrc("/images/profil5.png");
    }
  };

  const emailAddress = settings.email || "routouangdieudonnesouloukna@gmail.com";

  return (
    <section id="accueil" className="relative pt-12 sm:pt-20 pb-8 scroll-mt-24 overflow-hidden">
      {/* Subtle botanical organic background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--bg-gradient-1) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 w-[320px] h-[320px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--bg-gradient-2) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center pb-14">
          {/* Left Column: Typography, Bio, and Contact */}
          <div className="lg:col-span-7 space-y-6">
            {/* Botanical Field Pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: MOTION_EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xs"
              style={{
                backgroundColor: "var(--icon-bg)",
                color: "var(--label-color)",
                border: "1px solid var(--border)",
              }}
            >
              <Leaf size={13} />
              <span>NUTRITION &amp; DIÉTÉTIQUE</span>
            </motion.div>

            {/* Serif Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: MOTION_EASE }}
              className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold font-serif-custom tracking-tight leading-[1.06]"
              style={{ color: "var(--heading-color)" }}
            >
              Dieudonné <br />
              <span className="gradient-text">Routouang Souloukna</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: MOTION_EASE }}
              className="flex items-center gap-3"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.28, ease: MOTION_EASE }}
                className="w-8 h-[2px] rounded-full origin-left"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <h2 className="text-xl sm:text-2xl font-serif-custom italic" style={{ color: "var(--accent-text)" }}>
                {settings.hero_title || "Nutrition et Diététique"}
              </h2>
            </motion.div>

            {/* Bio text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: MOTION_EASE }}
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--body-text)" }}
            >
              {settings.bio ||
                "Titulaire d'une Licence en Nutrition et Diététique, je souhaite mettre ma formation au service de projets qui valorisent une alimentation équilibrée et le bien-être."}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32, ease: MOTION_EASE }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/journey"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-full shadow-sm transition-shadow duration-200 hover:shadow-md group"
                  style={{ backgroundColor: "var(--btn-primary-bg)" }}
                >
                  <span>Découvrir mon parcours</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent font-semibold text-sm rounded-full transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: "var(--btn-secondary-text)", border: "1px solid var(--btn-secondary-border)" }}
                >
                  <Mail size={15} />
                  <span>Me contacter</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Direct Email Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: MOTION_EASE }}
              className="flex items-center gap-6 pt-1 text-sm font-medium"
              style={{ color: "var(--body-text)" }}
            >
              <a
                href={`mailto:${emailAddress}`}
                className="contact-link inline-flex items-center gap-2 transition-colors"
              >
                <Mail size={15} style={{ color: "var(--primary)" }} />
                <span>{emailAddress}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Arched Editorial Photo Card with floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: MOTION_EASE }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-84 sm:w-84 sm:h-[25rem]">
              {/* Abstract botanical SVG ring motif */}
              <BotanicalFloat duration={7} distance={8} className="pointer-events-none absolute -top-6 -left-6 w-24 h-24 opacity-35">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <circle cx="50" cy="50" r="42" stroke="var(--primary)" strokeWidth="1.2" strokeDasharray="4 6" />
                  <path d="M50 16C62 28 62 44 50 56C38 44 38 28 50 16Z" stroke="var(--accent)" strokeWidth="1.2" />
                </svg>
              </BotanicalFloat>

              {/* Subtle organic background frame offset */}
              <div
                className="absolute inset-0 rounded-t-[9rem] rounded-b-3xl translate-x-3 translate-y-3"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                }}
              />

              {/* Arched Photo Image Card */}
              <div
                className="relative w-full h-full rounded-t-[9rem] rounded-b-3xl overflow-hidden shadow-lg"
                style={{ border: "2px solid var(--card)" }}
              >
                <Image
                  src={imgSrc}
                  alt="Dieudonné Routouang Souloukna"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, 336px"
                  priority
                  onError={handleImageError}
                />
              </div>

              {/* Floating Top-Right Health Pill */}
              <BotanicalFloat duration={4.8} distance={5} delay={0.3} className="absolute top-6 -right-3 sm:-right-5 z-10">
                <motion.div
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: MOTION_EASE }}
                  className="px-3.5 py-2 rounded-full shadow-md flex items-center gap-2 backdrop-blur-sm"
                  style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <HeartPulse size={15} style={{ color: "var(--accent)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--heading-color)" }}>
                    Santé &amp; Bien-être
                  </span>
                </motion.div>
              </BotanicalFloat>

              {/* Floating Bottom-Left Education Card */}
              <BotanicalFloat duration={5.6} distance={5} delay={0.6} className="absolute -bottom-4 -left-2 sm:-left-6 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.52, ease: MOTION_EASE }}
                  className="px-4 py-3 rounded-2xl shadow-md flex items-center gap-3"
                  style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--icon-bg)", color: "var(--primary)" }}
                  >
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--label-color)" }}>
                      Formation
                    </div>
                    <div className="text-xs font-semibold" style={{ color: "var(--heading-color)" }}>
                      {settings.hero_subtitle || "Licence en Nutrition et Diététique"}
                    </div>
                  </div>
                </motion.div>
              </BotanicalFloat>
            </div>
          </motion.div>
        </div>

        {/* Professional profile highlights bar */}
        <StaggerContainer
          staggerDelay={0.1}
          delayChildren={0.25}
          className="rounded-2xl shadow-xs overflow-hidden mt-4"
          style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <StaggerItem
              className="py-5 px-6 flex items-center justify-center sm:justify-start gap-3.5 border-b sm:border-b-0 sm:border-r group"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: "var(--icon-bg)", color: "var(--primary)" }}
              >
                <GraduationCap size={20} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-custom" style={{ color: "var(--heading-color)" }}>
                  Licence
                </div>
                <div className="text-xs sm:text-sm" style={{ color: "var(--body-text)" }}>
                  Nutrition et Diététique
                </div>
              </div>
            </StaggerItem>

            <StaggerItem
              className="py-5 px-6 flex items-center justify-center sm:justify-start gap-3.5 border-b sm:border-b-0 sm:border-r group"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: "var(--icon-bg)", color: "var(--primary)" }}
              >
                <Leaf size={20} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-custom" style={{ color: "var(--heading-color)" }}>
                  Nutrition
                </div>
                <div className="text-xs sm:text-sm" style={{ color: "var(--body-text)" }}>
                  Domaine professionnel
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="py-5 px-6 flex items-center justify-center sm:justify-start gap-3.5 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: "var(--icon-bg)", color: "var(--accent)" }}
              >
                <HeartPulse size={20} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-custom" style={{ color: "var(--heading-color)" }}>
                  Diététique
                </div>
                <div className="text-xs sm:text-sm" style={{ color: "var(--body-text)" }}>
                  Champ de formation
                </div>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
