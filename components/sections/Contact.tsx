"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Send, Mail, User, MessageSquare, ChevronDown,
  CheckCircle2, Clock, Zap, Shield,
} from "lucide-react";
import Image from "next/image";
import Sparkles from "@/components/ui/Sparkles";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";

const CONTACT_SPEECH = [
  "Parlez-moi de votre projet ! Je transmets directement à l'équipe 😊",
  "On répond sous 24h — ou sur WhatsApp si vous préférez !",
  "Remplissez le formulaire, on prépare déjà votre brief.",
];

// ── Variants ──────────────────────────────────────────────────────────────────
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// ── Données formulaire ────────────────────────────────────────────────────────
const SERVICES = [
  { value: "",       label: "Choisissez une prestation…" },
  { value: "video",  label: "🎬 Production Vidéo" },
  { value: "bd",     label: "📖 Bande Dessinée" },
  { value: "web",    label: "🌐 Site Web" },
  { value: "autre",  label: "✨ Autre / Plusieurs prestations" },
];
const BUDGETS = [
  { value: "",        label: "Budget estimé (optionnel)…" },
  { value: "lt500",   label: "< 500 €" },
  { value: "500-1k",  label: "500 € — 1 000 €" },
  { value: "1k-3k",   label: "1 000 € — 3 000 €" },
  { value: "gt3k",    label: "> 3 000 €" },
  { value: "notsure", label: "Je ne sais pas encore" },
];

// ── Composants ────────────────────────────────────────────────────────────────
function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-widest text-white/35">
        <Icon className="h-3 w-3" />
        {label}
      </label>
      {children}
    </motion.div>
  );
}

const inputBase =
  "w-full rounded-xl border border-white/[0.10] bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-white/22 outline-none transition-all duration-200 focus:border-fuchsia-500/60 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(217,70,239,0.15),inset_0_0_0_1px_rgba(217,70,239,0.20)] backdrop-blur-sm";

