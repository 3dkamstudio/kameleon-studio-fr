"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type MotionState = {
  /** Animations actives : ni pause demandée, ni préférence « réduire les animations ». */
  on: boolean;
  paused: boolean;
  reduced: boolean;
  togglePause: () => void;
  /** Compteur qui avance toutes les 6,5 s : fait tourner les répliques de Kame. */
  tick: number;
};

const MotionContext = createContext<MotionState>({ on: true, paused: false, reduced: false, togglePause: () => {}, tick: 0 });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tick, setTick] = useState(0);
  const on = !paused && !reduced;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = on ? "on" : "off";
    if (!on) {
      root.style.setProperty("--mx", "0");
      root.style.setProperty("--my", "0");
    }
  }, [on]);

  useEffect(() => {
    if (!on) { return; }
    const t = window.setInterval(() => setTick((x) => x + 1), 6500);
    return () => window.clearInterval(t);
  }, [on]);

  const value = useMemo(() => ({ on, paused, reduced, tick, togglePause: () => setPaused((p) => !p) }), [on, paused, reduced, tick]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);
