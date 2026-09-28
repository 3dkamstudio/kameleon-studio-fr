import type { CSSProperties, ReactNode } from "react";
import { RAINBOW, PAL } from "@/lib/content";

// Générateur pseudo-aléatoire déterministe (mêmes valeurs côté serveur et navigateur).
export function rand(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export const FD = "var(--font-display), sans-serif";

/** Pastille de section : numéro (« 02 ») ou étoile. */
export function Eyebrow({ n, children, style }: { n?: string; children: ReactNode; style?: CSSProperties }) {
  if (n)
    {return (
      <span className="eyebrow eyebrow--n" style={style}>
        <span className="eyebrow__n">{n}</span>
        {children}
      </span>
    );}
  return (
    <span className="eyebrow" style={style}>
      <span aria-hidden="true" style={{ color: "#C026D3" }}>
        ✦
      </span>
      {children}
    </span>
  );
}

/** Texte en dégradé : `c` = liste de couleurs CSS séparées par des virgules. */
export function G({ c, block, children, style }: { c: string; block?: boolean; children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="grad-text" style={{ backgroundImage: `linear-gradient(90deg,${c})`, display: block ? "block" : undefined, ...style }}>
      {children}
    </span>
  );
}

/** Liseré lumineux qui suit le pointeur ; le parent porte data-glow. */
export function GlowRing({ inset, z }: { inset?: number | string; z?: number }) {
  return <span aria-hidden="true" className="glow-ring" style={{ inset, zIndex: z }} />;
}

export function Check({ color, children }: { color: string; children: ReactNode }) {
  return (
    <li className="chk">
      <span aria-hidden="true" className="chk-i" style={{ color }}>
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Dot({ color, size = 8, glow }: { color: string; size?: number; glow?: boolean }) {
  return <span aria-hidden="true" style={{ flex: "none", width: size, height: size, borderRadius: "50%", background: color, boxShadow: glow ? `0 0 10px ${color}` : undefined }} />;
}

/** Marque « Kaméléon Studio » ; `dark` sur fond sombre. */
export function Brand({ dark }: { dark?: boolean }) {
  return (
    <span className="ff-d" style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em", whiteSpace: "nowrap", color: dark ? "#FFFFFF" : "#151827" }}>
      <span
        className="grad-text"
        style={{
          backgroundImage: dark
            ? "linear-gradient(90deg,#B9A7FF,#5FE0EE,#6BE59A,#F8D65B,#FFA66B,#FF8FA3,#E99BFF,#B9A7FF)"
            : "linear-gradient(90deg,#6546D7,#0E7C8F,#15803D,#B45309,#DB2777,#6546D7)",
          backgroundSize: "300% 100%",
          animation: "ksHue 9s ease-in-out infinite alternate",
        }}
      >
        Kaméléon
      </span>
      <span style={{ fontWeight: 400, color: dark ? "#C9CDDA" : "#525B70" }}> Studio</span>
    </span>
  );
}

type Blob = [color: string, size: string, pos: CSSProperties, anim: "ksDrift1" | "ksDrift2" | "ksDrift3", dur: number];

/** Halos colorés en fond de section, avec légère parallaxe. */
export function Aurora({ px, blobs }: { px: number; blobs: Blob[] }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: "-8%",
          transform: `translate3d(calc(var(--mx, 0) * ${px}px), calc(var(--my, 0) * ${px}px), 0)`,
          transition: "transform 1.4s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {blobs.map(([c, size, pos, anim, dur], i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: size,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              background: `radial-gradient(circle at 50% 50%, ${c} 0%, transparent 66%)`,
              animation: `${anim} ${dur}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Petites étincelles scintillantes, positions fixes selon `seed`. */
export function Sparkles({ n, seed }: { n: number; seed: number }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: n }, (_, i) => {
        const r = (k: number) => rand(seed * 1000 + i * 10 + k);
        const sz = 3 + Math.round(r(1) * 4);
        const col = PAL[i % PAL.length];
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: (r(2) * 100).toFixed(2) + "%",
              top: (r(3) * 100).toFixed(2) + "%",
              width: sz,
              height: sz,
              borderRadius: "50%",
              background: col,
              boxShadow: `0 0 ${sz * 3}px ${col}`,
              opacity: 0.6,
              animation: `ksTwinkle ${(2.5 + r(4) * 3).toFixed(2)}s ease-in-out ${(r(5) * 3).toFixed(2)}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

const Dia = () => <span style={{ flex: "none", width: 7, height: 7, transform: "rotate(45deg)", background: "#151827" }} />;

/** Séparateur « timeline » entre deux sections ; `bg` = fond de la section suivante. */
export function Sep({ n, label, bg }: { n: string; label: string; bg: "w" | "p" }) {
  return (
    <div aria-hidden="true" className={bg === "w" ? "bg-w" : "bg-p"} style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", height: 64, display: "flex", alignItems: "center", gap: 14 }}>
        <span className="ff-d" style={{ flex: "none", fontSize: 11, fontWeight: 500, letterSpacing: ".08em", color: "#6546D7", padding: "4px 8px", border: "1px solid #D9D2F6", borderRadius: 6, background: "#FFFFFF" }}>
          SC {n}
        </span>
        <Dia />
        <div style={{ position: "relative", flex: 1, height: 16, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, backgroundImage: "repeating-linear-gradient(90deg,#C3C8D6 0 1px,transparent 1px 12px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 10, height: 2, borderRadius: 2, background: RAINBOW, opacity: 0.4 }} />
          <div
            style={{
              position: "absolute",
              top: 8,
              height: 6,
              width: "22%",
              borderRadius: 6,
              background: "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, #22c55e, #eab308, #f43f5e, transparent)",
              filter: "blur(1px)",
              transform: "translateX(-110%)",
              animation: `ksSweep 6.5s cubic-bezier(.45,0,.25,1) ${Number(n) * 0.8}s infinite`,
            }}
          />
        </div>
        <Dia />
        <span style={{ flex: "none", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", color: "#525B70" }}>{label}</span>
      </div>
    </div>
  );
}

/** Pastille « REC » clignotante. */
export function RecDot() {
  return <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "#f43f5e", boxShadow: "0 0 8px #f43f5e", animation: "ksRec 1.4s ease-in-out infinite" }} />;
}

/** Bande de pellicule animée. */
export function FilmStrip() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 22,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.16) 0 14px, transparent 14px)",
        backgroundSize: "30px 9px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0 50%",
        animation: "ksFilm 1.2s linear infinite",
      }}
    />
  );
}

/** Cadre lumineux arc-en-ciel animé autour d'un bloc (lecteur, bannière finale). */
export function GlowBox({ radius, blur, inset = -3, innerInset = 18 }: { radius: number | string; blur: number; inset?: number; innerInset?: number }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset, borderRadius: radius, backgroundImage: RAINBOW, backgroundSize: "300% 100%", animation: "ksHue 7s ease-in-out infinite alternate", zIndex: 0 }}>
      <div style={{ position: "absolute", inset: innerInset, borderRadius: radius, backgroundImage: RAINBOW, backgroundSize: "300% 100%", filter: `blur(${blur}px)`, opacity: 0.55 }} />
    </div>
  );
}
