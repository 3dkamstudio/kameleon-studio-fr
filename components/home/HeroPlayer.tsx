"use client";

import { useEffect, useState } from "react";
import { HERO_CLIPS, ytEmbed, ytThumb } from "@/lib/content";
import { useMotion } from "@/components/ks/motion";

/** Carte « À l’affiche » : 4 extraits qui s'enchaînent, lecture YouTube au clic uniquement. */
export default function HeroPlayer() {
  const { on, paused, reduced, togglePause } = useMotion();
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const clip = HERO_CLIPS[idx];

  useEffect(() => {
    if (!on || playing) { return; }
    const t = window.setInterval(() => setIdx((i) => (i + 1) % HERO_CLIPS.length), 4500);
    return () => window.clearInterval(t);
  }, [on, playing]);

  const motionLabel = reduced ? "Animations réduites" : paused ? "Relancer les animations" : "Mettre en pause";

  return (
    <div
      style={{
        flex: "0 1 360px",
        width: "100%",
        maxWidth: 380,
        padding: 12,
        borderRadius: 22,
        background: "rgba(12,11,24,0.58)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "#FFFFFF",
        display: "grid",
        gap: 10,
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.7)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontWeight: 800, letterSpacing: "0.14em" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f43f5e", boxShadow: "0 0 10px #f43f5e" }} />À L’AFFICHE
        </span>
        <span>{idx + 1} / 4</span>
      </div>
      <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 14, overflow: "hidden", background: "#000" }}>
        {HERO_CLIPS.map((c, i) => (
          <div
            key={c.id}
            role="img"
            aria-label={i === idx ? "Extrait : " + c.title : undefined}
            aria-hidden={i === idx ? undefined : true}
            style={{ position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center", opacity: i === idx ? 1 : 0, transition: "opacity 900ms ease", backgroundImage: `url("${ytThumb(c.id)}")` }}
          />
        ))}
        {playing ? (
          <iframe
            src={ytEmbed(clip.id)}
            title={clip.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={"Lire l’extrait : " + clip.title}
            style={{ position: "absolute", inset: 0, width: "100%", border: 0, padding: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)", cursor: "pointer", color: "#FFFFFF" }}
          >
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 58,
                height: 58,
                margin: "-29px 0 0 -29px",
                borderRadius: "50%",
                backgroundImage: "linear-gradient(135deg,#7C3AED,#C026D3,#E11D48)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 0 0 6px rgba(255,255,255,0.18)",
              }}
            >
              <span style={{ width: 0, height: 0, marginLeft: 4, borderLeft: "16px solid #FFFFFF", borderTop: "10px solid transparent", borderBottom: "10px solid transparent" }} />
            </span>
            <span style={{ position: "absolute", left: 12, right: 12, bottom: 10, textAlign: "left", fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{clip.title}</span>
          </button>
        )}
      </div>
      <div role="group" aria-label="Choisir un extrait" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 6 }}>
        {HERO_CLIPS.map((c, i) => {
          const sel = i === idx;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setIdx(i);
                setPlaying(false);
              }}
              aria-label={`Afficher l’extrait ${i + 1} : ${c.title}`}
              aria-pressed={sel}
              style={{ position: "relative", height: 40, padding: 0, border: 0, borderRadius: 8, overflow: "hidden", background: "#000", cursor: "pointer" }}
            >
              <span aria-hidden="true" style={{ display: "block", width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center", opacity: sel ? 1 : 0.5, backgroundImage: `url("${ytThumb(c.id)}")` }} />
              <span style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: sel ? c.accent : "#DDE0EA" }} />
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, fontSize: 13, color: "#D5D8E3" }}>
        <span>{clip.cat}</span>
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={paused}
          disabled={reduced}
          style={{ minHeight: 32, padding: "0 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)", color: "#FFFFFF", fontSize: 12, fontWeight: 700, cursor: reduced ? "default" : "pointer" }}
        >
          {motionLabel}
        </button>
      </div>
    </div>
  );
}
