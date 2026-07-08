import type { ReactNode } from "react";

// Apparition de section en CSS pur (.reveal-section dans globals.css).
// La classe .in-view est posée par RevealObserver (1 seul IntersectionObserver
// global) — zéro framer-motion, zéro hydratation pour ce wrapper.
export default function RevealSection({ children }: { children: ReactNode }) {
  return <div className="reveal-section">{children}</div>;
}
