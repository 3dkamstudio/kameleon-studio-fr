"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";
import Sparkles from "@/components/ui/Sparkles";
import { ExternalLink } from "lucide-react";

const TESTIMONIALS_SPEECH = [
  "Plus de 20 clients satisfaits — et ça continue ! 🎉",
  "Nos clients reviennent — preuve que la qualité est au rendez-vous !",
  "Rejoignez nos partenaires et donnez vie à votre projet !",
];

const CLIENTS = [
  { name: "Paillette Academy",     logo: "/logo-paillette-academy.png", description: "Vidéos pédagogiques",    glow: "#4dd9ff" },
  { name: "BLR Conseil Formation", logo: "/logo-blr-conseils.png",      description: "Conseil & formation",    glow: "#8a6dff" },
  { name: "Gabi",                  logo: "/logo-gabi.png",              description: "Littérature jeunesse",   glow: "#d946ef" },
  { name: "JL Conseils",           logo: "/logo-jl-conseils.png",       description: "Conseil bien-être",      glow: "#5eff9d" },
  { name: "Les Pépites de Lylou",  logo: "/logo-pepites-lylou.png",     description: "Créations chrétiennes",  glow: "#ff9d4d" },
] as const;

const STATS = [
  { value: 20,  suffix: "+",  label: "Clients accompagnés",   color: "#d946ef" },
  { value: 2,   suffix: "",   label: "Formats par vidéo",     color: "#06b6d4" },
  { value: 48,  suffix: "h",  label: "Délai de réponse",      color: "#22c55e" },
  { value: 100, suffix: "%",  label: "Livré dans les délais", color: "#f97316" },
] as const;

// ── Compteur animé ─────────────────────────────────────────────────────────────
function AnimatedCount({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 15 });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, value, { duration: 1.8, ease: "easeOut" });
    return () => ctrl.stop();
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on("change", v => {
      if (ref.current) ref.current.textContent = Math.round(v).toString();
    });
    return unsub;
  }, [spring]);

  return (
    <span
      className="font-display text-6xl font-black leading-none"
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

// ── Carte logo client ──────────────────────────────────────────────────────────
type Client = (typeof CLIENTS)[number];

function ClientCard({ client }: { client: Client }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
          opacity: 1, scale: 1, y: 0,
          transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
        },
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group relative flex flex-col items-center gap-4 rounded-2xl p-6 w-full sm:w-56 lg:w-64"
      style={{
        background: "rgba(6,6,18,0.70)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = `0 0 40px ${client.glow}30, 0 0 80px ${client.glow}12, 0 12px 40px rgba(0,0,0,0.5)`;
        el.style.borderColor = `${client.glow}55`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = `0 0 20px ${client.glow}08`;
        el.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Idle glow subtil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow: `0 0 20px ${client.glow}08`,
          animation: "clientGlowPulse 3s ease-in-out infinite",
          animationDelay: `${Math.random() * 2}s`,
        }}
      />

      {/* Logo — drop-shadow épouse la forme */}
      <div className="relative w-full" style={{ height: 140 }}>
        <Image
          src={client.logo}
          alt={`Logo ${client.name}`}
          fill
          className="object-contain"
          style={{ filter: `drop-shadow(0 4px 18px ${client.glow}50)` }}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 224px, 256px"
        />
      </div>

      <div className="text-center">
        <p className="text-xs font-bold text-white/70 leading-tight">{client.name}</p>
        <p className="text-[0.63rem] text-white/35 mt-0.5">{client.description}</p>
      </div>
    </motion.div>
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
      <style>{`
        @keyframes clientGlowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full blur-[160px]"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, rgba(217,70,239,0.07) 50%, transparent 70%)" }}
        />
      </div>
      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
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
            Ils nous font{" "}
            <span style={{
              background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              confiance.
            </span>
          </motion.h2>

          <motion.p
            className="max-w-xl text-sm text-white/45 sm:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Des créateurs, indépendants et entreprises qui ont choisi Kaméléon Studio pour leurs projets.
          </motion.p>
        </div>

        {/* ── Logos clients ───────────────────────────────────────────────── */}
        <motion.div
          className="mb-24 flex flex-wrap justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {CLIENTS.map(client => (
            <ClientCard key={client.name} client={client} />
          ))}
        </motion.div>

        {/* ── Stats + Kame ─────────────────────────────────────────────────── */}
        <div className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-12">

          {/* Stats desktop : flex row avec séparateurs */}
          <div className="flex-1 w-full">
            <motion.div
              className="hidden sm:flex items-stretch rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: "rgba(6,6,18,0.70)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="contents">
                  {i > 0 && (
                    <div style={{ width: 1, background: "rgba(255,255,255,0.06)", flexShrink: 0, alignSelf: "stretch" }} />
                  )}
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 px-4 text-center">
                    <AnimatedCount value={stat.value} suffix={stat.suffix} color={stat.color} />
                    <p className="text-sm font-semibold text-white/45 leading-tight">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats mobile : grille 2 colonnes */}
            <motion.div
              className="grid grid-cols-2 gap-4 sm:hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {STATS.map(stat => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="flex flex-col gap-2 rounded-2xl p-5 text-center"
                  style={{
                    background: "rgba(6,6,18,0.70)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(16px)",
                    borderLeft: `3px solid ${stat.color}55`,
                  }}
                >
                  <AnimatedCount value={stat.value} suffix={stat.suffix} color={stat.color} />
                  <p className="text-sm font-semibold text-white/45">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Kame */}
          <motion.div
            className="flex flex-col items-center gap-6 lg:w-64"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            <KameSpeech variants={TESTIMONIALS_SPEECH}>
              <Kame context="celebrate" src="/kame-celebrate.png" size={200} />
            </KameSpeech>

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
