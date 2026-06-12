"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition, TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
export type KameContext = "hero" | "point" | "thumbsup" | "default";

interface KameProps {
  /** Pose simulée par CSS/Framer Motion selon le contexte de la section */
  context?: KameContext;
  /** Classes Tailwind pour le positionnement externe */
  className?: string;
  /** Taille en pixels (largeur — hauteur auto) */
  size?: number;
  /** Charger en priorité (sections above the fold) */
  priority?: boolean;
}

// ── Animation configs ─────────────────────────────────────────────────────────

type EntryConfig = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
};

type IdleConfig = {
  animate: TargetAndTransition;
  transition: Transition;
};

// Type 1 — Apparition : animation d'entrée selon le contexte
const entryConfig: Record<KameContext, EntryConfig> = {
  hero: {
    initial: { opacity: 0, y: 36, scale: 0.92 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
  point: {
    initial: { opacity: 0, x: 40, rotate: 0 },
    animate: { opacity: 1, x: 0, rotate: 12 },
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
  thumbsup: {
    initial: { opacity: 0, scale: 0.7, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { type: "spring", stiffness: 300, damping: 14, delay: 0.1 },
  },
  default: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// Type 3 — Transition : animation idle continue (flottement, oscillation, pulse)
const idleConfig: Record<KameContext, IdleConfig> = {
  // Flottement doux + légère bascule gauche/droite
  hero: {
    animate: { y: [0, -14, 0], rotate: [-2, 2, -2] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
  },
  // Oscillation vers le haut/bas + légère rotation pour "regarder" vers un élément
  point: {
    animate: { y: [0, -7, 0], rotate: [12, 15, 12] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  // Pulse scale + légère lévitation — célébration
  thumbsup: {
    animate: { scale: [1, 1.06, 1], y: [0, -9, 0] },
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
  // Flottement neutre
  default: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
  },
};

// Drop-shadow coloré selon le contexte — renforce l'ambiance lumière de studio
const glowStyle: Record<KameContext, string> = {
  hero:      "drop-shadow(0 24px 48px rgba(139, 92, 246, 0.45)) drop-shadow(0 8px 16px rgba(6, 182, 212, 0.3))",
  point:     "drop-shadow(0 20px 40px rgba(217, 70, 239, 0.4)) drop-shadow(0 6px 12px rgba(244, 63, 94, 0.25))",
  thumbsup:  "drop-shadow(0 20px 40px rgba(34, 197, 94, 0.35)) drop-shadow(0 6px 12px rgba(6, 182, 212, 0.3))",
  default:   "drop-shadow(0 16px 32px rgba(139, 92, 246, 0.3))",
};

// ── Composant ─────────────────────────────────────────────────────────────────
export default function Kame({
  context = "default",
  className,
  size = 200,
  priority = false,
}: KameProps) {
  const prefersReduced = useReducedMotion();
  const entry = entryConfig[context];
  const idle = idleConfig[context];

  return (
    // Conteneur de positionnement + entrée
    <motion.div
      className={cn("pointer-events-none select-none", className)}
      initial={entry.initial}
      animate={entry.animate}
      transition={entry.transition}
    >
      {/* Animation idle continue (désactivée si prefers-reduced-motion) */}
      <motion.div
        animate={prefersReduced ? {} : idle.animate}
        transition={prefersReduced ? {} : idle.transition}
      >
        <Image
          src="/kame.png"
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
