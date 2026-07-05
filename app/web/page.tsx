import type { Metadata } from "next";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import WebStudio from "@/components/sections/WebStudio";
import MaintenanceWeb from "@/components/sections/MaintenanceWeb";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sites web & Landing pages IA — King of IA",
  description: "Landing pages premium, sites vitrine sur mesure avec animations IA. Design responsive, mise en ligne incluse. À partir de 800€.",
};

export default function WebPage() {
  return (
    <PrestationLayout>

      {/* Hero */}
      <section className="relative px-6 pb-16 pt-8 text-center sm:pb-24 sm:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.10) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="badge-pill badge-fuchsia mb-6 inline-block">🌐 Sites web & Landing pages</span>
          <h1 className="mb-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            Ton site.{" "}
            <span style={{ background: "linear-gradient(90deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Qui convertit.
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
            Landing pages premium, sites vitrine — design sur mesure, animations, responsive, mise en ligne incluse. À partir de 800€.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", boxShadow: "0 4px 28px rgba(6,182,212,0.40)" }}
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SectionDivider variant="scan" />
      <RevealSection><SectionWrapper><WebStudio /></SectionWrapper></RevealSection>
      <SectionDivider variant="wave" />
      <RevealSection><SectionWrapper><MaintenanceWeb /></SectionWrapper></RevealSection>

      {/* Cross-sell */}
      <section className="px-6 py-16 text-center">
        <p className="mb-6 text-sm font-semibold text-white/35 uppercase tracking-widest">Tu pourrais aussi avoir besoin de…</p>
        <div className="mx-auto flex max-w-lg flex-wrap justify-center gap-4">
          <Link href="/video" className="rounded-2xl border border-fuchsia-500/25 bg-fuchsia-500/10 px-6 py-3 text-sm font-bold text-fuchsia-300 transition-colors hover:bg-fuchsia-500/20">🎬 Production vidéo</Link>
          <Link href="/coaching" className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-6 py-3 text-sm font-bold text-rose-300 transition-colors hover:bg-rose-500/20">👑 Coaching IA</Link>
        </div>
      </section>

    </PrestationLayout>
  );
}
