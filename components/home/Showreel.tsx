"use client";

import { useState } from "react";
import { CATS, CLIP, VIDEOS, ytEmbed, ytThumb, ytWatch, type VideoCat } from "@/lib/content";
import { YOUTUBE_CHANNEL } from "@/lib/site";
import { KameNote } from "@/components/ks/Kame";
import PrefillLink from "@/components/ks/PrefillLink";
import { Aurora, Eyebrow, FD, G, GlowBox, Sparkles } from "@/components/ks/ui";

type CatKey = "all" | VideoCat;

/** « Voir, c’est croire » : toutes les productions, filtres par univers et lecteur. */
export default function Showreel() {
  const [cat, setCat] = useState<CatKey>("all");
  // Le clip à la une a déjà sa section plus haut : le lecteur s'ouvre sur la production suivante.
  const [showId, setShowId] = useState((VIDEOS.find((v) => v.id !== CLIP.id) ?? VIDEOS[0]).id);
  const [playing, setPlaying] = useState(false);

  const current = VIDEOS.find((v) => v.id === showId) ?? VIDEOS[0];
  const cc = CATS[current.cat];
  const list = cat === "all" ? VIDEOS : VIDEOS.filter((v) => v.cat === cat);

  return (
    <section id="realisations" data-kame="showreel" className="bg-w" style={{ position: "relative", overflow: "clip", padding: "clamp(64px,8vw,112px) 0" }}>
      <Aurora
        px={26}
        blobs={[
          ["rgba(249,115,22,.22)", "min(40vw,560px)", { left: "-8%", top: "-6%" }, "ksDrift2", 22],
          ["rgba(217,70,239,.24)", "min(40vw,560px)", { right: "-8%", top: "20%" }, "ksDrift1", 24],
          ["rgba(6,182,212,.2)", "min(30vw,420px)", { left: "30%", bottom: "-14%" }, "ksDrift3", 20],
        ]}
      />
      <Sparkles n={20} seed={8} />
      <div className="ks-wrap" style={{ display: "grid", gap: 30 }}>
        <div style={{ display: "grid", gap: 16, justifyItems: "center", textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
          <Eyebrow>Kaméléon Studio en action</Eyebrow>
          <h2 className="h2 h2-lg">
            Voir, c’est croire.{" "}
            <G c="#EA580C,#E11D48,#C026D3" block>
              Voici ce qu’on crée.
            </G>
          </h2>
          <p className="lead">Animations, podcasts, formations, recettes : chaque production est créée avec l’IA et livrée en quelques jours.</p>
        </div>

        <div role="group" aria-label="Filtrer par univers" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {(Object.keys(CATS) as CatKey[]).map((k) => {
            const on = cat === k;
            const c = CATS[k];
            const n = k === "all" ? VIDEOS.length : VIDEOS.filter((v) => v.cat === k).length;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setCat(k);
                  setPlaying(false);
                  if (k !== "all") { setShowId((VIDEOS.find((v) => v.cat === k) ?? VIDEOS[0]).id); }
                }}
                className="hv-up"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 42,
                  padding: "0 15px",
                  borderRadius: 999,
                  border: `1.5px solid ${on ? "transparent" : c[1] + "55"}`,
                  background: on ? "linear-gradient(135deg,#7C3AED,#C026D3)" : "#FFFFFF",
                  color: on ? "#FFFFFF" : c[1],
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: on ? "0 12px 26px -12px rgba(192,38,211,.65)" : `0 8px 18px -14px ${c[1]}`,
                  transition: "transform 150ms ease",
                }}
              >
                {c[0]}
                <span style={{ fontSize: 12, fontWeight: 800, opacity: 0.75 }}>{n}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
          <div style={{ flex: "2 1 560px", minWidth: 0, display: "grid", gap: 18 }}>
            <div style={{ position: "relative", borderRadius: 26 }}>
              <GlowBox radius={27} blur={30} />
              <div style={{ position: "relative", zIndex: 1, padding: 10, borderRadius: 24, background: "#0B0A14" }}>
                <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", background: "#000" }}>
                  {playing ? (
                    <iframe
                      key={current.id}
                      src={ytEmbed(current.id)}
                      title={current.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label={"Lire la vidéo : " + current.title}
                      style={{ position: "absolute", inset: 0, width: "100%", padding: 0, border: 0, background: "#000", cursor: "pointer" }}
                    >
                      <span aria-hidden="true" style={{ display: "block", width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url("${ytThumb(current.id)}")` }} />
                      <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.78) 100%)" }} />
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: 86,
                          height: 86,
                          margin: "-43px 0 0 -43px",
                          borderRadius: "50%",
                          backgroundImage: "linear-gradient(135deg,#7C3AED,#C026D3,#E11D48)",
                          display: "grid",
                          placeItems: "center",
                          boxShadow: "0 0 0 9px rgba(255,255,255,0.18), 0 22px 44px rgba(192,38,211,0.5)",
                        }}
                      >
                        <span style={{ width: 0, height: 0, marginLeft: 6, borderLeft: "22px solid #FFFFFF", borderTop: "13px solid transparent", borderBottom: "13px solid transparent" }} />
                      </span>
                      <span style={{ position: "absolute", left: 20, right: 20, bottom: 16, textAlign: "left", color: "#FFFFFF", fontWeight: 700, fontSize: "clamp(15px,1.6vw,19px)", lineHeight: 1.3 }}>{current.title}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div style={{ display: "grid", gap: 8, maxWidth: 640 }}>
                <span style={{ display: "inline-flex", width: "fit-content", padding: "4px 11px", borderRadius: 999, background: cc[2], color: cc[1], fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>{cc[0]}</span>
                <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(19px,2vw,25px)", lineHeight: 1.25, letterSpacing: "-0.02em" }}>{current.title}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#525B70" }}>{current.desc}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <PrefillLink
                  href="/#studio"
                  contact={{ type: "Production vidéo", msg: `Projet similaire à « ${current.title} » : ` }}
                  className="btn btn-grad hv-bright"
                  style={{ minHeight: 48, padding: "0 20px", borderRadius: 14, fontWeight: 700, fontSize: 15 }}
                >
                  Créer un projet similaire
                </PrefillLink>
                <a href={ytWatch(current.id)} target="_blank" rel="noopener" className="btn hv-ink" style={{ minHeight: 48, padding: "0 18px", borderRadius: 14, background: "#FFFFFF", border: "1.5px solid #E0E3EC", color: "#151827", fontSize: 15 }}>
                  Regarder sur YouTube
                </a>
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 320px", minWidth: 0, display: "grid", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#525B70" }}>
                {list.length} production{list.length > 1 ? "s" : ""}
              </span>
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener" style={{ fontSize: 14, fontWeight: 600 }}>
                Chaîne YouTube
              </a>
            </div>
            <div className="thin-scroll" style={{ display: "grid", gap: 10, maxHeight: 640, overflowY: "auto", padding: "4px 6px 8px 2px" }}>
              {list.map((v) => {
                const on = v.id === current.id;
                const c = CATS[v.cat];
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setShowId(v.id);
                      setPlaying(true);
                    }}
                    aria-pressed={on}
                    className="hv-x4"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "124px minmax(0,1fr)",
                      gap: 12,
                      alignItems: "center",
                      padding: 8,
                      borderRadius: 16,
                      textAlign: "left",
                      color: "#151827",
                      cursor: "pointer",
                      background: `linear-gradient(#FFFFFF,#FFFFFF) padding-box, ${on ? "linear-gradient(135deg,#7C3AED,#06b6d4,#f43f5e)" : "linear-gradient(#ECEEF4,#ECEEF4)"} border-box`,
                      border: "1.5px solid transparent",
                      boxShadow: on ? "0 16px 34px -20px rgba(139,92,246,.75)" : "none",
                      transition: "transform 200ms ease",
                    }}
                  >
                    <span style={{ position: "relative", display: "block", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", background: "#000" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ytThumb(v.id)} alt="" loading="lazy" width={480} height={360} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <span style={{ position: "absolute", left: "50%", top: "50%", width: 30, height: 30, margin: "-15px 0 0 -15px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "grid", placeItems: "center" }}>
                        <span style={{ width: 0, height: 0, marginLeft: 3, borderLeft: `9px solid ${c[1]}`, borderTop: "6px solid transparent", borderBottom: "6px solid transparent" }} />
                      </span>
                    </span>
                    <span style={{ display: "grid", gap: 3, minWidth: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: c[1] }}>{c[0]}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <KameNote k="showreel" />
      </div>
    </section>
  );
}
