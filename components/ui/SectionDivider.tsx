"use client";

export type DividerVariant = "scan" | "wave" | "circuit" | "chevron" | "signal";

const BASE = {
  position:      "relative"    as const,
  overflow:      "hidden"      as const,
  background:    "transparent",
  pointerEvents: "none"        as const,
};

// ── NEBULA FADE ("scan") ─────────────────────────────────────────────────────
// Halo radial fuchsia discret — l'espace respire
function NebulaDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 160,
        background: "radial-gradient(ellipse at center, rgba(217,70,239,0.07) 0%, transparent 65%)",
        filter: "blur(22px)",
      }} />
    </div>
  );
}

// ── AURORA FLOW ("wave") ─────────────────────────────────────────────────────
// Deux halos cyan à 2-3% qui dérivent lentement — aurore boréale discrète
function AuroraDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      <div
        className="div-aurora-drift"
        style={{
          position: "absolute", inset: 0,
          background: [
            "radial-gradient(ellipse 55% 60% at 22% 50%, rgba(77,217,255,0.03) 0%, transparent 100%)",
            "radial-gradient(ellipse 45% 50% at 68% 50%, rgba(77,217,255,0.02) 0%, transparent 100%)",
          ].join(", "),
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}

// ── PARTICLE DRIFT ("circuit") ───────────────────────────────────────────────
// 5 points cosmiques violet/fuchsia qui tombent en fondu — poussière stellaire
const PARTICLES = [
  { left: "11%", top: 15, size: 3, color: "rgba(139,92,246,0.10)", dur: "9s",  del: "0s"   },
  { left: "27%", top: 58, size: 2, color: "rgba(217,70,239,0.08)", dur: "12s", del: "2.8s" },
  { left: "44%", top: 28, size: 4, color: "rgba(139,92,246,0.09)", dur: "10s", del: "1.2s" },
  { left: "64%", top: 78, size: 3, color: "rgba(217,70,239,0.11)", dur: "14s", del: "4.1s" },
  { left: "82%", top: 42, size: 2, color: "rgba(139,92,246,0.08)", dur: "11s", del: "0.6s" },
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
// Halo violet discret en bord droit
function DeepSpaceDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 160 }}>
      <div style={{
        position: "absolute", right: "-5%", top: "50%",
        transform: "translateY(-50%)",
        width: 480, height: 240,
        background: "radial-gradient(ellipse at center, rgba(138,109,255,0.05) 0%, transparent 65%)",
        filter: "blur(30px)",
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
          height: "0.5px", transform: "translateY(-50%)",
          background: "linear-gradient(90deg, transparent 0%, rgba(217,70,239,0.04) 25%, rgba(217,70,239,0.06) 50%, rgba(217,70,239,0.04) 75%, transparent 100%)",
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
