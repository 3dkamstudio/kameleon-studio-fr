"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  /** Délai optionnel pour décaler l'animation (secondes) */
  delay?: number;
}

export default function SectionWrapper({ children, delay = 0 }: SectionWrapperProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay,
      }}
    >
      {children}
    </m.div>
  );
}
