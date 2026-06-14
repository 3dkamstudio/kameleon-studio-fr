"use client";

import { useId } from "react";

export type DividerVariant = "scan" | "wave" | "circuit" | "chevron";

// ── Circuit — données déterministes ───────────────────────────────────────────
const TRACES = [
  { x1: 0,    y1: 34, x2: 1440, y2: 34, c: "rgba(217,70,239,0.13)"  },
  { x1: 0,    y1: 52, x2: 1440, y2: 52, c: "rgba(139,92,246,0.11)"  },
  { x1: 144,  y1: 34, x2: 144,  y2: 52, c: "rgba(217,70,239,0.20)"  },
  { x1: 288,  y1: 34, x2: 288,  y2: 52, c: "rgba(6,182,212,0.20)"   },
  { x1: 432,  y1: 34, x2: 432,  y2: 52, c: "rgba(34,197,94,0.20)"   },
  { x1: 576,  y1: 34, x2: 576,  y2: 52, c: "rgba(234,179,8,0.20)"   },
  { x1: 720,  y1: 34, x2: 720,  y2: 52, c: "rgba(249,115,22,0.20)"  },
  { x1: 864,  y1: 34, x2: 864,  y2: 52, c: "rgba(244,63,94,0.20)"   },
  { x1: 1008, y1: 34, x2: 1008, y2: 52, c: "rgba(139,92,246,0.20)"  },
  { x1: 1152, y1: 34, x2: 1152, y2: 52, c: "rgba(217,70,239,0.20)"  },
  { x1: 1296, y1: 34, x2: 1296, y2: 52, c: "rgba(6,182,212,0.20)"   },
] as const;

const NODES: { cx: number; cy: number; r: number; c: string; glow: string; t: number; d: number }[] = [
  { cx:  144, cy: 34, r: 2.5, c: "#d946ef", glow: "rgba(217,70,239,0.6)", t: 3.2, d: 0.0 },
  { cx:  144, cy: 52, r: 1.5, c: "#d946ef", glow: "rgba(217,70,239,0.3)", t: 0,   d: 0.0 },
  { cx:  288, cy: 34, r: 3.0, c: "#06b6d4", glow: "rgba(6,182,212,0.6)",  t: 4.0, d: 0.8 },
  { cx:  288, cy: 52, r: 1.5, c: "#06b6d4", glow: "rgba(6,182,212,0.3)",  t: 0,   d: 0.0 },
  { cx:  432, cy: 34, r: 2.5, c: "#22c55e", glow: "rgba(34,197,94,0.6)",  t: 2.8, d: 1.6 },
  { cx:  432, cy: 52, r: 1.5, c: "#22c55e", glow: "rgba(34,197,94,0.3)",  t: 0,   d: 0.0 },
  { cx:  576, cy: 34, r: 3.0, c: "#eab308", glow: "rgba(234,179,8,0.6)",  t: 3.6, d: 0.4 },
  { cx:  576, cy: 52, r: 1.5, c: "#eab308", glow: "rgba(234,179,8,0.3)",  t: 0,   d: 0.0 },
  { cx:  720, cy: 34, r: 3.5, c: "#f97316", glow: "rgba(249,115,22,0.6)", t: 3.0, d: 2.0 },
  { cx:  720, cy: 52, r: 1.5, c: "#f97316", glow: "rgba(249,115,22,0.3)", t: 0,   d: 0.0 },
  { cx:  864, cy: 34, r: 2.5, c: "#f43f5e", glow: "rgba(244,63,94,0.6)",  t: 4.2, d: 1.2 },
  { cx:  864, cy: 52, r: 1.5, c: "#f43f5e", glow: "rgba(244,63,94,0.3)",  t: 0,   d: 0.0 },
  { cx: 1008, cy: 34, r: 3.0, c: "#8b5cf6", glow: "rgba(139,92,246,0.6)", t: 2.6, d: 0.6 },
  { cx: 1008, cy: 52, r: 1.5, c: "#8b5cf6", glow: "rgba(139,92,246,0.3)", t: 0,   d: 0.0 },
  { cx: 1152, cy: 34, r: 2.5, c: "#d946ef", glow: "rgba(217,70,239,0.6)", t: 3.8, d: 1.8 },
  { cx: 1152, cy: 52, r: 1.5, c: "#d946ef", glow: "rgba(217,70,239,0.3)", t: 0,   d: 0.0 },
  { cx: 1296, cy: 34, r: 3.0, c: "#06b6d4", glow: "rgba(6,182,212,0.6)",  t: 3.4, d: 0.2 },
  { cx: 1296, cy: 52, r: 1.5, c: "#06b6d4", glow: "rgba(6,182,212,0.3)",  t: 0,   d: 0.0 },
];

