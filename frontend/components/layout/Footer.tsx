import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/ui/MotionPrimitives";
import type { SiteSettings } from "@/types";

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const email = settings?.email || "routouangdieudonnesouloukna@gmail.com";
  const github = settings?.social_links?.github;
  const linkedin = settings?.social_links?.linkedin;

  return (
    <footer className="border-t transition-colors duration-300" style={{ borderColor: "var(--nav-border)", backgroundColor: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/* Pre-footer Call to Action Card */}
        <Reveal className="rounded-3xl p-8 sm:p-12 mb-16 text-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--label-color)" }}>
              NUTRITION & DIÉTÉTIQUE
            </span>
            <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--label-color)" }} />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold font-serif-custom mb-3" style={{ color: "var(--heading-color)" }}>
            Échangeons autour de la nutrition
          </h3>
          <p className="max-w-lg mx-auto text-sm sm:text-base mb-8" style={{ color: "var(--body-text)" }}>
            Pour toute question ou proposition liée à la nutrition et à la diététique, vous pouvez me contacter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-full shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--btn-primary-bg)" }}
            >
              Me contacter
              <ArrowRight size={16} />
            </Link>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-full transition-all duration-200 shadow-xs hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/5"
              style={{ backgroundColor: "transparent", color: "var(--btn-secondary-text)", border: "1px solid var(--btn-secondary-border)" }}
            >
              <Mail size={16} />
              {email}
            </a>
          </div>
        </Reveal>

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold font-serif-custom mb-1 transition-colors"
              style={{ color: "var(--heading-color)" }}
            >
              DRS<span style={{ color: "var(--logo-dot)" }}>.</span>
            </Link>
            <p className="text-sm" style={{ color: "var(--body-text)" }}>
              {settings?.hero_title || "Nutrition et Diététique"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border transition-all shadow-xs"
                style={{ backgroundColor: "var(--icon-bg)", borderColor: "var(--border)", color: "var(--icon-color)" }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border transition-all shadow-xs"
                style={{ backgroundColor: "var(--icon-bg)", borderColor: "var(--border)", color: "var(--icon-color)" }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="p-2.5 rounded-lg border transition-all shadow-xs"
              style={{ backgroundColor: "var(--icon-bg)", borderColor: "var(--border)", color: "var(--icon-color)" }}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dieudonné Routouang Souloukna. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
