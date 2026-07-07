"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

// ── Teaser showreel — UNE vidéo en façade, la grille vit sur /realisations ─────
// Façade : miniature + bouton play, iframe injectée au clic uniquement (perf).

const TEASER_ID = "0wa3_fb2W48";
const TEASER_TITLE = "Madinina — La Course des Yoles · série animée créée avec l'IA";

export default function ShowreelTeaser() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="teaser" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <m.div
          className="mb-12"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
         
          transition={{ duration: 0.6 }}
        >
          <span className="badge-pill badge-fuchsia mb-6 inline-block">🎬 King of IA en action</span>
          <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.75rem]">
            Voir, c&apos;est croire.
          </h2>
        </m.div>

        {/* ── Façade vidéo ─────────────────────────────────────────────────── */}
        <m.div
          className="relative mx-auto aspect-video w-full overflow-hidden rounded-3xl"
          style={{ border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
         
          transition={{ duration: 0.65 }}
        >
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${TEASER_ID}?autoplay=1&rel=0&start=1`}
              title={TEASER_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer"
              aria-label={`Lire la vidéo : ${TEASER_TITLE}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${TEASER_ID}/maxresdefault.jpg`}
                alt={TEASER_TITLE}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Voile pour lisibilité du play */}
              <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />
              {/* Bouton play */}
              <span
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #d946ef, #8b5cf6)",
                  boxShadow: "0 0 40px rgba(217,70,239,0.55)",
                }}
              >
                <Play className="ml-1 h-8 w-8 fill-current" />
              </span>
            </button>
          )}
        </m.div>

        {/* ── Lien vers la grille complète ─────────────────────────────────── */}
        <m.div
          className="mt-10"
          initial={false}
          animate={{ opacity: 1 }}
         
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/realisations"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.11]"
          >
            Toutes les réalisations
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </m.div>

      </div>
    </section>
  );
}
