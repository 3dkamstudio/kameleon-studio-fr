"use client";

import Link from "next/link";
import { useState } from "react";
import { FAQ_GRADS, FAQS } from "@/lib/content";
import { KamePose, useKameLine } from "@/components/ks/Kame";
import { Eyebrow, FD, G, GlowRing } from "@/components/ks/ui";

/** FAQ courte : une question ouverte à la fois. */
export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  const tip = useKameLine("faq");

  return (
    <section id="faq" data-kame="faq" className="bg-p" style={{ position: "relative", overflow: "clip", padding: "clamp(72px,9vw,128px) 0" }}>
      <div className="ks-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 340px", maxWidth: 440, display: "grid", gap: 22, position: "sticky", top: 96 }}>
          <Eyebrow n="06">Questions fréquentes</Eyebrow>
          <h2 className="h2">
            Tout ce que vous <G c="#7C3AED,#C026D3">voulez savoir.</G>
          </h2>
          <div
            data-glow="1"
            style={{
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
              borderRadius: 26,
              background: "#0B0A14",
              color: "#FFFFFF",
              padding: 22,
              display: "grid",
              gridTemplateColumns: "auto minmax(0,1fr)",
              gap: 16,
              alignItems: "center",
              boxShadow: "0 40px 80px -44px rgba(124,58,237,0.75)",
            }}
          >
            <GlowRing z={3} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(70% 90% at 0% 100%, rgba(139,92,246,0.45), transparent 70%), radial-gradient(60% 70% at 100% 0%, rgba(6,182,212,0.3), transparent 70%)" }} />
            <KamePose k="faq" shadow="0 16px 20px rgba(0,0,0,0.5)" style={{ width: "clamp(90px,9vw,120px)" }} />
            <div style={{ display: "grid", gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4B5FD" }}>Kame conseille</span>
              <span style={{ fontSize: 15, lineHeight: 1.45, fontWeight: 600 }}>{tip}</span>
              <Link href="/#studio" className="btn btn-grad hv-bright" style={{ width: "fit-content", minHeight: 44, padding: "0 18px", borderRadius: 999, fontWeight: 700, fontSize: 14 }}>
                Écrire au studio →
              </Link>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 15, color: "#525B70" }}>Réponse sous 24 h, premier échange gratuit.</p>
        </div>

        <div style={{ flex: "1.4 1 460px", minWidth: 0, display: "grid", gap: 12 }}>
          {FAQS.map((f, i) => {
            const on = openIdx === i;
            const bg = on ? "#FFFFFF" : "rgba(255,255,255,0.8)";
            return (
              <div
                key={f.q}
                data-glow="1"
                style={{
                  position: "relative",
                  borderRadius: 20,
                  background: `linear-gradient(${bg},${bg}) padding-box, ${on ? "linear-gradient(135deg,#8b5cf6,#06b6d4,#22c55e,#f43f5e)" : "linear-gradient(#E6E8F0,#E6E8F0)"} border-box`,
                  border: "1.5px solid transparent",
                  boxShadow: on ? "0 30px 60px -36px rgba(139,92,246,0.6)" : "none",
                  transition: "box-shadow 300ms ease",
                }}
              >
                <GlowRing z={3} />
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(on ? -1 : i)}
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", border: 0, background: "none", fontSize: 17, fontWeight: 700, color: "#151827", textAlign: "left", cursor: "pointer" }}
                  >
                    <span aria-hidden="true" style={{ flex: "none", width: 40, height: 40, borderRadius: 12, backgroundImage: FAQ_GRADS[i % 5], display: "grid", placeItems: "center", color: "#FFFFFF", fontFamily: FD, fontSize: 13, fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                    <span style={{ flex: 1 }}>{f.q}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        flex: "none",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: on ? "linear-gradient(135deg,#7C3AED,#C026D3)" : "#F1F2F7",
                        color: on ? "#FFFFFF" : "#151827",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 20,
                        lineHeight: 1,
                        transform: `rotate(${on ? 45 : 0}deg)`,
                        transition: "transform 300ms ease, background 300ms ease",
                      }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={!on} style={{ padding: "0 24px 22px 76px", fontSize: 16, lineHeight: 1.65, color: "#525B70" }}>
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