// ── Section principale ────────────────────────────────────────────────────────
export default function Contact() {
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", email: "", service: "", budget: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xykalpon", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nom:        form.nom,
          Email:      form.email,
          Prestation: form.service,
          Budget:     form.budget,
          Message:    form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(
          (data?.errors as { message: string }[] | undefined)?.[0]?.message ??
          "Une erreur est survenue. Réessayez ou écrivez-nous directement."
        );
      }
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSent(false);
    setError(null);
    setForm({ nom: "", email: "", service: "", budget: "", message: "" });
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "transparent" }}
    >
      {/* ── Fond ────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 -top-40 h-[900px] w-[900px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.14) 0%, transparent 65%)" }} />
        <div className="absolute -right-60 bottom-0 h-[800px] w-[800px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)" }} />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)" }} />
        <div className="hex-grid absolute inset-0 opacity-20" />
        <div className="scanline  absolute inset-0" />
        {/* Rayons lumineux diagonaux */}
        {["15%","42%","68%","88%"].map((l, i) => (
          <div key={i} className="absolute top-0 h-full w-px"
            style={{ left: l, background: `linear-gradient(to bottom,transparent,${["#d946ef","#8b5cf6","#06b6d4","#d946ef"][i]}18,transparent)` }} />
        ))}
      </div>
      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">

        {/* ══ HEADER ════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <span className="badge-pill badge-violet mb-7">✦ Parlons de votre projet</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4 tracking-tight">
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Votre projet mérite
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-cool sm:text-4xl md:text-5xl">
              une équipe dédiée.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-md text-sm leading-relaxed text-white/45 sm:text-base">
            Décrivez votre idée. On revient vers vous sous 24h avec une proposition claire, sur-mesure et sans engagement.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 w-full max-w-xs">
            <div className="divider-rainbow" />
          </motion.div>
        </motion.div>

        {/* ══ CONTENU PRINCIPAL ═════════════════════════════════════════════ */}
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-stretch lg:gap-12">

          {/* ── COLONNE GAUCHE — Image équipe ─────────────────────────── */}
          <motion.div
            className="w-full lg:w-[44%] lg:shrink-0"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <div className="flex h-full flex-col gap-6">

              {/* Carte image avec neon border */}
              <div className="relative flex-1">
                {/* Glow halo derrière */}
                <div className="pointer-events-none absolute -inset-4 rounded-3xl blur-[40px] opacity-40"
                  style={{ background: "radial-gradient(ellipse, rgba(217,70,239,0.35) 0%, rgba(139,92,246,0.20) 50%, transparent 75%)" }} />

                {/* Wrapper gradient border */}
                <div
                  className="relative overflow-hidden rounded-3xl"
                  style={{
                    padding: "1.5px",
                    background: "linear-gradient(135deg,#d946ef,#8b5cf6 35%,#06b6d4 65%,#22c55e)",
                  }}
                >
                  <div className="relative overflow-hidden rounded-[calc(1.5rem-1.5px)]"
                    style={{ background: "#0d0d18" }}>

                    {/* Image équipe */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image
                        src="/team-ks.png"
                        alt="L'équipe Kaméléon Studio — production vidéo, BD et web par IA"
                        width={600}
                        height={600}
                        className="w-full object-cover"
                        priority
                      />
                    </motion.div>

                    {/* Overlay dégradé bas pour fondre avec fond */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
                      style={{ background: "linear-gradient(to top,rgba(13,13,24,0.90),transparent)" }} />

                    {/* Chips stats superposées */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-3 p-5">
                      {[
                        { icon: Clock,   val: "< 24h",    label: "Réponse",  c: "#22c55e" },
                        { icon: Zap,     val: "Gratuit",  label: "1er échange", c: "#eab308" },
                        { icon: Shield,  val: "100%",     label: "Sur-mesure", c: "#d946ef" },
                      ].map(({ icon: Icon, val, label, c }) => (
                        <div key={label}
                          className="flex flex-col items-center gap-0.5 rounded-2xl px-3.5 py-2.5 text-center backdrop-blur-md"
                          style={{ background: "rgba(8,8,18,0.75)", border: `1px solid ${c}35` }}>
                          <Icon className="mb-0.5 h-3.5 w-3.5" style={{ color: c }} />
                          <span className="font-display text-sm font-black leading-none" style={{ color: c }}>{val}</span>
                          <span className="text-[0.6rem] font-medium text-white/40">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Infos contact en dessous de l'image */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  { icon: Mail,  label: "Email direct",      val: "infos.kamstudio@gmail.com", color: "#d946ef" },
                  { icon: Zap,   label: "Premier échange",   val: "Toujours gratuit",            color: "#22c55e" },
                ].map(({ icon: Icon, label, val, color }) => (
                  <div key={label}
                    className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 backdrop-blur-sm"
                    style={{ borderLeft: `2px solid ${color}50` }}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                      <Icon className="h-4 w-4" style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-black uppercase tracking-wider text-white/28">{label}</p>
                      <p className="mt-0.5 truncate text-xs font-semibold text-white/75">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── COLONNE DROITE — Formulaire ───────────────────────────── */}
          <motion.div
            className="w-full flex-1"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                /* ── SUCCESS ─────────────────────────────────────────── */
                <motion.div
                  key="success"
                  className="flex h-full flex-col items-center justify-center gap-6 py-20 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full blur-2xl opacity-50"
                      style={{ background: "rgba(34,197,94,0.3)" }} />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl"
                      style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)" }}>
                      <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black text-white">Mission reçue !</h3>
                    <p className="mt-3 max-w-sm text-sm text-white/50">
                      Notre équipe est déjà sur votre dossier. Attendez-vous à une réponse personnalisée sous 24h.
                    </p>
                  </div>
                  <motion.button
                    onClick={handleReset}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-8 py-3 text-sm font-semibold text-white/55 transition-colors hover:text-white/90"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Envoyer une autre demande
                  </motion.button>
                </motion.div>
              ) : (
                /* ── FORMULAIRE ──────────────────────────────────────── */
                <motion.div
                  key="form"
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Card avec gradient border */}
                  <div
                    className="h-full rounded-3xl"
                    style={{
                      padding: "1.5px",
                      background: "linear-gradient(135deg,#d946ef 0%,#8b5cf6 35%,#06b6d4 65%,#22c55e 100%)",
                    }}
                  >
                    <div
                      className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1.5px)] p-7 sm:p-9"
                      style={{ background: "rgba(8,8,20,0.97)", backdropFilter: "blur(20px)" }}
                    >
                      {/* Halo coin haut droit */}
                      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-25"
                        style={{ background: "rgba(217,70,239,0.50)" }} />
                      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full blur-3xl opacity-20"
                        style={{ background: "rgba(6,182,212,0.50)" }} />

                      {/* Header formulaire */}
                      <div className="relative z-10 mb-8">
                        <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/25">
                          Formulaire de mission
                        </p>
                        <h3 className="font-display text-2xl font-black text-white">
                          Démarrons votre projet
                        </h3>
                        <div className="mt-3 h-[2px] w-14 rounded-full"
                          style={{ background: "linear-gradient(90deg,#d946ef,#8b5cf6,#06b6d4)" }} />
                      </div>

                      {/* Champs */}
                      <motion.form
                        onSubmit={handleSubmit}
                        className="relative z-10 flex flex-1 flex-col gap-5"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {/* Nom + Email */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field label="Nom / Prénom *" icon={User}>
                            <input
                              name="nom" value={form.nom} onChange={handleChange} required
                              placeholder="Jean Dupont"
                              className={inputBase} autoComplete="name"
                            />
                          </Field>
                          <Field label="Adresse email *" icon={Mail}>
                            <input
                              name="email" type="email" value={form.email} onChange={handleChange} required
                              placeholder="vous@entreprise.fr"
                              className={inputBase} autoComplete="email"
                            />
                          </Field>
                        </div>

                        {/* Service + Budget */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field label="Type de prestation *" icon={ChevronDown}>
                            <div className="relative">
                              <select
                                name="service" value={form.service} onChange={handleChange} required
                                className={`${inputBase} appearance-none pr-10 cursor-pointer`}
                                style={{ colorScheme: "dark" }}
                              >
                                {SERVICES.map(({ value, label }) => (
                                  <option key={value} value={value} disabled={value === ""} style={{ background: "#0a0a1a" }}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                            </div>
                          </Field>
                          <Field label="Budget estimé" icon={ChevronDown}>
                            <div className="relative">
                              <select
                                name="budget" value={form.budget} onChange={handleChange}
                                className={`${inputBase} appearance-none pr-10 cursor-pointer`}
                                style={{ colorScheme: "dark" }}
                              >
                                {BUDGETS.map(({ value, label }) => (
                                  <option key={value} value={value} disabled={value === ""} style={{ background: "#0a0a1a" }}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                            </div>
                          </Field>
                        </div>

                        {/* Message */}
                        <Field label="Décrivez votre projet *" icon={MessageSquare}>
                          <textarea
                            name="message" value={form.message} onChange={handleChange} required rows={5}
                            placeholder="Parlez-nous de votre projet : objectifs, audience cible, délai souhaité… Plus c'est précis, plus vite on avance !"
                            className={`${inputBase} resize-none`}
                          />
                        </Field>

                        {/* Séparateur */}
                        <motion.div variants={fadeUp} className="divider-rainbow opacity-30" />

                        {/* CTA */}
                        <motion.button
                          variants={fadeUp}
                          type="submit"
                          disabled={loading}
                          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-70"
                          style={{
                            background: "linear-gradient(135deg,#d946ef 0%,#8b5cf6 40%,#06b6d4 100%)",
                            boxShadow: "0 4px 30px rgba(217,70,239,0.38)",
                          }}
                          whileHover={!loading ? { scale: 1.02, boxShadow: "0 8px 50px rgba(217,70,239,0.60)" } : {}}
                          whileTap={!loading ? { scale: 0.97 } : {}}
                        >
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                          {loading ? (
                            <>
                              <svg className="relative h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                              </svg>
                              <span className="relative">Envoi en cours…</span>
                            </>
                          ) : (
                            <>
                              <Send className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                              <span className="relative">Envoyer ma demande</span>
                            </>
                          )}
                        </motion.button>

                        {/* Message d'erreur */}
                        <AnimatePresence>
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.25 }}
                              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-xs font-medium text-rose-400"
                            >
                              ⚠ {error}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <motion.p variants={fadeUp} className="text-center text-[0.66rem] text-white/20">
                          Zéro spam · Réponse personnalisée sous 24h · Premier échange gratuit et sans engagement
                        </motion.p>
                      </motion.form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Kame guide ─────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-8 right-6 z-20 hidden lg:flex">
        <KameSpeech variants={CONTACT_SPEECH}>
          <Kame context="default" src="/kame-closeup.png" size={155} />
        </KameSpeech>
      </div>
    </section>
  );
}
