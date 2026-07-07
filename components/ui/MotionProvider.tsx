"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

// reducedMotion="user" : Framer Motion désactive les animations transform/layout
// quand l'OS demande prefers-reduced-motion (les opacity restent, comportement voulu).
//
// Mode debug perf : ?minimal=1 dans l'URL force reducedMotion="always" (toutes les
// animations framer coupées) et pose data-minimal="1" sur <html> — globals.css s'en
// sert pour masquer CelestialBackground, couper le backdrop-blur navbar et mettre en
// pause les animations CSS. Paramètre TEMPORAIRE d'isolation, à retirer après diagnostic.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [minimal, setMinimal] = useState(false);

  useEffect(() => {
    const isMinimal = new URLSearchParams(window.location.search).get("minimal") === "1";
    setMinimal(isMinimal);
    document.documentElement.dataset.minimal = isMinimal ? "1" : "0";
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={minimal ? "always" : "user"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
