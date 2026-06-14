"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

// SVG inline — lucide-react ne ship pas d'icônes social dans cette version
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconTiktok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
    </svg>
  );
}
function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services",     href: "#services"     },
  { label: "Tarifs",       href: "#tarifs"       },
  { label: "Réalisations", href: "#showreel"     },
  { label: "Contact",      href: "#contact"      },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href:  "https://www.instagram.com/3d_kamstudio/",
    icon:  IconInstagram,
    color: "#d946ef",
    hoverGlow: "rgba(217,70,239,0.45)",
  },
  {
    label: "TikTok",
    href:  "https://www.tiktok.com/@3d_kamstudio",
    icon:  IconTiktok,
    color: "#06b6d4",
    hoverGlow: "rgba(6,182,212,0.45)",
  },
  {
    label: "YouTube",
    href:  "https://www.youtube.com/@3Dkamstudio",
    icon:  IconYoutube,
    color: "#f43f5e",
    hoverGlow: "rgba(244,63,94,0.45)",
  },
];

// ── Composant ─────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Halos décoratifs très subtils */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 bottom-0  h-[320px] w-[320px] rounded-full bg-brand-violet/[0.07]  blur-[80px]" />
        <div className="absolute -right-48 top-0    h-[280px] w-[280px] rounded-full bg-brand-fuchsia/[0.06] blur-[75px]" />
      </div>

      {/* ── Séparateur arc-en-ciel ──────────────────────────────────────── */}
      <div className="divider-rainbow" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">

        {/* ── Grille principale ──────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >

          {/* ── Colonne 1 : Logo + tagline + réseaux ─────────────────────── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            {/* Logo */}
            <a href="#" className="group inline-flex items-center gap-3 self-start">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl"
                style={{ boxShadow: "0 0 20px rgba(217,70,239,0.3)" }}>
                <Image
                  src="/kame.png"
                  alt="Kame mascotte Kaméléon Studio"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="block font-display text-lg font-black leading-none text-white">
                  Kaméléon Studio
                </span>
                <span className="block text-[0.62rem] font-semibold uppercase tracking-widest text-white/30">
                  Production créative par IA
                </span>
              </div>
            </a>

            {/* Tagline */}
            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              Vidéo, bande dessinée et sites web sur mesure —
              du script au rendu final, en un temps record.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, color, hoverGlow }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/40 transition-colors"
                  whileHover={{
                    scale: 1.12,
                    boxShadow: `0 0 18px ${hoverGlow}`,
                    borderColor: `${color}55`,
                    color,
                  }}
                  whileTap={{ scale: 0.93 }}
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Colonne 2 : Navigation ────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <p className="text-[0.65rem] font-black uppercase tracking-widest text-white/25">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/45 transition-colors hover:text-white/90"
                >
                  <span
                    className="block h-px w-3 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
                    style={{ background: "linear-gradient(90deg,#d946ef,#8b5cf6)" }}
                  />
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ── Colonne 3 : Légal + contact rapide ───────────────────────── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <p className="text-[0.65rem] font-black uppercase tracking-widest text-white/25">
              Légal
            </p>
            <nav className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/35 transition-colors hover:text-white/70"
                >
                  {label}
                  <ExternalLink className="h-3 w-3 opacity-40" />
                </a>
              ))}
            </nav>

            {/* Contact email direct */}
            <div className="mt-2">
              <p className="mb-1.5 text-[0.65rem] font-black uppercase tracking-widest text-white/25">
                Contact direct
              </p>
              <a
                href="mailto:infos.kamstudio@gmail.com"
                className="text-sm font-medium text-white/40 transition-colors hover:text-brand-fuchsia break-all"
              >
                infos.kamstudio@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Séparateur fin + copyright ──────────────────────────────────── */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[0.72rem] text-white/22">
            © 2026 Kaméléon Studio — Tous droits réservés
          </p>
          <p className="text-[0.65rem] text-white/15">
            Fait avec ✦ et beaucoup de caféine par Kame
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
