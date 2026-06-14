"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Kame from "@/components/ui/Kame";
import Sparkles from "@/components/ui/Sparkles";
import { ExternalLink } from "lucide-react";

// ── Clients réels ─────────────────────────────────────────────────────────────
const CLIENTS = [
  {
    name: "Paillette Academy",
    logo: "/logo-paillette-academy.png",
    cardBg: "#0d1b2e",
    description: "Vidéos pédagogiques",
  },
  {
    name: "BLR Conseil Formation",
    logo: "/logo-blr-conseils.png",
    cardBg: "#f0fafa",
    description: "Conseil & formation",
  },
  {
    name: "Gabi",
    logo: "/logo-gabi.png",
    cardBg: "#080808",
    description: "Littérature jeunesse",
  },
  {
    name: "JL Conseils",
    logo: "/logo-jl-conseils.png",
    cardBg: "#080808",
    description: "Conseil bien-être",
  },
  {
    name: "Les Pépites de Lylou",
    logo: "/logo-pepites-lylou.png",
    cardBg: "#ffffff",
    description: "Créations chrétiennes",
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 3,   suffix: "+",  label: "Projets livrés",          color: "#d946ef" },
  { value: 2,   suffix: "",   label: "Formats par vidéo",        color: "#06b6d4" },
  { value: 48,  suffix: "h",  label: "Délai de réponse",         color: "#22c55e" },
  { value: 100, suffix: "%",  label: "Livré dans les délais",    color: "#f97316" },
];

// ── Compteur animé ────────────────────────────────────────────────────────────
function AnimatedCount({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 15 });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, value, { duration: 1.6, ease: "easeOut" });
    return () => ctrl.stop();
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on("change", v => {
      if (ref.current) ref.current.textContent = Math.round(v).toString();
    });
    return unsub;
  }, [spring]);

  return (
    <span style={{ color }}>
      <span ref={ref}>0</span>{suffix}
    </span>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Testimonials() {
  return (
    <section
      id="avis"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "transparent" }}
    >
      {/* Fond décoratif */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, rgba(217,70,239,0.06) 50%, transparent 70%)" }}
        />
      </div>
      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col items-center text-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="badge-pill badge-cyan">✦ Ils nous font confiance</span>
          </motion.div>

          <motion.h2
            className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Nos clients parlent{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              d&apos;eux-mêmes.
            </span>
          </motion.h2>

          <motion.p
            className="max-w-lg text-sm text-white/45 sm:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Des créateurs, formateurs et marques qui nous ont confié leurs projets vidéo, BD et web.
          </motion.p>
        </div>

        {/* ── Logos clients ─────────────────────────────────────────────────── */}
        <motion.div
          className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={{
                hidden: { opacity: 0, scale: 0.88, y: 16 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] } },
              }}
              whileHover={{ scale: 1.04, y: -3 }}
              className="group flex flex-col items-center gap-3 rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                transition: "box-shadow 0.25s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(217,70,239,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              {/* Logo dans sa couleur de fond */}
              <div
                className="relative flex h-20 w-full items-center justify-center overflow-hidden rounded-xl"
                style={{ background: client.cardBg }}
              >
                <Image
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                />
              </div>
              <p className="text-center text-[0.68rem] font-semibold text-white/40 leading-tight">
                {client.name}
              </p>
              <p className="text-center text-[0.58rem] text-white/22">
                {client.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Stats + Kame ──────────────────────────────────────────────────── */}
        <div className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-5 sm:gap-6 flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
                }}
                className="flex flex-col gap-2 rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                  borderLeft: `3px solid ${stat.color}55`,
                }}
              >
                <p
                  className="font-display text-4xl font-black sm:text-5xl"
                  style={{ color: stat.color }}
                >
                  <AnimatedCount value={stat.value} suffix={stat.suffix} color={stat.color} />
                </p>
                <p className="text-sm font-semibold text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Kame */}
          <motion.div
            className="flex flex-col items-center gap-6 lg:w-64"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            <Kame
              context="thumbsup"
              size={180}
              speech="Des projets qui claquent, livrés dans les temps !"
            />

            {/* CTA Google */}
            <motion.a
              href="#google-reviews"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white/80"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
              whileHover={{
                scale: 1.04,
                background: "rgba(217,70,239,0.10)",
                borderColor: "rgba(217,70,239,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              ⭐ Laisser un avis Google
              <ExternalLink className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
