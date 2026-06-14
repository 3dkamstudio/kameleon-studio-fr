"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition, TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
export type KameContext = "hero" | "point" | "thumbsup" | "celebrate" | "default";

interface KameProps {
  src?: string;
  context?: KameContext;
  className?: string;
  size?: number;
  priority?: boolean;
  speech?: string;
  flip?: boolean;
  isStatic?: boolean;
}

type EntryConfig = { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };
type IdleConfig  = { animate: TargetAndTransition; transition: Transition };

// ── Entrée ────────────────────────────────────────────────────────────────────
// Toutes les animations d'entrée se terminent avec rotate: 0 (droit)
const entryConfig: Record<KameContext, EntryConfig> = {
  hero: {
    initial:    { opacity: 0, y: 48, scale: 0.88 },
    animate:    { opacity: 1, y: 0,  scale: 1 },
    transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] },
  },
  point: {
    initial:    { opacity: 0, x: -40 },
    animate:    { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
  thumbsup: {
    initial:    { opacity: 0, scale: 0.65, y: 24 },
    animate:    { opacity: 1, scale: 1,    y: 0 },
    transition: { type: "spring", stiffness: 320, damping: 14, delay: 0.1 },
  },
  celebrate: {
    initial:    { opacity: 0, scale: 0.7 },
    animate:    { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 400, damping: 12 },
  },
  default: {
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ── Idle — aucune rotation pour garder Kame droit ─────────────────────────────
const idleConfig: Record<KameContext, IdleConfig> = {
  hero: {
    animate:    { y: [0, -18, 0] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
  },
  point: {
    animate:    { y: [0, -10, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  thumbsup: {
    animate:    { scale: [1, 1.07, 1], y: [0, -10, 0] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  celebrate: {
    animate:    { y: [0, -20, 0], scale: [1, 1.06, 1] },
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
  },
  default: {
    animate:    { y: [0, -12, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// ── Glow ──────────────────────────────────────────────────────────────────────
const glowStyle: Record<KameContext, string> = {
  hero:      "drop-shadow(0 28px 56px rgba(139,92,246,0.5))  drop-shadow(0 8px 18px rgba(6,182,212,0.35))",
  point:     "drop-shadow(0 24px 48px rgba(217,70,239,0.45)) drop-shadow(0 6px 14px rgba(244,63,94,0.3))",
  thumbsup:  "drop-shadow(0 24px 48px rgba(34,197,94,0.40))  drop-shadow(0 6px 14px rgba(6,182,212,0.35))",
  celebrate: "drop-shadow(0 24px 56px rgba(234,179,8,0.45))  drop-shadow(0 8px 18px rgba(249,115,22,0.4))",
  default:   "drop-shadow(0 20px 40px rgba(139,92,246,0.35))",
};

// ── Composant ─────────────────────────────────────────────────────────────────
export default function Kame({
  src,
  context = "default",
  className,
  size = 200,
  priority = false,
  speech,
  flip = false,
  isStatic = false,
}: KameProps) {
  const prefersReduced = useReducedMotion();
  const entry = entryConfig[context];
  const idle  = idleConfig[context];

  const skipIdle = isStatic || prefersReduced;

  return (
    <motion.div
      className={cn("pointer-events-none select-none relative", className)}
      style={{ width: size }}
      initial={entry.initial}
      animate={entry.animate}
      transition={entry.transition}
    >
      {/* Speech bubble optionnelle */}
      {speech && (
        <motion.div
          className="absolute -top-14 left-1/2 z-20"
          style={{ transform: "translateX(-50%)" }}
          initial={{ opacity: 0, scale: 0.7, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
        >
          <div className="relative rounded-2xl border border-white/15 bg-surface-2/90 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md whitespace-nowrap shadow-xl">
            {speech}
            <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-surface-2/90" />
          </div>
        </motion.div>
      )}

      {/* Animation idle — désactivée si isStatic ou prefers-reduced-motion */}
      <motion.div
        animate={skipIdle ? {} : idle.animate}
        transition={skipIdle ? {} : idle.transition}
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <Image
          src={src ?? "/kame.png"}
          alt="Kame, mascotte Kaméléon Studio"
          width={size}
          height={size}
          priority={priority}
          className="object-contain"
          style={{ filter: glowStyle[context] }}
        />
      </motion.div>
    </motion.div>
  );
}
