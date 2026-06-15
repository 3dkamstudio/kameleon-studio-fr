"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Sparkles from "@/components/ui/Sparkles";

const STATS = [
  { value: "7j",   label: "Délai de livraison",      sub: "maximum",               color: "#06b6d4" },
  { value: "7+",   label: "Types de contenus",        sub: "au catalogue",          color: "#8b5cf6" },
  { value: "100%", label: "Sur mesure",               sub: "du script au rendu",    color: "#d946ef" },
  { value: "0",    label: "Compétence technique",     sub: "requise de votre côté", color: "#22c55e" },
] as const;

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >

      {/* ══════════════════════════════════════════════════════════════════
          IMAGE PLEIN-CADRE — DA Kaméléon Studio
      ══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner-wide.webp"
          alt="Kaméléon Studio — Studio de production créative par IA"
          fill
          priority
          quality={90}
          className="object-cover"
          style={{ objectPosition: "62% center" }}
        />
      </div>

      {/* ── Calques d'overlay pour lisibilité et immersion ───────────── */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "rgba(5, 5, 18, 0.28)" }} />

      <div className="absolute inset-y-0 left-0 z-[2] w-full lg:w-[65%]"
        style={{
          background: "linear-gradient(to right, rgba(5,5,18,0.94) 0%, rgba(5,5,18,0.82) 22%, rgba(5,5,18,0.55) 48%, rgba(5,5,18,0.18) 72%, transparent 100%)",
        }} />

      <div className="absolute inset-x-0 top-0 z-[2] h-44"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,18,0.75) 0%, rgba(5,5,18,0.25) 60%, transparent 100%)" }} />

      <div className="absolute inset-x-0 bottom-0 z-[2] h-56"
        style={{ background: "linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.75) 50%, transparent 100%)" }} />

      <div className="pointer-events-none absolute -left-24 top-20 z-[2] h-[400px] w-[400px] rounded-full blur-[80px]"
        style={{ background: "rgba(217,70,239,0.12)" }} />

      <div className="pointer-events-none absolute right-0 top-0 z-[2] h-[320px] w-[320px] rounded-full blur-[70px]"
        style={{ background: "rgba(6,182,212,0.08)" }} />

      <Sparkles className="z-[3]" />


      {/* ══════════════════════════════════════════════════════════════════
          CONTENU HÉRO
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 sm:py-40">
        <motion.div
          className="flex w-full max-w-2xl flex-col items-start"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="badge-pill badge-cyan mb-8">
              ★ Studio créatif propulsé par l&apos;IA
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 className="mb-6 tracking-tight" variants={fadeUp}>
            <span className="block font-display font-black leading-[1.04] text-white"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}>
              On s&apos;adapte à vous.
            </span>
            <span className="block font-display font-black leading-[1.04] text-gradient-warm"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}>
              On crée ce que vous imaginez.
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            className="mb-10 max-w-lg text-base leading-relaxed text-white/60 sm:text-[1.08rem]"
            variants={fadeUp}
          >
            Vidéo, BD, site web — quel que soit votre style, votre marque ou votre projet,{" "}
            <span className="font-semibold text-white/88">
              on le réalise de A à Z, en quelques jours.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-14 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            variants={fadeUp}
          >
            <motion.a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                boxShadow: "0 4px 28px rgba(139,92,246,0.50)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 48px rgba(139,92,246,0.70)" }}
              whileTap={{ scale: 0.97 }}
            >
              Demander un devis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#showreel"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.22] bg-white/[0.07] px-8 py-4 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/[0.13] hover:text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="h-4 w-4 fill-white/65 group-hover:fill-white" />
              Voir nos réalisations
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex w-full flex-wrap items-start gap-x-8 gap-y-5 border-t border-white/[0.10] pt-10"
            variants={fadeUp}
          >
            {STATS.map(({ value, label, sub, color }) => (
              <div key={label} className="flex flex-col items-start">
                <span
                  className="block font-display text-3xl font-black leading-none sm:text-[2.2rem]"
                  style={{ color }}
                >
                  {value}
                </span>
                <span className="mt-1.5 block text-[0.68rem] font-bold uppercase tracking-widest text-white/55">
                  {label}
                </span>
                <span className="block text-[0.62rem] text-white/30">{sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
