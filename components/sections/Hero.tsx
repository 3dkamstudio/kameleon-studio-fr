"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Sparkles from "@/components/ui/Sparkles";

const STATS = [
  { numeric: 7,   suffix: "j",  label: "Délai de livraison",  sub: "maximum",               color: "#06b6d4", size: "lg" as const },
  { numeric: 7,   suffix: "+",  label: "Types de contenus",   sub: "au catalogue",          color: "#eab308", size: "sm" as const },
  { numeric: 100, suffix: "%",  label: "Sur mesure",          sub: "du script au rendu",    color: "#d946ef", size: "lg" as const },
  { numeric: 0,   suffix: "",   label: "Compétence requise",  sub: "de votre côté",         color: "#22c55e", size: "sm" as const },
];

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      y:       { type: "spring", stiffness: 300, damping: 26, mass: 0.9 },
      opacity: { duration: 0.45, ease: "easeOut" },
    },
  },
};

function StatNumber({ numeric, suffix, color, size }: { numeric: number; suffix: string; color: string; size: "lg" | "sm" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const spring = useSpring(0, { stiffness: 60, damping: 15, mass: 0.8 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView && numeric > 0) { spring.set(numeric); }
  }, [isInView, spring, numeric]);

  return (
    <motion.span
      ref={ref}
      className={`block font-display font-black leading-none ${
        size === "lg" ? "text-4xl sm:text-[2.6rem]" : "text-3xl sm:text-[2.2rem]"
      }`}
      style={{ color, textShadow: `0 0 18px ${color}cc, 0 0 40px ${color}66` }}
    >
      {numeric === 0 ? `0${suffix}` : display}
    </motion.span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY       = useTransform(scrollY, [0, 800], [0,  -60]);
  const halosY    = useTransform(scrollY, [0, 800], [0, -200]);
  const sparklesY = useTransform(scrollY, [0, 800], [0, -380]);

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-center md:min-h-screen max-md:pt-16"
    >

      {/* ══════════════════════════════════════════════════════════════════
          IMAGE PLEIN-CADRE — DA Kaméléon Studio
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Mobile : bannière verticale 9:16 */}
        <Image
          src="/banner-mobile.webp"
          alt="Kaméléon Studio — Studio de production créative par IA"
          fill
          priority
          quality={90}
          className="object-cover object-center md:hidden"
        />
        {/* Desktop : bannière horizontale */}
        <Image
          src="/banner-wide.webp"
          alt="Kaméléon Studio — Studio de production créative par IA"
          fill
          priority
          quality={90}
          className="hidden object-cover md:block"
          style={{ objectPosition: "62% center" }}
        />
      </motion.div>

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

      <motion.div style={{ y: halosY }}>
        <div className="pointer-events-none absolute -left-24 top-20 z-[2] h-[400px] w-[400px] rounded-full blur-[80px]"
          style={{ background: "rgba(217,70,239,0.12)" }} />
        <div className="pointer-events-none absolute right-0 top-0 z-[2] h-[320px] w-[320px] rounded-full blur-[70px]"
          style={{ background: "rgba(6,182,212,0.08)" }} />
      </motion.div>

      <motion.div className="absolute inset-0 z-[3]" style={{ y: sparklesY }}>
        <Sparkles />
      </motion.div>


      {/* ══════════════════════════════════════════════════════════════════
          CONTENU HÉRO
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-6 pb-28 sm:py-40">
        <motion.div
          className="flex w-full max-w-2xl flex-col items-start max-md:items-center max-md:text-center"
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
              style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)" }}>
              On s&apos;adapte à vous.
            </span>
            <span className="block font-display font-black leading-[1.04] text-gradient-warm"
              style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)" }}>
              On crée ce que vous imaginez.
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            className="mb-10 max-w-lg text-base leading-relaxed text-white/60 sm:text-[1.08rem]"
            variants={fadeUp}
          >
            Notre super-pouvoir&nbsp;: s&apos;adapter à n&apos;importe quel univers, style ou budget.{" "}
            <span className="font-semibold text-white/88">
              Demandez à Kame, il ne ment jamais !
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-14 flex w-full flex-col gap-3 sm:w-auto sm:flex-row max-md:hidden"
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
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.18] bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/[0.10] hover:text-white/90"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="h-4 w-4 fill-white/45 transition-all group-hover:fill-white/75" />
              Voir nos réalisations
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex w-full flex-wrap items-start gap-x-8 gap-y-5 border-t border-white/[0.20] pt-10 max-md:justify-center"
            variants={fadeUp}
          >
            {STATS.map(({ numeric, suffix, label, sub, color, size }) => (
              <div key={label}
                className="relative flex flex-col items-start rounded-2xl px-3 py-2 max-md:items-center"
                style={{ background: `radial-gradient(ellipse at 50% 20%, ${color}20 0%, transparent 68%)` }}>
                <StatNumber numeric={numeric} suffix={suffix} color={color} size={size} />
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
