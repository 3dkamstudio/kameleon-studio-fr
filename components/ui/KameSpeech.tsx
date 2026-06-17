"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

interface KameSpeechProps {
  variants: string[];
  children: React.ReactNode;
  position?: "above" | "left" | "right";
  positionMd?: "above" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function KameSpeech({
  variants,
  children,
  position = "above",
  positionMd,
  delay = 700,
  className,
}: KameSpeechProps) {
  const isDesktop = useIsDesktop();
  const activePosition = isDesktop && positionMd ? positionMd : position;
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const inView      = useInView(wrapperRef, { once: false, margin: "-5% 0px -5% 0px" });

  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [idx,       setIdx]       = useState(0);

  const cycleRef  = useRef<ReturnType<typeof setInterval>  | null>(null);
  const showRef   = useRef<ReturnType<typeof setTimeout>   | null>(null);
  const lenRef    = useRef(variants.length);
  lenRef.current  = variants.length;

  function clearAll() {
    if (cycleRef.current) { clearInterval(cycleRef.current); }
    if (showRef.current)  { clearTimeout(showRef.current); }
  }

  function startCycle() {
    if (cycleRef.current) { clearInterval(cycleRef.current); }
    cycleRef.current = setInterval(() => {
      setIdx(i => (i + 1) % lenRef.current);
    }, 10_000);
  }

  useEffect(() => {
    if (!inView) {
      clearAll();
      setVisible(false);
      setDismissed(false);
      return;
    }
    if (dismissed) { return; }

    showRef.current = setTimeout(() => {
      setVisible(true);
      startCycle();
    }, delay);

    return clearAll;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, dismissed]);

  function cycleBubble() {
    setIdx(i => (i + 1) % lenRef.current);
    startCycle(); // reset le timer de 10s
  }

  function closeBubble(e: React.MouseEvent) {
    e.stopPropagation();
    clearAll();
    setVisible(false);
    setDismissed(true);
  }

  const bubblePlacement =
    activePosition === "above"
      ? "absolute bottom-full left-1/2 -translate-x-1/2 mb-3"
      : activePosition === "left"
      ? "absolute right-full top-1/2 -translate-y-1/2 mr-3"
      : "absolute left-full top-1/2 -translate-y-1/2 ml-3";

  const tailStyle: React.CSSProperties =
    activePosition === "above"
      ? {
          position: "absolute", bottom: -7, left: "50%",
          transform: "translateX(-50%)", width: 0, height: 0,
          borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
          borderTop: "8px solid rgba(6,6,18,0.94)",
        }
      : activePosition === "left"
      ? {
          position: "absolute", right: -7, top: "50%",
          transform: "translateY(-50%)", width: 0, height: 0,
          borderTop: "6px solid transparent", borderBottom: "6px solid transparent",
          borderLeft: "8px solid rgba(6,6,18,0.94)",
        }
      : {
          position: "absolute", left: -7, top: "50%",
          transform: "translateY(-50%)", width: 0, height: 0,
          borderTop: "6px solid transparent", borderBottom: "6px solid transparent",
          borderRight: "8px solid rgba(6,6,18,0.94)",
        };

  return (
    <div
      ref={wrapperRef}
      className={cn("relative inline-flex flex-col items-center pointer-events-none", className)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            key={idx}
            className={cn(
              "absolute z-30 w-max max-w-[210px] cursor-pointer pointer-events-auto",
              bubblePlacement,
            )}
            initial={{ opacity: 0, scale: 0.65, y: activePosition === "above" ? 10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            onClick={cycleBubble}
          >
            {/* Rainbow gradient border */}
            <div
              className="rounded-2xl p-px"
              style={{ background: "linear-gradient(135deg, #d946ef, #8b5cf6, #06b6d4, #22c55e)" }}
            >
              <div
                className="relative rounded-[14px] px-4 py-3"
                style={{ background: "rgba(6,6,18,0.94)", backdropFilter: "blur(16px)" }}
              >
                <button
                  onClick={closeBubble}
                  aria-label="Fermer"
                  className="absolute right-2 top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/10 hover:text-white/75 pointer-events-auto"
                >
                  <X className="h-2.5 w-2.5" />
                </button>

                <p className="pr-4 text-[0.71rem] font-semibold leading-snug text-white/90">
                  {variants[idx]}
                </p>
                <p className="mt-1.5 text-[0.55rem] font-medium text-white/30">
                  clic pour changer ↻
                </p>

                <div style={tailStyle} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
