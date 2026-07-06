"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ── Hero "salle du trône" — toute la boldness de la page vit ici ──────────────
export default function HeroRoyal() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center">

      {/* Halos de fond */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(217,70,239,0.14) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full blur-[110px]"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* ── Ring-couronne + Kame roi ─────────────────────────────────────── */}
        <div className="relative mb-10 h-[300px] w-[300px] sm:h-[380px] sm:w-[380px]">
          {/* Glow diffus derrière le ring */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full opacity-35 blur-2xl animate-[spin_18s_linear_infinite]"
            style={{ background: "conic-gradient(from 0deg, #d946ef, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6, #d946ef)" }}
          />
          {/* Ring arc-en-ciel net */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-[spin_18s_linear_infinite]"
            style={{
              background: "conic-gradient(from 0deg, #d946ef, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6, #d946ef)",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 9px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 9px))",
            }}
          />
          {/* Kame roi — flottement */}
          <motion.div
            className="absolute inset-4 flex items-end justify-center"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/kame-roi.webp"
              alt="Kame, le roi de l'IA — mascotte King of IA couronnée"
              width={310}
              height={350}
              priority
              className="object-contain drop-shadow-[0_0_35px_rgba(217,70,239,0.35)]"
            />
          </motion.div>
        </div>

        {/* ── Promesse ─────────────────────────────────────────────────────── */}
        <motion.h1
          className="mb-10 max-w-3xl font-display font-black leading-[1.08] tracking-tight"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="block text-4xl text-white sm:text-5xl md:text-6xl">
            L&apos;IA au service de ton contenu.
          </span>
          <span
            className="mt-3 block text-2xl sm:text-3xl md:text-4xl"
            style={{
              background: "linear-gradient(90deg, #d946ef 0%, #f97316 25%, #eab308 45%, #06b6d4 70%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vidéo, BD, web, formation — un seul royaume.
          </span>
        </motion.h1>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-black text-white transition-transform hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #d946ef, #8b5cf6)",
              boxShadow: "0 4px 30px rgba(217,70,239,0.45)",
            }}
          >
            Réserver mon diagnostic gratuit — 15 min
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.11]"
          >
            Voir les réalisations
          </Link>
        </motion.div>
        <motion.p
          className="mt-4 text-xs text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Sans engagement · on identifie ensemble ce qu&apos;il te faut
        </motion.p>

      </div>
    </section>
  );
}
