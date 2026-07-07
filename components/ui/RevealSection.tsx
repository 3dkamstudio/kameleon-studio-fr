"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Fade + y subtil uniquement — pas de scale (rasterisation coûteuse des
// sections entières), pas de spring (durée longue pendant le scroll).
const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
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
