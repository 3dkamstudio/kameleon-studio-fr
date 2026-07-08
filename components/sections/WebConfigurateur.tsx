"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Check, Minus, Plus, Layout, PenLine, Search,
  Newspaper, Languages, CalendarCheck, Clapperboard, Wrench,
} from "lucide-react";

const CYAN = "#06b6d4";

// ── Configurateur /web — table 3.4 du brief = seule source de vérité ───────────
const BASE_PRICE = 800;

const TOGGLES = [
  { id: "seo",      icon: Search,        title: "SEO technique + données structurées", price: 290, unit: "" },
  { id: "blog",     icon: Newspaper,     title: "Blog / CMS",                          price: 450, unit: "" },
  { id: "calendly", icon: CalendarCheck, title: "Réservation Calendly + paiement Stripe", price: 190, unit: "" },
  { id: "mascotte", icon: Clapperboard,  title: "Animation 3D mascotte personnalisée", price: 350, unit: "" },
] as const;

export default function WebConfigurateur() {
  const [pagesSupp, setPagesSupp] = useState(0);
  const [langues, setLangues] = useState(0);
  const [copywriting, setCopywriting] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const nbPages = 1 + pagesSupp;
  const copyPrice = 150 * nbPages;

  const total =
    BASE_PRICE +
    pagesSupp * 250 +
    (copywriting ? copyPrice : 0) +
    langues * 290 +
    TOGGLES.reduce((sum, t) => sum + (toggles[t.id] ? t.price : 0), 0);

  function cardStyle(active: boolean) {
    return {
      background: active ? "rgba(6,182,212,0.06)" : "rgba(255,255,255,0.03)",
      border: active ? `1.5px solid ${CYAN}70` : "1px solid rgba(255,255,255,0.08)",
      transition: "border-color 0.2s, background 0.2s",
    };
  }

  function CheckMark({ active }: { active: boolean }) {
    return (
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: active ? CYAN : "rgba(255,255,255,0.06)",
          border: active ? "none" : "1px solid rgba(255,255,255,0.15)",
          transition: "background 0.2s",
        }}
      >
        {active && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
      </span>
    );
  }

  function Counter({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`Retirer ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-[1.5rem] text-center font-display text-lg font-black text-white">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(9, value + 1))}
          aria-label={`Ajouter ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <section id="configurateur" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 font-display text-3xl font-black leading-tight text-white sm:text-4xl">
            Compose ton site.
          </h2>
          <p className="text-sm text-white/40">
            Coche ce qu&apos;il te faut — le devis se calcule tout seul.
          </p>
        </div>

        {/* ── Base incluse — seul glow permanent de la page ──────────────────── */}
        <div
          className="mb-6 flex flex-col gap-4 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between"
          style={{
            background: "rgba(6,182,212,0.06)",
            border: `2px solid ${CYAN}55`,
            boxShadow: `0 0 45px ${CYAN}1f`,
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${CYAN}1a` }}>
              <Layout className="h-6 w-6" style={{ color: CYAN }} />
            </div>
            <div>
              <p className="mb-1 text-[0.65rem] font-black uppercase tracking-widest" style={{ color: CYAN }}>Toujours incluse</p>
              <h3 className="mb-1 font-display text-xl font-black text-white">Landing page premium</h3>
              <p className="text-sm text-white/50">1 page · design sur mesure · animations · responsive · mise en ligne</p>
            </div>
          </div>
          <p className="shrink-0 font-display text-3xl font-black" style={{ color: CYAN }}>800€</p>
        </div>

        {/* ── Options ────────────────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Pages supplémentaires — compteur */}
          <div className="flex flex-col gap-3 rounded-2xl p-5" style={cardStyle(pagesSupp > 0)}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Layout className="h-5 w-5 shrink-0" style={{ color: CYAN }} />
                <div>
                  <p className="font-bold text-white">Pages supplémentaires</p>
                  <p className="text-xs text-white/40">250€ / page</p>
                </div>
              </div>
              <Counter value={pagesSupp} onChange={setPagesSupp} label="une page" />
            </div>
            {pagesSupp > 0 && <p className="text-right text-sm font-bold" style={{ color: CYAN }}>+ {pagesSupp * 250}€</p>}
          </div>

          {/* Copywriting — toggle, prix auto selon nb de pages */}
          <button type="button" onClick={() => setCopywriting(v => !v)} className="flex flex-col gap-3 rounded-2xl p-5 text-left" style={cardStyle(copywriting)}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <PenLine className="h-5 w-5 shrink-0" style={{ color: CYAN }} />
                <div>
                  <p className="font-bold text-white">Rédaction des textes (copywriting)</p>
                  <p className="text-xs text-white/40">150€ / page × {nbPages} page{nbPages > 1 ? "s" : ""}</p>
                </div>
              </div>
              <CheckMark active={copywriting} />
            </div>
            {copywriting && <p className="text-right text-sm font-bold" style={{ color: CYAN }}>+ {copyPrice}€</p>}
          </button>

          {/* Multilingue — compteur langues */}
          <div className="flex flex-col gap-3 rounded-2xl p-5" style={cardStyle(langues > 0)}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 shrink-0" style={{ color: CYAN }} />
                <div>
                  <p className="font-bold text-white">Version multilingue</p>
                  <p className="text-xs text-white/40">290€ / langue supplémentaire</p>
                </div>
              </div>
              <Counter value={langues} onChange={setLangues} label="une langue" />
            </div>
            {langues > 0 && <p className="text-right text-sm font-bold" style={{ color: CYAN }}>+ {langues * 290}€</p>}
          </div>

          {/* Toggles simples */}
          {TOGGLES.map(({ id, icon: Icon, title, price }) => (
            <button
              key={id}
              type="button"
              onClick={() => setToggles(t => ({ ...t, [id]: !t[id] }))}
              className="flex flex-col gap-3 rounded-2xl p-5 text-left"
              style={cardStyle(!!toggles[id])}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0" style={{ color: CYAN }} />
                  <div>
                    <p className="font-bold text-white">{title}</p>
                    <p className="text-xs text-white/40">{price}€</p>
                  </div>
                </div>
                <CheckMark active={!!toggles[id]} />
              </div>
              {toggles[id] && <p className="text-right text-sm font-bold" style={{ color: CYAN }}>+ {price}€</p>}
            </button>
          ))}

          {/* Maintenance — mensuelle, définition affichée */}
          <button
            type="button"
            onClick={() => setMaintenance(v => !v)}
            className="flex flex-col gap-3 rounded-2xl p-5 text-left sm:col-span-2"
            style={cardStyle(maintenance)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Wrench className="h-5 w-5 shrink-0" style={{ color: CYAN }} />
                <div>
                  <p className="font-bold text-white">Maintenance — 2 interventions / mois</p>
                  <p className="text-xs text-white/40">49€ / mois</p>
                </div>
              </div>
              <CheckMark active={maintenance} />
            </div>
            <p className="text-xs leading-relaxed text-white/35">
              Une intervention = une demande de modification simple (texte, image, section) de 30 min max.
            </p>
            {maintenance && <p className="text-right text-sm font-bold" style={{ color: CYAN }}>+ 49€/mois</p>}
          </button>
        </div>

        {/* ── Total sticky — le prix vit au point de décision ────────────────── */}
        <div className="sticky bottom-4 z-20">
          <m.div
            className="flex flex-col items-center justify-between gap-4 rounded-2xl px-6 py-5 sm:flex-row"
            style={{
              background: "rgba(8,10,22,0.95)",
              border: `1px solid ${CYAN}45`,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              backdropFilter: "blur(12px)",
            }}
            layout
          >
            <div className="text-center sm:text-left">
              <p className="text-[0.65rem] font-black uppercase tracking-widest text-white/40">Ton devis</p>
              <p className="font-display text-3xl font-black text-white">
                {total.toLocaleString("fr-FR")}€
                {maintenance && <span className="ml-2 text-base font-bold" style={{ color: CYAN }}>+ 49€/mois</span>}
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-black text-white transition-transform hover:scale-[1.04]"
              style={{ background: `linear-gradient(135deg, ${CYAN}, #8b5cf6)`, boxShadow: "0 4px 24px rgba(6,182,212,0.45)" }}
            >
              Demander ce devis
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </m.div>
        </div>

        {/* ── Garde-fous juridiques ──────────────────────────────────────────── */}
        <div className="mt-10 space-y-1.5 text-center">
          <p className="text-[0.65rem] leading-relaxed text-white/25">
            L&apos;intégration des mentions légales fournies par le client est incluse dans toute offre.
            King of IA n&apos;assure pas la rédaction ni le conseil juridique — le client reste responsable du contenu légal transmis.
          </p>
          <p className="text-[0.65rem] leading-relaxed text-white/25">
            La maintenance est un service préventif continu : en cas d&apos;interruption de l&apos;abonnement,
            King of IA ne peut garantir l&apos;état technique du site pendant la période non couverte.
          </p>
        </div>

      </div>
    </section>
  );
}
