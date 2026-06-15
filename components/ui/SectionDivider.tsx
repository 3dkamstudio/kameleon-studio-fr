"use client";

export type DividerVariant = "scan" | "wave" | "circuit" | "chevron" | "signal";

const BASE = {
  position:      "relative"    as const,
  overflow:      "hidden"      as const,
  background:    "transparent",
  pointerEvents: "none"        as const,
};

// ── NEBULA FADE ("scan") ─────────────────────────────────────────────────────
function NebulaDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: 900, height: 180,
        background: "radial-gradient(ellipse at center, rgba(217,70,239,0.22) 0%, rgba(139,92,246,0.10) 40%, transparent 70%)",
        filter: "blur(28px)",
      }} />
    </div>
  );
}

// ── AURORA FLOW ("wave") ─────────────────────────────────────────────────────
function AuroraDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      <div
        className="div-aurora-drift"
        style={{
          position: "absolute", inset: 0,
          background: [
            "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(77,217,255,0.18) 0%, transparent 100%)",
            "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(6,182,212,0.12)  0%, transparent 100%)",
          ].join(", "),
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}

// ── PARTICLE DRIFT ("circuit") ───────────────────────────────────────────────
// 5 points cosmiques violet/fuchsia qui tombent en fondu — poussière stellaire
const PARTICLES = [
  { left: "11%", top: 15, size: 4, color: "rgba(139,92,246,0.35)", dur: "9s",  del: "0s"   },
  { left: "27%", top: 58, size: 3, color: "rgba(217,70,239,0.28)", dur: "12s", del: "2.8s" },
  { left: "44%", top: 28, size: 5, color: "rgba(139,92,246,0.32)", dur: "10s", del: "1.2s" },
  { left: "64%", top: 78, size: 4, color: "rgba(217,70,239,0.38)", dur: "14s", del: "4.1s" },
  { left: "82%", top: 42, size: 3, color: "rgba(139,92,246,0.30)", dur: "11s", del: "0.6s" },
] as const;

function ParticleDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="div-particle"
          style={{
            position: "absolute",
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: p.color,
            animationDuration: p.dur,
            animationDelay: p.del,
          }}
        />
      ))}
    </div>
  );
}

// ── DEEP SPACE ("chevron") ───────────────────────────────────────────────────
function DeepSpaceDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 160 }}>
      <div style={{
        position: "absolute", left: "10%", top: "50%",
        transform: "translateY(-50%)",
        width: 400, height: 200,
        background: "radial-gradient(ellipse at center, rgba(217,70,239,0.15) 0%, transparent 65%)",
        filter: "blur(30px)",
      }} />
      <div style={{
        position: "absolute", right: "10%", top: "50%",
        transform: "translateY(-50%)",
        width: 350, height: 180,
        background: "radial-gradient(ellipse at center, rgba(138,109,255,0.18) 0%, transparent 65%)",
        filter: "blur(28px)",
      }} />
    </div>
  );
}

// ── SIGNAL PULSE ("signal") ──────────────────────────────────────────────────
// Ligne 0.5px fuchsia à 4-6%, pulse lent — seule rupture visible avant le footer
function SignalDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 120 }}>
      <div
        className="div-signal-line"
        style={{
          position: "absolute", left: 0, right: 0, top: "50%",
          height: "1px", transform: "translateY(-50%)",
          background: "linear-gradient(90deg, transparent 0%, rgba(217,70,239,0.20) 25%, rgba(217,70,239,0.35) 50%, rgba(217,70,239,0.20) 75%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function SectionDivider({ variant = "scan" }: { variant?: DividerVariant }) {
  if (variant === "wave")    return <AuroraDivider />;
  if (variant === "circuit") return <ParticleDivider />;
  if (variant === "chevron") return <DeepSpaceDivider />;
  if (variant === "signal")  return <SignalDivider />;
  return <NebulaDivider />;
}
