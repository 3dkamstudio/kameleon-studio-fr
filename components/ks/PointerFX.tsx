"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./motion";

// Position du pointeur partagée avec le fond animé (constellation).
export const pointer = { x: -999, y: -999 };

/**
 * Effets liés au pointeur, appliqués par variables CSS :
 * - [data-glow] : liseré arc-en-ciel orienté vers le pointeur (--ga, --go) ;
 * - [data-tilt] : inclinaison 3D, reflet et zoom (--rx, --ry, --sx, --sy, --so, --zoom) ;
 * - racine : parallaxe légère (--mx, --my) et progression du défilement (--scroll).
 * Souris uniquement : rien ne s'applique au toucher.
 */
export default function PointerFX() {
  const { on } = useMotion();
  const onRef = useRef(on);
  onRef.current = on;

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let scrollRaf = 0;
    let last: PointerEvent | null = null;
    let tiltEl: HTMLElement | null = null;

    const resetTilt = (el: HTMLElement) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--so", "0");
      el.style.setProperty("--zoom", "1");
    };

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) { return; }
      const cx = e.clientX;
      const cy = e.clientY;
      const motion = onRef.current;

      // Lectures groupées puis écritures : pas de recalcul de mise en page forcé en boucle.
      const glows = Array.from(document.querySelectorAll<HTMLElement>("[data-glow]"));
      const rects = glows.map((g) => g.getBoundingClientRect());
      glows.forEach((g, i) => {
        const r = rects[i];
        const near = cx > r.left - 70 && cx < r.right + 70 && cy > r.top - 70 && cy < r.bottom + 70;
        if (near) {
          const a = (Math.atan2(cy - (r.top + r.height / 2), cx - (r.left + r.width / 2)) * 180) / Math.PI + 90;
          g.style.setProperty("--ga", a.toFixed(1) + "deg");
          g.style.setProperty("--go", "1");
        } else if (g.style.getPropertyValue("--go") === "1") {
          g.style.setProperty("--go", "0");
        }
      });

      if (motion) {
        root.style.setProperty("--mx", ((cx / window.innerWidth) * 2 - 1).toFixed(3));
        root.style.setProperty("--my", ((cy / window.innerHeight) * 2 - 1).toFixed(3));
      }

      const target = e.target instanceof Element ? (e.target.closest("[data-tilt]") as HTMLElement | null) : null;
      if (tiltEl && tiltEl !== target) { resetTilt(tiltEl); }
      tiltEl = target;
      if (!target) { return; }
      const r = target.getBoundingClientRect();
      const px = (cx - r.left) / r.width;
      const py = (cy - r.top) / r.height;
      const k = parseFloat(target.dataset.tilt || "1") || 1;
      target.style.setProperty("--sx", (px * 100).toFixed(1) + "%");
      target.style.setProperty("--sy", (py * 100).toFixed(1) + "%");
      target.style.setProperty("--so", "1");
      if (motion) {
        target.style.setProperty("--rx", ((0.5 - py) * 7 * k).toFixed(2) + "deg");
        target.style.setProperty("--ry", ((px - 0.5) * 9 * k).toFixed(2) + "deg");
        target.style.setProperty("--zoom", "1.06");
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") { return; }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      last = e;
      if (!raf) { raf = requestAnimationFrame(frame); }
    };
    const onLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
      if (tiltEl) { resetTilt(tiltEl); }
      tiltEl = null;
    };
    const onScroll = () => {
      if (scrollRaf) { return; }
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const max = Math.max(1, root.scrollHeight - window.innerHeight);
        root.style.setProperty("--scroll", (root.scrollTop / max).toFixed(3));
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return null;
}
