"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, BookOpen, Clock, TrendingDown, Layers } from "lucide-react";

import Image from "next/image";
import Sparkles from "@/components/ui/Sparkles";

// ── Grille dégressive BD ──────────────────────────────────────────────────────
const GRID: { qty: number; unit: number; total: number; save: number; best?: true }[] = [
  { qty: 1,  unit: 190, total: 190,  save: 0   },
  { qty: 2,  unit: 185, total: 370,  save: 3   },
  { qty: 3,  unit: 182, total: 546,  save: 4   },
  { qty: 4,  unit: 178, total: 712,  save: 6   },
  { qty: 5,  unit: 175, total: 875,  save: 8   },
  { qty: 6,  unit: 170, total: 1020, save: 11  },
  { qty: 7,  unit: 167, total: 1169, save: 12  },
  { qty: 8,  unit: 163, total: 1304, save: 14  },
  { qty: 9,  unit: 157, total: 1413, save: 17  },
  { qty: 10, unit: 150, total: 1500, save: 21, best: true },
];

const FEATURES = [
  "Direction artistique unique et cohérente",
  "Style graphique sur-mesure selon votre univers",
  "Accompagnement créatif du concept à la livraison",
  "2 retouches incluses par planche commandée",
  "Livraison haute résolution PNG + PDF",
  "Droits d'utilisation commerciale inclus",
];

const STATS = [
  { label: "Prix de départ",  value: "190€",  color: "#8b5cf6" },
  { label: "Meilleur tarif", value: "150€",   color: "#22c55e" },
  { label: "Économie max",   value: "−21%",   color: "#d946ef" },
  { label: "Retouches",      value: "2 / pl.", color: "#06b6d4" },
];

const rowVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};
const tbodyVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.035 } },
};

