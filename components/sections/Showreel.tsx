"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Layers, Palette, BookOpen, ChefHat, Mic2,
  GraduationCap, ExternalLink,
} from "lucide-react";
import Sparkles from "@/components/ui/Sparkles";

// ── Catalogue ──────────────────────────────────────────────────────────────────
type CatKey = "all" | "animation" | "biblique" | "recette" | "podcast" | "pedagogique";

type Video = {
  id: string;
  title: string;
  desc: string;
  cat: Exclude<CatKey, "all">;
  tag?: string;
  start?: number;
};

const CATEGORIES: Record<CatKey, { label: string; color: string; Icon: React.ElementType }> = {
  all:         { label: "Tout voir",    color: "#d946ef", Icon: Layers },
  animation:   { label: "Dessin animé", color: "#f97316", Icon: Palette },
  biblique:    { label: "Biblique",     color: "#8b5cf6", Icon: BookOpen },
  recette:     { label: "Recette",      color: "#22c55e", Icon: ChefHat },
  podcast:     { label: "Podcast",      color: "#06b6d4", Icon: Mic2 },
  pedagogique: { label: "Pédagogique",  color: "#eab308", Icon: GraduationCap },
};

const VIDEOS: Video[] = [
  {
    id:    "ZHCLE0t9lII",
    title: "🎙️ Indépendance Artificielle (EP.1) : le podcast 100% créé avec l'IA 🤖",
    desc:  "Premier épisode du podcast Kaméléon Studio — discussions, coulisses et créativité propulsée par l'IA.",
    cat:   "podcast",
    tag:   "Podcast",
  },
  {
    id:    "SwQSffhe_jk",
    title: "🎙️ Indépendance Artificielle (EP.2) : l'IA nous rend-elle idiots ? 🤖🧠",
    desc:  "Nouvel épisode du podcast — sujets créatifs, tendances et production digitale par intelligence artificielle.",
    cat:   "podcast",
    tag:   "Podcast",
    start: 1,
  },
  {
    id:    "-t3_OPVkmhg",
    title: "Les pépites de Lylou 💜 Une collection chrétienne pour éveiller la foi des enfants",
    desc:  "Histoire biblique mise en animation — narration épique, visuels immersifs, accessibles à tous les âges.",
    cat:   "biblique",
    tag:   "Biblique",
  },
  {
    id:    "0wa3_fb2W48",
    title: "☀️ Madinina – La Course Des Yoles ⛵ | Histoire animée pour enfants 🇲🇶",
    desc:  "Série animée 2D inspirée de la Martinique — course de yoles traditionnelles, personnages expressifs, univers coloré.",
    cat:   "animation",
    tag:   "Série",
    start: 1,
  },
  {
    id:    "PccRg7wdaR8",
    title: "Elisabeth femme obéissante",
    desc:  "Récit biblique illustré et animé — mise en scène soignée, narration profonde et engageante.",
    cat:   "biblique",
    tag:   "Biblique",
  },
  {
    id:    "OqgyWgUhq60",
    title: "Lylou prie pour un cœur obéissant 💙",
    desc:  "Animation chrétienne premium — personnages expressifs, univers visuel fort, message puissant.",
    cat:   "biblique",
    tag:   "Biblique",
  },
  {
    id:    "KpHhh8-yIis",
    title: "🌴 Madinina – L'île aux Fleurs 🌺 | Histoire animée pour enfants 🇫🇷",
    desc:  "Épisode de la série Madinina — animation HD, univers tropical vibrant, bande sonore sur-mesure.",
    cat:   "animation",
    tag:   "Série",
    start: 1,
  },
  {
    id:    "xhjN96uah6s",
    title: "E31: ACCOMPAGNER LA PERSONNE - BAC PRO ASSP - PROFESSEURE PAILLETTE.",
    desc:  "Contenu e-learning premium — visuels clairs, structure progressive, rétention maximale garantie.",
    cat:   "pedagogique",
    tag:   "E-learning",
  },
  {
    id:    "TTMo7o30uWw",
    title: "La reproduction humaine : le cours simple à retenir",
    desc:  "Formation animée en série — apprentissage visuel, contenu structuré et mémorable.",
    cat:   "pedagogique",
    tag:   "E-learning",
  },
  {
    id:    "oB0K44-0wTo",
    title: "E2 Bac Pro ASSP : comment construire une AES sans paniquer",
    desc:  "Épisode de formation animée — vulgarisation claire, engagement maximal, livré en quelques jours.",
    cat:   "pedagogique",
    tag:   "E-learning",
  },
  {
    id:    "QVJes1CuDEE",
    title: "LA CONCEPTION D'UNE ACTION D'ÉDUCATION À LA SANTÉ - PROFESSEURE PAILLETTE",
    desc:  "Suite de la série e-learning — visuels dynamiques, narration pédagogique, accessible à tous.",
    cat:   "pedagogique",
    tag:   "E-learning",
  },
  {
    id:    "xN67wvKBaSQ",
    title: "🎄Noël en Martinique 🇲🇶 Pain au beurre & chocolat pays 🍞🍫✨",
    desc:  "Tutoriel culinaire animé — rendu professionnel, montage dynamique, voix-off naturelle.",
    cat:   "recette",
    tag:   "Recette",
  },
  {
    id:    "35ELXMQqpyw",
    title: "Galette Créole à la Crème (Épiphanie) : la recette fondante entre Martinique & Guyane 👑🌴",
    desc:  "Tutoriel culinaire premium — rendu professionnel, montage dynamique, voix-off naturelle.",
    cat:   "recette",
    tag:   "Recette",
    start: 5,
  },
];

