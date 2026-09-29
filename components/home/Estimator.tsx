"use client";

import { useState } from "react";
import { INCLUSIONS, PAL, VIDEO_EXTRA_30S, VIDEO_GRID, eur } from "@/lib/content";
import PrefillLink from "@/components/ks/PrefillLink";
import { FD, G, GlowRing, RecDot, Sparkles } from "@/components/ks/ui";

const DURS: [number, string][] = [
  [30, "30 s"],
  [60, "1 min"],
  [90, "1 min 30"],
  [120, "2 min"],
];

/** Estimateur vidéo : grille réelle 250 € → 200 € (base 30 s) et +70 € par tranche de 30 s. */
export default function Estimator() {
  const [q, setQ] = useState(1);
  const [dur, setDur] = useState(30);

  const extra = (dur - 30) / 30;
  const tier = Math.min(q, 10);
  const unit = VIDEO_GRID[tier - 1] + VIDEO_EXTRA_30S * extra;
  const total = unit * q;
  const save = (VIDEO_GRID[0] + VIDEO_EXTRA_30S * extra) * q - total;
  const durL = DURS.find(([v]) => v === dur)?.[1] ?? "30 s";
  const level = q <= 1 ? "Remise dès 2 vidéos" : q >= 10 ? "−20 % · meilleur prix" : `−${Math.round(((250 - VIDEO_GRID[q - 1]) / 250) * 100)} % débloqués`;

  return (
    <div
      id="video"
      data-glow="1"
      style={{
        position: "relative",
        flex: "1.35 1 500px",
        overflow: "hidden",
        isolation: "isolate",
        background: "#0B0A14",
        color: "#FFFFFF",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 28,
        padding: "clamp(24px,3vw,40px)",
        display: "grid",
        gap: 28,
        boxShadow: "0 50px 100px -50px rgba(124,58,237,0.7)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(60% 50% at 100% 0%, rgba(217,70,239,0.3), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(6,182,212,0.26), transparent 70%), radial-gradient(40% 40% at 60% 60%, rgba(249,115,22,0.14), transparent 70%)",
        }}
      />
      <Sparkles n={14} seed={13} />
      <GlowRing inset={0} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 10px", borderRadius: 999, background: "rgba(244,63,94,0.14)", border: "1px solid rgba(244,63,94,0.4)", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#FDA4AF" }}>
            <RecDot />
            REC
          </span>
          <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em" }}>
            Production <G c="#FDBA74,#F0ABFC">vidéo</G>
          </h3>
        </div>
        <span style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(6,182,212,0.16)", border: "1px solid rgba(103,232,249,0.5)", color: "#A5F3FC", fontSize: 13, fontWeight: 700 }}>Estimation indicative</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 24 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <span id="lbl-q" style={{ fontSize: 15, fontWeight: 600 }}>
            Nombre de vidéos
          </span>
          <div role="group" aria-labelledby="lbl-q" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button type="button" onClick={() => setQ((x) => Math.max(1, x - 1))} disabled={q <= 1} aria-label="Retirer une vidéo" style={stepBtn(q <= 1)}>
              −
            </button>
            <output aria-live="polite" style={{ minWidth: 52, textAlign: "center", fontFamily: FD, fontSize: 28, fontWeight: 500 }}>
              {q}
            </output>
            <button type="button" onClick={() => setQ((x) => Math.min(50, x + 1))} disabled={q >= 50} aria-label="Ajouter une vidéo" style={stepBtn(q >= 50)}>
              +
            </button>
          </div>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <span id="lbl-d" style={{ fontSize: 15, fontWeight: 600 }}>
            Durée par vidéo
          </span>
          <div role="radiogroup" aria-labelledby="lbl-d" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {DURS.map(([v, l]) => {
              const on = dur === v;
              return (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setDur(v)}
                  style={{
                    minHeight: 44,
                    padding: "0 14px",
                    borderRadius: 999,
                    border: `1.5px solid ${on ? "transparent" : "rgba(255,255,255,0.22)"}`,
                    background: on ? "linear-gradient(135deg,#7C3AED,#C026D3)" : "rgba(255,255,255,0.06)",
                    color: on ? "#FFFFFF" : "#E4E6EE",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, color: "#B8BDD0" }}>Prix par vidéo selon la quantité commandée (base 30 s)</span>
          <span aria-live="polite" style={{ padding: "4px 11px", borderRadius: 999, background: "#DCFCE7", color: "#166534", fontSize: 13, fontWeight: 700 }}>
            {level}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10,minmax(0,1fr))", gap: 6, alignItems: "end", height: 132 }}>
          {VIDEO_GRID.map((p, i) => {
            const on = i + 1 === tier;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setQ(i + 1)}
                aria-label={`${i === 9 ? "10 vidéos ou plus" : `${i + 1} vidéo${i ? "s" : ""}`} : ${p} € par vidéo`}
                aria-pressed={on}
                style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6, padding: 0, border: 0, background: "none", cursor: "pointer" }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: on ? "#FFFFFF" : "#9AA0B4", textAlign: "center" }}>{p}</span>
                <span
                  style={{
                    display: "block",
                    height: `${28 + ((p - 200) / 50) * 72}%`,
                    borderRadius: "6px 6px 2px 2px",
                    background: i + 1 <= tier ? `linear-gradient(180deg,${PAL[i % 7]},${PAL[(i + 3) % 7]})` : "rgba(255,255,255,0.08)",
                    boxShadow: on ? `0 0 22px ${PAL[i % 7]}` : "none",
                    transition: "background 200ms, box-shadow 200ms",
                  }}
                />
                <span style={{ fontSize: 12, color: "#B8BDD0", textAlign: "center" }}>{i === 9 ? "10+" : i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ display: "grid", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#B8BDD0" }}>Montant indicatif</span>
          <span aria-live="polite" className="grad-text" style={{ fontFamily: FD, fontSize: "clamp(38px,4.6vw,54px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.1, backgroundImage: "linear-gradient(90deg,#FDBA74,#FB7185,#F0ABFC)" }}>
            {eur(total)}
          </span>
          <span style={{ fontSize: 15, color: "#B8BDD0" }}>
            {q} × {eur(unit)} par vidéo de {durL}
            {save > 0 ? ` · ${eur(save)} d’économie` : ""}
          </span>
        </div>
        <PrefillLink
          href="/#studio"
          contact={{ type: "Production vidéo", msg: `Estimation : ${q} vidéo${q > 1 ? "s" : ""} de ${durL}, ${eur(total)} indicatif. `, keepMsg: true }}
          className="btn btn-grad hv-grad"
          style={{ minHeight: 52, padding: "0 24px", borderRadius: 999, fontSize: 16 }}
        >
          Demander un devis
        </PrefillLink>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: "10px 24px", fontSize: 15, color: "#D5D8E3" }}>
        {INCLUSIONS.map((i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span aria-hidden="true" style={{ flex: "none", width: 7, height: 7, borderRadius: 2, background: "#22D3EE", boxShadow: "0 0 8px #22D3EE", transform: "translateY(-2px)" }} />
            {i}
          </li>
        ))}
      </ul>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#B8BDD0" }}>
        Le tarif dégressif s’applique à toutes les vidéos de la commande ; 200 € par vidéo à partir de 10 vidéos. Paiement en deux fois : 50 % à la commande, 50 % à la livraison.
      </p>
    </div>
  );
}

function stepBtn(disabled: boolean) {
  return {
    width: 46,
    height: 46,
    borderRadius: "50%",
    border: "1.5px solid rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.06)",
    color: "#FFFFFF",
    fontSize: 22,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
  } as const;
}
