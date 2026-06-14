"use client";

import { useEffect, useRef } from "react";

const PALETTE: [number, number, number][] = [
  [217,  70, 239],  // fuchsia
  [139,  92, 246],  // violet
  [  6, 182, 212],  // cyan
  [249, 115,  22],  // orange
];

interface Pt {
  x: number; y: number;
  vx: number; vy: number;
  ci: number;   // palette index
  r:  number;   // radius
}

export default function ConstellationCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const rawCanvas = ref.current;
    if (!rawCanvas) return;
    const rawCtx = rawCanvas.getContext("2d");
    if (!rawCtx) return;

    // Aliases non-nullables pour les closures (TS strict ne narrow pas au travers des closures)
    const cv = rawCanvas as HTMLCanvasElement;
    const cx = rawCtx   as CanvasRenderingContext2D;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMob  = () => window.innerWidth < 768;
    const COUNT  = () => isMob() ? 25 : 50;
    const MAXD   = () => isMob() ? 120 : 150;
    const SPEED  = 0.28;
    const MRAD   = 100;
    const MFORCE = 0.035;

    let W = 0, H = 0, dpr = 1;
    const mouse = { x: -9999, y: -9999 };
    let pts: Pt[] = [];
    let raf = 0;

    /* ── Resize ─────────────────────────────────────────────────────────── */
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W   = window.innerWidth;
      H   = window.innerHeight;
      cv.width  = W * dpr;
      cv.height = H * dpr;
      cv.style.width  = `${W}px`;
      cv.style.height = `${H}px`;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ── Points ─────────────────────────────────────────────────────────── */
    function mkPts(): Pt[] {
      return Array.from({ length: COUNT() }, (_, i) => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        ci: i % PALETTE.length,
        r:  Math.random() < 0.25 ? 2.2 : 1.4,
      }));
    }

    /* ── Boucle ─────────────────────────────────────────────────────────── */
    function tick() {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;

      cx.clearRect(0, 0, W, H);

      const maxD = MAXD();

      // mise à jour des positions
      for (const p of pts) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d  = Math.hypot(dx, dy);
        if (d < MRAD && d > 0.5) {
          const f = (1 - d / MRAD) * MFORCE;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        const spd = Math.hypot(p.vx, p.vy);
        const cap = SPEED * 2.2;
        if (spd > cap) { p.vx = p.vx / spd * cap; p.vy = p.vy / spd * cap; }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0;  p.vx *= -0.85; }
        if (p.x > W) { p.x = W;  p.vx *= -0.85; }
        if (p.y < 0) { p.y = 0;  p.vy *= -0.85; }
        if (p.y > H) { p.y = H;  p.vy *= -0.85; }
      }

      // lignes entre points proches
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(b.x - a.x, b.y - a.y);
          if (d > maxD) continue;

          const alpha = (1 - d / maxD) * 0.22;
          const [ar, ag, ab] = PALETTE[a.ci];
          const [br, bg, bb] = PALETTE[b.ci];

          const grad = cx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${ar},${ag},${ab},${alpha})`);
          grad.addColorStop(1, `rgba(${br},${bg},${bb},${alpha})`);

          cx.beginPath();
          cx.moveTo(a.x, a.y);
          cx.lineTo(b.x, b.y);
          cx.strokeStyle = grad;
          cx.lineWidth   = 0.75;
          cx.stroke();
        }
      }

      // points lumineux
      for (const p of pts) {
        const [r, g, b] = PALETTE[p.ci];
        // halo externe
        cx.beginPath();
        cx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${r},${g},${b},0.07)`;
        cx.fill();
        // halo intermédiaire
        cx.beginPath();
        cx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${r},${g},${b},0.14)`;
        cx.fill();
        // core
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${r},${g},${b},0.65)`;
        cx.fill();
      }
    }

    /* ── Init ───────────────────────────────────────────────────────────── */
    resize();
    pts = mkPts();
    raf = requestAnimationFrame(tick);

    /* ── Listeners ──────────────────────────────────────────────────────── */
    function onResize()             { resize(); pts = mkPts(); }
    function onMove(e: MouseEvent)  { mouse.x = e.clientX; mouse.y = e.clientY; }
    function onLeave()              { mouse.x = -9999; mouse.y = -9999; }

    window.addEventListener("resize",     onResize,  { passive: true });
    window.addEventListener("mousemove",  onMove,    { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
    />
  );
}