// ── SCAN ─────────────────────────────────────────────────────────────────────
// Fond TRANSPARENT — la ligne flotte sur les sections adjacentes
function ScanDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 56,
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        /* fondu haut + bas pour s'intégrer en douceur */
        maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
      }}
    >
      {/* Ligne rainbow */}
      <div style={{
        position: "absolute", left: 0, right: 0,
        top: "50%", height: 1,
        transform: "translateY(-50%)",
        background: "linear-gradient(90deg,transparent 0%,#d946ef 8%,#f43f5e 20%,#f97316 35%,#06b6d4 50%,#22c55e 65%,#eab308 80%,#8b5cf6 92%,transparent 100%)",
        animation: "div-scan-pulse 3s ease-in-out infinite",
      }} />
      {/* Halo doux */}
      <div style={{
        position: "absolute", left: 0, right: 0,
        top: "calc(50% - 8px)", height: 16,
        background: "linear-gradient(90deg,transparent 0%,rgba(217,70,239,0.08) 15%,rgba(6,182,212,0.12) 50%,rgba(139,92,246,0.08) 85%,transparent 100%)",
        filter: "blur(6px)",
        animation: "div-scan-pulse 3s ease-in-out infinite",
      }} />
      {/* Faisceau mobile */}
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        left: -260, width: 260,
        background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.04) 30%,rgba(217,70,239,0.18) 50%,rgba(255,255,255,0.04) 70%,transparent)",
        animation: "div-scan-beam 4.5s linear infinite",
      }} />
    </div>
  );
}

