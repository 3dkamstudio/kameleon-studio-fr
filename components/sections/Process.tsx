"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sparkles from "@/components/ui/Sparkles";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";
import {
  MessageSquare, FileText, Clapperboard, RotateCcw, PackageCheck,
  ArrowRight, Clock, Zap, User, Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PROCESS_SPEECH = [
  "Voilà notre méthode — 5 étapes, 0 stress pour vous !",
  "De l'idée à la livraison, on vous accompagne à chaque étape.",
  "Vous posez les bases, on s'occupe du reste. Simple non ? 🤖",
];

const INTERVAL = 5000; // ms avant auto-avancement

// ── Data ──────────────────────────────────────────────────────────────────────
const STEPS: {
  icon: LucideIcon;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  you: string;
  we: string;
  output: string;
  duration: string;
  color: string;
  colorTo: string;
  glow: string;
  glowBg: string;
}[] = [
  {
    icon: MessageSquare,
    num: "01",
    title: "Brief & consultation",
    subtitle: "On cerne votre vision",
    desc: "On démarre avec un échange simple : votre objectif, votre audience, votre ton. Pas de jargon technique — juste ce dont vous avez besoin.",
    you: "Vous partagez votre idée et vos objectifs",
    we: "On analyse et propose une direction créative",
    output: "Brief validé + stratégie créative",
    duration: "< 24h",
    color: "#06b6d4",
    colorTo: "#8b5cf6",
    glow: "rgba(6,182,212,0.45)",
    glowBg: "rgba(6,182,212,0.07)",
  },
  {
    icon: FileText,
    num: "02",
    title: "Script & storyboard",
    subtitle: "L'histoire prend forme",
    desc: "On rédige le script et propose le découpage visuel. Vous validez le sens et la narration avant toute production.",
    you: "Vous validez le script et le découpage visuel",
    we: "On rédige, structure et storyboardise votre contenu",
    output: "Script final + storyboard approuvé",
    duration: "2–3 jours",
    color: "#8b5cf6",
    colorTo: "#d946ef",
    glow: "rgba(139,92,246,0.45)",
    glowBg: "rgba(139,92,246,0.07)",
  },
  {
    icon: Clapperboard,
    num: "03",
    title: "Production par IA",
    subtitle: "La magie opère",
    desc: "Génération des visuels, animation, voix-off, montage — tout est produit avec nos outils IA en quelques jours.",
    you: "Vous attendez (ou continuez vos activités)",
    we: "On génère, anime, double et monte votre contenu",
    output: "Première version complète du contenu",
    duration: "3–5 jours",
    color: "#d946ef",
    colorTo: "#f43f5e",
    glow: "rgba(217,70,239,0.45)",
    glowBg: "rgba(217,70,239,0.07)",
  },
  {
    icon: RotateCcw,
    num: "04",
    title: "Révisions",
    subtitle: "On perfectionne ensemble",
    desc: "Deux cycles de retours inclus. Vous demandez des ajustements, on les intègre rapidement. Aucun supplément.",
    you: "Vous notez vos retours et ajustements",
    we: "On intègre vos modifications sans délai",
    output: "Contenu finalisé et validé par vous",
    duration: "1–2 jours",
    color: "#f97316",
    colorTo: "#eab308",
    glow: "rgba(249,115,22,0.45)",
    glowBg: "rgba(249,115,22,0.07)",
  },
  {
    icon: PackageCheck,
    num: "05",
    title: "Livraison finale",
    subtitle: "Prêt à lancer",
    desc: "Fichiers HD livrés dans tous les formats adaptés à vos plateformes — prêts à publier, sans aucune manipulation technique.",
    you: "Vous publiez et récoltez les résultats",
    we: "On livre tous les fichiers formatés et optimisés",
    output: "Fichiers HD multi-formats livrés",
    duration: "< 24h",
    color: "#22c55e",
    colorTo: "#06b6d4",
    glow: "rgba(34,197,94,0.45)",
    glowBg: "rgba(34,197,94,0.07)",
  },
];

// ── Animations ────────────────────────────────────────────────────────────────
const panelVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: "easeOut" as const } },
  exit:   (dir: number) => ({ opacity: 0, x: dir * -30, filter: "blur(4px)", transition: { duration: 0.25 } }),
};

