"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FORMATION_STATUS } from "@/lib/site";
import { Eyebrow, FD, G, GlowRing } from "@/components/ks/ui";

const open = FORMATION_STATUS === "ouverte";

const TRACKS = [
  {
    n: "01",
    name: "Production vidéo",
    desc: "Vidéos 3D, contenus pédagogiques et films de marque, du script à la livraison. Formats 16:9 et 9:16, livrés sous 7 jours ouvrés maximum.",
    status: "Disponible",
    dot: "#20BFD1",
    cta: "Parler de mon projet",
    href: "/#studio",
    img: "/prest-video.webp",
    fit: "cover" as const,
    pos: "50% 30%",
    base: "#0B0A14",
    grad: "linear-gradient(90deg,#F0ABFC,#C4B5FD)",
    btn: "linear-gradient(135deg,#7C3AED,#C026D3)",
    acc: "#d946ef",
  },
  {
    n: "02",
    name: "Coaching individuel",
    desc: "Une séance à distance pour lancer, améliorer ou organiser votre propre production vidéo IA, avec le regard du studio.",
    status: "Sur réservation",
    dot: "#6546D7",
    cta: "Réserver une séance",
    href: "/coaching#reserver",
    img: "/kame-mentor.webp",
    fit: "contain" as const,
    pos: "88% 100%",
    base: "radial-gradient(120% 90% at 85% 100%, #0E7490 0%, #164E63 35%, #0B0A14 78%)",
    grad: "linear-gradient(90deg,#67E8F9,#86EFAC)",
    btn: "linear-gradient(135deg,#0E7490,#15803D)",
    acc: "#06b6d4",
  },
  {
    n: "03",
    name: "Formations IA",
    desc: "King of IA, les formations du studio : huit modules pour apprendre à produire vos vidéos avec l’IA, du prompt au montage.",
    status: open ? "Inscriptions ouvertes" : "Bientôt disponible",
    dot: "#FF776B",
    cta: open ? "Découvrir les formations" : "Rejoindre la liste d’attente",
    href: open ? "/formations#programme" : "/formations#liste-attente",
    img: "/module-storytelling.webp",
    fit: "cover" as const,
    pos: "50% 40%",
    base: "#0B0A14",
    grad: "linear-gradient(90deg,#FDBA74,#FDA4AF)",
    btn: "linear-gradient(135deg,#C2410C,#BE123C)",
    acc: "#f97316",
  },
];

/** « Trois parcours » : chaque piste se déploie au survol (toujours ouvertes sur mobile). */
export default function Tracks() {
  const [active, setActive] = useState(0);

  return (
    <section id="offres" data-kame="cockpit" className="bg-p" style={{ position: "relative", overflow: "clip", padding: "clamp(72px,9vw,128px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 40 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div style={{ display: "grid", gap: 18, maxWidth: 720 }}>
            <Eyebrow n="02">Travailler avec le studio</Eyebrow>
            <h2 className="h2">
              Trois parcours, <G c="#0891B2,#7C3AED">une action claire pour chacun.</G>
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 340, fontSize: 16, lineHeight: 1.6, color: "#525B70" }}>Survolez un parcours pour le déployer, puis passez à l’action.</p>
        </div>
        <div role="list" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {TRACKS.map((t, i) => {
            const on = active === i;
            return (
              <article
                key={t.n}
                role="listitem"
                data-glow="1"
                data-on={on}
                className="track"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{
                  position: "relative",
                  minWidth: "min(100%,250px)",
                  borderRadius: 28,
                  overflow: "hidden",
                  isolation: "isolate",
                  background: t.base,
                  color: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  boxShadow: on ? `0 0 0 1.5px ${t.acc}, 0 44px 90px -36px ${t.acc}` : "0 30px 60px -40px rgba(11,10,20,0.6)",
                }}
              >
                <GlowRing z={3} />
                <Image
                  src={t.img}
                  alt=""
                  fill
                  sizes="(max-width: 979px) 100vw, 60vw"
                  className="track-img"
                  style={{ objectFit: t.fit, objectPosition: t.pos, zIndex: -3 }}
                />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -2, background: "linear-gradient(180deg, rgba(11,10,20,0.2) 0%, rgba(11,10,20,0.35) 40%, rgba(11,10,20,0.94) 100%)" }} />
                <div aria-hidden="true" className="track-wash" style={{ position: "absolute", inset: 0, zIndex: -1, background: `radial-gradient(90% 60% at 50% 105%, ${t.acc}88, transparent 70%)` }} />
                <div style={{ position: "absolute", top: 20, left: 22, right: 22, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", color: "#E4E6EE" }}>PISTE {t.n}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: "rgba(11,10,20,0.6)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.dot, boxShadow: `0 0 10px ${t.dot}` }} />
                    {t.status}
                  </span>
                </div>
                <span aria-hidden="true" style={{ position: "absolute", left: 18, top: 54, fontFamily: FD, fontWeight: 600, fontSize: "clamp(96px,11vw,150px)", lineHeight: 1, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.32)" }}>
                  {t.n}
                </span>
                <div style={{ padding: "clamp(22px,2.6vw,32px)", display: "grid", gap: 14 }}>
                  <h3 className="grad-text" style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontSize: "clamp(24px,2.4vw,32px)", lineHeight: 1.1, letterSpacing: "-0.03em", backgroundImage: t.grad }}>
                    {t.name}
                  </h3>
                  <div className="track-body">
                    <p className="tw-pretty" style={{ margin: 0, maxWidth: 460, fontSize: 16, lineHeight: 1.6, color: "#E4E6EE" }}>
                      {t.desc}
                    </p>
                    <Link
                      href={t.href}
                      className="btn hv-up hv-bright"
                      style={{ width: "fit-content", minHeight: 50, padding: "0 22px", borderRadius: 999, backgroundImage: t.btn, color: "#FFFFFF", fontWeight: 700, fontSize: 15, boxShadow: `0 14px 30px -14px ${t.acc}` }}
                    >
                      {t.cta} →
                    </Link>
                  </div>
                  <span aria-hidden="true" className="track-hint" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D5D8E3" }}>
                    Découvrir →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
