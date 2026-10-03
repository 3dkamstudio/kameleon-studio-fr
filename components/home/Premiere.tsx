"use client";

import Image from "next/image";
import { useState } from "react";
import { CLIP, ytEmbed, ytWatch } from "@/lib/content";
import { KamePose } from "@/components/ks/Kame";
import PrefillLink from "@/components/ks/PrefillLink";
import { Aurora, Dot, Eyebrow, FD, FilmStrip, G, GlowBox, GlowRing, RecDot, Sparkles } from "@/components/ks/ui";

// Pastilles des étiquettes du clip : les couleurs de son affiche (fuchsia, or, rose, turquoise).
const DOTS = ["#d946ef", "#eab308", "#f43f5e", "#06b6d4"];

/** « Avant-première » : le dernier clip du studio sur grand écran, lecteur YouTube chargé au clic uniquement. */
export default function Premiere() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="nouveau-clip" data-kame="clip" className="bg-p" style={{ position: "relative", overflow: "clip", padding: "clamp(64px,8vw,112px) 0" }}>
      <Aurora
        px={24}
        blobs={[
          ["rgba(217,70,239,.26)", "min(42vw,580px)", { left: "-10%", top: "-6%" }, "ksDrift1", 22],
          ["rgba(234,179,8,.2)", "min(36vw,500px)", { right: "-8%", top: "12%" }, "ksDrift2", 26],
          ["rgba(6,182,212,.2)", "min(32vw,440px)", { left: "34%", bottom: "-14%" }, "ksDrift3", 20],
        ]}
      />
      <Sparkles n={20} seed={21} />
      <div className="ks-wrap" style={{ display: "grid", gap: 36 }}>
        <div style={{ display: "grid", gap: 16, justifyItems: "center", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <Eyebrow>Avant-première</Eyebrow>
          <h2 className="h2 h2-lg">
            Un anniversaire qui méritait{" "}
            <G c="#C026D3,#E11D48,#EA580C" block>
              son propre film.
            </G>
          </h2>
          <p className="lead">{CLIP.lead}</p>
        </div>

        <div data-glow="1" style={{ position: "relative", borderRadius: 32, overflow: "hidden", isolation: "isolate", background: "#0B0A14", color: "#FFFFFF", boxShadow: "0 60px 110px -60px rgba(192,38,211,0.7)" }}>
          <GlowRing z={3} />
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(60% 55% at 8% 0%, rgba(217,70,239,0.3), transparent 70%), radial-gradient(50% 50% at 96% 100%, rgba(234,179,8,0.22), transparent 70%)" }}
          />
          <Sparkles n={16} seed={22} />
          <FilmStrip />
          <div style={{ position: "relative", display: "grid", gap: "clamp(18px,2.4vw,28px)", padding: "clamp(14px,2.6vw,32px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 999, background: "rgba(244,63,94,0.14)", border: "1px solid rgba(244,63,94,0.4)", fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FDA4AF" }}>
                <RecDot />
                Nouveau clip
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B8BDD0" }}>
                {CLIP.kind} · {CLIP.duration}
              </span>
            </div>

            <div style={{ position: "relative", borderRadius: 20 }}>
              <GlowBox radius={21} blur={26} />
              <div style={{ position: "relative", zIndex: 1, aspectRatio: "16/9", borderRadius: 18, overflow: "hidden", background: "#000" }}>
                {playing ? (
                  <iframe
                    src={ytEmbed(CLIP.id)}
                    title={`${CLIP.title} — ${CLIP.kind}`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Lire le clip « ${CLIP.title} » (${CLIP.duration})`}
                    className="clip-start"
                    style={{ position: "absolute", inset: 0, width: "100%", padding: 0, border: 0, background: "#000", cursor: "pointer" }}
                  >
                    <Image src={CLIP.poster} alt="" fill sizes="(max-width: 1240px) 100vw, 1090px" quality={80} className="clip-poster" style={{ objectFit: "cover" }} />
                    <span aria-hidden="true" className="clip-play">
                      <svg viewBox="0 0 24 24" width="44%" height="44%">
                        <path d="M8 5.5v13l10.5-6.5z" fill="#FFFFFF" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 28 }}>
              <div style={{ flex: "1 1 420px", maxWidth: 640, display: "grid", gap: 14 }}>
                <h3
                  className="grad-text"
                  style={{
                    margin: 0,
                    fontFamily: FD,
                    fontWeight: 600,
                    fontSize: "clamp(26px,3vw,40px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.035em",
                    backgroundImage: "linear-gradient(90deg,#FDE047,#FDBA74,#F0ABFC,#FB7185,#FDE047)",
                    backgroundSize: "250% 100%",
                    animation: "ksHue 7s ease-in-out infinite alternate",
                  }}
                >
                  {CLIP.title}
                </h3>
                <p className="tw-pretty" style={{ margin: 0, fontSize: "clamp(16px,1.4vw,18px)", lineHeight: 1.6, color: "#E4E6EE" }}>
                  {CLIP.desc}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {CLIP.tags.map((t, i) => (
                    <li key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", fontSize: 14, fontWeight: 600, color: "#E4E6EE" }}>
                      <Dot color={DOTS[i % DOTS.length]} glow />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ flex: "1 1 300px", maxWidth: 400, display: "grid", gap: 12, padding: 18, borderRadius: 22, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <KamePose k="clip" sizes="80px" shadow="0 12px 18px rgba(0,0,0,0.45)" style={{ width: 64 }} />
                  <span style={{ fontFamily: FD, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Et vous ?</span>
                </div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#E4E6EE" }}>Anniversaire, mariage, départ, lancement de marque : vous l’imaginez, on en fait un film.</p>
                <PrefillLink
                  href="/#studio"
                  contact={{ type: "Production vidéo", msg: CLIP.prefill }}
                  className="btn btn-grad hv-grad"
                  style={{ minHeight: 52, padding: "0 22px", borderRadius: 14, fontWeight: 700, fontSize: 16 }}
                >
                  Je veux mon clip →
                </PrefillLink>
                <a
                  href={ytWatch(CLIP.id)}
                  target="_blank"
                  rel="noopener"
                  className="btn hv-glass14"
                  style={{ minHeight: 48, padding: "0 18px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.28)", color: "#FFFFFF", fontSize: 15 }}
                >
                  Regarder sur YouTube
                </a>
                <span style={{ fontSize: 15, color: "#B8BDD0", textAlign: "center" }}>Premier échange gratuit, réponse sous 24 h.</span>
              </div>
            </div>
          </div>
          <FilmStrip />
        </div>
      </div>
    </section>
  );
}
