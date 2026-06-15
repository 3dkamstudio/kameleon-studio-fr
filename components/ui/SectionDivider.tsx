"use client";

export type DividerVariant = "scan" | "wave" | "circuit" | "chevron" | "signal";

const BASE = {
  position:      "relative"    as const,
  overflow:      "hidden"      as const,
  background:    "transparent",
  pointerEvents: "none"        as const,
};

// ── NEBULA FADE ("scan") ─────────────────────────────────────────────────────
// Halo radial fuchsia/violet pleine largeur centré
function NebulaDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(217,70,239,0.12) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)",
      }} />
    </div>
  );
}

// ── AURORA FLOW ("wave") ─────────────────────────────────────────────────────
// Bande cyan horizontale pleine largeur qui dérive doucement
function AuroraDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      <div
        className="div-aurora-drift"
        style={{
          position: "absolute", inset: 0,
          background: [
            "radial-gradient(ellipse 60% 100% at 20% 50%, rgba(77,217,255,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 100% at 75% 50%, rgba(6,182,212,0.07)  0%, transparent 70%)",
          ].join(", "),
        }}
      />
    </div>
  );
}

// ── PARTICLE DRIFT ("circuit") ───────────────────────────────────────────────
// Fond violet très doux + 5 points qui tombent
const PARTICLES = [
  { left: "11%", top: 15, size: 3, color: "rgba(139,92,246,0.22)", dur: "9s",  del: "0s"   },
  { left: "27%", top: 58, size: 3, color: "rgba(217,70,239,0.18)", dur: "12s", del: "2.8s" },
  { left: "44%", top: 28, size: 4, color: "rgba(139,92,246,0.20)", dur: "10s", del: "1.2s" },
  { left: "64%", top: 78, size: 3, color: "rgba(217,70,239,0.22)", dur: "14s", del: "4.1s" },
  { left: "82%", top: 42, size: 3, color: "rgba(139,92,246,0.18)", dur: "11s", del: "0.6s" },
] as const;

function ParticleDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 140 }}>
      {/* Fond atmosphérique pleine largeur */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
      }} />
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
// Deux halos pleine hauteur répartis gauche/droite
function DeepSpaceDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 160 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 55% 100% at 15% 50%, rgba(217,70,239,0.10) 0%, transparent 70%)",
          "radial-gradient(ellipse 50% 100% at 85% 50%, rgba(138,109,255,0.12) 0%, transparent 70%)",
        ].join(", "),
      }} />
    </div>
  );
}

// ── SIGNAL PULSE ("signal") ──────────────────────────────────────────────────
// Ligne 0.5px fuchsia pleine largeur avec pulse lent
function SignalDivider() {
  return (
    <div aria-hidden="true" className="div-section-divider" style={{ ...BASE, height: 120 }}>
      <div
        className="div-signal-line"
        style={{
          position: "absolute", left: 0, right: 0, top: "50%",
          height: "0.5px", transform: "translateY(-50%)",
          background: "linear-gradient(90deg, transparent 0%, rgba(217,70,239,0.15) 25%, rgba(217,70,239,0.15) 75%, transparent 100%)",
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
