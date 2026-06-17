"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import {
  GraduationCap,
  Megaphone,
  Sparkles,
  Mic2,
  BookOpen,
  Palette,
  Bot,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import SparklesUI from "@/components/ui/Sparkles";

// ── Panel data — 8 cards, arc-en-ciel complet ────────────────────────────────
const PANELS = [
  { icon: GraduationCap, color: "#06b6d4", stat: "7j",    statLabel: "livraison max",   title: "Vidéos\npédagogiques"     },
  { icon: Megaphone,     color: "#f97316", stat: "100%",  statLabel: "sur mesure",       title: "Vidéos\ncommerciales"     },
  { icon: Sparkles,      color: "#8b5cf6", stat: "3D·IA", statLabel: "animation",        title: "Animation 3D\n& avatars"  },
  { icon: Mic2,          color: "#d946ef", stat: "Voix",  statLabel: "clonage IA",       title: "Voix-off &\nclonage vocal"},
  { icon: BookOpen,      color: "#f43f5e", stat: "BD",    statLabel: "récit visuel",     title: "Storytelling\n& BD"       },
  { icon: Palette,       color: "#eab308", stat: "DA",    statLabel: "identité",         title: "Direction\nartistique"    },
  { icon: Bot,           color: "#22c55e", stat: "IA",    statLabel: "avatar custom",    title: "Avatar IA\n& Clonage"     },
  { icon: Users,         color: "#3b82f6", stat: "ADN",   statLabel: "mémoire visuelle", title: "Vidéos\nGénéalogiques"   },
] satisfies { icon: LucideIcon; color: string; stat: string; statLabel: string; title: string }[];

// 8 positions — 4 gauche (indices pairs), 4 droite (indices impairs)
// Dans cockpit max-w-[900px] min-h-[680px]
const DESKTOP_POS: CSSProperties[] = [
  { left: 0,     top: "4%"  },  // 0 G-top
  { right: 0,    top: "4%"  },  // 1 D-top
  { left: "1%",  top: "28%" },  // 2 G-2e
  { right: "1%", top: "28%" },  // 3 D-2e
  { left: "1%",  top: "51%" },  // 4 G-3e
  { right: "1%", top: "51%" },  // 5 D-3e
  { left: 0,     top: "74%" },  // 6 G-bot
  { right: 0,    top: "74%" },  // 7 D-bot
];

