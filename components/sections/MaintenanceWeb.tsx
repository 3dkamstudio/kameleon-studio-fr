"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check, ArrowRight, Shield, Clock, AlertCircle, XCircle, RefreshCw, Wrench } from "lucide-react";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";
import Sparkles from "@/components/ui/Sparkles";

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const SPEECH = [
  "Un site non maintenu, c'est une porte ouverte aux problèmes 🔓 — on s'en occupe !",
  "La maintenance, c'est de la prévention continue. Pas juste quand ça tombe en panne.",
  "Un site à jour et sécurisé, c'est un site qui inspire confiance 💚",
];

// ── Plans ─────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    badge:     "ESSENTIEL",
    label:     "Maintenance Landing Page",
    forWho:    "Landing page, page de vente, page de capture, page événementielle, page formation.",
    price:     "49",
    color:     "#06b6d4",
    colorTo:   "#22c55e",
    glow:      "rgba(6,182,212,0.40)",
    highlight: false,
    includes: [
      "Mises à jour techniques",
      "Sauvegarde mensuelle",
      "Vérification sécurité de base",
      "Vérification formulaire/contact",
      "Correction bug mineur",
      "Jusqu'à 30 min de petites modifications par mois",
      "Vérification de la présence des pages légales essentielles",
      "Mise à jour simple des contenus légaux fournis par le client",
      "Mise à jour des informations de contact ou d'entreprise",
      "Vérification des liens vers les mentions légales, la politique de confidentialité et les cookies",
    ],
  },
  {
    badge:     "COMPLET",
    label:     "Maintenance Site Web Complet",
    forWho:    "Site vitrine de 2 à 5 pages ou plus.",
    price:     "79",
    color:     "#8b5cf6",
    colorTo:   "#d946ef",
    glow:      "rgba(139,92,246,0.50)",
    highlight: true,
    includes: [
      "Mises à jour techniques",
      "Sauvegardes mensuelles",
      "Surveillance sécurité",
      "Vérification des formulaires",
      "Correction bugs mineurs",
      "Petites modifications textes/images",
      "Jusqu'à 1h d'intervention par mois",
      "Mini contrôle SEO de base",
      "Vérification de la présence des pages légales essentielles",
      "Mise à jour simple des contenus légaux fournis par le client",
      "Mise à jour des informations de contact ou d'entreprise",
      "Vérification des liens vers les mentions légales, la politique de confidentialité et les cookies",
    ],
  },
] as const;

const HORS_FORFAIT = [
  "Améliorations majeures",
  "Modifications importantes",
  "Ajout de nouvelles sections",
  "Ajout de nouvelles pages",
  "Ajout de nouvelles fonctionnalités",
  "Ajout de nouveaux éléments graphiques",
  "Refontes partielles ou complètes",
  "Optimisations avancées",
  "Demandes urgentes non prévues",
  "Rédaction juridique complète",
  "Mise en conformité RGPD avancée",
  "Génération de CGV/CGU",
  "Gestion complète du bandeau cookies",
  "Audits juridiques approfondis",
];

