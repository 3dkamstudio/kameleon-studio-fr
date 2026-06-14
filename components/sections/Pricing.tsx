"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check, ArrowRight, Minus, Clock, Globe, Zap, Shield, Layers, Wrench } from "lucide-react";
import Sparkles from "@/components/ui/Sparkles";

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// ── Plans ─────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    badge:     "ESSENTIEL",
    label:     "Landing Page",
    sub:       "Tout en une seule page percutante",
    forWho:    "Lancer votre activité ou moderniser votre image rapidement",
    price:     "800",
    delay:     "2 à 4 jours ouvrés",
    color:     "#06b6d4",
    colorTo:   "#22c55e",
    glow:      "rgba(6,182,212,0.45)",
    highlight: false,
    includes: [
      "1 page structurée en sections complètes",
      "Design sur-mesure (couleurs, logo, typo)",
      "Animations soignées — survols, scroll, transitions",
      "100% responsive — mobile, tablette, desktop",
      "Formulaire de contact fonctionnel",
      "SEO de base — titres, balises, vitesse",
      "1 série de retouches incluse",
      "Mise en ligne complète",
    ],
    notIncluded: "Pages multiples, espace membre, paiement en ligne",
  },
  {
    badge:     "PREMIUM",
    label:     "Site Web Complet",
    sub:       "Plusieurs pages, univers visuel sur mesure",
    forWho:    "Une présence digitale complète avec identité forte et multi-pages",
    price:     "1 600",
    delay:     "5 à 8 jours ouvrés",
    color:     "#d946ef",
    colorTo:   "#8b5cf6",
    glow:      "rgba(217,70,239,0.50)",
    highlight: true,
    includes: [
      "Jusqu'à 5 pages dédiées avec navigation",
      "Direction artistique personnalisée",
      "Animations avancées & micro-interactions au scroll",
      "100% responsive — mobile, tablette, desktop",
      "Formulaire connecté + tracking conversions",
      "SEO avancé — métadonnées, sitemap, SEO/page",
      "2 séries de retouches incluses",
      "Mise en ligne + config domaine complète",
    ],
    notIncluded: "Espace client, e-commerce, intégration CRM : sur devis",
  },
] as const;

const COMPARE = [
  { label: "Design sur-mesure",   landing: true,        complet: true         },
  { label: "Mobile / tablette",   landing: true,        complet: true         },
  { label: "SEO intégré",         landing: "Base",      complet: "Avancé"     },
  { label: "Pages",               landing: "1",         complet: "Jusqu'à 5"  },
  { label: "Animations",          landing: "Standard",  complet: "Avancées"   },
  { label: "Retouches incluses",  landing: "1×",        complet: "2×"         },
  { label: "Délai de livraison",  landing: "2–4j",      complet: "5–8j"       },
];

function Tick({ ok, color }: { ok: boolean | string; color: string }) {
  if (typeof ok === "string") return <span className="text-sm font-bold" style={{ color }}>{ok}</span>;
  if (ok) return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
      <Check className="h-3.5 w-3.5" style={{ color }} />
    </span>
  );
  return <Minus className="h-4 w-4 text-white/20" />;
}

