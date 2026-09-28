"use client";

import { useEffect, useState } from "react";
import { STEP_ACC, STEP_GRAD, STEPS } from "@/lib/content";
import { KamePose, useKameLine } from "@/components/ks/Kame";
import { useMotion } from "@/components/ks/motion";
import { Eyebrow, FD, FilmStrip, G, GlowRing, RecDot, Sparkles } from "@/components/ks/ui";

/** Méthode en cinq étapes : onglets, lecture automatique facultative. */
export default function Method() {
  const { on } = useMotion();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [run, setRun] = useState(0);
  const tip = useKameLine("process");
  const runAuto = auto && on;

  useEffect(() => {
    if (!runAuto) { return; }
    const t = window.setInterval(() => {
      setStep((s) => (s + 1) % 5);
      setRun((r) => r + 1);
    }, 5000);
    return () => window.clearInterval(t);
  }, [runAuto]);

  const pick = (i: number) => {
    setStep(i);
    setAuto(false);
  };
  const s = STEPS[step];
  const acc = STEP_ACC[step];

  return (
    <section id="methode" data-kame="process" className="bg-p" style={{ position: "relative", padding: "clamp(72px,9vw,128px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 56 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
            <Eyebrow n="04">Méthode</Eyebrow>
            <h2 className="h2">
              De l’idée à la livraison, <G c="#16A34A,#0891B2">en cinq étapes.</G>
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 380, fontSize: 16, color: "#525B70" }}>Un processus clair, sans jargon : vous savez à chaque étape ce que vous apportez et ce que le studio prend en charge.</p>
        </div>

        <div data-glow="1" style={{ position: "relative", borderRadius: 32, overflow: "hidden", isolation: "isolate", background: "#0B0A14", color: "#FFFFFF", boxShadow: "0 60px 110px -60px rgba(76,29,149,0.75)" }}>
          <GlowRing z={3} />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
              background: `radial-gradient(55% 70% at 85% 70%, ${acc}40, transparent 70%), radial-gradient(40% 50% at 0% 0%, ${STEP_ACC[(step + 2) % 5]}26, transparent 70%)`,
              transition: "background 900ms ease",
            }}
          />
          <Sparkles n={16} seed={12} />
          <FilmStrip />
          <div role="tablist" aria-label="Étapes de production" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))", gap: 10, padding: "16px clamp(16px,2.4vw,28px)" }}>
            {STEPS.map((x, i) => {
              const sel = step === i;
              const a = STEP_ACC[i];
              return (
                <button
                  key={x.n}
                  type="button"
                  role="tab"
                  id={`etape-${i}`}
                  aria-selected={sel}
                  aria-controls="etape-panneau"
                  onClick={() => pick(i)}
                  className="hv-up"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "grid",
                    gap: 6,
                    padding: "14px 14px 18px",
                    borderRadius: 16,
                    border: `1px solid ${sel ? a : "rgba(255,255,255,0.12)"}`,
                    background: sel ? `linear-gradient(160deg, ${a}38, rgba(255,255,255,0.04))` : "rgba(255,255,255,0.03)",
                    color: "#FFFFFF",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 300ms ease, border-color 300ms ease, transform 200ms ease",
                  }}
                >
                  <span style={{ fontFamily: FD, fontSize: 11, letterSpacing: "0.12em", color: sel ? "#FFFFFF" : "#9AA0B4" }}>SCÈNE {x.n}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{x.t}</span>
                  <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(255,255,255,0.08)" }}>
                    <span
                      key={sel ? `${run}-${runAuto ? "a" : "m"}` : "x"}
                      style={{
                        display: "block",
                        height: "100%",
                        background: `linear-gradient(90deg,${a},${STEP_ACC[(i + 1) % 5]})`,
                        boxShadow: `0 0 10px ${a}`,
                        width: i < step || (sel && !runAuto) ? "100%" : sel ? undefined : "0%",
                        animation: sel && runAuto ? "ksFill 5s linear forwards" : "none",
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
          <FilmStrip />
          <div role="tabpanel" id="etape-panneau" aria-labelledby={`etape-${step}`} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32, padding: "clamp(28px,4vw,56px)" }}>
            <div style={{ flex: "1 1 420px", maxWidth: 640, display: "grid", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 999, background: "rgba(244,63,94,0.14)", border: "1px solid rgba(244,63,94,0.4)", fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "#FDA4AF" }}>
                  <RecDot />
                  REC
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B8BDD0" }}>Étape {step + 1} sur 5</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 18, flexWrap: "wrap" }}>
                <span aria-hidden="true" style={{ fontFamily: FD, fontWeight: 600, fontSize: "clamp(88px,11vw,150px)", lineHeight: 0.85, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: `1.5px ${acc}` }}>
                  {s.n}
                </span>
                <h3 className="grad-text" style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.05, letterSpacing: "-0.035em", backgroundImage: `linear-gradient(90deg,${STEP_GRAD[step]})` }}>
                  {s.t}
                </h3>
              </div>
              <p className="tw-pretty" style={{ margin: 0, fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.6, color: "#E4E6EE" }}>
                {s.d}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, paddingTop: 6 }}>
                <button
                  type="button"
                  onClick={() => pick((step + 4) % 5)}
                  aria-label="Étape précédente"
                  className="hv-glass14"
                  style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", color: "#FFFFFF", fontSize: 18, cursor: "pointer" }}
                >
                  ←
                </button>
                <button type="button" onClick={() => pick((step + 1) % 5)} aria-label="Étape suivante" className="btn-grad hv-bright" style={{ width: 48, height: 48, borderRadius: "50%", fontSize: 18, cursor: "pointer" }}>
                  →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuto((a) => !a);
                    setRun((r) => r + 1);
                  }}
                  aria-pressed={auto}
                  style={{ minHeight: 40, padding: "0 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "#E4E6EE", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >
                  {auto ? "❚❚ Lecture auto" : "▶ Lecture auto"}
                </button>
              </div>
            </div>
            <div style={{ flex: "0 1 340px", display: "grid", justifyItems: "center", gap: 14 }}>
              <div role="note" style={{ maxWidth: 320, padding: "14px 16px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                <span className="kame-label" style={{ color: "#C4B5FD" }}>
                  Kame conseille
                </span>
                <span style={{ display: "block", fontSize: 15, lineHeight: 1.45, fontWeight: 600 }}>{tip}</span>
              </div>
              <div style={{ position: "relative", width: "min(100%,280px)", aspectRatio: "1", display: "grid", placeItems: "center" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: "6%", borderRadius: "50%", background: `radial-gradient(circle, ${acc}66 0%, transparent 68%)`, transition: "background 900ms ease" }} />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px dashed ${acc}`, opacity: 0.55, transition: "border-color 900ms ease" }} />
                <KamePose k="process" sizes="240px" shadow="0 24px 30px rgba(0,0,0,0.5)" style={{ position: "relative", width: "86%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