// ── Composant miniature ────────────────────────────────────────────────────────
function Thumbnail({ id, title, size = "md" }: { id: string; title: string; size?: "sm" | "md" }) {
  const h = size === "sm" ? "h-[72px]" : "h-[90px]";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
      alt={`Miniature : ${title}`}
      className={`w-full ${h} object-cover`}
      loading="lazy"
    />
  );
}

// ── Section principale ─────────────────────────────────────────────────────────
export default function Showreel() {
  const [activeId,  setActiveId]  = useState<string>(VIDEOS[0].id);
  const [activeCat, setActiveCat] = useState<CatKey>("all");

  const filtered   = activeCat === "all" ? VIDEOS : VIDEOS.filter(v => v.cat === activeCat);
  const activeVideo = VIDEOS.find(v => v.id === activeId) ?? VIDEOS[0];
  const cat        = CATEGORIES[activeVideo.cat];

  function pickCategory(key: CatKey) {
    setActiveCat(key);
    const pool = key === "all" ? VIDEOS : VIDEOS.filter(v => v.cat === key);
    if (pool.length && !pool.find(v => v.id === activeId)) setActiveId(pool[0].id);
  }

  function pickVideo(id: string) {
    setActiveId(id);
  }

  return (
    <section
      id="showreel"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "transparent" }}
    >
      {/* ── Fond ──────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[700px] w-[700px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)" }} />
        <div className="absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 70%)" }} />
        <div className="hex-grid absolute inset-0 opacity-30" />
        <div className="scanline absolute inset-0" />
      </div>
      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        {/* ══ HEADER ════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-10 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-pill badge-fuchsia mb-7">🎬 Kaméléon Studio en action</span>
          <h2 className="mb-4 tracking-tight">
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.8rem]">
              Voir, c&apos;est croire.
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-warm sm:text-4xl md:text-[2.8rem]">
              Voici ce qu&apos;on crée.
            </span>
          </h2>
          <p className="max-w-lg text-sm text-white/42 sm:text-base">
            Animations, podcasts, formations, recettes — chaque production 100&nbsp;% par IA,
            livrée en quelques jours.
          </p>
        </motion.div>

        {/* ══ FILTRES CATÉGORIES ════════════════════════════════════════════ */}
        <motion.div
          className="mb-7 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {(Object.entries(CATEGORIES) as [CatKey, typeof CATEGORIES[CatKey]][]).map(([key, { label, color, Icon }]) => {
            const isActive = activeCat === key;
            return (
              <motion.button
                key={key}
                onClick={() => pickCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200"
                style={isActive
                  ? { background: color, color: "#fff", boxShadow: `0 0 18px ${color}60` }
                  : { background: `${color}15`, color, border: `1px solid ${color}35` }
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {key !== "all" && (
                  <span className="ml-0.5 text-[0.6rem] font-black opacity-70">
                    {VIDEOS.filter(v => v.cat === key).length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ══ LAYOUT PRINCIPAL ═════════════════════════════════════════════ */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

          {/* ── LECTEUR ──────────────────────────────────────────────────── */}
          <motion.div
            className="w-full lg:flex-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            {/* Rainbow border container */}
            <div
              className="rounded-[1.4rem] p-[2px]"
              style={{
                background: `linear-gradient(135deg, ${cat.color}, #8b5cf6, #06b6d4, ${cat.color})`,
                boxShadow: `0 0 60px ${cat.color}40, 0 0 30px ${cat.color}25`,
                transition: "box-shadow 0.5s ease",
              }}
            >
              <div className="overflow-hidden rounded-[calc(1.4rem-2px)]"
                style={{ background: "#08080f" }}>

                {/* Rainbow top accent */}
                <div className="h-[3px]" style={{ background: "var(--gradient-rainbow-full)" }} />

                {/* YouTube iframe — key force-remounts on video change */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    className="aspect-video"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeId}?rel=0&modestbranding=1&color=white${activeVideo.start ? `&start=${activeVideo.start}` : ""}`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Info panel below player */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`info-${activeId}`}
                    className="flex items-start justify-between gap-4 px-5 py-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5 flex items-center gap-2 flex-wrap">
                        <span
                          className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-wider"
                          style={{ background: `${cat.color}22`, color: cat.color, border: `1px solid ${cat.color}40` }}
                        >
                          <cat.Icon className="h-2.5 w-2.5" />
                          {cat.label}
                        </span>
                        {activeVideo.tag && (
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.58rem] font-semibold text-white/30">
                            {activeVideo.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">
                        {activeVideo.title}
                      </h3>
                      <p className="mt-1 text-[0.78rem] text-white/38 line-clamp-2">{activeVideo.desc}</p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${activeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-xl border border-white/10 p-2.5 text-white/30 transition-all hover:border-white/25 hover:text-white/70"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ── PLAYLIST SIDEBAR ─────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-2.5 lg:w-[310px] lg:shrink-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Count label */}
            <p className="mb-1 px-1 text-[0.68rem] font-bold uppercase tracking-widest text-white/25">
              {filtered.length} production{filtered.length > 1 ? "s" : ""}
            </p>

            {/* Scrollable list */}
            <div className="showreel-playlist flex flex-col gap-2.5 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1">
              <AnimatePresence mode="popLayout">
                {filtered.map((video, i) => {
                  const vcat     = CATEGORIES[video.cat];
                  const isActive = video.id === activeId;
                  return (
                    <motion.button
                      key={video.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      onClick={() => pickVideo(video.id)}
                      className="group flex w-full items-stretch gap-0 overflow-hidden rounded-xl text-left transition-all duration-200"
                      style={isActive
                        ? {
                            background: `${vcat.color}12`,
                            border: `1px solid ${vcat.color}45`,
                            boxShadow: `0 0 20px ${vcat.color}22`,
                          }
                        : {
                            background: "rgba(255,255,255,0.028)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                      }
                    >
                      {/* Active indicator bar */}
                      <div
                        className="w-[3px] shrink-0 rounded-l-xl transition-all duration-300"
                        style={{ background: isActive ? vcat.color : "transparent" }}
                      />

                      {/* Thumbnail */}
                      <div className="relative w-[120px] shrink-0 overflow-hidden">
                        <Thumbnail id={video.id} title={video.title} size="sm" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/45 transition-opacity duration-200 group-hover:bg-black/25">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                            style={{ background: isActive ? vcat.color : "rgba(255,255,255,0.2)" }}
                          >
                            <Play className="h-3.5 w-3.5 fill-white text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Text info */}
                      <div className="flex flex-col justify-center gap-1 px-3 py-2.5">
                        <span
                          className="flex items-center gap-1 text-[0.58rem] font-black uppercase tracking-wider"
                          style={{ color: vcat.color }}
                        >
                          <vcat.Icon className="h-2.5 w-2.5" />
                          {vcat.label}
                        </span>
                        <p className={`text-[0.78rem] font-semibold leading-tight line-clamp-2 ${isActive ? "text-white" : "text-white/65 group-hover:text-white/85"} transition-colors`}>
                          {video.title}
                        </p>
                        {video.tag && (
                          <span className="text-[0.6rem] text-white/25">{video.tag}</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ══ BANDE CATÉGORIES VISUELLES (mobile scroll) ════════════════════ */}
        <motion.div
          className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {(Object.entries(CATEGORIES).filter(([k]) => k !== "all") as [CatKey, typeof CATEGORIES[CatKey]][]).map(([key, { label, color, Icon }]) => (
            <button
              key={key}
              onClick={() => pickCategory(key)}
              className="flex flex-col items-center gap-2 rounded-2xl py-3 text-center transition-all duration-200"
              style={activeCat === key
                ? { background: `${color}22`, border: `1px solid ${color}55` }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: `${color}25` }}>
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <span className="text-[0.6rem] font-bold leading-tight text-white/50">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-sm font-black text-white"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
              boxShadow: "0 4px 28px rgba(217,70,239,0.4)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 40px rgba(217,70,239,0.55)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Je veux une production comme ça
          </motion.a>
          <a
            href="https://www.youtube.com/@3Dkamstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white/60 transition-all hover:border-white/25 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Voir toute la chaîne YouTube
          </a>
        </motion.div>
      </div>

      {/* Fondu bas */}
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07070f] to-transparent" />
    </section>
  );
}
