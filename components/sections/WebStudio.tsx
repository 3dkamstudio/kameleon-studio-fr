"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Check, ArrowRight, ChevronDown, Clock,
  Shield, AlertCircle, Minus,
} from "lucide-react";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";
import Sparkles from "@/components/ui/Sparkles";

/* ─── Animation variants ─────────────────────────────────────────────────── */
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.21, 0.47, 0.32, 0.98] } },
};

/* ─── Speech bubbles ─────────────────────────────────────────────────────── */
const SPEECH_P1 = [
  "💻 Un site premium livré en 2 jours ? Oui, c'est légal.",
  "🎨 Design 100% sur mesure — zéro template importé.",
  "⚡ Pendant que tu gères ton business, on code.",
];
const SPEECH_P2 = [
  "🔧 Votre site mérite un gardien. Je suis là !",
  "🛡️ Sécurisé, à jour, performant. Vous dormez, on veille.",
  "📊 Votre site évolue avec vous — c'est ça la vraie maintenance.",
];

/* ─── Phase 1 : Création ─────────────────────────────────────────────────── */
const CREATION_PLANS = [
  {
    tag: "SITE VITRINE",
    badge: "ESSENTIEL",
    price: "800",
    delay: "2 à 4 jours ouvrés",
    color: "#4dd9ff",
    colorTo: "#06b6d4",
    glow: "rgba(77,217,255,0.38)",
    highlight: false,
    cta: "Je veux ce site",
    excludes: "Pages multiples, espace membre, paiement : non inclus",
    includes: [
      "1 page one-pager structurée",
      "Design sur mesure (couleurs, typo, logo)",
      "Animations fluides Framer Motion",
      "Responsive mobile / tablette / desktop",
      "Formulaire de contact opérationnel",
      "SEO de base (méta, balises H)",
      "1 série de retouches incluse",
      "Mise en ligne incluse",
    ],
  },
  {
    tag: "SITE COMPLET",
    badge: "PREMIUM",
    price: "1 600",
    delay: "5 à 8 jours ouvrés",
    color: "#d946ef",
    colorTo: "#8b5cf6",
    glow: "rgba(217,70,239,0.45)",
    highlight: true,
    highlightBadge: "RECOMMANDÉ",
    cta: "Je veux ce site",
    excludes: "E-commerce, espace client : sur devis",
    includes: [
      "Jusqu'à 5 pages dédiées",
      "Direction artistique personnalisée",
      "Animations avancées Framer Motion",
      "Visuels custom générés par IA",
      "Formulaire connecté + tracking",
      "SEO avancé (métadonnées, sitemap)",
      "2 séries de retouches incluses",
      "Mise en ligne + config domaine",
    ],
  },
] as const;

/* ─── Options à la carte ─────────────────────────────────────────────────── */
const OPTIONS = [
  {
    icon: "💳",
    label: "Paiement en ligne (Stripe)",
    price: "+120€",
    color: "#5eff9d",
    tooltip: "Bouton de paiement sécurisé Stripe intégré à votre page",
  },
  {
    icon: "📅",
    label: "Prise de rendez-vous (Calendly)",
    price: "+100€",
    color: "#ff9d4d",
    tooltip: "Module de réservation synchronisé avec votre agenda",
  },
  {
    icon: "🔒",
    label: "Mentions légales et CGU",
    price: "+80€",
    color: "#ffd95e",
    tooltip: "Rédaction et intégration des pages légales obligatoires",
  },
] as const;

/* ─── Phase 2 : Maintenance ──────────────────────────────────────────────── */
const MAINTENANCE_PLANS = [
  {
    tag: "LANDING PAGE",
    badge: "ESSENTIEL",
    price: "49",
    engagement: "Engagement 3 mois",
    forWho: "Page unique, page de vente, page formation",
    color: "#5eff9d",
    colorTo: "#06b6d4",
    glow: "rgba(94,255,157,0.35)",
    highlight: false,
    cta: "Démarrer la maintenance",
    includes: [
      "Mises à jour techniques mensuelles",
      "Sauvegarde mensuelle",
      "Vérification sécurité",
      "Vérification formulaire / contact",
      "Correction bug mineur",
      "30 min de modifications / mois",
      "Mise à jour contenus légaux (fournis client)",
    ],
  },
  {
    tag: "SITE COMPLET",
    badge: "COMPLET",
    price: "79",
    engagement: "Engagement 3 mois",
    forWho: "Site vitrine de 2 à 5 pages",
    color: "#8a6dff",
    colorTo: "#ff5e7e",
    glow: "rgba(138,109,255,0.45)",
    highlight: true,
    highlightBadge: "LE PLUS CHOISI",
    cta: "Démarrer la maintenance",
    includes: [
      "Tout le plan Landing Page",
      "1h d'intervention / mois",
      "Contrôle SEO mensuel",
      "Surveillance sécurité avancée",
      "Sauvegardes mensuelles renforcées",
      "Mise à jour infos contact / entreprise",
    ],
  },
] as const;

