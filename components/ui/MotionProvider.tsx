"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" : Framer Motion désactive les animations transform/layout
// quand l'OS demande prefers-reduced-motion (les opacity restent, comportement voulu).
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
