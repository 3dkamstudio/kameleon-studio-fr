"use client";

import { useEffect, useRef } from "react";

// Compteur animé — îlot client minimal, vanilla (IntersectionObserver + rAF),
// zéro framer-motion.
export default function AnimatedCount({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) { return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(value);
      return;
    }
    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) { return; }
        obs.disconnect();
        const start = performance.now();
        const dur = 1800;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(eased * value));
          if (t < 1) { raf = requestAnimationFrame(tick); }
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <span
      className="font-display text-4xl font-black leading-none sm:text-6xl"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      <span ref={ref}>0</span>{suffix}
    </span>
  );
}