// ── Composant ─────────────────────────────────────────────────────────────────
export default function MaintenanceWeb() {
  return (
    <section id="maintenance" className="relative overflow-hidden px-6 py-28">

      {/* ── Fond ──────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-20 h-[700px] w-[700px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.13) 0%, transparent 70%)" }} />
        <div className="absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)" }} />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
        <div className="hex-grid absolute inset-0 opacity-35" />
        <div className="scanline absolute inset-0" />
        {["20%", "50%", "80%"].map((l, i) => (
          <div key={i} className="absolute top-0 h-full w-px"
            style={{ left: l, background: `linear-gradient(to bottom,transparent,${["#22c55e","#06b6d4","#8b5cf6"][i]}40,transparent)`, opacity: 0.12 }} />
        ))}
      </div>

      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ════════════════════════════════════════════════════════
            EN-TÊTE
        ════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <span className="badge-pill badge-green mb-8">🛡️ Maintenance Web</span>
          </motion.div>

          <motion.h2 className="mb-5 tracking-tight" variants={fadeUp}>
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.9rem]">
              Votre site, sécurisé, stable
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-tech sm:text-4xl md:text-[2.9rem]">
              et à jour chaque mois.
            </span>
          </motion.h2>

          <motion.p className="max-w-2xl text-base text-white/50" variants={fadeUp}>
            La maintenance web est un accompagnement préventif continu — pas une intervention ponctuelle quand le site tombe en panne.
            Elle assure le bon fonctionnement du site, effectue les mises à jour nécessaires, surveille les éléments techniques essentiels
            et évite que votre site ne se dégrade avec le temps.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 w-full max-w-xs">
            <div className="divider-rainbow" />
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════
            CARTES ABONNEMENT
        ════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.label}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              className="group relative flex flex-col overflow-hidden rounded-3xl"
              style={{
                background: `linear-gradient(160deg, ${plan.color}12 0%, rgba(10,10,15,0.97) 55%)`,
                border: `1px solid ${plan.highlight ? plan.color + "45" : "rgba(255,255,255,0.08)"}`,
                boxShadow: plan.highlight ? `0 0 80px ${plan.glow}, 0 0 0 1px ${plan.color}22` : "none",
              }}
            >
              {/* Barre néon top */}
              <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${plan.color},${plan.colorTo})` }} />

              {/* Corner glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full blur-3xl opacity-30"
                style={{ background: `radial-gradient(circle, ${plan.color}60, transparent 70%)` }} />

              {plan.highlight && (
                <div
                  className="absolute right-5 top-5 rounded-full px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-white"
                  style={{ background: `${plan.color}28`, border: `1px solid ${plan.color}45` }}
                >
                  ✦ Recommandé
                </div>
              )}

              <div className="relative z-10 flex flex-1 flex-col p-7 sm:p-9">

                {/* Badge + titre */}
                <div className="mb-6">
                  <span
                    className="mb-3 inline-block rounded-full px-3 py-1 text-[0.62rem] font-black uppercase tracking-widest"
                    style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}38`, color: plan.color }}
                  >
                    {plan.badge}
                  </span>
                  <h3 className="font-display text-2xl font-black leading-tight text-white">{plan.label}</h3>
                </div>

                {/* Prix */}
                <div
                  className="mb-6 rounded-2xl px-6 py-5 text-center"
                  style={{ background: `${plan.color}09`, border: `1px solid ${plan.color}20` }}
                >
                  <div className="flex items-end justify-center gap-2">
                    <span
                      className="font-display text-6xl font-black leading-none sm:text-7xl"
                      style={{ color: plan.color }}
                    >
                      {plan.price}
                    </span>
                    <div className="mb-2 text-left">
                      <p className="text-lg font-bold text-white/60">€</p>
                      <p className="whitespace-nowrap text-[0.6rem] text-white/28">/ mois</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Clock className="h-3.5 w-3.5" style={{ color: plan.color }} />
                    <span className="text-xs font-semibold text-white/50">
                      Engagement&nbsp;:&nbsp;<strong className="text-white/75">3 mois minimum</strong>
                    </span>
                  </div>
                </div>

                {/* Pour qui */}
                <div
                  className="mb-5 rounded-xl px-4 py-3"
                  style={{ background: `${plan.color}07`, border: `1px solid ${plan.color}18` }}
                >
                  <p className="text-[0.78rem] text-white/55">
                    <span className="font-bold" style={{ color: plan.color }}>Idéal pour&nbsp;: </span>
                    {plan.forWho}
                  </p>
                </div>

                {/* Inclus */}
                <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                  {plan.includes.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}45` }}
                      >
                        <Check className="h-3 w-3" style={{ color: plan.color }} />
                      </span>
                      <span className="text-sm leading-snug text-white/65">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-white"
                  style={{
                    background: `linear-gradient(135deg,${plan.color},${plan.colorTo})`,
                    boxShadow: `0 4px 22px ${plan.glow}`,
                  }}
                  whileHover={{ scale: 1.03, boxShadow: `0 8px 40px ${plan.glow}` }}
                  whileTap={{ scale: 0.97 }}
                >
                  Demander la maintenance de mon site
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════════════════════════════════════════════════════
            BLOCS INFORMATIFS 2 × 2
        ════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-2"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
        >

          {/* Mentions légales */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-3xl"
            style={{ background: "linear-gradient(160deg,rgba(6,182,212,0.08) 0%,rgba(10,10,15,0.97) 60%)", border: "1px solid rgba(6,182,212,0.20)" }}
          >
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#06b6d4,#8b5cf6)" }} />
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(6,182,212,0.15)" }}>
                  <Shield className="h-4 w-4" style={{ color: "#06b6d4" }} />
                </div>
                <h4 className="font-display text-base font-black text-white">Mentions légales & conformité</h4>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-white/55">
                La maintenance peut inclure la mise à jour simple des contenus légaux fournis par le client —
                mentions légales, politique de confidentialité, CGV, informations de contact, liens obligatoires ou textes liés aux cookies.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-white/55">
                Kaméléon Studio peut intégrer ou mettre à jour ces éléments sur votre site, mais ne fournit pas de conseil juridique.
                Le client reste responsable du contenu légal transmis et de sa conformité réglementaire.
              </p>
              <div className="rounded-xl p-3.5" style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.14)" }}>
                <p className="text-[0.72rem] leading-relaxed text-white/38">
                  Toute rédaction juridique complète, mise en conformité RGPD avancée, génération de CGV/CGU,
                  gestion complète du bandeau cookies ou audit juridique approfondi relève du hors forfait
                  et peut faire l'objet d'un devis complémentaire.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reprise après interruption */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-3xl"
            style={{ background: "linear-gradient(160deg,rgba(234,179,8,0.08) 0%,rgba(10,10,15,0.97) 60%)", border: "1px solid rgba(234,179,8,0.20)" }}
          >
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#eab308,#f97316)" }} />
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(234,179,8,0.15)" }}>
                  <RefreshCw className="h-4 w-4" style={{ color: "#eab308" }} />
                </div>
                <h4 className="font-display text-base font-black text-white">Reprise après interruption</h4>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/55">
                La maintenance est un service préventif continu. En cas d'interruption de l'abonnement,
                Kaméléon Studio ne peut garantir l'état technique, la sécurité ou le bon fonctionnement
                du site pendant la période non couverte.
              </p>
              <div className="rounded-xl p-3.5" style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
                <p className="text-[0.72rem] leading-relaxed text-white/38">
                  Une reprise d'abonnement après interruption peut nécessiter un audit préalable de l'état du site,
                  facturable selon l'ampleur des vérifications nécessaires.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Non inclus */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-3xl"
            style={{ background: "linear-gradient(160deg,rgba(244,63,94,0.07) 0%,rgba(10,10,15,0.97) 60%)", border: "1px solid rgba(244,63,94,0.20)" }}
          >
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#f43f5e,#f97316)" }} />
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(244,63,94,0.15)" }}>
                  <XCircle className="h-4 w-4" style={{ color: "#f43f5e" }} />
                </div>
                <h4 className="font-display text-base font-black text-white">Non inclus dans la maintenance</h4>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-white/55">
                Les améliorations majeures, modifications importantes, ajouts de nouvelles sections, nouvelles pages,
                nouvelles fonctionnalités ou nouveaux éléments graphiques ne sont pas inclus dans l'abonnement de maintenance.
              </p>
              <p className="text-sm font-semibold leading-relaxed" style={{ color: "#f43f5e88" }}>
                Ces demandes relèvent du hors forfait et nécessitent une validation préalable du client avant toute intervention.
              </p>
            </div>
          </motion.div>

          {/* Hors forfait */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-3xl"
            style={{ background: "linear-gradient(160deg,rgba(139,92,246,0.08) 0%,rgba(10,10,15,0.97) 60%)", border: "1px solid rgba(139,92,246,0.20)" }}
          >
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} />
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(139,92,246,0.15)" }}>
                  <AlertCircle className="h-4 w-4" style={{ color: "#8b5cf6" }} />
                </div>
                <h4 className="font-display text-base font-black text-white">Hors forfait</h4>
              </div>
              <p className="mb-3 text-sm text-white/55">
                Toute demande dépassant le cadre de la maintenance mensuelle est considérée comme une intervention hors forfait&nbsp;:
              </p>
              <ul className="mb-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {HORS_FORFAIT.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.72rem] text-white/45">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#8b5cf6" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl p-3.5" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)" }}>
                <p className="text-[0.72rem] leading-relaxed text-white/40">
                  Ces interventions font l'objet d'un devis complémentaire ou sont facturées au tarif horaire de{" "}
                  <span className="font-bold" style={{ color: "#8b5cf6" }}>50 €/h</span>{" "}
                  après validation préalable du client.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════
            PROTECTION + CTA
        ════════════════════════════════════════════════════════ */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-4 text-center"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <Wrench className="mx-auto mb-2 h-4 w-4 text-white/25" />
            <p className="text-sm font-semibold text-white/45">
              Aucun travail supplémentaire ne sera réalisé sans validation préalable du client.
            </p>
          </div>

          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-2xl px-10 py-4 text-sm font-black text-white"
            style={{
              background: "linear-gradient(135deg,#22c55e,#06b6d4,#8b5cf6)",
              boxShadow: "0 4px 30px rgba(34,197,94,0.35)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 50px rgba(34,197,94,0.50)" }}
            whileTap={{ scale: 0.97 }}
          >
            Demander la maintenance de mon site
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* ── Kame ──────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-10 right-8 z-20 hidden lg:flex">
        <KameSpeech variants={SPEECH} position="left">
          <Kame context="thumbsup" src="/kame-jump.png" size={185} />
        </KameSpeech>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
