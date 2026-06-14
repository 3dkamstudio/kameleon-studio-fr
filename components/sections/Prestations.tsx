"use client";

import { motion } from "framer-motion";
import { Film, BookOpen, Globe, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import Sparkles from "@/components/ui/Sparkles";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";

const PRESTATIONS_SPEECH = [
  "Vidéo, BD ou site web — on maîtrise chaque format à la perfection 🎨",
  "Chaque prestation est pensée pour maximiser votre impact !",
  "Découvrez nos spécialités — et trouvez celle qui correspond à votre projet.",
];

// ── Données ────────────────────────────────────────────────────────────────────
const PRESTATIONS = [
  {
    num:         "01",
    icon:        Film,
    badge:       "Production Vidéo",
    title:       "Des vidéos qui captent",
    titleAccent: "et qui convertissent.",
    desc:        "Du script à la livraison en quelques jours — publicités, reels, animations, formations.",
    image:       "/prest-video.png",
    color:       "#f97316",
    colorTo:     "#f43f5e",
    price:       "250",
    priceUnit:   "€ / vidéo",
    priceNote:   "Dégressif → 200 €",
    features:    ["30 s inclus · 16:9 + 9:16", "Script & DA inclus", "Voix-off IA pro", "Livraison 7 j max"],
    large:       true,
  },
  {
    num:         "02",
    icon:        BookOpen,
    badge:       "Planches BD",
    title:       "Des histoires",
    titleAccent: "qui marquent.",
    desc:        "BD et récits visuels sur mesure — style graphique unique, droits commerciaux inclus.",
    image:       "/prest-bd.png",
    color:       "#06b6d4",
    colorTo:     "#22c55e",
    price:       "190",
    priceUnit:   "€ / planche",
    priceNote:   "Dégressif → 150 €",
    features:    ["DA 100% unique", "2 retouches incluses", "Export HD PNG + PDF"],
    large:       false,
  },
  {
    num:         "03",
    icon:        Globe,
    badge:       "Sites Web Premium",
    title:       "Votre vitrine,",
    titleAccent: "taillée pour convertir.",
    desc:        "Sites & landings codés sur mesure — zéro template, SEO avancé, livré en 2 à 8 jours.",
    image:       "/prest-web.png",
    color:       "#8b5cf6",
    colorTo:     "#d946ef",
    price:       "800",
    priceUnit:   "€ → 1 600 €",
    priceNote:   "Landing ou site complet",
    features:    ["Design 100% sur-mesure", "Mobile + desktop", "SEO avancé inclus"],
    large:       false,
  },
] as const;

// ── Card ──────────────────────────────────────────────────────────────────────
function BentoCard({
  p, index, large,
}: {
  p: typeof PRESTATIONS[number];
  index: number;
  large: boolean;
}) {
  return (
    <motion.div
      className="group relative h-full w-full overflow-hidden rounded-3xl"
      style={{
        border: `1px solid ${p.color}22`,
        boxShadow: `0 8px 40px rgba(0,0,0,0.40)`,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{
        boxShadow: `0 0 80px ${p.color}28, 0 20px 60px rgba(0,0,0,0.55)`,
        borderColor: `${p.color}55`,
        transition: { duration: 0.3 },
      }}
    >
      {/* ── Image ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={p.image}
          alt={p.badge}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          priority={index === 0}
        />
      </div>

      {/* ── Overlays ─────────────────────────────────────────────────────── */}
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: large
            ? `linear-gradient(155deg, ${p.color}22 0%, transparent 35%, rgba(5,5,18,0.82) 100%)`
            : `linear-gradient(155deg, ${p.color}18 0%, transparent 30%, rgba(5,5,18,0.88) 100%)`,
        }}
      />
      {/* Bottom fog fort pour la lisibilité du texte */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: large ? "80%" : "88%",
          background: `linear-gradient(to top, rgba(5,5,18,1) 0%, rgba(5,5,18,0.95) 30%, rgba(5,5,18,0.65) 62%, transparent 100%)`,
        }}
      />
      {/* Hover color tint */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${p.color}08` }}
      />

      {/* ── Barre top ────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${p.color}, ${p.colorTo})` }}
      />

      {/* ── Badge service (haut-gauche) ───────────────────────────────────── */}
      <div
        className="absolute left-5 top-5 flex items-center gap-2 rounded-2xl px-3.5 py-2"
        style={{
          background: "rgba(5,5,18,0.72)",
          border: `1px solid ${p.color}45`,
          backdropFilter: "blur(10px)",
        }}
      >
        <p.icon className="h-3.5 w-3.5 shrink-0" style={{ color: p.color }} />
        <span className="text-[0.68rem] font-black uppercase tracking-wider" style={{ color: p.color }}>
          {p.badge}
        </span>
      </div>

      {/* ── Numéro (haut-droit) ──────────────────────────────────────────── */}
      <div className="absolute right-5 top-5">
        <span
          className="font-display text-4xl font-black leading-none"
          style={{ color: `${p.color}40` }}
        >
          {p.num}
        </span>
      </div>

      {/* ── Contenu bas ──────────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">

        {/* Titre */}
        <h3
          className={`mb-2 font-display font-black leading-tight text-white ${
            large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {p.title}{" "}
          <span style={{ color: p.color }}>{p.titleAccent}</span>
        </h3>

        {/* Description — visible sur la grande carte, cachée sur mobile small */}
        <p className={`mb-4 text-xs leading-relaxed text-white/75 sm:text-sm ${large ? "block" : "hidden sm:block"}`}>
          {p.desc}
        </p>

        {/* Features */}
        <ul className={`mb-5 flex flex-col gap-2 ${large ? "" : "hidden sm:flex"}`}>
          {p.features.map(f => (
            <li key={f} className="flex items-center gap-2">
              <span
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                style={{ background: `${p.color}20`, border: `1px solid ${p.color}55` }}
              >
                <Check className="h-2.5 w-2.5" style={{ color: p.color }} />
              </span>
              <span className="text-[0.72rem] text-white/80">{f}</span>
            </li>
          ))}
        </ul>

        {/* Séparateur */}
        <div className="mb-4 h-px" style={{ background: `linear-gradient(90deg, ${p.color}45, transparent)` }} />

        {/* Prix + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-end gap-1">
              <span
                className={`font-display font-black leading-none ${large ? "text-3xl" : "text-2xl"}`}
                style={{ color: p.color }}
              >
                {p.price}
              </span>
              <span className="mb-0.5 text-xs font-bold text-white/65">{p.priceUnit}</span>
            </div>
            <span className="text-[0.6rem] text-white/50">{p.priceNote}</span>
          </div>

          <motion.a
            href="#contact"
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-black text-white"
            style={{
              background: `linear-gradient(135deg, ${p.color}, ${p.colorTo})`,
              boxShadow: `0 4px 20px ${p.color}50`,
            }}
            whileHover={{ scale: 1.06, boxShadow: `0 6px 28px ${p.color}70` }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            Démarrer
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>
      </div>

      {/* ── Bordure intérieure glow au hover ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1.5px ${p.color}60` }}
      />
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Prestations() {
  return (
    <section id="prestations" className="relative overflow-hidden" style={{ background: "transparent" }}>

      {/* Fond */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #07070e 0%, #0b0b18 40%, #08080f 70%, #060610 100%)" }} />
        <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.11) 0%, transparent 70%)" }} />
        <div className="absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 right-1/4 h-[450px] w-[450px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />
      </div>

      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6">

        {/* ══ HEADER ════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-pill badge-fuchsia mb-7">✦ Nos Prestations</span>
          <h2 className="mb-4 tracking-tight">
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Trois univers créatifs,
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-cool sm:text-4xl md:text-5xl">
              une seule vision.
            </span>
          </h2>
          <p className="max-w-xl text-sm text-white/42 sm:text-base">
            Du contenu vidéo qui captive, des planches BD qui racontent, des sites web qui convertissent.
          </p>
        </motion.div>

        {/* ══ BENTO GRID ════════════════════════════════════════════════════ */}
        {/* Mobile : 3 colonnes empilées */}
        {/* Desktop : Vidéo grande à gauche (2/3), BD + Web à droite (1/3) */}
        <div
          className="grid gap-4 sm:gap-5"
          style={{
            gridTemplateColumns: "1fr",
            gridTemplateRows: "auto",
          }}
        >
          {/* Mobile layout : stacked */}
          <div className="flex flex-col gap-4 lg:hidden">
            {PRESTATIONS.map((p, i) => (
              <div key={p.num} style={{ height: "420px" }}>
                <BentoCard p={p} index={i} large={false} />
              </div>
            ))}
          </div>

          {/* Desktop layout : bento grid */}
          <div
            className="hidden lg:grid"
            style={{
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "340px 340px",
              gap: "1.25rem",
            }}
          >
            {/* Grande carte Vidéo — span 2 rows */}
            <div className="h-full" style={{ gridRow: "1 / 3" }}>
              <BentoCard p={PRESTATIONS[0]} index={0} large={true} />
            </div>
            {/* BD */}
            <div className="h-full">
              <BentoCard p={PRESTATIONS[1]} index={1} large={false} />
            </div>
            {/* Web */}
            <div className="h-full">
              <BentoCard p={PRESTATIONS[2]} index={2} large={false} />
            </div>
          </div>
        </div>

        {/* ── Kame guide ─────────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute bottom-8 right-8 z-20 hidden lg:flex">
          <KameSpeech variants={PRESTATIONS_SPEECH} position="left">
            <Kame context="default" src="/kame-scientist.png" size={185} />
          </KameSpeech>
        </div>

        {/* ══ CTA GLOBAL ════════════════════════════════════════════════════ */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <a
            href="#tarifs-video"
            className="text-sm font-semibold text-white/35 transition-colors hover:text-white/65"
          >
            Voir tous les tarifs en détail →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
