"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import SparklesUI from "@/components/ui/Sparkles";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";
import {
  ArrowRight,
  GraduationCap,
  Megaphone,
  Sparkles,
  Mic2,
  BookOpen,
  Palette,
  type LucideIcon,
} from "lucide-react";

const SERVICES_SPEECH = [
  "De la vidéo à la BD en passant par le web — on maîtrise toute la chaîne !",
  "Je vous pointe le service fait pour vous 👉",
  "Que vous soyez artiste, entrepreneur ou marque — on s'adapte.",
];

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: GraduationCap,
    title: "Vidéos pédagogiques",
    desc: "Formations, modules e-learning, explications scientifiques — avec avatars formateurs, schémas animés et voix-off structurée.",
    border: "#06b6d4",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    icon: Megaphone,
    title: "Vidéos commerciales",
    desc: "Publicités, reels, teasers, vidéos de lancement — conçues pour vendre et capter l'attention sur tous les réseaux.",
    border: "#f97316",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    icon: Sparkles,
    title: "Animation 3D & avatars",
    desc: "Personnages semi-réalistes, mascottes, dessins animés — un univers visuel unique, cohérent et immédiatement identifiable.",
    border: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    icon: Mic2,
    title: "Voix-off & clonage vocal",
    desc: "Voix professionnelles, chaleureuses ou institutionnelles. Synchronisation labiale et clonage vocal avec autorisation.",
    border: "#d946ef",
    glow: "rgba(217,70,239,0.15)",
  },
  {
    icon: BookOpen,
    title: "Storytelling & BD",
    desc: "Récits visuels, bandes dessinées, histoires de marque — des narratives qui capturent l'attention et provoquent l'émotion.",
    border: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
  },
  {
    icon: Palette,
    title: "Direction artistique",
    desc: "Style visuel, univers graphique et identité couleurs pour les réseaux — être visible, mémorable et professionnel partout.",
    border: "#eab308",
    glow: "rgba(234,179,8,0.15)",
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
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const chipContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const chipItem: Variants = {
  hidden: { opacity: 0, scale: 0.78, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// ── ServiceCard ───────────────────────────────────────────────────────────────
interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  border: string;
  glow: string;
  index: number;
}

function ServiceCard({ icon: Icon, title, desc, border, glow, index }: ServiceCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      variants={fadeUp}
      // Hover : scale + lévitation + glow (style KingOfIA)
      whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.22 } }}
      className="group relative overflow-hidden rounded-2xl bg-surface-1 border border-white/[0.07] p-6"
    >
      {/* Barre accent en haut — signature KingOfIA */}
      <div
        className="absolute inset-x-0 top-0 h-[2.5px]"
        style={{ background: `linear-gradient(90deg, ${border}, ${border}88)` }}
      />

      {/* Numéro coin droit — style KingOfIA */}
      <span
        className="absolute right-5 top-5 font-display text-4xl font-bold leading-none select-none"
        style={{ color: `${border}12` }}
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Radial glow au hover, centré sur le top */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${glow} 0%, transparent 75%)`,
        }}
      />

      {/* Outer glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 32px ${border}28` }}
      />

      <div className="relative z-10">
        {/* Icône 3D */}
        <div
          className="icon-3d mb-5 inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${border}35, ${border}10)`,
            border: `1px solid ${border}40`,
            boxShadow: `4px 6px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 16px ${border}25`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: border }} />
        </div>

        {/* Texte */}
        <h3 className="mb-2 font-display text-[1rem] font-black text-white leading-snug">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50">{desc}</p>
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Arrière-plan */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brand-fuchsia/[0.16] blur-[80px]" />
        <div className="absolute -left-24 bottom-0 h-[450px] w-[450px] rounded-full bg-brand-cyan/[0.15] blur-[75px]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <SparklesUI />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── En-tête ────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-20 flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Badge pill — style KingOfIA */}
          <motion.div variants={fadeUp}>
            <span className="badge-pill badge-fuchsia mb-8">
              ✦ Nos prestations
            </span>
          </motion.div>

          {/* H2 deux lignes — ligne 1 blanche, ligne 2 gradient chaud */}
          <motion.h2 className="mb-5 tracking-tight" variants={fadeUp}>
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.75rem]">
              Un studio complet,
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-warm sm:text-4xl md:text-[2.75rem]">
              pour chaque besoin
            </span>
          </motion.h2>

          {/* Chips colorés — option A+C : apparition en cascade lumineuse */}
          <motion.div
            variants={chipContainer}
            className="mt-2 flex flex-wrap justify-center gap-2.5"
          >
            {SERVICES.map(({ icon: Icon, title, border }) => (
              <motion.span
                key={title}
                variants={chipItem}
                className="inline-flex cursor-default items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-semibold"
                style={{
                  background: `${border}13`,
                  border: `1px solid ${border}38`,
                  color: border,
                  boxShadow: `0 0 0px ${border}00`,
                }}
                whileHover={{
                  scale: 1.07,
                  boxShadow: `0 0 18px ${border}50`,
                  background: `${border}24`,
                  transition: { duration: 0.18 },
                }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {title}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline courte */}
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[0.82rem] font-medium text-white/28 tracking-wide"
          >
            Du script à la livraison finale — tout sur mesure, en quelques jours.
          </motion.p>

          {/* Séparateur */}
          <motion.div variants={fadeUp} className="mt-10 w-full max-w-sm">
            <div className="divider-rainbow" />
          </motion.div>
        </motion.div>

        {/* ── Grille services ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-12">
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} index={i} {...service} />
            ))}
          </motion.div>
        </div>

        {/* CTA bas */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #d946ef, #f43f5e)",
              boxShadow: "0 4px 20px rgba(217, 70, 239, 0.3)",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 36px rgba(217, 70, 239, 0.5), 0 4px 16px rgba(244, 63, 94, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Démarrer un projet
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>

      {/* ── Kame guide ─────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-10 right-8 z-20 hidden lg:flex">
        <KameSpeech variants={SERVICES_SPEECH}>
          <Kame context="point" size={150} />
        </KameSpeech>
      </div>

      {/* Fondu bas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent"
      />
    </section>
  );
}