// ── Variants ────────────────────────────────────────────────────────────────
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// ── HoloPanel — glassmorphism premium ────────────────────────────────────────
function HoloPanel({
  icon: Icon, color, stat, statLabel, title, delay, mobile = false,
}: {
  icon: LucideIcon; color: string; stat: string; statLabel: string;
  title: string; delay: number; mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.18, ease: "easeOut" } }}
      className="relative overflow-hidden rounded-2xl"
      style={{
        width: mobile ? "100%" : 250,
        // Gradient fond : dark + légère teinte couleur vers le bas (liquid glass)
        background: `linear-gradient(145deg, rgba(6,5,20,0.88) 0%, ${color}14 100%)`,
        border: `1px solid ${color}50`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: [
          "0 10px 30px rgba(0,0,0,0.5)",
          "inset 0 1px 0 rgba(255,255,255,0.13)",  // catch-light haut
          "inset 0 0 0 1px rgba(255,255,255,0.06)", // double border glass
          `0 0 24px ${color}20`,                    // halo coloré statique
        ].join(", "),
      }}
    >
      {/* Shimmer diagonal statique — z:-1 pour rester sous le contenu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)",
          zIndex: -1,
        }}
      />

      {/* Top accent 3px */}
      <div
        className="h-[3px]"
        style={{ background: `linear-gradient(90deg, ${color}ff, ${color}66, transparent)` }}
      />

      <div className="relative p-5">
        {/* Icon + stat */}
        <div className="mb-3 flex items-center justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${color}20`, border: `1px solid ${color}45` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="text-right">
            <span
              className="block font-display font-black leading-none"
              style={{ color, fontSize: mobile ? "1.4rem" : "1.75rem" }}
            >
              {stat}
            </span>
            <span className="block text-[0.5rem] font-bold uppercase tracking-widest text-white/45">
              {statLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <p
          className="font-bold leading-snug text-white/88"
          style={{ whiteSpace: "pre-line", fontSize: mobile ? "0.72rem" : "0.78rem" }}
        >
          {title}
        </p>
      </div>

      {/* Corner HUD dots */}
      <div className="absolute bottom-2.5 right-3 flex gap-0.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-[3px] w-[3px] rounded-full" style={{ background: `${color}60` }} />
        ))}
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute inset-x-0 bottom-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
      />
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const kameY  = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [20, -60]);
  const leftY  = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [12, -35]);
  const rightY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [18, -45]);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden px-6 py-28">

      {/* Background halos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brand-fuchsia/[0.12] blur-[100px]" />
        <div className="absolute -left-24 bottom-0 h-[450px] w-[450px] rounded-full bg-brand-cyan/[0.12] blur-[90px]" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/[0.06] blur-[130px]" />
      </div>

      <SparklesUI />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Header ── */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <span className="badge-pill badge-fuchsia mb-8">✦ Le Cockpit Kaméléon</span>
          </motion.div>
          <motion.h2 className="mb-3 tracking-tight" variants={fadeUp}>
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.75rem]">
              Un studio complet,
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-warm sm:text-4xl md:text-[2.75rem]">
              pour chaque besoin
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-1 text-[0.82rem] font-medium tracking-wide text-white/30">
            Du script à la livraison finale — tout sur mesure, en quelques jours.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-lg text-[0.92rem] font-medium leading-relaxed text-white/55"
          >
            Production 100&nbsp;% IA — vidéo, animation 3D, identité visuelle.
            De l&apos;idée à la livraison, en quelques jours.
          </motion.p>
        </motion.div>

        {/* ── COCKPIT desktop — 4 panels par côté ── */}
        <div className="mx-auto hidden max-w-[900px] lg:block">
          <div className="relative flex min-h-[680px] items-center justify-center">

            {/* Halo radial derrière Kame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.20) 0%, rgba(217,70,239,0.08) 42%, transparent 68%)" }}
            />
            {/* Rings décoratifs */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ border: "1px solid rgba(139,92,246,0.20)" }} />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ border: "1px solid rgba(217,70,239,0.12)" }} />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ border: "1px solid rgba(139,92,246,0.05)" }} />

            {/* Panels gauche — indices 0,2,4,6 */}
            <motion.div style={{ y: leftY }} className="absolute inset-0 pointer-events-none">
              {([0, 2, 4, 6] as const).map(i => (
                <div key={i} className="absolute pointer-events-auto" style={DESKTOP_POS[i]}>
                  <HoloPanel {...PANELS[i]} delay={i * 0.06} />
                </div>
              ))}
            </motion.div>

            {/* Panels droite — indices 1,3,5,7 */}
            <motion.div style={{ y: rightY }} className="absolute inset-0 pointer-events-none">
              {([1, 3, 5, 7] as const).map(i => (
                <div key={i} className="absolute pointer-events-auto" style={DESKTOP_POS[i]}>
                  <HoloPanel {...PANELS[i]} delay={0.04 + i * 0.06} />
                </div>
              ))}
            </motion.div>

            {/* Kame au centre — z-10, déborde légèrement sur panels */}
            <motion.div style={{ y: kameY }} className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.80 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={prefersReduced ? "" : "animate-kame-float"}
              >
                <Image
                  src="/kame-cockpit.webp"
                  alt="Kame, mascotte Kaméléon Studio"
                  width={460}
                  height={460}
                  priority
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 0 80px rgba(139,92,246,0.65)) drop-shadow(0 0 40px rgba(217,70,239,0.35))" }}
                />
              </motion.div>
              {/* Sol lumineux */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 left-1/2 h-14 w-80 -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "rgba(139,92,246,0.35)" }}
              />
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE — grille 2×4 ── */}
        <div className="flex flex-col items-center gap-10 lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={prefersReduced ? "" : "animate-kame-float"}
          >
            <Image
              src="/kame-cockpit.webp"
              alt="Kame, mascotte Kaméléon Studio"
              width={240}
              height={240}
              className="object-contain"
              style={{ filter: "drop-shadow(0 0 40px rgba(139,92,246,0.55))" }}
            />
          </motion.div>
          <div className="grid w-full grid-cols-2 gap-3">
            {PANELS.map((p, i) => (
              <HoloPanel key={p.title} {...p} delay={i * 0.06} mobile />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #d946ef, #f43f5e)",
              boxShadow: "0 4px 20px rgba(217,70,239,0.3)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 36px rgba(217,70,239,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            Démarrer un projet
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
