"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

// ── Service tags ──────────────────────────────────────────────────────────────
const SERVICES = [
  "Avatars & animation 3D",
  "Voix-off & motion design",
  "Storytelling sur mesure",
  "Vidéos pédagogiques & commerciales",
  "Livraison multi-formats",
] as const;

// ── Animation variants ────────────────────────────────────────────────────────
// Type 1 — Apparition : fade + translateY staggeré
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface px-6 pb-20 pt-28">

      {/* ── Arrière-plan décoratif ──────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Orbes de lumière colorées */}
        <div className="absolute -left-48 -top-24 h-[700px] w-[700px] rounded-full bg-brand-rose/[0.07] blur-[160px] animate-glow-pulse" />
        <div className="absolute -bottom-24 -right-48 h-[750px] w-[750px] rounded-full bg-brand-violet/[0.09] blur-[160px] animate-glow-pulse [animation-delay:1.8s]" />
        <div className="absolute left-1/2 top-2/5 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-cyan/[0.05] blur-[130px] animate-glow-pulse [animation-delay:3.6s]" />

        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Vignette radiale — fond se fond vers les bords */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_45%,transparent_25%,#0a0a0f_100%)]" />
      </div>

      {/* ── Contenu principal ──────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp}>
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-4 py-1.5 text-sm font-medium text-white/60 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-violet" />
            Studio de production vidéo IA
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="mb-6 font-display text-[2.6rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          variants={fadeUp}
        >
          Des vidéos premium,{" "}
          <span className="text-rainbow">créées par l&apos;IA</span>,
          <br className="hidden sm:block" />
          pensées pour votre marque
        </motion.h1>

        {/* Sous-titre — affiné depuis la présentation complète */}
        <motion.p
          className="mb-10 max-w-2xl text-base leading-relaxed text-white/45 sm:text-[1.1rem]"
          variants={fadeUp}
        >
          Vidéos pédagogiques, commerciales, animées et institutionnelles
          &mdash; du script à la livraison,{" "}
          <span className="font-medium text-white/75">
            en jours, pas en semaines
          </span>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-12 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          variants={fadeUp}
        >
          {/* Type 2 — Hover : scale sur les CTA */}
          <motion.a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#0a0a0f] shadow-lg transition-shadow duration-300 hover:shadow-[0_0_48px_rgba(139,92,246,0.35)] sm:w-auto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Demander un devis
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#realisations"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.05] px-8 py-4 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-white/[0.28] hover:bg-white/[0.1] hover:text-white sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="h-4 w-4 fill-white/80 transition-colors group-hover:fill-white" />
            Voir nos réalisations
          </motion.a>
        </motion.div>

        {/* Tags de services — extraits de la présentation complète */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          variants={fadeUp}
        >
          {SERVICES.map((service) => (
            <span
              key={service}
              className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3.5 py-1 text-xs text-white/35"
            >
              {service}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Placeholder mascotte Kame — sera remplacé par l'image fournie */}
      {/* <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <Image src="/kame.png" alt="Kame, mascotte Kaméléon Studio" width={320} height={400} priority />
      </div> */}

      {/* Fondu bas vers la section suivante */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent"
      />
    </section>
  );
}
