"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const revealVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      y:       { type: "spring" as const, stiffness: 180, damping: 22 },
      scale:   { type: "spring" as const, stiffness: 180, damping: 22 },
      opacity: { duration: 0.5, ease: "easeOut" as const },
    },
  },
};

export default function RevealSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px" }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}
