"use client";


export type DividerVariant = "scan" | "wave" | "circuit" | "chevron" | "signal";

// ── SCAN — ligne holographique qui pulse ─────────────────────────────────────
function ScanDivider() {
  return (
    <div aria-hidden="true" style={{ position: "relative", height: 2, overflow: "visible", margin: "0 0" }}>
      {/* Ligne principale */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "1px",
        background: "linear-gradient(90deg, transparent 0%, #8b5cf6 20%, #d946ef 50%, #06b6d4 80%, transparent 100%)",
        animation: "scan-pulse 2.5s ease-in-out infinite",
      }} />
      {/* Halo glow sous la ligne */}
      <div style={{
        position: "absolute", left: "10%", right: "10%", top: -6, height: 13,
        background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.35) 30%, rgba(6,182,212,0.35) 70%, transparent)",
        filter: "blur(6px)",
        animation: "scan-pulse 2.5s ease-in-out infinite",
      }} />
      {/* Point scanner qui défile */}
      <div style={{
        position: "absolute", top: -3, width: 6, height: 6, borderRadius: "50%",
        background: "#d946ef",
        boxShadow: "0 0 12px 4px rgba(217,70,239,0.8)",
        animation: "scan-travel 3s linear infinite",
      }} />
      <style>{`
        @keyframes scan-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scan-travel {
          0% { left: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scan-anim { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── WAVE — vague SVG avec dégradé animé ─────────────────────────────────────
function WaveDivider() {
  return (
    <div aria-hidden="true" style={{ position: "relative", height: 60, overflow: "visible" }}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="20%"  stopColor="#d946ef" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="80%"  stopColor="#d946ef" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0" to="1 0"
              dur="4s" repeatCount="indefinite"
            />
          </linearGradient>
          {/* Glow filter */}
          <filter id="wave-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Vague principale */}
        <path
          d="M0,30 C240,5 480,55 720,30 C960,5 1200,55 1440,30"
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth="1.5"
          filter="url(#wave-glow)"
        />
        {/* Vague secondaire décalée */}
        <path
          d="M0,35 C240,10 480,60 720,35 C960,10 1200,60 1440,35"
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

// ── CIRCUIT — points lumineux animés ────────────────────────────────────────
const NODES = [
  { x: "8%",  y: 20, color: "#8b5cf6", size: 4, delay: "0s" },
  { x: "22%", y: 40, color: "#d946ef", size: 3, delay: "0.5s" },
  { x: "38%", y: 15, color: "#06b6d4", size: 4, delay: "1s" },
  { x: "54%", y: 45, color: "#8b5cf6", size: 3, delay: "0.3s" },
  { x: "67%", y: 20, color: "#d946ef", size: 4, delay: "1.5s" },
  { x: "80%", y: 38, color: "#06b6d4", size: 3, delay: "0.8s" },
  { x: "92%", y: 18, color: "#8b5cf6", size: 4, delay: "0.2s" },
];

// Lignes entre les nodes
const LINES = [
  { x1: "8%",  x2: "22%", y: 30 },
  { x1: "22%", x2: "38%", y: 28 },
  { x1: "38%", x2: "54%", y: 30 },
  { x1: "54%", x2: "67%", y: 32 },
  { x1: "67%", x2: "80%", y: 29 },
  { x1: "80%", x2: "92%", y: 28 },
];

function CircuitDivider() {
  return (
    <div aria-hidden="true" style={{ position: "relative", height: 60, overflow: "visible" }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Lignes de circuit */}
        {LINES.map((l, i) => (
          <line key={i}
            x1={l.x1} y1={l.y} x2={l.x2} y2={l.y}
            stroke="rgba(139,92,246,0.3)" strokeWidth="0.5"
            strokeDasharray="4 6"
          />
        ))}
        {/* Nodes */}
        {NODES.map((n, i) => (
          <circle key={i}
            cx={n.x} cy={n.y} r={n.size}
            fill={n.color}
            filter="url(#node-glow)"
            style={{ animation: `node-pulse 2s ease-in-out ${n.delay} infinite` }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes node-pulse {
          0%, 100% { opacity: 0.4; r: 3; }
          50% { opacity: 1; r: 5; }
        }
        @media (prefers-reduced-motion: reduce) {
          circle { animation: none !important; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// ── CHEVRON — diagonale anguleuse néon ──────────────────────────────────────
function ChevronDivider() {
  return (
    <div aria-hidden="true" style={{ position: "relative", height: 40, overflow: "visible" }}>
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="chev-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#d946ef" stopOpacity="0" />
            <stop offset="25%"  stopColor="#d946ef" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="75%"  stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <filter id="chev-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Chevron principal */}
        <polyline
          points="0,35 360,8 720,25 1080,5 1440,20"
          fill="none"
          stroke="url(#chev-grad)"
          strokeWidth="1.5"
          filter="url(#chev-glow)"
        />
        {/* Écho atténué */}
        <polyline
          points="0,38 360,11 720,28 1080,8 1440,23"
          fill="none"
          stroke="url(#chev-grad)"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

// ── SIGNAL — ligne fine avec pulse ──────────────────────────────────────────
function SignalDivider() {
  return (
    <div aria-hidden="true" style={{ position: "relative", height: 20, overflow: "visible" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: "50%",
        height: "0.5px", transform: "translateY(-50%)",
        background: "linear-gradient(90deg, transparent 0%, #d946ef 20%, #06b6d4 50%, #d946ef 80%, transparent 100%)",
        animation: "signal-pulse 3s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", left: "15%", right: "15%", top: "50%",
        height: 8, transform: "translateY(-50%)",
        background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent)",
        filter: "blur(4px)",
        animation: "signal-pulse 3s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes signal-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .signal-anim { animation: none !important; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────
export default function SectionDivider({ variant = "scan" }: { variant?: DividerVariant }) {
  if (variant === "wave")    { return <WaveDivider />; }
  if (variant === "circuit") { return <CircuitDivider />; }
  if (variant === "chevron") { return <ChevronDivider />; }
  if (variant === "signal")  { return <SignalDivider />; }
  return <ScanDivider />;
}
