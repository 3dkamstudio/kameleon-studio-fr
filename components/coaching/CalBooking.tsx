"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COACHING_OFFERS, SESSIONS, eur } from "@/lib/content";
import { CAL, CONTACT, LEGAL } from "@/lib/site";
import { KameNote } from "@/components/ks/Kame";
import { Eyebrow, FD, G } from "@/components/ks/ui";

const STEPS = ["Choisissez une formule et un créneau", "Décrivez votre objectif et payez en ligne", "Recevez la confirmation et le lien Google Meet"];

type CalApi = ((...args: unknown[]) => void) & { q?: unknown[][]; ns?: Record<string, CalApi>; loaded?: boolean };

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/**
 * Chargeur officiel de Cal.com (« embed snippet ») réécrit en TypeScript : les appels sont mis en file
 * d'attente jusqu'à ce que le script d'intégration, ajouté au premier appel, prenne le relais.
 */
function calApi(): CalApi {
  if (window.Cal) {
    return window.Cal;
  }
  const queue = (fn: CalApi, args: unknown[]) => {
    fn.q = fn.q || [];
    fn.q.push(args);
  };
  const cal: CalApi = (...args: unknown[]) => {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const s = document.createElement("script");
      s.src = CAL.embedScript;
      s.async = true;
      document.head.appendChild(s);
      cal.loaded = true;
    }
    const ns = args[1];
    if (args[0] === "init" && typeof ns === "string") {
      const spaces = cal.ns || {};
      const api: CalApi = (...a: unknown[]) => queue(api, a);
      spaces[ns] = spaces[ns] || api;
      cal.ns = spaces;
      queue(spaces[ns], args);
      queue(cal, ["initNamespace", ns]);
      return;
    }
    queue(cal, args);
  };
  window.Cal = cal;
  return cal;
}

// Un espace de noms Cal.com par formule, initialisé une seule fois.
const initialized = new Set<string>();

/** Réservation et paiement en direct : calendrier Cal.com intégré (Stripe, Google Agenda, Google Meet). */
export default function CalBooking() {
  const [slug, setSlug] = useState("coaching");
  const [near, setNear] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const offer = COACHING_OFFERS.find((o) => o.slug === slug) ?? COACHING_OFFERS[0];
  const link = `${CAL.origin}/${CAL.user}/${offer.slug}`;

  // Cal.com n'est chargé qu'à l'approche de la section, pour ne pas alourdir la page.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Calendrier de la formule choisie, en thème clair ; sa hauteur s'ajuste d'elle-même.
  useEffect(() => {
    const box = boxRef.current;
    if (!near || !box) {
      return;
    }
    box.replaceChildren();
    const cal = calApi();
    if (!initialized.has(offer.slug)) {
      cal("init", offer.slug, { origin: CAL.origin });
      initialized.add(offer.slug);
    }
    const api = cal.ns?.[offer.slug];
    api?.("inline", { elementOrSelector: box, calLink: `${CAL.user}/${offer.slug}`, config: { layout: "month_view", theme: "light" } });
    api?.("ui", { theme: "light", layout: "month_view", hideEventTypeDetails: false });
    return () => box.replaceChildren();
  }, [near, offer.slug]);

  return (
    <section ref={sectionRef} id="reserver" data-kame="coaching" className="bg-p" style={{ position: "relative", padding: "clamp(64px,8vw,112px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
          <div style={{ display: "grid", gap: 14 }}>
            <Eyebrow n="RDV">Réservation</Eyebrow>
            <h2 className="h2">
              Réserver <G c="#7C3AED,#C026D3">une séance</G>
            </h2>
          </div>
          <ol aria-label="Étapes de réservation" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "10px 20px" }}>
            {STEPS.map((l, i) => (
              <li key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}>
                <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 13, background: "#FFFFFF", color: "#151827", border: "1.5px solid #C9CDD9" }}>
                  {i + 1}
                </span>
                {l}
              </li>
            ))}
          </ol>
        </div>

        <div role="note" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", borderRadius: 14, background: "#E9FBF1", border: "1px solid #BDEFD2", fontSize: 15, lineHeight: 1.5 }}>
          <span style={{ flex: "none", marginTop: 2, padding: "2px 8px", borderRadius: 6, background: "#15803D", color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>EN DIRECT</span>
          <span>
            <strong>Créneaux en temps réel, paiement sécurisé par Stripe à la réservation.</strong> Annulation ou report gratuits jusqu’à 24 h avant la séance ; les horaires s’affichent dans votre fuseau (Paris, Martinique…).
          </span>
        </div>

        <fieldset style={{ margin: 0, padding: 0, border: 0, minWidth: 0 }}>
          <legend style={{ padding: 0, marginBottom: 14, fontFamily: FD, fontWeight: 500, fontSize: 18 }}>1. Choisissez votre formule</legend>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 14 }}>
            {COACHING_OFFERS.map((o) => {
              const on = o.slug === slug;
              return (
                <label
                  key={o.slug}
                  className="cal-offer"
                  style={{ display: "grid", alignContent: "start", gap: 6, padding: 18, borderRadius: 16, cursor: "pointer", border: on ? "2px solid #6546D7" : "1.5px solid #E0E3EC", background: on ? "#F6F3FF" : "#FFFFFF" }}
                >
                  <input type="radio" name="formule" value={o.slug} checked={on} onChange={() => setSlug(o.slug)} className="sr-only" />
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>{o.name}</span>
                    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 20, whiteSpace: "nowrap" }}>{eur(o.price)}</span>
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#6546D7" }}>{o.duration} · visio Google Meet</span>
                  <span style={{ fontSize: 14, lineHeight: 1.45, color: "#525B70" }}>{o.desc}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px 24px", fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>
          <span>
            Thèmes au choix : {SESSIONS.map((s) => s.name).join(" · ")}. Prix nets, {LEGAL.vat}.
          </span>
          <span>
            Aucun horaire ne vous convient ? Écrivez-nous sur{" "}
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener">
              WhatsApp
            </a>{" "}
            ou à <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </span>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <h3 style={{ margin: "8px 0 4px", fontFamily: FD, fontWeight: 500, fontSize: 18 }}>2. Choisissez votre créneau et réservez</h3>
          <div
            ref={boxRef}
            className="cal-inline"
            aria-label={`Calendrier de réservation « ${offer.name} » (${offer.duration}, ${eur(offer.price)})`}
            role="region"
            aria-busy={!near}
          />
          <p style={{ margin: 0, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px 16px", fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>
            <span>
              En réservant, vous acceptez les <Link href="/cgv">conditions générales de vente</Link>.
            </span>
            <a href={link} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
              Le calendrier ne s’affiche pas ? Ouvrir la réservation
            </a>
          </p>
        </div>
        <KameNote k="coaching" />
      </div>
    </section>
  );
}
