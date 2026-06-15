"use client";

import { useId } from "react";

// Divider symétrique — vagues haut ET bas, fond solide, aucune bande noire
export default function PaintWaveDivider() {
  const uid = useId().replace(/:/g, "");
  const gId = `pw-g-${uid}`;

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden pointer-events-none"
      style={{ height: 300, background: "#0a0a0f" }}
    >
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gId} x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#d946ef" />
            <stop offset="14%"  stopColor="#f43f5e" />
            <stop offset="28%"  stopColor="#f97316" />
            <stop offset="43%"  stopColor="#eab308" />
            <stop offset="57%"  stopColor="#22c55e" />
            <stop offset="71%"  stopColor="#06b6d4" />
            <stop offset="86%"  stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>

        {/* ── Rubans de vagues qui couvrent toute la hauteur ──────────── */}

        {/* Ruban 1 — zone haute (y 0→130) */}
        <path
          d="M0,0 C180,30 360,0 540,25 C720,50 900,10 1080,35 C1260,55 1380,20 1440,30
             L1440,130
             C1260,110 1080,145 900,120 C720,95 540,135 360,108 C180,82 60,120 0,100 Z"
          fill={`url(#${gId})`}
          opacity="0.16"
        />

        {/* Ruban 2 — zone haute-centre (y 30→180) */}
        <path
          d="M0,50 C240,20 480,80 720,45 C960,10 1200,70 1440,40
             L1440,180
             C1200,155 960,200 720,170 C480,140 240,185 0,158 Z"
          fill={`url(#${gId})`}
          opacity="0.24"
        />

        {/* Ruban 3 — zone centrale, crête principale haute (y 70→160) */}
        <path
          d="M0,75 C300,40 600,110 900,70 C1100,42 1300,95 1440,65
             L1440,165
             C1300,195 1100,148 900,175 C600,210 300,160 0,190 Z"
          fill={`url(#${gId})`}
          opacity="0.32"
        />

        {/* Ruban 4 — zone centrale, crête principale basse (y 110→220) */}
        <path
          d="M0,120 C360,90 720,155 1080,115 C1260,95 1380,140 1440,118
             L1440,225
             C1380,245 1260,210 1080,232 C720,260 360,215 0,238 Z"
          fill={`url(#${gId})`}
          opacity="0.32"
        />

        {/* Ruban 5 — zone basse-centre (y 140→265) */}
        <path
          d="M0,150 C240,125 480,170 720,145 C960,120 1200,165 1440,140
             L1440,265
             C1200,285 960,245 720,270 C480,295 240,258 0,278 Z"
          fill={`url(#${gId})`}
          opacity="0.24"
        />

        {/* Ruban 6 — zone basse (y 175→300) */}
        <path
          d="M0,185 C180,165 360,200 540,178 C720,155 900,192 1080,172 C1260,152 1380,182 1440,168
             L1440,300
             C1260,300 1080,300 900,300 C720,300 540,300 360,300 C180,300 60,300 0,300 Z"
          fill={`url(#${gId})`}
          opacity="0.16"
        />
      </svg>
    </div>
  );
}
