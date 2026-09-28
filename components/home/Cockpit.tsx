import Image from "next/image";
import Link from "next/link";
import { MARQUEE_GRADS, MARQUEE_WORDS, PAL, TILES_L, TILES_R, type Tile } from "@/lib/content";
import { Aurora, Eyebrow, FD, G, GlowRing, Sparkles } from "@/components/ks/ui";

function MarqueeRun() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, paddingRight: 28, flex: "none" }}>
      {MARQUEE_WORDS.map((w, i) => (
        <span key={w} style={{ display: "contents" }}>
          <span className="grad-text" style={{ fontFamily: FD, fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 600, letterSpacing: "-0.02em", whiteSpace: "nowrap", backgroundImage: `linear-gradient(90deg,${MARQUEE_GRADS[i % MARQUEE_GRADS.length]})` }}>
            {w}
          </span>
          <span style={{ flex: "none", width: 10, height: 10, borderRadius: 2, transform: "rotate(45deg)", background: PAL[i % PAL.length] }} />
        </span>
      ))}
    </div>
  );
}

/** Bandeau défilant des savoir-faire, sous le hero. */
export function Marquee() {
  return (
    <div aria-hidden="true" style={{ position: "relative", zIndex: 1, overflow: "hidden", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderBottom: "1px solid rgba(6,182,212,0.18)", padding: "18px 0" }}>
      <div style={{ display: "flex", width: "max-content", animation: "ksMarquee 40s linear infinite" }}>
        <MarqueeRun />
        <MarqueeRun />
      </div>
    </div>
  );
}

function TileCard({ t }: { t: Tile }) {
  return (
    <div
      data-glow="1"
      className="hv-up4"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "auto minmax(0,1fr)",
        gap: "4px 14px",
        alignItems: "center",
        padding: "16px 18px",
        borderRadius: 18,
        background: `linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(135deg, ${t.c1}, ${t.c2}) border-box`,
        border: "1.5px solid transparent",
        boxShadow: `0 20px 44px -26px ${t.glow}`,
        transition: "transform 250ms ease",
      }}
    >
      <GlowRing />
      <span style={{ gridRow: "span 2", width: 46, height: 46, borderRadius: 13, display: "grid", placeItems: "center", background: t.tint, fontFamily: FD, fontSize: 13, fontWeight: 600, color: t.ink }}>{t.n}</span>
      <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.25 }}>{t.label}</span>
        <span className="grad-text" style={{ flex: "none", fontFamily: FD, fontSize: 21, fontWeight: 600, letterSpacing: "-0.02em", backgroundImage: `linear-gradient(90deg, ${t.c1}, ${t.c2})` }}>
          {t.stat}
        </span>
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#525B70" }}>{t.sub}</span>
    </div>
  );
}

/** « Le cockpit Kaméléon » : les savoir-faire autour de Kame. */
export default function Cockpit() {
  return (
    <section id="studio-complet" data-kame="cockpit" className="bg-w" style={{ position: "relative", overflow: "clip", padding: "clamp(64px,8vw,112px) 0" }}>
      <Aurora
        px={28}
        blobs={[
          ["rgba(217,70,239,.28)", "min(40vw,560px)", { left: "30%", top: "10%" }, "ksDrift1", 20],
          ["rgba(6,182,212,.24)", "min(34vw,460px)", { left: "-6%", bottom: "-10%" }, "ksDrift2", 24],
          ["rgba(249,115,22,.2)", "min(30vw,420px)", { right: "-6%", top: "-6%" }, "ksDrift3", 18],
          ["rgba(34,197,94,.18)", "min(26vw,360px)", { right: "8%", bottom: "-12%" }, "ksDrift2", 26],
        ]}
      />
      <Sparkles n={22} seed={2} />
      <div className="ks-wrap" style={{ display: "grid", gap: 48 }}>
        <div style={{ display: "grid", gap: 18, justifyItems: "center", textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <Eyebrow>Le cockpit Kaméléon</Eyebrow>
          <h2 className="h2 h2-lg">
            Un studio complet,{" "}
            <G c="#E11D48,#EA580C,#CA8A04" block>
              pour chaque besoin.
            </G>
          </h2>
          <p className="lead">Du script à la livraison finale, tout est sur mesure : vidéo, animation 3D, voix, identité visuelle.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <div style={{ flex: "1 1 270px", maxWidth: 370, display: "grid", gap: 16 }}>
            {TILES_L.map((t) => (
              <TileCard key={t.n} t={t} />
            ))}
          </div>
          <div style={{ flex: "1.2 1 320px", maxWidth: 440, display: "grid", justifyItems: "center", gap: 22 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", display: "grid", placeItems: "center" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "3%",
                  borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #8b5cf6, #06b6d4, #22c55e, #eab308, #f97316, #f43f5e, #d946ef, #8b5cf6)",
                  WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
                  animation: "ksSpin 14s linear infinite",
                  filter: "drop-shadow(0 0 14px rgba(217,70,239,.5))",
                }}
              />
              <div aria-hidden="true" style={{ position: "absolute", inset: "3%", borderRadius: "50%", animation: "ksSpin 9s linear infinite reverse" }}>
                <span style={{ position: "absolute", top: -5, left: "50%", marginLeft: -8, width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF", border: "3px solid #d946ef", boxShadow: "0 0 18px rgba(217,70,239,.85)" }} />
              </div>
              <div aria-hidden="true" style={{ position: "absolute", inset: "12%", borderRadius: "50%", border: "1px dashed #D6D9E4" }} />
              <div aria-hidden="true" style={{ position: "absolute", inset: "14%", borderRadius: "50%", background: "radial-gradient(circle at 50% 42%, #F3E8FF 0%, #E0F7FB 46%, rgba(255,255,255,0) 72%)" }} />
              <Image
                src="/kame-camera-logo.webp"
                alt="Kame, caméra en main, logo Kaméléon Studio"
                width={1500}
                height={1500}
                sizes="(max-width: 480px) 88vw, 390px"
                className="kame-float"
                style={{ position: "relative", width: "88%", height: "auto", filter: "drop-shadow(0 24px 30px rgba(139,92,246,0.3))" }}
              />
            </div>
            <Link href="/#studio" className="btn btn-grad hv-grad" style={{ minHeight: 52, padding: "0 26px", borderRadius: 999, fontSize: 16 }}>
              Démarrer un projet
            </Link>
          </div>
          <div style={{ flex: "1 1 270px", maxWidth: 370, display: "grid", gap: 16 }}>
            {TILES_R.map((t) => (
              <TileCard key={t.n} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
