"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { POSE, SPEECH, type KameKey } from "@/lib/content";
import { dim } from "@/lib/images";
import { useMotion } from "./motion";

/** Réplique courante de Kame pour une section (change toutes les 6,5 s). */
export function useKameLine(k: KameKey) {
  const { tick } = useMotion();
  const lines = SPEECH[k];
  return lines[tick % lines.length];
}

export function KamePose({ k, style, shadow = "0 16px 20px rgba(139,92,246,0.3)", sizes = "124px" }: { k: KameKey; style?: CSSProperties; shadow?: string; sizes?: string }) {
  const src = POSE[k];
  return (
    <Image
      src={src}
      alt=""
      {...dim(src)}
      sizes={sizes}
      className="kame-float"
      style={{ width: "clamp(86px,9vw,124px)", height: "auto", flex: "none", filter: `drop-shadow(${shadow})`, ...style }}
    />
  );
}

/** Kame en bas à droite d'une section, avec sa bulle « Kame conseille ». */
export function KameNote({ k }: { k: KameKey }) {
  const text = useKameLine(k);
  return (
    <div style={{ flex: "1 1 100%", display: "flex", justifyContent: "flex-end" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, maxWidth: 470 }}>
        <KamePose k={k} />
        <div role="note" className="kame-note">
          <span className="kame-label">Kame conseille</span>
          <span className="kame-text">{text}</span>
        </div>
      </div>
    </div>
  );
}
