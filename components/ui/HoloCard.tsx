"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

export default function HoloCard({
  children,
  accentColor = "#d946ef",
  className = "",
  style,
  overflowX = "hidden",
}: {
  children: ReactNode;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
  overflowX?: "hidden" | "auto";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sX = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.8 });
  const sY = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.8 });
  const rotateY = useTransform(sX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sY, [-0.5, 0.5], [7, -7]);

  const rawGX = useMotionValue(0);
  const rawGY = useMotionValue(0);
  const glowX = useSpring(rawGX, { stiffness: 100, damping: 18 });
  const glowY = useSpring(rawGY, { stiffness: 100, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) { return; }
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
    rawGX.set(e.clientX - r.left);
    rawGY.set(e.clientY - r.top);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${overflowX === "auto" ? "overflow-x-auto overflow-y-hidden" : "overflow-hidden"} ${className}`}
      style={{ ...style, rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ scale: { duration: 0.2, ease: "easeOut" }, y: { duration: 0.2, ease: "easeOut" } }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Glow fixe — position via transform uniquement (compositor-only) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute h-[300px] w-[300px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}1f 0%, transparent 70%)`,
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}