// ── WAVE ─────────────────────────────────────────────────────────────────────
function WaveDivider() {
  const uid = useId().replace(/:/g, "");
  return (
    <div
      aria-hidden="true"
      style={{
        height: 70,
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        /* fondu vertical pour fondu parfait */
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
      }}
    >
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          {/* Masque wave — 2×1440 pour couvrir le rect animé */}
          <mask id={`${uid}m`}>
            <rect x="0" y="0" width="2880" height="70" fill="black" />
            <path
              d="M0,48 C240,18 480,62 720,34 C960,8 1200,56 1440,28
                 C1680,0  1920,58 2160,30 C2400,4 2640,54 2880,26
                 L2880,70 L0,70 Z"
              fill="white"
            />
          </mask>
          {/* Gradient 2× seamless */}
          <linearGradient id={`${uid}g`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#d946ef" stopOpacity="0.80" />
            <stop offset="8%"   stopColor="#f43f5e" stopOpacity="0.70" />
            <stop offset="17%"  stopColor="#f97316" stopOpacity="0.60" />
            <stop offset="25%"  stopColor="#06b6d4" stopOpacity="0.70" />
            <stop offset="33%"  stopColor="#22c55e" stopOpacity="0.60" />
            <stop offset="41%"  stopColor="#8b5cf6" stopOpacity="0.70" />
            <stop offset="50%"  stopColor="#d946ef" stopOpacity="0.80" />
            <stop offset="58%"  stopColor="#f43f5e" stopOpacity="0.70" />
            <stop offset="67%"  stopColor="#f97316" stopOpacity="0.60" />
            <stop offset="75%"  stopColor="#06b6d4" stopOpacity="0.70" />
            <stop offset="83%"  stopColor="#22c55e" stopOpacity="0.60" />
            <stop offset="91%"  stopColor="#8b5cf6" stopOpacity="0.70" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.80" />
          </linearGradient>
          <linearGradient id={`${uid}s`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#d946ef" />
            <stop offset="33%"  stopColor="#06b6d4" />
            <stop offset="66%"  stopColor="#d946ef" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Remplissage animé — très subtil pour ne pas créer de bande visible */}
        <rect x="0" y="0" width="2880" height="70"
          fill={`url(#${uid}g)`} mask={`url(#${uid}m)`} opacity="0.05"
          className="div-wave-rect" />
        {/* Trait de crête */}
        <path d="M0,48 C240,18 480,62 720,34 C960,8 1200,56 1440,28"
          fill="none" stroke={`url(#${uid}s)`} strokeWidth="1.2" opacity="0.30" />
      </svg>
    </div>
  );
}

// ── CIRCUIT ───────────────────────────────────────────────────────────────────
function CircuitDivider() {
  const uid = useId().replace(/:/g, "");
  return (
    <div
      aria-hidden="true"
      style={{
        height: 70,
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      <svg viewBox="0 0 1440 70" preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <filter id={`${uid}glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {TRACES.map(({ x1, y1, x2, y2, c }, i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={1} />
        ))}
        {NODES.map(({ cx, cy, r, c, glow, t, d }, i) =>
          t > 0 ? (
            <g key={i} style={{ opacity: 0.12, animation: `div-circuit-blink ${t}s ease-in-out ${d}s infinite` }}>
              <circle cx={cx} cy={cy} r={r * 4} fill={glow} opacity={0.3} />
              <circle cx={cx} cy={cy} r={r}   fill={c}    filter={`url(#${uid}glow)`} />
            </g>
          ) : (
            <circle key={i} cx={cx} cy={cy} r={r} fill={c} opacity={0.10} />
          )
        )}
      </svg>
    </div>
  );
}

// ── CHEVRON ───────────────────────────────────────────────────────────────────
function ChevronDivider() {
  const uid = useId().replace(/:/g, "");
  return (
    <div
      aria-hidden="true"
      style={{
        height: 72,
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id={`${uid}g`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#d946ef" />
            <stop offset="35%"  stopColor="#8b5cf6" />
            <stop offset="65%"  stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <filter id={`${uid}f`} x="-20%" y="-120%" width="140%" height="340%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Remplissage subtil */}
        <path d="M0,0 L720,58 L1440,0 L1440,72 L0,72 Z"
          fill="rgba(139,92,246,0.03)" />
        {/* Trait gauche */}
        <path d="M-10,0 L720,58" fill="none"
          stroke={`url(#${uid}g)`} strokeWidth="1.5"
          filter={`url(#${uid}f)`} className="div-chevron-line" />
        {/* Trait droit */}
        <path d="M1450,0 L720,58" fill="none"
          stroke={`url(#${uid}g)`} strokeWidth="1.5"
          filter={`url(#${uid}f)`} className="div-chevron-line" />
        {/* Apex */}
        <circle cx="720" cy="58" r="3.5" fill="#8b5cf6"
          filter={`url(#${uid}f)`} className="div-chevron-apex" />
        <circle cx="720" cy="58" r="9" fill="rgba(139,92,246,0.18)"
          className="div-chevron-apex" />
        {/* Ticks décoratifs */}
        {[216, 432, 648].map((off, i) => (
          <circle key={i} cx={off} cy={(off / 720) * 58}
            r={1.5} fill={["#d946ef","#8b5cf6","#06b6d4"][i]} opacity={0.45} />
        ))}
        {[216, 432, 648].map((off, i) => (
          <circle key={`r${i}`} cx={1440 - off} cy={(off / 720) * 58}
            r={1.5} fill={["#d946ef","#8b5cf6","#06b6d4"][i]} opacity={0.45} />
        ))}
      </svg>
    </div>
  );
}

export default function SectionDivider({ variant = "scan" }: { variant?: DividerVariant }) {
  if (variant === "wave")    return <WaveDivider />;
  if (variant === "circuit") return <CircuitDivider />;
  if (variant === "chevron") return <ChevronDivider />;
  return <ScanDivider />;
}
