"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CYAN = "#06b6d4";

// ── Hero /web — boldness de la page, teinte cyan ────────────────────────────────
export default function WebHero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center">

      {/* Halo cyan */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.13) 0%, rgba(139,92,246,0.06) 50%, transparent 72%)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Kame développeur — flottement */}
        <m.div
          className="mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/kame-web.png"
            alt="Kame développeur — sites web King of IA"
            width={300}
            height={300}
            priority
            className="object-contain drop-shadow-[0_0_35px_rgba(6,182,212,0.30)]"
          />
        </m.div>

        {/* Texte LCP : visible au SSR, jamais animé */}
        <div>
          <span className="badge-pill badge-cyan mb-6 inline-block">🌐 Sites web & Landing pages</span>
          <h1 className="mb-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            Ton site.{" "}
            <span style={{ background: `linear-gradient(90deg,${CYAN},#8b5cf6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Qui convertit.
            </span>
          </h1>
          <p className="mx-auto mb-3 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Design sur mesure, animations, responsive, mise en ligne incluse.
          </p>
          <p className="mb-8 text-xl font-bold" style={{ color: CYAN }}>
            À partir de 800€
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Link
            href="#configurateur"
            className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-black text-white transition-transform hover:scale-[1.04] active:scale-[0.97]"
            style={{ background: `linear-gradient(135deg, ${CYAN}, #8b5cf6)`, boxShadow: "0 4px 30px rgba(6,182,212,0.40)" }}
          >
            Composer mon site
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-xs text-white/30">
            Configure tes options · devis instantané · sans engagement
          </p>
        </div>

      </div>
    </section>
  );
}
