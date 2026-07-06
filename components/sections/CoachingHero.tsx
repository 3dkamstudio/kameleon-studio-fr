"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Video, Disc, FileText } from "lucide-react";

// ── Hero coaching — la boldness de la page vit ici, teinte rose ────────────────
const FORMAT_CHIPS = [
  { icon: Video,    label: "Visio 1h" },
  { icon: Disc,     label: "Enregistrée" },
  { icon: FileText, label: "Replay + fiche récap offerts" },
] as const;

export default function CoachingHero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center">

      {/* Halo rose */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          style={{ background: "radial-gradient(ellipse, rgba(244,63,94,0.14) 0%, rgba(217,70,239,0.06) 50%, transparent 72%)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Kame mentor — flottement */}
        <motion.div
          className="mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/kame-mentor.webp"
            alt="Kame mentor transmet sa méthode à un jeune caméléon — coaching IA King of IA"
            width={300}
            height={300}
            priority
            className="object-contain drop-shadow-[0_0_35px_rgba(244,63,94,0.30)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="badge-pill badge-fuchsia mb-6 inline-block">👑 Coaching IA</span>
          <h1 className="mb-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            D&apos;indépendant{" "}
            <span style={{ background: "linear-gradient(90deg,#f43f5e,#d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              à indépendant.
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Tu viens avec une problématique, tu repars avec une méthode.
          </p>
        </motion.div>

        {/* Format — 3 chips sobres */}
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          {FORMAT_CHIPS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white/60"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(244,63,94,0.22)" }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: "#f43f5e" }} />
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTA — vend le diagnostic, pas la séance */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-black text-white transition-transform hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #f43f5e, #d946ef)",
              boxShadow: "0 4px 30px rgba(244,63,94,0.40)",
            }}
          >
            Réserver mon diagnostic gratuit — 15 min
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-xs text-white/30">
            Sans engagement · on identifie ensemble la séance qu&apos;il te faut
          </p>
        </motion.div>

      </div>
    </section>
  );
}
