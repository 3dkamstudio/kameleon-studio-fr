"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  GraduationCap,
  Megaphone,
  Sparkles,
  Mic2,
  BookOpen,
  Palette,
  type LucideIcon,
} from "lucide-react";
import Kame from "@/components/ui/Kame";

// ── Data ──────────────────────────────────────────────────────────────────────
// Calé sur DA KS (8) : AI Video · 3D Animation · Storytelling · Direction artistique · Avatars
// + Voix-off (DA KS 7)
const SERVICES = [
  {
    icon: GraduationCap,
    title: "Vidéos pédagogiques",
    desc: "Formations, modules e-learning, explications scientifiques — avec avatars formateurs, schémas animés et voix-off structurée.",
    border: "#06b6d4",
    glow: "rgba(6,182,212,0.11)",
  },
  {
    icon: Megaphone,
    title: "Vidéos commerciales",
    desc: "Publicités, reels, teasers, vidéos de lancement — conçues pour vendre et capter l'attention sur tous les réseaux.",
    border: "#f97316",
    glow: "rgba(249,115,22,0.11)",
  },
  {
    icon: Sparkles,
    title: "Animation 3D & avatars",
    desc: "Personnages semi-réalistes, mascottes, dessins animés — un univers visuel unique, cohérent et immédiatement identifiable.",
    border: "#8b5cf6",
    glow: "rgba(139,92,246,0.11)",
  },
  {
    icon: Mic2,
    title: "Voix-off & clonage vocal",
    desc: "Voix professionnelles, chaleureuses ou institutionnelles. Synchronisation labiale et clonage vocal avec autorisation.",
    border: "#d946ef",
    glow: "rgba(217,70,239,0.11)",
  },
  {
    icon: BookOpen,
    title: "Storytelling & BD",
    desc: "Récits visuels, bandes dessinées, histoires de marque — des narratives qui capturent l'attention et provoquent l'émotion.",
    border: "#f43f5e",
    glow: "rgba(244,63,94,0.11)",
  },
  {
    icon: Palette,
    title: "Direction artistique",
    desc: "Style visuel, univers graphique et identité couleurs pour les réseaux — être visible, mémorable et professionnel partout.",
    border: "#eab308",
    glow: "rgba(234,179,8,0.11)",
  },
] satisfies {
  icon: LucideIcon;
  title: string;
  desc: string;
  border: string;
  glow: string;
}[];

// ── Variants ──────────────────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ── ServiceCard ───────────────────────────────────────────────────────────────
interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  border: string;
  glow: string;
}

function ServiceCard({ icon: Icon, title, desc, border, glow }: ServiceCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      // Type 2 — Hover : scale + lévitation
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl p-6 cursor-default"
      style={{
        background: `linear-gradient(145deg, ${glow}, rgba(10,10,15,0.97))`,
        border: `1px solid ${border}25`,
      }}
    >
      {/* Halo intérieur au hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 50px ${glow}, 0 0 30px ${border}20` }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Icône */}
        <div
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl shrink-0"
          style={{
            background: `${border}18`,
            border: `1px solid ${border}30`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: border }} />
        </div>

        {/* Contenu */}
        <div>
          <h3 className="mb-1.5 font-display text-base font-bold text-white/90">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/45">{desc}</p>
        </div>
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-surface px-6 py-28"
    >
      {/* Arrière-plan — décalé par rapport au Hero pour créer une profondeur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[550px] w-[550px] rounded-full bg-brand-fuchsia/[0.06] blur-[150px]" />
        <div className="absolute -left-24 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-cyan/[0.07] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── En-tête ────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Kame mobile — au-dessus du titre */}
          <motion.div variants={fadeUp} className="mb-6 lg:hidden">
            <Kame context="default" size={150} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/50">
              <Sparkles className="h-3.5 w-3.5 text-brand-violet" />
              Ce que nous créons pour vous
            </span>
          </motion.div>

          <motion.h2
            className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem]"
            variants={fadeUp}
          >
            Un studio{" "}
            <span className="text-rainbow">complet</span>
            {", "}pour chaque besoin
          </motion.h2>

          <motion.p
            className="max-w-xl text-base leading-relaxed text-white/45 sm:text-[1.05rem]"
            variants={fadeUp}
          >
            De la vidéo pédagogique au dessin animé, de la voix-off à la
            direction artistique — tout est créé sur mesure, du script à
            la livraison finale.
          </motion.p>

          {/* Séparateur arc-en-ciel */}
          <motion.div variants={fadeUp} className="mt-10 w-full max-w-md">
            <div className="divider-rainbow" />
          </motion.div>
        </motion.div>

        {/* ── Corps : Kame + grille ──────────────────────────────────────── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">

          {/* Kame desktop — sticky, pointe vers les cards */}
          <div className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:items-center lg:gap-5 lg:sticky lg:top-28 lg:self-start">
            <Kame context="point" size={260} />
            <p className="text-center text-sm leading-relaxed text-white/30 italic px-2">
              &ldquo;Dites-moi ce que vous voulez créer.
              Je m&apos;occupe du reste.&rdquo;
            </p>
          </div>

          {/* Grille de services */}
          <motion.div
            className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </motion.div>
        </div>

        {/* CTA bas de section */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Démarrer un projet
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* Fondu bas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent"
      />
    </section>
  );
}
