"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CtaFinal() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">

      {/* ── Image de fond — mobile 9:16 ── */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/cta-final-mobile.webp"
          alt="Kaméléon Studio — caméra créative"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* ── Image de fond — desktop 16:9 ── */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="/cta-final-desktop.webp"
          alt="Kaméléon Studio — caméra créative"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* ── Overlay dégradé bas → haut ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.72) 40%, rgba(10,10,15,0.18) 75%, transparent 100%)",
        }}
      />

      {/* ── Overlay latéral gauche (desktop) ── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0.3) 50%, transparent 80%)",
        }}
      />

      {/* ── Halos colorés ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[900px] rounded-full bg-brand-fuchsia/[0.12] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[250px] w-[400px] rounded-full bg-brand-cyan/[0.10] blur-[100px]" />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-20 w-full px-6 pb-20 pt-48 md:pb-28 md:pt-0">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              className="mb-6"
            >
              <span className="badge-pill badge-fuchsia inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Studio de création IA
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="mb-4 font-display font-black leading-[1.05] tracking-tight"
            >
              <span className="block text-4xl text-white sm:text-5xl lg:text-6xl">
                Transformez vos idées
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl"
                style={{
                  background: "linear-gradient(90deg, #d946ef 0%, #f43f5e 40%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                en chef-d&apos;œuvre.
              </span>
            </motion.h2>

            {/* Sous-titre */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.05 } } }}
              className="mb-10 max-w-lg text-base text-white/55 sm:text-lg"
            >
              Vidéos, animations 3D, BD, formations IA — confiez votre projet à Kaméléon Studio et voyez la magie opérer.
            </motion.p>

            {/* Boutons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #d946ef, #f43f5e)",
                  boxShadow: "0 4px 24px rgba(217,70,239,0.35)",
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 40px rgba(217,70,239,0.55), 0 4px 20px rgba(244,63,94,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Démarrer mon projet
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#showreel"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.11]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Voir nos réalisations
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
