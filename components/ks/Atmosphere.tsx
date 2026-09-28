"use client";

import { useEffect, useRef } from "react";
import { PAL } from "@/lib/content";
import { useMotion } from "./motion";
import { pointer } from "./PointerFX";
import { rand } from "./ui";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Ribbon({ bg, top, rot, anim, dur }: { bg: string; top: string; rot: number; anim: string; dur: number }) {
  return (
    <div
      style={
        {
          position: "absolute",
          left: "-10%",
          width: "120%",
          height: "32vh",
          top,
          background: bg,
          filter: "blur(58px)",
          borderRadius: "50%",
          "--rot": rot + "deg",
          transform: `rotate(${rot}deg)`,
          animation: `${anim} ${dur}s ease-in-out infinite alternate`,
        } as React.CSSProperties
      }
    />
  );
}

const STARS = Array.from({ length: 96 }, (_, i) => {
  const r = (k: number) => rand(9000 + i * 10 + k);
  return { i, left: (r(1) * 100).toFixed(2) + "%", top: (r(2) * 100).toFixed(2) + "%", dur: (2 + r(3) * 4).toFixed(2), delay: (r(4) * 4).toFixed(2), size: 10 + Math.round(r(5) * 14), col: PAL[i % 7] };
});

const COLS = ["139,92,246", "6,182,212", "34,197,94", "234,179,8", "249,115,22", "244,63,94", "217,70,239"];

/** Fond fixé de tout le site : rubans lumineux, sol quadrillé, étoiles et constellation. */
export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { on } = useMotion();
  const onRef = useRef(on);
  onRef.current = on;
  const startRef = useRef<() => void>(() => {});

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) { return; }
    let W = 0;
    let H = 0;
    let drawn = false;
    let running = false;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawn = false;
      if (!running) { start(); }
    };

    const N = Math.round(Math.max(28, Math.min(72, (window.innerWidth * window.innerHeight) / 20000)));
    const pts = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1.3 + Math.random() * 2.2,
      c: COLS[i % COLS.length],
      t: Math.random() * 6.28,
    }));

    const step = () => {
      const motion = onRef.current;
      if (!motion && drawn) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(step);
      drawn = true;
      ctx.clearRect(0, 0, W, H);
      const m = pointer;
      for (const p of pts) {
        if (motion) {
          p.x += p.vx;
          p.y += p.vy;
          p.t += 0.02;
        }
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const d = Math.hypot(dx, dy);
        if (motion && d < 220 && d > 70) {
          p.x += (dx / d) * 0.18;
          p.y += (dy / d) * 0.18;
        }
        if (p.x < -20) { p.x = W + 20; }
        if (p.x > W + 20) { p.x = -20; }
        if (p.y < -20) { p.y = H + 20; }
        if (p.y > H + 20) { p.y = -20; }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            ctx.strokeStyle = `rgba(${a.c},${(0.2 * (1 - d / 150)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const d = Math.hypot(m.x - p.x, m.y - p.y);
        if (d < 220) {
          ctx.strokeStyle = `rgba(${p.c},${(0.45 * (1 - d / 220)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
        const tw = 0.55 + 0.45 * Math.sin(p.t);
        ctx.fillStyle = `rgba(${p.c},${(0.8 * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = `rgba(${p.c},${(0.12 * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, 6.2832);
        ctx.fill();
      }
    };

    const start = () => {
      if (running) { return; }
      running = true;
      raf = requestAnimationFrame(step);
    };
    startRef.current = start;

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      running = false;
      startRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    if (on) { startRef.current(); }
  }, [on]);

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", background: "linear-gradient(180deg, #FAF8FF 0%, #F2FBFD 48%, #FFF7F3 100%)" }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-18%",
          filter: "hue-rotate(calc(var(--scroll, 0) * 200deg)) saturate(1.2)",
          transform: "translate3d(calc(var(--mx, 0) * 30px), calc(var(--my, 0) * 22px), 0)",
          transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <Ribbon bg="linear-gradient(90deg, transparent 0%, rgba(139,92,246,.55) 20%, rgba(6,182,212,.5) 45%, rgba(34,197,94,.42) 66%, transparent 90%)" top="6%" rot={-14} anim="ksAurora1" dur={26} />
        <Ribbon bg="linear-gradient(90deg, transparent 5%, rgba(217,70,239,.46) 26%, rgba(244,63,94,.38) 50%, rgba(249,115,22,.38) 72%, transparent 96%)" top="40%" rot={10} anim="ksAurora2" dur={32} />
        <Ribbon bg="linear-gradient(90deg, transparent 0%, rgba(234,179,8,.36) 22%, rgba(34,197,94,.4) 48%, rgba(6,182,212,.46) 74%, transparent 100%)" top="72%" rot={-8} anim="ksAurora3" dur={29} />
      </div>
      <div
        style={{
          position: "absolute",
          left: "-50%",
          right: "-50%",
          bottom: "-12%",
          height: "58vh",
          transformOrigin: "50% 100%",
          transform: "perspective(520px) rotateX(62deg)",
          backgroundImage: "linear-gradient(rgba(139,92,246,.26) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.24) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
          maskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
          animation: "ksGrid 3.2s linear infinite",
        }}
      />
      <div style={{ position: "absolute", inset: 0 }}>
        {STARS.map((s) => {
          const st = { position: "absolute" as const, left: s.left, top: s.top, animation: `ksTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite` };
          return s.i % 6 === 0 ? (
            <span key={s.i} style={{ ...st, fontSize: s.size, lineHeight: 1, color: s.col, textShadow: `0 0 10px ${s.col}` }}>
              ✦
            </span>
          ) : (
            <span key={s.i} style={{ ...st, width: 2 + (s.i % 3), height: 2 + (s.i % 3), borderRadius: "50%", background: s.col, boxShadow: `0 0 7px ${s.col}`, opacity: 0.85 }} />
          );
        })}
      </div>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 140,
          background: "linear-gradient(180deg, transparent, rgba(139,92,246,.07), rgba(6,182,212,.1), transparent)",
          animation: "ksScan 11s linear infinite",
        }}
      />
      <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.07, mixBlendMode: "multiply" }} />
    </div>
  );
}