// ── Composant ─────────────────────────────────────────────────────────────────
export default function Pricing() {
  return (
    <section id="tarifs" className="relative overflow-hidden px-6 py-28">

      {/* ── Fond ──────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Orbes de couleur — palette complète */}
        <div className="absolute -right-40 -top-24 h-[750px] w-[750px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.17) 0%, transparent 70%)" }} />
        <div className="absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)" }} />
        <div className="absolute right-1/4 top-2/3 h-[350px] w-[350px] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 70%)" }} />
        <div className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)" }} />
        {/* Grille et scan */}
        <div className="hex-grid absolute inset-0 opacity-40" />
        <div className="scanline absolute inset-0" />
        {/* Colonnes de lumière verticales */}
        {["15%", "50%", "85%"].map((l, i) => (
          <div key={i} className="absolute top-0 h-full w-px"
            style={{ left: l, background: `linear-gradient(to bottom,transparent,${["#06b6d4","#8b5cf6","#d946ef"][i]}50,transparent)`, opacity: 0.18 }} />
        ))}
      </div>

      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ════════════════════════════════════════════════════════════════
            EN-TÊTE
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <span className="badge-pill badge-cyan mb-8">🌐 Sites Web Premium</span>
          </motion.div>

          <motion.h2 className="mb-5 tracking-tight" variants={fadeUp}>
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.9rem]">
              Votre site web, c&apos;est votre
            </span>
            <span
              className="block font-display text-3xl font-black leading-tight sm:text-4xl md:text-[2.9rem]"
              style={{
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #d946ef, #f43f5e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              meilleur commercial 24h/24.
            </span>
          </motion.h2>

          <motion.p className="max-w-xl text-base text-white/50" variants={fadeUp}>
            Design unique sur mesure, animations soignées, SEO intégré.
            Paiement en deux fois — 50% à la commande, 50% à la livraison.
          </motion.p>

          {/* Stats rapides */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Zap,    val: "2 à 8j",  label: "Délai de livraison", color: "#eab308" },
              { icon: Globe,  val: "100%",     label: "Sur-mesure",         color: "#06b6d4" },
              { icon: Shield, val: "SEO",      label: "Intégré",            color: "#22c55e" },
              { icon: Layers, val: "Mobile",   label: "First",              color: "#d946ef" },
            ].map(({ icon: Icon, val, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl px-5 py-3 backdrop-blur-sm"
                style={{
                  background: `${color}0d`,
                  border: `1px solid ${color}35`,
                  boxShadow: `0 0 18px ${color}18`,
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${color}22` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div className="text-left">
                  <p className="font-display text-base font-black leading-none text-white">{val}</p>
                  <p className="text-[0.62rem] text-white/38">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 w-full max-w-xs">
            <div className="divider-rainbow" />
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            CARTES OFFRES
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
        >
          {PLANS.map((plan) => {
            const card = (
              <div className="relative flex flex-1 flex-col overflow-hidden rounded-[22px]"
                style={{ background: `linear-gradient(160deg, ${plan.color}10 0%, rgba(10,10,15,0.98) 55%)` }}>

                {/* Barre néon top */}
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${plan.color},${plan.colorTo})` }} />

                {/* Halo coin supérieur */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: `radial-gradient(circle, ${plan.color}55, transparent 70%)`, opacity: plan.highlight ? 0.5 : 0.32 }} />
                {/* Halo coin inférieur gauche */}
                <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full blur-3xl"
                  style={{ background: `radial-gradient(circle, ${plan.colorTo}40, transparent 70%)`, opacity: 0.25 }} />

                {plan.highlight && (
                  <div
                    className="absolute right-5 top-5 rounded-full px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-white"
                    style={{ background: `${plan.color}30`, border: `1px solid ${plan.color}55` }}
                  >
                    ✦ Recommandé
                  </div>
                )}

                <div className="relative z-10 flex flex-1 flex-col p-7 sm:p-9">

                  {/* Badge + titre */}
                  <div className="mb-6">
                    <span
                      className="mb-3 inline-block rounded-full px-3 py-1 text-[0.62rem] font-black uppercase tracking-widest"
                      style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}40`, color: plan.color }}
                    >
                      {plan.badge}
                    </span>
                    <h3 className="font-display text-2xl font-black leading-tight text-white">{plan.label}</h3>
                    <p className="mt-1 text-sm text-white/38">{plan.sub}</p>
                  </div>

                  {/* Prix */}
                  <div
                    className="mb-6 rounded-2xl px-6 py-5 text-center"
                    style={{ background: `${plan.color}08`, border: `1px solid ${plan.color}22` }}
                  >
                    <div className="flex items-end justify-center gap-1.5">
                      <span
                        className="font-display text-7xl font-black leading-none"
                        style={{
                          background: `linear-gradient(135deg, ${plan.color}, ${plan.colorTo})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {plan.price}
                      </span>
                      <div className="mb-2 text-left">
                        <p className="text-xl font-bold text-white/50">€</p>
                        <p className="whitespace-nowrap text-[0.6rem] text-white/25">paiement unique</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <Clock className="h-3.5 w-3.5" style={{ color: plan.color }} />
                      <span className="text-xs font-semibold text-white/45">
                        Délai&nbsp;:&nbsp;<strong className="text-white/70">{plan.delay}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Pour qui */}
                  <div
                    className="mb-5 rounded-xl px-4 py-3"
                    style={{ background: `${plan.color}07`, border: `1px solid ${plan.color}18` }}
                  >
                    <p className="text-[0.78rem] text-white/55">
                      <span className="font-bold" style={{ color: plan.color }}>Idéal si&nbsp;: </span>
                      {plan.forWho}
                    </p>
                  </div>

                  {/* Inclus */}
                  <ul className="mb-4 flex flex-1 flex-col gap-2.5">
                    {plan.includes.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}45` }}
                        >
                          <Check className="h-3 w-3" style={{ color: plan.color }} />
                        </span>
                        <span className="text-sm leading-snug text-white/62">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Non inclus */}
                  <p className="mb-6 text-[0.68rem] text-white/22 italic">
                    <Minus className="mr-1 inline h-3 w-3 opacity-45" />
                    {plan.notIncluded}
                  </p>

                  {/* CTA */}
                  <motion.a
                    href="#contact"
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-white"
                    style={{
                      background: `linear-gradient(135deg,${plan.color},${plan.colorTo})`,
                      boxShadow: `0 4px 24px ${plan.glow}`,
                    }}
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 42px ${plan.glow}` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Démarrer ce projet
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            );

            /* Carte Premium : border arc-en-ciel via wrapper 1px */
            if (plan.highlight) {
              return (
                <motion.div
                  key={plan.label}
                  variants={fadeUp}
                  whileHover={{ y: -8, transition: { duration: 0.22 } }}
                  className="flex flex-col rounded-3xl p-px"
                  style={{
                    background: "linear-gradient(135deg, #d946ef, #8b5cf6, #06b6d4, #22c55e)",
                    boxShadow: "0 0 80px rgba(217,70,239,0.45), 0 0 160px rgba(139,92,246,0.20)",
                  }}
                >
                  {card}
                </motion.div>
              );
            }

            return (
              <motion.div
                key={plan.label}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.22 } }}
                className="flex flex-col rounded-3xl"
                style={{ border: "1px solid rgba(6,182,212,0.22)" }}
              >
                {card}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            TABLEAU COMPARATIF
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-8 overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.02) 0%, rgba(10,10,15,0.98) 60%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#06b6d4,#8b5cf6,#d946ef,#f43f5e)" }} />
          <div className="p-6 sm:p-8">
            <p className="mb-6 font-display text-base font-black text-white/80">⚡ Comparaison rapide</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr>
                    <th className="pb-4 text-left text-[0.65rem] font-black uppercase tracking-widest text-white/25">Fonctionnalité</th>
                    <th className="pb-4 text-center">
                      <div className="inline-flex flex-col items-center gap-0.5">
                        <span className="text-[0.65rem] font-black uppercase tracking-widest" style={{ color: "#06b6d4" }}>Landing</span>
                        <span className="text-[0.6rem] font-bold text-white/30">800 €</span>
                      </div>
                    </th>
                    <th className="pb-4 text-center">
                      <div className="inline-flex flex-col items-center gap-0.5">
                        <span className="text-[0.65rem] font-black uppercase tracking-widest" style={{ color: "#d946ef" }}>Site Complet</span>
                        <span className="text-[0.6rem] font-bold text-white/30">1 600 €</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(({ label, landing, complet }, i) => (
                    <tr
                      key={label}
                      className={i < COMPARE.length - 1 ? "border-b border-white/[0.04]" : ""}
                      style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.012)" : "transparent" }}
                    >
                      <td className="py-3.5 pl-2 text-sm text-white/55">{label}</td>
                      <td className="py-3.5 text-center">
                        <div className="flex justify-center"><Tick ok={landing} color="#06b6d4" /></div>
                      </td>
                      <td className="py-3.5 text-center">
                        <div className="flex justify-center"><Tick ok={complet} color="#d946ef" /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            OPTIONS — Stripe / Calendly
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-8 overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg,rgba(234,179,8,0.07) 0%,rgba(10,10,15,0.97) 60%)",
            border: "1px solid rgba(234,179,8,0.18)",
          }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#eab308,#f97316,#f43f5e)" }} />
          <div className="p-6 sm:p-8">
            <p className="mb-1 font-display text-lg font-black text-white">Options — Paiement & Réservation en ligne</p>
            <p className="mb-6 text-sm text-white/38">
              Encaissez des paiements ou permettez la prise de RDV directement depuis votre site.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Paiement en ligne", sub: "Bouton Stripe intégré", price: "+120", color: "#eab308",
                  items: ["Configuration lien paiement sécurisé (Stripe)", "Intégration dans la page de votre choix", "Réception automatique des paiements & reçus"],
                  off:   ["Gestion stock, panier multi-produits : non inclus"],
                },
                {
                  title: "Prise de rendez-vous", sub: "Module Calendly intégré", price: "+100", color: "#f97316",
                  items: ["Intégration module réservation dans votre page", "Mise en cohérence visuelle avec le design", "Synchronisation avec votre agenda"],
                  off:   [],
                },
              ].map(({ title, sub, price, color, items, off }) => (
                <div key={title} className="rounded-2xl p-5" style={{ background: `${color}08`, border: `1px solid ${color}25` }}>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <span className="block font-display text-sm font-black text-white">{title}</span>
                      <span className="text-[0.68rem] text-white/32">{sub}</span>
                    </div>
                    <span className="shrink-0 font-display text-2xl font-black" style={{ color }}>{price}€</span>
                  </div>
                  <ul className="space-y-1.5">
                    {items.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                        <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color }} />{f}
                      </li>
                    ))}
                    {off.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/22">
                        <Minus className="mt-0.5 h-3 w-3 shrink-0" /><span className="line-through">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.68rem] text-white/22">
              Ces options s&apos;appuient sur vos propres comptes Stripe / Calendly — vous restez propriétaire à 100% de vos données.
            </p>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            TEASER MAINTENANCE
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-12 overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.07) 0%, rgba(6,182,212,0.05) 50%, rgba(10,10,15,0.98) 100%)",
            border: "1px solid rgba(34,197,94,0.20)",
          }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#22c55e,#06b6d4,#8b5cf6)" }} />
          <div className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.30)" }}>
                <Wrench className="h-5 w-5" style={{ color: "#22c55e" }} />
              </div>
              <div>
                <p className="font-display text-base font-black text-white">
                  Votre site livré — et après ?
                </p>
                <p className="mt-1 max-w-lg text-sm text-white/45">
                  Gardez-le sécurisé, à jour et fonctionnel dans le temps grâce à nos formules de maintenance mensuelle.
                  À partir de <span className="font-bold text-white/70">49 €/mois</span>, engagement 3 mois.
                </p>
              </div>
            </div>
            <motion.a
              href="#maintenance"
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white"
              style={{
                background: "linear-gradient(135deg,#22c55e,#06b6d4)",
                boxShadow: "0 4px 20px rgba(34,197,94,0.30)",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 6px 32px rgba(34,197,94,0.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              Voir la maintenance
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            CTA FINAL
        ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center gap-4">
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-2xl px-12 py-4 text-sm font-black text-white"
            style={{
              background: "linear-gradient(135deg,#06b6d4,#8b5cf6,#d946ef)",
              boxShadow: "0 4px 32px rgba(139,92,246,0.50)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 55px rgba(217,70,239,0.65)" }}
            whileTap={{ scale: 0.97 }}
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <p className="mt-1 max-w-xl text-center text-xs text-white/20">
            Tarifs TTC valables pour 2026. Tout projet démarre par un brief structuré inclus.
            Paiement en deux fois&nbsp;: 50% à la commande, 50% à la livraison.
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