const HORS_FORFAIT = [
  "Ajout de nouvelles sections ou pages",
  "Développement de nouvelles fonctionnalités",
  "Refonte partielle ou complète du site",
  "Optimisations de performance avancées",
  "Rédaction juridique complète (CGV, CGU)",
  "Mise en conformité RGPD avancée",
  "Gestion complète du bandeau cookies",
  "Intégrations tierces complexes",
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function WebStudio() {
  const [horsOpen,       setHorsOpen]       = useState(false);
  const [hoveredOption,  setHoveredOption]  = useState<string | null>(null);

  return (
    <section
      id="sites-web"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* ── Background glows ─────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-64 -top-32 h-[700px] w-[700px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(77,217,255,0.10) 0%, transparent 70%)" }} />
        <div className="absolute -left-64 top-1/3 h-[650px] w-[650px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.10) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(94,255,157,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/3 h-[450px] w-[450px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(138,109,255,0.08) 0%, transparent 70%)" }} />
        <div className="hex-grid absolute inset-0 opacity-30" />
        <div className="scanline absolute inset-0" />
      </div>

      <Sparkles />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ══ HEADER ══════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-20 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <span
            className="mb-6 inline-block rounded-full px-5 py-2 text-[0.65rem] font-black uppercase tracking-widest"
            style={{
              background: "rgba(77,217,255,0.08)",
              border: "1px solid rgba(77,217,255,0.22)",
              color: "#4dd9ff",
              boxShadow: "0 0 18px rgba(77,217,255,0.12)",
            }}
          >
            🌐 Sites Web Premium
          </span>
          <h2 className="mb-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            De la création à la maintenance,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #4dd9ff, #d946ef, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              on s&apos;occupe de tout.
            </span>
          </h2>
          <p className="max-w-lg text-base text-white/45">
            Votre site sur mesure livré en 2 à 8 jours, puis maintenu sécurisé
            et performant chaque mois. Un seul interlocuteur, du début à la fin.
          </p>
          <div className="mt-7 w-40">
            <div className="divider-rainbow" />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            PHASE 1 — CRÉATION
        ══════════════════════════════════════════════════════════════════ */}
        <div className="mb-10">
          {/* Phase label */}
          <motion.div
            className="mb-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mb-5 inline-flex items-center gap-3 rounded-2xl px-5 py-2.5"
              style={{
                background: "rgba(77,217,255,0.07)",
                border: "1px solid rgba(77,217,255,0.22)",
              }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full font-display text-xs font-black text-white"
                style={{ background: "linear-gradient(135deg, #4dd9ff, #06b6d4)", boxShadow: "0 0 10px rgba(77,217,255,0.6)" }}
              >
                1
              </span>
              <span className="text-[0.68rem] font-black uppercase tracking-widest" style={{ color: "#4dd9ff" }}>
                Étape 1 — On crée votre site
              </span>
            </div>
            <h3 className="mb-1.5 font-display text-2xl font-black text-white sm:text-3xl">
              Votre site sur mesure
            </h3>
            <p className="text-sm text-white/40">Design premium. Livré vite. Zéro template.</p>
          </motion.div>

          {/* Creation cards */}
          <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {CREATION_PLANS.map((plan) => {
              const inner = (
                <div
                  className="relative flex flex-1 flex-col overflow-hidden rounded-[20px]"
                  style={{
                    background: `linear-gradient(155deg, ${plan.color}0d 0%, rgba(6,6,18,0.92) 55%)`,
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="h-[3px] w-full shrink-0"
                    style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.colorTo})` }} />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${plan.color}55, transparent 70%)`, opacity: plan.highlight ? 0.50 : 0.28 }}
                  />
                  {plan.highlight && (
                    <div
                      className="absolute right-5 top-5 rounded-full px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-white"
                      style={{ background: `${plan.color}22`, border: `1px solid ${plan.color}50`, boxShadow: `0 0 12px ${plan.color}38` }}
                    >
                      ✦ {plan.highlightBadge}
                    </div>
                  )}
                  <div className="relative z-10 flex flex-1 flex-col p-7 sm:p-8">
                    <div className="mb-6">
                      <span
                        className="mb-3 inline-block rounded-full px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest"
                        style={{ background: `${plan.color}14`, border: `1px solid ${plan.color}35`, color: plan.color }}
                      >
                        {plan.tag}
                      </span>
                      <h4 className="font-display text-2xl font-black text-white">{plan.badge}</h4>
                    </div>
                    <div
                      className="mb-6 rounded-2xl px-6 py-5 text-center"
                      style={{ background: `${plan.color}07`, border: `1px solid ${plan.color}1a` }}
                    >
                      <div className="flex items-end justify-center gap-1">
                        <span
                          className="font-display text-6xl font-black leading-none"
                          style={{
                            background: `linear-gradient(135deg, ${plan.color}, ${plan.colorTo})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {plan.price}
                        </span>
                        <div className="mb-2 text-left">
                          <p className="text-lg font-bold text-white/45">€</p>
                          <p className="whitespace-nowrap text-[0.58rem] text-white/22">paiement unique</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-1.5">
                        <Clock className="h-3 w-3" style={{ color: plan.color }} />
                        <span className="text-xs text-white/40">
                          Délai&nbsp;:&nbsp;<strong className="text-white/65">{plan.delay}</strong>
                        </span>
                      </div>
                    </div>
                    <ul className="mb-4 flex flex-1 flex-col gap-2.5">
                      {plan.includes.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}40` }}
                          >
                            <Check className="h-3 w-3" style={{ color: plan.color }} />
                          </span>
                          <span className="text-sm leading-snug text-white/60">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-6 flex items-start gap-1.5 text-[0.66rem] italic text-white/22">
                      <Minus className="mt-0.5 h-3 w-3 shrink-0 opacity-45" />
                      {plan.excludes}
                    </p>
                    <motion.a
                      href="#contact"
                      className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-white"
                      style={{
                        background: `linear-gradient(135deg, ${plan.color}, ${plan.colorTo})`,
                        boxShadow: `0 4px 24px ${plan.glow}`,
                      }}
                      whileHover={{ scale: 1.03, boxShadow: `0 8px 40px ${plan.glow}` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              );

              return plan.highlight ? (
                <motion.div
                  key={plan.badge}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.18 } }}
                  className="ws-border-premium flex flex-col rounded-3xl p-px"
                  style={{ boxShadow: `0 0 70px ${plan.glow}, 0 0 180px ${plan.glow}40` }}
                >
                  {inner}
                </motion.div>
              ) : (
                <motion.div
                  key={plan.badge}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.18 } }}
                  className="flex flex-col rounded-3xl"
                  style={{ border: `1px solid ${plan.color}28` }}
                >
                  {inner}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Options pills */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mb-5 text-center text-[0.63rem] font-black uppercase tracking-widest text-white/28">
              ✦ Options à la carte
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {OPTIONS.map((opt) => (
                <div
                  key={opt.label}
                  className="relative"
                  onMouseEnter={() => setHoveredOption(opt.label)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <motion.div
                    className="flex cursor-default items-center gap-2.5 rounded-2xl px-5 py-3"
                    style={{ background: `${opt.color}09`, border: `1px solid ${opt.color}25` }}
                    whileHover={{ scale: 1.04, boxShadow: `0 0 22px ${opt.color}38`, borderColor: `${opt.color}50` }}
                    transition={{ duration: 0.14 }}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span className="text-sm font-semibold text-white/60">{opt.label}</span>
                    <span className="font-display text-sm font-black" style={{ color: opt.color }}>
                      {opt.price}
                    </span>
                  </motion.div>
                  <AnimatePresence>
                    {hoveredOption === opt.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.14 }}
                        className="absolute bottom-full left-1/2 z-50 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold text-white/80"
                        style={{
                          background: "rgba(6,6,18,0.96)",
                          border: `1px solid ${opt.color}30`,
                          backdropFilter: "blur(16px)",
                          boxShadow: `0 4px 20px rgba(0,0,0,0.55), 0 0 14px ${opt.color}18`,
                        }}
                      >
                        {opt.tooltip}
                        <span
                          className="absolute left-1/2 top-full -translate-x-1/2"
                          style={{
                            display: "block", width: 0, height: 0,
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "6px solid rgba(6,6,18,0.96)",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[0.62rem] text-white/20">
              Ces options s&apos;appuient sur vos propres comptes tiers — vous restez 100% propriétaire de vos données.
            </p>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CONNECTEUR ANIMÉ
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative mx-auto mb-10 flex max-w-sm flex-col items-center py-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="ws-data-stream h-10 w-[3px] rounded-full" />
          <motion.div
            className="relative z-10 my-2 flex h-10 w-10 items-center justify-center rounded-2xl font-display text-xl font-black text-white"
            style={{
              background: "linear-gradient(135deg, #4dd9ff, #d946ef, #8b5cf6)",
              boxShadow: "0 0 28px rgba(217,70,239,0.55), 0 0 55px rgba(77,217,255,0.28)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            +
          </motion.div>
          <div className="ws-data-stream h-10 w-[3px] rounded-full" />
          <div
            className="mt-5 rounded-2xl px-6 py-3 text-center"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-[0.72rem] font-black uppercase tracking-widest text-white/35">
              Puis protégez votre investissement
            </p>
            <p className="mt-0.5 text-[0.6rem] text-white/20">
              Votre site livré — la maintenance prend le relais.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            PHASE 2 — MAINTENANCE
        ══════════════════════════════════════════════════════════════════ */}
        <div id="maintenance">
          {/* Phase label */}
          <motion.div
            className="mb-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mb-5 inline-flex items-center gap-3 rounded-2xl px-5 py-2.5"
              style={{
                background: "rgba(94,255,157,0.07)",
                border: "1px solid rgba(94,255,157,0.22)",
              }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full font-display text-xs font-black text-white"
                style={{ background: "linear-gradient(135deg, #5eff9d, #06b6d4)", boxShadow: "0 0 10px rgba(94,255,157,0.6)" }}
              >
                2
              </span>
              <span className="text-[0.68rem] font-black uppercase tracking-widest" style={{ color: "#5eff9d" }}>
                Étape 2 — On maintient votre site
              </span>
            </div>
            <h3 className="mb-1.5 font-display text-2xl font-black text-white sm:text-3xl">
              Maintenance mensuelle
            </h3>
            <p className="text-sm text-white/40">
              Sécurité, mises à jour, performances — chaque mois, sans y penser.
            </p>
          </motion.div>

          {/* Maintenance cards */}
          <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {MAINTENANCE_PLANS.map((plan) => {
              const inner = (
                <div
                  className="relative flex flex-1 flex-col overflow-hidden rounded-[20px]"
                  style={{
                    background: `linear-gradient(155deg, ${plan.color}0d 0%, rgba(6,6,18,0.92) 55%)`,
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="h-[3px] w-full shrink-0"
                    style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.colorTo})` }} />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${plan.color}55, transparent 70%)`, opacity: plan.highlight ? 0.50 : 0.28 }}
                  />
                  {plan.highlight && (
                    <div
                      className="absolute right-5 top-5 rounded-full px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-white"
                      style={{ background: `${plan.color}22`, border: `1px solid ${plan.color}50`, boxShadow: `0 0 12px ${plan.color}38` }}
                    >
                      ✦ {plan.highlightBadge}
                    </div>
                  )}
                  <div className="relative z-10 flex flex-1 flex-col p-7 sm:p-8">
                    <div className="mb-4">
                      <span
                        className="mb-3 inline-block rounded-full px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest"
                        style={{ background: `${plan.color}14`, border: `1px solid ${plan.color}35`, color: plan.color }}
                      >
                        {plan.tag}
                      </span>
                      <h4 className="font-display text-2xl font-black text-white">{plan.badge}</h4>
                      <p className="mt-1 text-[0.68rem] text-white/32">{plan.forWho}</p>
                    </div>
                    <div
                      className="mb-6 rounded-2xl px-6 py-5 text-center"
                      style={{ background: `${plan.color}07`, border: `1px solid ${plan.color}1a` }}
                    >
                      <div className="flex items-end justify-center gap-1">
                        <span
                          className="font-display text-6xl font-black leading-none"
                          style={{
                            background: `linear-gradient(135deg, ${plan.color}, ${plan.colorTo})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {plan.price}
                        </span>
                        <div className="mb-2 text-left">
                          <p className="text-lg font-bold text-white/45">€</p>
                          <p className="whitespace-nowrap text-[0.58rem] text-white/22">/ mois</p>
                        </div>
                      </div>
                      <p
                        className="mt-2 text-[0.6rem] font-semibold uppercase tracking-wider"
                        style={{ color: `${plan.color}99` }}
                      >
                        {plan.engagement}
                      </p>
                    </div>
                    <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                      {plan.includes.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}40` }}
                          >
                            <Check className="h-3 w-3" style={{ color: plan.color }} />
                          </span>
                          <span className="text-sm leading-snug text-white/60">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.a
                      href="#contact"
                      className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-white"
                      style={{
                        background: `linear-gradient(135deg, ${plan.color}, ${plan.colorTo})`,
                        boxShadow: `0 4px 24px ${plan.glow}`,
                      }}
                      whileHover={{ scale: 1.03, boxShadow: `0 8px 40px ${plan.glow}` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              );

              return plan.highlight ? (
                <motion.div
                  key={plan.badge}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.18 } }}
                  className="ws-border-maintenance flex flex-col rounded-3xl p-px"
                  style={{ boxShadow: `0 0 70px ${plan.glow}, 0 0 180px ${plan.glow}40` }}
                >
                  {inner}
                </motion.div>
              ) : (
                <motion.div
                  key={plan.badge}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.18 } }}
                  className="flex flex-col rounded-3xl"
                  style={{ border: `1px solid ${plan.color}28` }}
                >
                  {inner}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Hors forfait accordion */}
          <motion.div
            className="mt-8 overflow-hidden rounded-3xl"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <button
              onClick={() => setHorsOpen((o) => !o)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-white/35" />
                <span className="text-sm font-black text-white/55">Hors forfait (sur devis)</span>
              </div>
              <motion.span animate={{ rotate: horsOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                <ChevronDown className="h-4 w-4 text-white/30" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {horsOpen && (
                <motion.div
                  key="hors"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="grid grid-cols-1 gap-2.5 px-6 pb-6 pt-2 sm:grid-cols-2">
                    {HORS_FORFAIT.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "rgba(139,92,246,0.6)" }}
                        />
                        <span className="text-xs text-white/40">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Protection callout */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-4 rounded-3xl p-6 text-center sm:flex-row sm:text-left"
            style={{
              background: "linear-gradient(135deg, rgba(94,255,157,0.06) 0%, rgba(6,182,212,0.05) 100%)",
              border: "1px solid rgba(94,255,157,0.18)",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: "rgba(94,255,157,0.12)", border: "1px solid rgba(94,255,157,0.25)" }}
            >
              <Shield className="h-5 w-5" style={{ color: "#5eff9d" }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-white/80">
                Maintenance sans obligation de création
              </p>
              <p className="mt-0.5 text-xs text-white/38">
                Vous avez déjà un site ? On peut le reprendre en maintenance.
                Demandez un diagnostic gratuit.
              </p>
            </div>
            <motion.a
              href="#contact"
              className="shrink-0 rounded-2xl px-5 py-2.5 text-sm font-black text-white"
              style={{
                background: "linear-gradient(135deg, #5eff9d, #06b6d4)",
                boxShadow: "0 4px 20px rgba(94,255,157,0.30)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Diagnostic gratuit
            </motion.a>
          </motion.div>
        </div>

        {/* ── CTA global ──────────────────────────────────────────────────── */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[0.68rem] font-black uppercase tracking-widest text-white/28">
            Prêt à lancer votre projet ?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-2xl px-10 py-4 text-base font-black text-white"
            style={{
              background: "linear-gradient(135deg, #d946ef, #8b5cf6, #06b6d4)",
              boxShadow: "0 4px 40px rgba(217,70,239,0.45)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 60px rgba(217,70,239,0.60)" }}
            whileTap={{ scale: 0.97 }}
          >
            Démarrer mon projet site web
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <p className="text-xs text-white/22">
            Réponse sous 24h · Devis gratuit · Sans engagement
          </p>
        </motion.div>

      </div>

      {/* ── Kame Phase 1 (création) ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute right-4 top-[680px] z-20 hidden 2xl:flex">
        <KameSpeech variants={SPEECH_P1} position="left">
          <Kame context="point" src="/kame-pro.png" size={180} />
        </KameSpeech>
      </div>

      {/* ── Kame Phase 2 (maintenance) ──────────────────────────────────── */}
      <div className="pointer-events-none absolute right-4 bottom-[400px] z-20 hidden 2xl:flex">
        <KameSpeech variants={SPEECH_P2} position="left">
          <Kame context="thumbsup" src="/kame-jump.png" size={180} />
        </KameSpeech>
      </div>

    </section>
  );
}
