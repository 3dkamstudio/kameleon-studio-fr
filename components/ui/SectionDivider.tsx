"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type DividerVariant =
  | "hero-services"
  | "services-process"
  | "process-prestations"
  | "prestations-web"
  | "web-showreel"
  | "showreel-clients"
  | "clients-contact"
  | "contact-footer";

// ── Couleurs ambiantes par section ────────────────────────────────────────────
const C = {
  fuchsia: "#d946ef",
  cyan:    "#4dd9ff",
  violet:  "#8a6dff",
  orange:  "#ff9d4d",
  vert:    "#5eff9d",
  rose:    "#ff5e7e",
  noir:    "#050510",
} as const;

// ── Utilitaire hex → rgba ─────────────────────────────────────────────────────
function rgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Config des 8 variantes ────────────────────────────────────────────────────
const VARIANTS: Record<DividerVariant, {
  top:        string;
  bottom:     string;
  particles?: [string, string];
}> = {
  "hero-services":       { top: C.fuchsia, bottom: C.cyan                                  },
  "services-process":    { top: C.cyan,    bottom: C.violet, particles: [C.cyan,   C.violet] },
  "process-prestations": { top: C.violet,  bottom: C.orange                                },
  "prestations-web":     { top: C.orange,  bottom: C.vert,   particles: [C.orange, C.vert  ] },
  "web-showreel":        { top: C.vert,    bottom: C.rose                                  },
  "showreel-clients":    { top: C.rose,    bottom: C.cyan,   particles: [C.rose,   C.cyan  ] },
  "clients-contact":     { top: C.cyan,    bottom: C.violet                                },
  "contact-footer":      { top: C.violet,  bottom: C.noir                                  },
};

// ── 8 directions d'explosion (cercle complet) ─────────────────────────────────
const DIRS = [
  { dx:  0,      dy: -1      },  // 0°
  { dx:  0.707,  dy: -0.707  },  // 45°
  { dx:  1,      dy:  0      },  // 90°
  { dx:  0.707,  dy:  0.707  },  // 135°
  { dx:  0,      dy:  1      },  // 180°
  { dx: -0.707,  dy:  0.707  },  // 225°
  { dx: -1,      dy:  0      },  // 270°
  { dx: -0.707,  dy: -0.707  },  // 315°
] as const;

const DIST = [65, 48, 72, 52, 60, 42, 70, 58] as const;
const SIZE = [3,  2,  4,  2,  3,  4,  2,  3 ] as const;
const DUR  = [1.0,0.9,1.1,0.85,1.0,0.95,1.15,0.8] as const;

// ── Explosion de particules ───────────────────────────────────────────────────
function Particles({ colors }: { colors: [string, string] }) {
  const prefersReduced = useReducedMotion();
  const wrapRef        = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFired(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={wrapRef}
      className="div-particles"
      style={{ position: "absolute", inset: 0 }}
    >
      {fired && DIRS.map((dir, i) => {
        const color = colors[i % 2];
        const s     = SIZE[i];
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x:       dir.dx * DIST[i],
              y:       dir.dy * DIST[i],
              opacity: [1, 0.8, 0],
              scale:   [1, 1.5, 0],
            }}
            transition={{ duration: DUR[i], ease: "easeOut" }}
            style={{
              position:    "absolute",
              left:        "50%",
              top:         "50%",
              marginLeft:  -(s / 2),
              marginTop:   -(s / 2),
              width:       s,
              height:      s,
              borderRadius: "50%",
              background:  color,
              boxShadow:   `0 0 8px ${color}99`,
            }}
          />
        );
      })}
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function SectionDivider({ variant }: { variant: DividerVariant }) {
  const cfg = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className="div-section-divider"
      style={{
        position:      "relative",
        height:         160,
        overflow:       "hidden",
        pointerEvents:  "none",
        zIndex:          1,
      }}
    >
      {/* Option 3 — Gradient ambiant (toutes les transitions) */}
      <div style={{
        position: "absolute",
        inset:    0,
        background: `linear-gradient(to bottom, ${rgba(cfg.top, 0.08)} 0%, transparent 50%, ${rgba(cfg.bottom, 0.08)} 100%)`,
      }} />

      {/* Option 2 — Explosion de particules (3 variantes uniquement) */}
      {cfg.particles && <Particles colors={cfg.particles} />}
    </div>
  );
}
