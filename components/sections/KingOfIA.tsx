"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle, Loader2, Mail, Star, Zap, Sparkles } from "lucide-react";

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const MODULES = [
  {
    num: "01", color: "#06b6d4", glow: "rgba(6,182,212,0.38)",
    title: "L'Art du Prompt & Storytelling",
    short: "Prompt &\nStorytelling",
    tools: ["ChatGPT", "Claude", "Storytelling"],
    image: "/module-storytelling.webp",
    tier: "Starter & Pro", exclusive: false,
    price: { regular: 197, launch: 147 },
    desc: "Transformez chaque idée en script cinématographique percutant. Apprenez à structurer un récit visuel qui captive et convertit.",
  },
  {
    num: "02", color: "#8b5cf6", glow: "rgba(139,92,246,0.38)",
    title: "Création d'Images 3D",
    short: "Création\nd'Images 3D",
    tools: ["Nano Banana", "Genspark", "ChatGPT"],
    image: "/module-motion-design.webp",
    tier: "Starter & Pro", exclusive: false,
    price: { regular: 247, launch: 197 },
    desc: "Générez des visuels 3D de qualité cinématographique et intégrez une logique motion design dès la création.",
  },
  {
    num: "03", color: "#d946ef", glow: "rgba(217,70,239,0.38)",
    title: "Synthèse Vocale & Timing",
    short: "Synthèse Vocale\n& Timing",
    tools: ["ElevenLabs", "Clonage de voix"],
    image: "/module-synthese-vocale.webp",
    tier: "Starter & Pro", exclusive: false,
    price: { regular: 197, launch: 147 },
    desc: "Créez des voix-off professionnelles, clonez votre voix et maîtrisez le timing audio pour un rendu parfaitement rythmé.",
  },
  {
    num: "04", color: "#f43f5e", glow: "rgba(244,63,94,0.38)",
    title: "Animations & Lip-Sync",
    short: "Animations &\nLip-Sync",
    tools: ["Kling AI", "Lip-Sync", "Motion control"],
    image: "/module-animations.webp",
    tier: "Starter & Pro", exclusive: false,
    price: { regular: 297, launch: 247 },
    desc: "Animez vos personnages et synchronisez les lèvres à la voix pour un résultat hyper-réaliste et immersif.",
  },
  {
    num: "05", color: "#f97316", glow: "rgba(249,115,22,0.38)",
    title: "Montage & Design Final",
    short: "Montage &\nDesign Final",
    tools: ["Filmora"],
    image: "/module-montage.webp",
    tier: "Starter & Pro", exclusive: false,
    price: { regular: 197, launch: 147 },
    desc: "Assemblez, mixez et exportez vos vidéos finales avec une qualité de production professionnelle, prêtes à diffuser.",
  },
  {
    num: "06", color: "#22c55e", glow: "rgba(34,197,94,0.38)",
    title: "Création de Musique IA",
    short: "Création de\nMusique IA",
    tools: ["Suno", "ChatGPT"],
    image: "/module-music.webp",
    tier: "Pro Exclusif", exclusive: true,
    price: { regular: 247, launch: 197 },
    desc: "Composez des musiques originales, jingles et ambiances sonores sur mesure grâce à l'IA générative.",
  },
  {
    num: "07", color: "#8b5cf6", glow: "rgba(139,92,246,0.45)",
    title: "Assistant IA Personnel",
    short: "Assistant IA\nPersonnel",
    tools: ["GPTs", "Claude"],
    image: "/module-assistant-ia.webp",
    tier: "Pro Exclusif", exclusive: true,
    price: { regular: 397, launch: 297 },
    desc: "Créez des agents IA sur mesure pour automatiser votre production de contenu et décupler votre créativité.",
  },
  {
    num: "08", color: "#d946ef", glow: "rgba(217,70,239,0.45)",
    title: "Automatisation du Workflow IA",
    short: "Automatisation\nWorkflow IA",
    tools: ["Claude", "GPTs"],
    image: "/module-workflow-ia.webp",
    tier: "Pro Exclusif", exclusive: true,
    price: { regular: 497, launch: 397 },
    desc: "Automatisez votre workflow créatif grâce à des pipelines IA intelligents et gagnez un temps précieux.",
  },
] as const;

