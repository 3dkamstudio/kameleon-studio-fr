"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ── Les 5 portes du royaume — cards sobres, teinte par univers ─────────────────
// Discipline : la teinte vit dans la bordure, le titre et le glow hover. Rien d'autre.

const PORTES = [
  {
    href: "/video",
    emoji: "🎬",
    title: "Production vidéo",
    phrase: "Des vidéos animées 3D qui racontent ton histoire.",
    color: "#d946ef",
    img: "/kame-cameraman.png",
  },
  {
    href: "/bd",
    emoji: "🎨",
    title: "BD & illustration",
    phrase: "Tes idées en planches, tes personnages en héros.",
    color: "#f97316",
    img: "/kame-dessinateur.webp",
  },
  {
    href: "/web",
    emoji: "🌐",
    title: "Sites web",
    phrase: "Un site premium, designé pour convertir.",
    color: "#06b6d4",
    img: "/kame-web.png",
  },
  {
    href: "/formation",
    emoji: "🎓",
    title: "Formation King of IA",
    phrase: "Apprends à créer avec l'IA, à ton rythme.",
    color: "#8b5cf6",
    img: "/kame-professeur.webp",
  },
  {
    href: "/coaching",
    emoji: "👑",
    title: "Coaching IA",
    phrase: "Une problématique, une heure, une méthode.",
    color: "#f43f5e",
    img: "/kame-mentor.webp",
  },
] as const;

export default function Portes() {
  return (
    <section id="portes" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-pill badge-fuchsia mb-6 inline-block">🚪 Les 5 portes du royaume</span>
          <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.75rem]">
            Choisis ta porte.
          </h2>
          <p className="mt-3 text-sm text-white/40 sm:text-base">
            Cinq façons de mettre l&apos;IA au service de ton activité.
          </p>
        </motion.div>

        {/* ── Cards ────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-5">
          {PORTES.map(({ href, emoji, title, phrase, color, img }, i) => (
            <motion.div
              key={href}
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Link href={href} className="group block h-full">
                <motion.div
                  className="flex h-full flex-col overflow-hidden rounded-3xl px-6 pb-6 pt-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${color}26`,
                  }}
                  whileHover={{
                    borderColor: `${color}60`,
                    boxShadow: `0 0 40px ${color}22, 0 16px 48px rgba(0,0,0,0.45)`,
                    transition: { duration: 0.25 },
                  }}
                >
                  {/* Pose de Kame */}
                  <div className="mb-4 flex h-40 items-end justify-center">
                    <Image
                      src={img}
                      alt={`Kame — ${title}`}
                      width={150}
                      height={160}
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Titre teinté */}
                  <h3 className="mb-1.5 font-display text-lg font-black" style={{ color }}>
                    <span className="mr-1.5">{emoji}</span>
                    {title}
                  </h3>

                  {/* Une phrase */}
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-white/45">
                    {phrase}
                  </p>

                  {/* Lien */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color }}>
                    Découvrir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