export default function PricingBD() {
  return (
    <section
      id="tarifs-bd"
      className="relative px-6 py-28"
      style={{ background: "transparent" }}
    >
      {/* ── Fond dynamique violet / cyan ──────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[700px] w-[700px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
        <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)" }} />
        <div className="hex-grid absolute inset-0 opacity-30" />
        <div className="scanline  absolute inset-0" />
        <div className="absolute top-0 h-full w-px" style={{ left: "65%", background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.22), transparent)", opacity: 0.6 }} />
      </div>

      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
        >
          <span className="badge-pill badge-violet mb-7">📖 Tarifs — Planches BD</span>
          <h2 className="mb-5 tracking-tight">
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Des planches qui racontent,
            </span>
            <span className="block font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl"
              style={{ color: "#8b5cf6" }}>
              à un tarif qui récompense l&rsquo;ambition.
            </span>
          </h2>
          <p className="max-w-xl text-base text-white/45">
            Chaque planche inclut direction artistique, retouches et droits commerciaux.
            Tarif dégressif jusqu&rsquo;à −21% dès 10 planches.
          </p>
        </motion.div>

        {/* ── Barre de stats ────────────────────────────────────────────── */}
        <motion.div
          className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          {STATS.map((s) => (
            <div key={s.label}
              className="flex flex-col items-center rounded-2xl py-5 text-center"
              style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}
            >
              <span className="font-display text-3xl font-black leading-none sm:text-4xl" style={{ color: s.color }}>
                {s.value}
              </span>
              <span className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/35">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Corps principal : 2 colonnes — grille à gauche, card à droite ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">

          {/* ── Colonne gauche : Grille tarifaire ── */}
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(160deg, rgba(139,92,246,0.06) 0%, rgba(9,8,15,0.98) 45%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#8b5cf6,#06b6d4,#22c55e)" }} />
            <div className="p-6 sm:p-8">

              {/* En-tête grille */}
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-black text-white">
                    Grille tarifaire <span style={{ color: "#8b5cf6" }}>dégressive</span>
                  </h3>
                  <p className="mt-1 text-xs text-white/35">
                    Le tarif le plus bas s&rsquo;applique automatiquement à toutes les planches commandées.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)" }}>
                  <TrendingDown className="h-4 w-4" style={{ color: "#22c55e" }} />
                  <span className="font-display text-sm font-black" style={{ color: "#22c55e" }}>Jusqu&rsquo;à −21%</span>
                </div>
              </div>

              {/* Table */}
                <div className="overflow-x-auto">
                <table className="w-full min-w-[460px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="pb-3 text-left text-[0.62rem] font-black uppercase tracking-widest" style={{ color: "#8b5cf6" }}>Quantité</th>
                      <th className="pb-3 text-right text-[0.62rem] font-black uppercase tracking-widest text-white/30">Prix / planche</th>
                      <th className="pb-3 text-right text-[0.62rem] font-black uppercase tracking-widest text-white/30">Total TTC</th>
                      <th className="pb-3 text-right text-[0.62rem] font-black uppercase tracking-widest text-white/30">Économie</th>
                    </tr>
                  </thead>
                  <motion.tbody
                    variants={tbodyVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {GRID.map(({ qty, unit, total, save, best }) => (
                      <motion.tr key={qty}
                        variants={rowVariants}
                        className="border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.025]"
                        style={best ? { background: "linear-gradient(90deg,rgba(139,92,246,0.14),rgba(6,182,212,0.06))" } : undefined}
                      >
                        <td className="py-3.5 text-left">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg font-display text-sm font-black"
                              style={best
                                ? { background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", color: "#fff" }
                                : { background: "rgba(139,92,246,0.10)", color: "#8b5cf6" }
                              }>
                              {qty}
                            </span>
                            <span className="text-sm font-medium text-white/60">{qty === 1 ? "planche" : "planches"}</span>
                            {best && (
                              <span className="rounded-full px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-wider"
                                style={{ background: "rgba(139,92,246,0.20)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.35)" }}>
                                ★ Meilleur prix
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 text-right font-display text-base font-bold text-white/45">{unit} €</td>
                        <td className="py-3.5 text-right">
                          <span className="font-display text-xl font-black" style={{ color: best ? "#8b5cf6" : "#06b6d4" }}>
                            {total.toLocaleString("fr-FR")} €
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          {save > 0 ? (
                            <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-display text-xs font-bold"
                              style={{ background: "rgba(34,197,94,0.10)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.22)" }}>
                              −{save}%
                            </span>
                          ) : (
                            <span className="text-xs text-white/20">—</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
                </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border-t border-white/[0.05] pt-5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />
                <p className="text-[0.68rem] leading-relaxed text-white/30">
                  Tarif dégressif appliqué automatiquement à <strong className="text-white/50">toutes</strong> les planches de la commande.
                  Paiement en deux fois : 50% à la commande, 50% à la livraison.
                </p>
              </div>
            </div>
          </motion.div>
          </motion.div>

          {/* ── Colonne droite : Feature card plein cadre ── */}
          <motion.div
            className="relative overflow-hidden rounded-3xl min-h-[560px] max-lg:min-h-[800px]"
            style={{
              border: "1px solid rgba(139,92,246,0.35)",
              boxShadow: "0 0 80px rgba(139,92,246,0.12), 0 24px 48px rgba(0,0,0,0.5)",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Image plein fond */}
            <Image
              src="/prest-bd.webp"
              alt="Planche BD"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />

            {/* Overlay gradient fort bas → haut */}
            <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(5,4,16,1) 0%, rgba(5,4,16,0.97) 25%, rgba(5,4,16,0.80) 50%, rgba(5,4,16,0.30) 72%, rgba(5,4,16,0.05) 100%)" }} />
            {/* Teinture violet latérale */}
            <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, transparent 55%)" }} />

            {/* Barre top */}
            <div className="absolute inset-x-0 top-0 z-20 h-[3px]" style={{ background: "linear-gradient(90deg,#8b5cf6,#06b6d4,#22c55e)" }} />

            {/* Titre en haut */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-4 p-7 sm:p-9" style={{ paddingTop: "calc(3px + 8rem)" }}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(139,92,246,0.30)", border: "1px solid rgba(139,92,246,0.55)", backdropFilter: "blur(8px)" }}>
                <BookOpen className="h-7 w-7" style={{ color: "#8b5cf6" }} />
              </div>
              <div>
                <h3 className="font-display text-4xl font-black drop-shadow-lg sm:text-5xl">
                  <span className="text-white">Planches </span>
                  <span className="text-gradient-cool">BD</span>
                </h3>
                <p className="text-xs text-white/55">Narration · Identité · Direction artistique</p>
              </div>
            </div>

            {/* Contenu overlayé en bas */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col p-7 sm:p-9">

              {/* Ligne déco */}
              <div className="mb-5 h-px" style={{ background: "linear-gradient(90deg,#8b5cf6,#06b6d4,transparent)" }} />

              {/* Prix hero */}
              <div className="mb-1 flex items-end gap-2">
                <span className="font-display text-[4rem] font-black leading-none drop-shadow-lg" style={{ color: "#8b5cf6" }}>190</span>
                <div className="mb-2 flex flex-col">
                  <span className="text-lg font-bold text-white/60">€</span>
                  <span className="text-xs text-white/40">/ planche</span>
                </div>
              </div>
              <div className="mb-6 flex items-center gap-2">
                <TrendingDown className="h-3.5 w-3.5" style={{ color: "#22c55e" }} />
                <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>Dégressif jusqu&rsquo;à 150€ dès 10 planches</span>
              </div>

              {/* Features */}
              <ul className="mb-6 flex flex-col gap-2.5">
                {FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ background: "rgba(139,92,246,0.25)", border: "1px solid rgba(139,92,246,0.55)" }}>
                      <Check className="h-2.5 w-2.5" style={{ color: "#8b5cf6" }} />
                    </span>
                    <span className="text-sm font-medium leading-snug text-white/85">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Formats */}
              <div className="mb-6 rounded-2xl px-4 py-3"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(139,92,246,0.22)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-3.5 w-3.5" style={{ color: "#8b5cf6" }} />
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#8b5cf6" }}>Formats de livraison</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["PNG haute résolution", "PDF vectoriel", "Fichiers sources"].map(t => (
                    <span key={t} className="rounded-lg px-2.5 py-1 text-[0.68rem] font-semibold text-white/70"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.a href="#contact"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-sm font-black text-white"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 4px 24px rgba(139,92,246,0.50)" }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(139,92,246,0.75)" }}
                whileTap={{ scale: 0.97 }}
              >
                Commander mes planches
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
