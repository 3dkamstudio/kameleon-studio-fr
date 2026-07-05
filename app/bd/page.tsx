import type { Metadata } from "next";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import PricingBD from "@/components/sections/PricingBD";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "BD & Illustration IA — King of IA",
  description: "Bandes dessinées, webtoons et illustrations générés par l'IA. Style cohérent, personnages récurrents, livraison rapide.",
};

export default function BdPage() {
  return (
    <PrestationLayout>

      {/* Hero */}
      <section className="relative px-6 pb-16 pt-8 text-center sm:pb-24 sm:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.10) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="badge-pill badge-fuchsia mb-6 inline-block">🎨 BD & Illustration IA</span>
          <h1 className="mb-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            Tes histoires.{" "}
            <span style={{ background: "linear-gradient(90deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              En images.
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
            Bandes dessinées, webtoons, illustrations — un style cohérent généré et affiné par l&apos;IA, des personnages récurrents reconnaissables.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg, #f97316, #eab308)", boxShadow: "0 4px 28px rgba(249,115,22,0.40)" }}
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-white/28">Exemples de planches à venir — assets en cours de préparation.</p>
        </div>
      </section>

      <SectionDivider variant="circuit" />
      <RevealSection><SectionWrapper><PricingBD /></SectionWrapper></RevealSection>

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