// ── Section ───────────────────────────────────────────────────────────────────
export default function Process() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const [paused, setPaused] = useState(false);

  // Auto-avancement
  useEffect(() => {
    if (paused) { return; }
    const t = setTimeout(() => {
      setDir(1);
      setActive(i => (i + 1) % STEPS.length);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused]);

  function goTo(i: number) {
    setDir(i > active ? 1 : -1);
    setActive(i);
    setPaused(true);
  }

  const step = STEPS[active];

  return (
    <section
      id="processus"
      className="relative overflow-hidden px-6 py-32"
      style={{ background: "transparent" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Fond dynamique — suit la couleur de l'étape active ──────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`orb-${active}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[140px]"
            style={{ background: `${step.color}0e` }} />
          <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: `${step.colorTo}09` }} />
        </motion.div>
      </AnimatePresence>

      {/* Grille futuriste */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }} />

      <Sparkles />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="badge-pill badge-green mb-8">⚡ Comment ça marche</span>
          <h2 className="mb-4 tracking-tight">
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              De l&apos;idée à la livraison,
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-tech sm:text-4xl md:text-5xl">
              en 5 étapes
            </span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/40 sm:text-base">
            Un process clair, sans jargon et sans surprise — du brief initial aux fichiers finaux.
          </p>
        </motion.div>

        {/* ── Sélecteur — nodes connectés ────────────────────────────────── */}
        <motion.div
          className="mb-10 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div className="flex w-full max-w-3xl items-center">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              const isPast   = i < active;
              return (
                <div key={s.num} className="flex flex-1 items-center">
                  {/* Node */}
                  <button
                    onClick={() => goTo(i)}
                    className="group relative flex flex-col items-center gap-2 flex-shrink-0"
                    style={{ zIndex: 1 }}
                    aria-label={s.title}
                  >
                    {/* Cercle */}
                    <div
                      className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all duration-500"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${s.color}, ${s.colorTo})`
                          : isPast
                          ? `${s.color}25`
                          : "rgba(255,255,255,0.05)",
                        border: isActive
                          ? "2px solid transparent"
                          : `2px solid ${isPast ? s.color + "50" : "rgba(255,255,255,0.10)"}`,
                        boxShadow: isActive ? `0 0 28px ${s.glow}, 0 0 60px ${s.glow.replace("0.45", "0.20")}` : "none",
                        transform: isActive ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      {/* Ring animé quand actif */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ border: `2px solid ${s.color}` }}
                          animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <s.icon
                        className="h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300"
                        style={{ color: isActive ? "#fff" : isPast ? s.color : "rgba(255,255,255,0.35)" }}
                      />
                    </div>

                    {/* Label sous le node (desktop) */}
                    <span
                      className="hidden sm:block text-center text-[0.6rem] font-black uppercase tracking-widest transition-colors duration-300 w-16"
                      style={{ color: isActive ? s.color : "rgba(255,255,255,0.25)" }}
                    >
                      {s.num}
                    </span>

                    {/* Barre de progression auto-play */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 h-[2px] w-10 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
                        <div
                          key={`prog-${active}`}
                          className="h-full origin-left rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${s.color}, ${s.colorTo})`,
                            animation: paused
                              ? "none"
                              : `scaleProgress ${INTERVAL}ms linear forwards`,
                          }}
                        />
                      </div>
                    )}
                  </button>

                  {/* Connecteur entre nodes */}
                  {i < STEPS.length - 1 && (
                    <div className="relative mx-1 flex-1 overflow-hidden" style={{ height: "2px" }}>
                      {/* Rail de fond */}
                      <div className="absolute inset-0 rounded-full bg-white/[0.06]" />
                      {/* Segment complété */}
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        animate={{ width: i < active ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ background: `linear-gradient(90deg, ${STEPS[i].color}, ${STEPS[i + 1].color})` }}
                      />
                      {/* Dot voyageur */}
                      {i === active && !paused && (
                        <motion.div
                          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                          style={{ background: step.color, boxShadow: `0 0 8px ${step.glow}` }}
                          animate={{ left: ["0%", "100%"] }}
                          transition={{ duration: INTERVAL / 1000, ease: "linear", repeat: 0 }}
                          key={`dot-${active}`}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Panneau de détail ──────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: "320px" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative overflow-hidden rounded-3xl p-px"
              style={{
                background: `linear-gradient(135deg, ${step.color}50, ${step.colorTo}30, rgba(255,255,255,0.05))`,
                boxShadow: `0 0 80px ${step.glow.replace("0.45", "0.12")}, 0 24px 60px rgba(0,0,0,0.4)`,
              }}
            >
              <div
                className="relative overflow-hidden rounded-[calc(1.5rem-1px)]"
                style={{
                  background: `linear-gradient(135deg, rgba(8,8,20,0.97) 0%, ${step.glowBg} 50%, rgba(8,8,20,0.95) 100%)`,
                }}
              >
                {/* Numéro watermark géant */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-6 select-none font-display font-black leading-none"
                  style={{ fontSize: "clamp(6rem,18vw,14rem)", color: `${step.color}07` }}
                >
                  {step.num}
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr]">

                  {/* ── Colonne gauche : icône + durée ── */}
                  <div className="flex flex-row items-start gap-6 lg:flex-col lg:items-center">
                    {/* Grande icône */}
                    <div
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl sm:h-24 sm:w-24"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}25, ${step.colorTo}15)`,
                        border: `1.5px solid ${step.color}40`,
                        boxShadow: `0 0 40px ${step.glow.replace("0.45", "0.25")}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                      }}
                    >
                      <step.icon className="h-9 w-9 sm:h-11 sm:w-11" style={{ color: step.color }} />
                    </div>

                    {/* Durée */}
                    <div className="flex flex-col items-start lg:items-center">
                      <div
                        className="mb-1 flex items-center gap-1.5 rounded-xl px-3 py-1.5"
                        style={{ background: `${step.color}15`, border: `1px solid ${step.color}35` }}
                      >
                        <Clock className="h-3 w-3" style={{ color: step.color }} />
                        <span className="font-display text-sm font-black" style={{ color: step.color }}>
                          {step.duration}
                        </span>
                      </div>
                      <span className="text-[0.6rem] uppercase tracking-widest text-white/25">Délai estimé</span>
                    </div>

                    {/* Étape X/5 */}
                    <div className="hidden lg:flex flex-col items-center gap-1">
                      <span className="font-display text-xs font-bold text-white/20">
                        {step.num} / 0{STEPS.length}
                      </span>
                    </div>
                  </div>

                  {/* ── Colonne droite : contenu ── */}
                  <div>
                    {/* Titre + sous-titre */}
                    <div className="mb-5">
                      <p className="mb-1 text-xs font-black uppercase tracking-widest" style={{ color: step.color }}>
                        Étape {step.num}
                      </p>
                      <h3 className="mb-1 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: step.colorTo }}>
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mb-7 text-sm leading-relaxed text-white/55 sm:text-[0.95rem]">
                      {step.desc}
                    </p>

                    {/* Vous / On s'occupe de */}
                    <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-3 rounded-2xl p-4"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                          <User className="h-3.5 w-3.5 text-white/50" />
                        </div>
                        <div>
                          <p className="mb-0.5 text-[0.6rem] font-black uppercase tracking-widest text-white/25">Vous</p>
                          <p className="text-xs leading-snug text-white/55">{step.you}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-2xl p-4"
                        style={{ background: `${step.color}08`, border: `1px solid ${step.color}25` }}>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl"
                          style={{ background: `${step.color}20` }}>
                          <Wand2 className="h-3.5 w-3.5" style={{ color: step.color }} />
                        </div>
                        <div>
                          <p className="mb-0.5 text-[0.6rem] font-black uppercase tracking-widest" style={{ color: `${step.color}80` }}>
                            On s&rsquo;occupe de
                          </p>
                          <p className="text-xs leading-snug text-white/55">{step.we}</p>
                        </div>
                      </div>
                    </div>

                    {/* Output + CTA */}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
                        style={{ background: `${step.color}12`, border: `1px solid ${step.color}35` }}>
                        <Zap className="h-3.5 w-3.5 shrink-0" style={{ color: step.color }} />
                        <span className="text-xs font-bold" style={{ color: step.color }}>
                          {step.output}
                        </span>
                      </div>

                      {active < STEPS.length - 1 && (
                        <button
                          onClick={() => goTo(active + 1)}
                          className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                          style={{ color: "rgba(255,255,255,0.30)" }}
                          onMouseEnter={e => (e.currentTarget.style.color = step.colorTo)}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.30)")}
                        >
                          Étape suivante
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {active === STEPS.length - 1 && (
                        <a
                          href="#contact"
                          className="flex items-center gap-1.5 rounded-2xl px-5 py-2.5 text-xs font-black text-white transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${step.color}, ${step.colorTo})`,
                            boxShadow: `0 4px 18px ${step.glow}`,
                          }}
                        >
                          Démarrer maintenant
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Indicateurs mobiles (petits dots) ────────────────────────── */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s.num}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "2rem" : "0.5rem",
                height: "0.5rem",
                background: i === active
                  ? `linear-gradient(90deg, ${s.color}, ${s.colorTo})`
                  : "rgba(255,255,255,0.15)",
              }}
              aria-label={s.title}
            />
          ))}
        </div>

      </div>

      {/* ── Kame guide ─────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-8 right-8 z-20 hidden lg:flex">
        <KameSpeech variants={PROCESS_SPEECH} position="left">
          <Kame context="default" src="/kame-robot.png" size={185} />
        </KameSpeech>
      </div>
    </section>
  );
}