const STARTER_FEAT = [
  "Modules 01 à 05 — accès immédiat",
  "Maîtrise les outils IA de A à Z",
  "Crée tes premières vidéos animées 3D professionnelles",
  "Workflow complet du script au montage final",
  "Accès à vie + mises à jour incluses",
];
const PRO_FEAT = [
  "Tout le Starter inclus (modules 01-05)",
  "Modules exclusifs 06, 07, 08 & 09",
  "Crée ton premier podcast en vidéo IA",
  "Crée ta propre musique IA pour tes productions",
  "Conçois ton assistant IA personnalisé",
  "Automatise ton workflow de production",
  "Accès à vie + mises à jour incluses",
];

// ── NeonBorder — bordure néon tournante au hover ───────────────────────────────
function NeonBorder({ active, color, children }: { active: boolean; color: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ padding: "1.5px" }}>
      {/* Neon statique visible en permanence */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}55, ${color}18, ${color}40)`,
          opacity: active ? 0 : 1,
        }}
      />
      {/* Conic gradient — toujours en DOM, opacity pilote la visibilité */}
      <motion.div
        className="absolute inset-[-140%] rounded-full"
        style={{ background: `conic-gradient(from 0deg, transparent 0%, ${color}70 18%, ${color} 30%, ${color}ff 36%, ${color}70 48%, transparent 60%)` }}
        animate={{ opacity: active ? 1 : 0, rotate: 360 }}
        transition={{ opacity: { duration: 0.15 }, rotate: { duration: 1.8, repeat: Infinity, ease: "linear" } }}
      />
      <div className="relative" style={{ borderRadius: "calc(1rem - 1px)" }}>
        {children}
      </div>
    </div>
  );
}

// ── ModuleCard ────────────────────────────────────────────────────────────────
function ModuleCard({ mod }: { mod: typeof MODULES[number] }) {
  const [hovered, setHovered] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) { return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(circle 130px at ${x}px ${y}px, ${mod.color}30, transparent 75%)`;
  }, [mod.color]);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -14, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group cursor-default"
    >
      {/* Outer glow — toujours visible, s'intensifie au hover */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? `0 0 35px ${mod.color}55, 0 0 70px ${mod.color}28, 0 20px 60px rgba(0,0,0,0.5)`
            : `0 0 18px ${mod.color}28, 0 4px 24px rgba(0,0,0,0.35)`,
        }}
        transition={{ duration: 0.35 }}
      />

      <NeonBorder active={hovered} color={mod.color}>
        <div
          className="overflow-hidden rounded-[calc(1rem-1px)]"
          style={{
            background: "rgba(6,5,18,0.78)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          {/* ── Zone image ── */}
          <div className="relative h-44 overflow-hidden">
            {/* Spotlight curseur */}
            <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200" style={{ opacity: hovered ? 1 : 0 }} />

            {/* Image avec zoom */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.09 : 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Image
                src={mod.image}
                alt={mod.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>

            {/* Gradient fondu bas */}
            <div
              className="absolute inset-0 z-10"
              style={{ background: `linear-gradient(to bottom, ${mod.color}06 0%, rgba(6,5,18,0.92) 100%)` }}
            />

            {/* Teinte couleur au hover */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{ background: mod.color }}
              animate={{ opacity: hovered ? 0.08 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Ligne de scan qui balaye */}
            <motion.div
              className="absolute inset-x-0 z-20 h-[2px]"
              style={{ top: "-2px", background: `linear-gradient(90deg, transparent, ${mod.color}dd, transparent)` }}
              animate={hovered ? { y: [0, 182], opacity: [0, 1, 1, 0] } : { y: 0, opacity: 0 }}
              transition={hovered ? { duration: 1.1, repeat: Infinity, ease: "linear" } : {}}
            />

            {/* Coins HUD */}
            {[["left-2 top-2", "borderLeft", "borderTop"], ["right-2 top-2", "borderRight", "borderTop"], ["left-2 bottom-2", "borderLeft", "borderBottom"], ["right-2 bottom-2", "borderRight", "borderBottom"]].map(([pos, b1, b2], i) => (
              <div
                key={i}
                className={`pointer-events-none absolute z-20 h-3.5 w-3.5 ${pos}`}
                style={{ [b1]: `1.5px solid ${mod.color}90`, [b2]: `1.5px solid ${mod.color}90` }}
              />
            ))}

            {/* Code HUD top-left */}
            <div className="absolute left-3 top-2.5 z-20 font-mono text-[0.5rem] font-black uppercase tracking-widest" style={{ color: `${mod.color}bb` }}>
              MOD_{mod.num}
            </div>

            {/* Badge/lock top-right */}
            <div className="absolute right-3 top-2.5 z-20">
              {mod.exclusive ? (
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[0.52rem] font-black tracking-widest"
                  style={{ background: `${mod.color}22`, border: `1px solid ${mod.color}60`, color: mod.color, boxShadow: `0 0 8px ${mod.color}70` }}
                >
                  ★ PRO
                </span>
              ) : null}
            </div>
          </div>

          {/* ── Zone contenu ── */}
          <div
            className="relative p-5"
            style={{ background: `linear-gradient(145deg, rgba(5,4,16,0.96) 0%, ${mod.color}05 100%)` }}
          >
            {/* Filet accent haut */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${mod.color}60, transparent)` }}
            />

            {/* Badge tier */}
            <span
              className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[0.58rem] font-black uppercase tracking-widest"
              style={{
                background: mod.exclusive ? "rgba(139,92,246,0.16)" : `${mod.color}12`,
                border: `1px solid ${mod.exclusive ? "rgba(139,92,246,0.42)" : `${mod.color}38`}`,
                color: mod.exclusive ? "#a78bfa" : mod.color,
              }}
            >
              {mod.exclusive ? "★ Pro Exclusif" : "Starter & Pro"}
            </span>

            {/* Titre */}
            <h4
              className="mb-2 font-display text-[0.9rem] font-black leading-snug text-white"
              style={{ whiteSpace: "pre-line" }}
            >
              {mod.short}
            </h4>

            {/* Description */}
            {mod.desc && (
              <p className="mb-3 text-[0.7rem] leading-relaxed text-white/45">{mod.desc}</p>
            )}

            {/* Outils */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {mod.tools.map(tool => (
                <span
                  key={tool}
                  className="rounded-md px-2 py-0.5 text-[0.6rem] font-semibold"
                  style={{ background: `${mod.color}14`, color: `${mod.color}cc`, border: `1px solid ${mod.color}2a` }}
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Prix individuel */}
            <div className="mt-3 rounded-xl border px-3 py-2" style={{ borderColor: `${mod.color}28`, background: `${mod.color}08` }}>
              <div className="flex items-center justify-between">
                <span className="text-[0.58rem] font-semibold uppercase tracking-widest" style={{ color: `${mod.color}70` }}>Valeur</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[0.62rem] text-white/28 line-through">{mod.price.regular}€</span>
                  <span className="font-display text-base font-black leading-none" style={{ color: mod.color }}>{mod.price.launch}€</span>
                </div>
              </div>
            </div>

            {/* Bottom glow line hover */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${mod.color}, transparent)` }}
              animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </NeonBorder>
    </motion.div>
  );
}

// ── Données fixes SSR-safe ────────────────────────────────────────────────────
// Particules montantes
const SPARKS_A = [
  { x: 10, y: 80, s: 3, d: 0,   dur: 2.6 }, { x: 28, y: 60, s: 2, d: 0.5, dur: 3.1 },
  { x: 55, y: 90, s: 4, d: 1.0, dur: 2.3 }, { x: 72, y: 70, s: 2, d: 1.6, dur: 2.9 },
  { x: 88, y: 85, s: 3, d: 0.8, dur: 3.4 }, { x: 42, y: 75, s: 2, d: 0.3, dur: 2.1 },
  { x: 65, y: 95, s: 3, d: 1.3, dur: 2.7 }, { x: 18, y: 92, s: 2, d: 1.8, dur: 3.0 },
];
const SPARKS_B = [
  { x: 8,  y: 78, s: 3, d: 0.2, dur: 2.8 }, { x: 32, y: 88, s: 2, d: 0.7, dur: 3.2 },
  { x: 58, y: 65, s: 4, d: 1.2, dur: 2.4 }, { x: 78, y: 82, s: 2, d: 0,   dur: 2.6 },
  { x: 92, y: 70, s: 3, d: 1.5, dur: 3.5 }, { x: 45, y: 95, s: 2, d: 0.4, dur: 2.0 },
  { x: 20, y: 72, s: 3, d: 1.1, dur: 2.9 }, { x: 68, y: 88, s: 2, d: 0.9, dur: 3.1 },
];
// Scintillements ✦ positionnés sur la carte
const GLIMMERS_A = [
  { x: 6,  y: 8,  sz: 13, d: 0,    dur: 1.9 }, { x: 88, y: 5,  sz: 9,  d: 0.7, dur: 2.2 },
  { x: 22, y: 20, sz: 11, d: 1.4,  dur: 1.7 }, { x: 70, y: 14, sz: 7,  d: 0.3, dur: 2.5 },
  { x: 48, y: 4,  sz: 10, d: 1.0,  dur: 2.0 }, { x: 95, y: 42, sz: 12, d: 1.7, dur: 1.8 },
  { x: 3,  y: 58, sz: 8,  d: 0.5,  dur: 2.3 }, { x: 55, y: 10, sz: 14, d: 2.0, dur: 1.6 },
  { x: 80, y: 62, sz: 9,  d: 0.9,  dur: 2.1 }, { x: 35, y: 72, sz: 11, d: 1.2, dur: 1.9 },
];
const GLIMMERS_B = [
  { x: 5,  y: 6,  sz: 11, d: 0.2,  dur: 2.0 }, { x: 92, y: 10, sz: 13, d: 0.9, dur: 1.7 },
  { x: 18, y: 28, sz: 8,  d: 1.5,  dur: 2.3 }, { x: 65, y: 8,  sz: 10, d: 0.4, dur: 2.1 },
  { x: 44, y: 3,  sz: 12, d: 1.1,  dur: 1.8 }, { x: 97, y: 55, sz: 9,  d: 1.8, dur: 2.4 },
  { x: 2,  y: 48, sz: 14, d: 0.6,  dur: 1.6 }, { x: 58, y: 18, sz: 8,  d: 2.1, dur: 2.2 },
  { x: 76, y: 68, sz: 11, d: 1.0,  dur: 1.9 }, { x: 30, y: 78, sz: 9,  d: 0.3, dur: 2.5 },
];

// ── OfferCard — plein cadre, électrique, lumineux ────────────────────────────
function OfferCard({ title, color, glow: _glow, features, recommended, delay = 0, image, sparks, glimmers, priceLaunch, priceFull, valueIndividual, savings }: {
  title: string; color: string; glow: string; features: string[];
  recommended?: boolean; delay?: number; image: string;
  sparks: typeof SPARKS_A;
  glimmers: typeof GLIMMERS_A;
  priceLaunch: number; priceFull: number; valueIndividual: number; savings: number;
}) {
  const [hovered, setHovered] = useState(false);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotRef.current) { return; }
    const rect = e.currentTarget.getBoundingClientRect();
    spotRef.current.style.background = `radial-gradient(circle 220px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${color}28, transparent 68%)`;
  }, [color]);

  return (
    <motion.div
      className="relative flex flex-1 flex-col"
      style={{ willChange: "transform" }}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, transition: { duration: 0.22 } }}
    >
      {/* ── Badge recommandé ── */}
      {recommended && (
        <div className="absolute -top-6 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap">
          <motion.div
            className="animate-koi-recommended flex items-center gap-2 rounded-full px-5 py-1.5 text-[0.65rem] font-black uppercase tracking-widest text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 0 28px rgba(217,70,239,0.75)" }}
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            Recommandé
          </motion.div>
        </div>
      )}

      {/* ── Particules flottantes ── */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-3xl">
        {sparks.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: color, boxShadow: `0 0 ${p.s * 5}px ${color}ee` }}
            animate={{ y: [0, -35, -70], opacity: [0, 0.9, 0], scale: [0.4, 1.3, 0.2] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* ── Scintillements ✦ ── */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-3xl">
        {glimmers.map((g, i) => (
          <motion.span
            key={i}
            className="absolute select-none font-black leading-none"
            style={{ left: `${g.x}%`, top: `${g.y}%`, fontSize: g.sz, color }}
            animate={{ opacity: [0, 1, 0.7, 0], scale: [0.3, 1.2, 0.9, 0.3], rotate: [0, 15, -10, 0] }}
            transition={{ duration: g.dur, delay: g.d, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* ── Halo glow externe pulsé ── */}
      <div
        className="animate-koi-halo pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          boxShadow: hovered
            ? `0 0 70px ${color}90, 0 0 130px ${color}50, 0 0 200px ${color}28`
            : `0 0 35px ${color}60, 0 0 80px ${color}28`,
          transition: "box-shadow 0.4s ease",
        }}
      />

      {/* ── Carte principale (bordure conic tournante) ── */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl" style={{ padding: "2px" }}>
        <motion.div
          className="absolute inset-[-130%] rounded-full"
          style={{ background: `conic-gradient(from 0deg, transparent 0%, ${color}45 16%, ${color}cc 26%, ${color}ff 32%, ${color}cc 38%, ${color}45 48%, transparent 60%)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* ── Corps plein cadre ── */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-[calc(1.5rem-1px)]" style={{ minHeight: "580px" }}>

          {/* Image plein fond */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </motion.div>

          {/* Overlays graduels */}
          {/* Mobile : overlay allégé pour voir l'image */}
          <div className="absolute inset-0 z-10 sm:hidden" style={{ background: `linear-gradient(to top, rgba(3,2,14,0.99) 0%, rgba(3,2,14,0.95) 32%, rgba(3,2,14,0.55) 52%, rgba(3,2,14,0.08) 70%, transparent 100%)` }} />
          {/* Desktop : overlay sombre original */}
          <div className="absolute inset-0 z-10 hidden sm:block" style={{ background: `linear-gradient(to top, rgba(3,2,14,0.99) 0%, rgba(3,2,14,0.97) 20%, rgba(3,2,14,0.88) 42%, rgba(3,2,14,0.50) 62%, rgba(3,2,14,0.10) 80%, transparent 100%)` }} />
          {/* Teinture couleur latérale */}
          <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(135deg, ${color}10 0%, transparent 55%, ${color}08 100%)` }} />
          {/* Vignette hover */}
          <motion.div className="absolute inset-0 z-10" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}18 0%, transparent 65%)` }} />

          {/* Spotlight curseur */}
          <div ref={spotRef} className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }} />

          {/* Scan line sur toute la hauteur */}
          <motion.div
            className="absolute inset-x-0 z-20 h-[2px]"
            style={{ top: "-2px", background: `linear-gradient(90deg, transparent 5%, ${color}ee, ${color}ff, ${color}ee, transparent 95%)`, filter: "blur(0.5px)" }}
            animate={hovered ? { y: [0, 592], opacity: [0, 1, 1, 0] } : { y: 0, opacity: 0 }}
            transition={hovered ? { duration: 1.1, repeat: Infinity, ease: "linear" } : {}}
          />

          {/* Coins HUD */}
          {([
            { cls: "left-3 top-3",    bl: "borderLeft", bt: "borderTop"    },
            { cls: "right-3 top-3",   bl: "borderRight", bt: "borderTop"   },
            { cls: "left-3 bottom-3", bl: "borderLeft",  bt: "borderBottom"},
            { cls: "right-3 bottom-3",bl: "borderRight", bt: "borderBottom"},
          ]).map(({ cls, bl, bt }, i) => (
            <motion.div
              key={i}
              className={`pointer-events-none absolute z-20 h-5 w-5 ${cls}`}
              style={{ [bl]: `2px solid ${color}`, [bt]: `2px solid ${color}` }}
              animate={{ opacity: hovered ? 1 : 0.45 }}
              transition={{ duration: 0.3 }}
            />
          ))}

          {/* Code HUD haut-gauche */}
          <div className="absolute left-4 top-3 z-20 font-mono text-[0.52rem] font-black uppercase tracking-widest" style={{ color: `${color}cc` }}>
            {recommended ? "◈ KOI_PRO_V2" : "◈ KOI_STR_V2"}
          </div>

          {/* Badge accès immédiat — haut-droit */}
          <div className="absolute right-4 top-3 z-20">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.55rem] font-black uppercase tracking-widest"
              style={{ background: `${color}18`, border: `1px solid ${color}55`, color, backdropFilter: "blur(8px)", boxShadow: `0 0 10px ${color}60` }}
            >
              <Zap className="h-2.5 w-2.5" />
              Accès immédiat
            </span>
          </div>

          {/* ── Contenu overlayé en bas ── */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col p-6 sm:p-8">
            {/* Ligne déco */}
            <div className="mb-4 h-px" style={{ background: `linear-gradient(90deg, ${color}90, ${color}50, transparent)` }} />

            <p className="mb-1 text-[0.58rem] font-black uppercase tracking-[0.18em]" style={{ color }}>Formation King of IA</p>
            <h3 className="mb-4 font-display text-2xl font-black leading-tight text-white drop-shadow-lg sm:text-3xl">{title}</h3>

            {/* Prix lancement */}
            <div className="mb-5">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="font-display text-xl font-black text-white/30 line-through">{priceFull}€</span>
                <span className="font-display text-4xl font-black leading-none" style={{ color }}>{priceLaunch}€</span>
                <span className="text-sm font-semibold text-white/45">lancement</span>
              </div>
              <p className="text-[0.65rem] text-white/35">
                Valeur séparée : {valueIndividual}€ · Économie : {savings}€
              </p>
            </div>

            {/* Features */}
            <ul className="mb-6 flex flex-col gap-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-white/80">
                  <span
                    className="mt-0.5 shrink-0 text-sm leading-none"
                    style={{ color }}
                  >
                    ✦
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.a
              href="#waitlist-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${color}dd, ${color})`,
                boxShadow: `0 4px 28px ${color}55`,
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 8px 48px ${color}90` }}
              whileTap={{ scale: 0.96 }}
            >
              Je rejoins la liste d&apos;attente
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function KingOfIA() {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressInView = useInView(progressRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) { return; }
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xykalpon", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "Inscription liste d'attente — King of IA" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="king-of-ia" className="relative px-6 py-28 sm:py-36">

      {/* ── Fond ──────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[700px] w-[700px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, rgba(217,70,239,0.13) 0%, transparent 70%)" }} />
        <div className="absolute -right-40 top-1/3 h-[600px] w-[600px] rounded-full blur-[130px]" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full blur-[110px]" style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
        <motion.div className="mb-24 flex flex-col items-center text-center" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <motion.div variants={fadeUp}>
            <motion.div
              className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[0.68rem] font-black uppercase tracking-widest text-white"
              style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.18), rgba(139,92,246,0.18))", border: "1px solid rgba(217,70,239,0.42)" }}
              animate={{ boxShadow: ["0 0 10px rgba(217,70,239,0.22)", "0 0 32px rgba(217,70,239,0.7)", "0 0 10px rgba(217,70,239,0.22)"] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
              </span>
              Bientôt disponible — Liste d&apos;attente ouverte
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeUp} className="mb-6 tracking-tight">
            <span className="block font-display font-black leading-[1.05] text-white" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}>
              Maîtrisez l&apos;IA. Créez.
            </span>
            <span className="block font-display font-black leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", background: "linear-gradient(90deg, #d946ef 0%, #8b5cf6 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Automatisez. Dominez.
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mb-12 max-w-2xl text-base leading-relaxed text-white/52 sm:text-lg">
            Formation 100% en ligne, autonome — accès immédiat aux modules, prompts, templates et ressources professionnelles.
            Avancez à votre rythme, sans engagement de session.
          </motion.p>

          <motion.div ref={progressRef} variants={fadeUp} className="w-full max-w-md">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-white/65"><span className="font-display text-xl font-black text-white">1</span>{" "}créateur inscrit</span>
              <span className="text-sm text-white/35">100 places max</span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef, #06b6d4)" }} initial={{ width: "0%" }} animate={progressInView ? { width: "1%" } : { width: "0%" }} transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }} />
              <motion.div className="absolute inset-y-0 left-0 rounded-full blur-[6px]" style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }} initial={{ width: "0%" }} animate={progressInView ? { width: "1%" } : { width: "0%" }} transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }} />
            </div>
            <div className="mt-2 flex justify-between">
              <p className="text-[0.65rem] text-white/28">Places garanties à l&apos;ouverture</p>
              <p className="text-[0.65rem] text-white/28">53 restantes</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ══ MODULES ════════════════════════════════════════════════════════ */}
        <div className="mb-28">
          <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4))" }} />
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.62rem] font-black uppercase tracking-widest" style={{ background: "rgba(139,92,246,0.14)", border: "1px solid rgba(139,92,246,0.35)", color: "#a78bfa" }}>
                <Sparkles className="h-3 w-3" />
                Aperçu Exclusif — 8 Modules
              </span>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.4), transparent)" }} />
            </div>
            <h3 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Les compétences qui vont{" "}
              <span style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                tout changer
              </span>
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {MODULES.map(mod => <ModuleCard key={mod.num} mod={mod} />)}
          </motion.div>
        </div>

        {/* ══ OFFRES ═════════════════════════════════════════════════════════ */}
        <div className="mb-28">
          <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <span className="badge-pill badge-fuchsia mb-5">⚡ Formations</span>
            <h3 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
              Choisissez votre{" "}
              <span style={{ background: "linear-gradient(90deg, #d946ef, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                niveau d&apos;ambition
              </span>
            </h3>
            <p className="mt-3 text-sm text-white/40">Prix de lancement — accès immédiat à tous les modules inclus dans votre pack.</p>
          </motion.div>

          <div className="flex flex-col gap-12 sm:flex-row sm:items-stretch sm:gap-6 lg:gap-8">
            <OfferCard title="King of IA Starter" color="#06b6d4" glow="rgba(6,182,212,0.15)" features={STARTER_FEAT} delay={0} image="/offer-starter.webp" sparks={SPARKS_A} glimmers={GLIMMERS_A} priceLaunch={497} priceFull={697} valueIndividual={885} savings={200} />
            <OfferCard title="King of IA Pro" color="#d946ef" glow="rgba(217,70,239,0.18)" features={PRO_FEAT} recommended delay={0.08} image="/offer-pro.webp" sparks={SPARKS_B} glimmers={GLIMMERS_B} priceLaunch={997} priceFull={1497} valueIndividual={1776} savings={500} />
          </div>

          {/* Mention commerciale */}
          <p className="mx-auto mt-6 max-w-xl text-center text-[0.65rem] leading-relaxed text-white/28">
            Prix de lancement valable pendant l&apos;ouverture officielle de la formation.
            Le prix public pourra être appliqué à tout moment après cette période.
          </p>
        </div>

        {/* ══ FORMULAIRE ═════════════════════════════════════════════════════ */}
        <motion.div id="waitlist-form" className="relative mx-auto max-w-2xl" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.75 }}>
          <div className="absolute inset-0 rounded-3xl blur-[60px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(217,70,239,0.18) 0%, rgba(139,92,246,0.10) 50%, transparent 75%)", margin: "-20px" }} />
          <div className="relative rounded-3xl p-px" style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.55), rgba(139,92,246,0.38), rgba(6,182,212,0.30))" }}>
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)" }} />
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] px-7 py-12 text-center sm:px-12 sm:py-14" style={{ background: "linear-gradient(145deg, rgba(6,5,18,0.99) 0%, rgba(11,9,26,0.97) 100%)" }}>
              <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full blur-[60px]" style={{ background: "rgba(139,92,246,0.20)" }} />
              <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full blur-[60px]" style={{ background: "rgba(6,182,212,0.18)" }} />

              <motion.div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.22), rgba(139,92,246,0.16))", border: "1px solid rgba(217,70,239,0.38)" }} animate={{ boxShadow: ["0 0 20px rgba(217,70,239,0.22)", "0 0 50px rgba(217,70,239,0.5)", "0 0 20px rgba(217,70,239,0.22)"] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <Mail className="h-9 w-9 text-fuchsia-400" />
              </motion.div>

              <h3 className="mb-2 font-display text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Soyez les{" "}
                <span style={{ background: "linear-gradient(90deg, #d946ef, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  premiers informés
                </span>
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-white/42 sm:text-base">
                Accès prioritaire, tarif early adopter et bonus exclusifs réservés aux inscrits avant le lancement.
              </p>

              <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                {["✓ Accès prioritaire", "✓ Tarif early adopter", "✓ Sans engagement"].map(b => (
                  <span key={b} className="rounded-full px-3 py-1 text-[0.65rem] font-semibold text-white/50" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{b}</span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.8, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex flex-col items-center gap-4 py-4">
                    <motion.div animate={{ scale: [0.8, 1.15, 1], rotate: [0, 10, 0] }} transition={{ duration: 0.6 }}>
                      <CheckCircle className="h-16 w-16 text-green-400" />
                    </motion.div>
                    <div>
                      <p className="font-display text-xl font-black text-white">Vous êtes sur la liste !</p>
                      <p className="mt-1 text-sm text-white/42">Nous vous contacterons dès l&apos;ouverture. Restez connecté.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                    <input type="email" required placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} disabled={status === "loading"} className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm text-white placeholder-white/28 outline-none transition focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50" />
                    <motion.button type="submit" disabled={status === "loading"} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-black text-white disabled:opacity-60" style={{ background: "linear-gradient(135deg, #d946ef, #8b5cf6)", boxShadow: "0 4px 24px rgba(217,70,239,0.38)" }} whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(217,70,239,0.6)" }} whileTap={{ scale: 0.96 }}>
                      {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Je m&apos;inscris <ArrowRight className="h-4 w-4" /></>}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {status === "error" && <p className="mt-3 text-xs text-red-400">Erreur d&apos;envoi — réessayez ou contactez-nous directement.</p>}
              <p className="mt-5 text-[0.65rem] text-white/22">Pas de spam. Désinscription en un clic à tout moment.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
