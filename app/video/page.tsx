import type { Metadata } from "next";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import PricingVideo from "@/components/sections/PricingVideo";
import Showreel from "@/components/sections/Showreel";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Production vidéo IA — King of IA",
  description: "Vidéos animées 3D, podcasts et courts-métrages créés avec l'IA. Du script au rendu final, en un temps record.",
};

export default function VideoPage() {
  return (
    <PrestationLayout>

      {/* Hero */}
      <section className="relative px-6 pb-16 pt-8 text-center sm:pb-24 sm:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "radial-gradient(ellipse, rgba(217,70,239,0.12) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="badge-pill badge-fuchsia mb-6 inline-block">🎬 Production vidéo IA</span>
          <h1 className="mb-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            Tes vidéos.{" "}
            <span style={{ background: "linear-gradient(90deg,#d946ef,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Propulsées par l&apos;IA.
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
            Vidéos animées 3D, podcasts en vidéo, courts-métrages — du script au rendu final, en quelques jours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg, #d946ef, #8b5cf6)", boxShadow: "0 4px 28px rgba(217,70,239,0.45)" }}
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SectionDivider variant="scan" />
      <RevealSection><Showreel /></RevealSection>
      <SectionDivider variant="chevron" />
      <RevealSection><PricingVideo /></RevealSection>

      {/* Cross-sell */}
      <section className="px-6 py-16 text-center">
        <p className="mb-6 text-sm font-semibold text-white/35 uppercase tracking-widest">Tu pourrais aussi avoir besoin de…</p>
        <div className="mx-auto flex max-w-lg flex-wrap justify-center gap-4">
          <Link href="/bd" className="rounded-2xl border border-orange-500/25 bg-orange-500/10 px-6 py-3 text-sm font-bold text-orange-300 transition-colors hover:bg-orange-500/20">🎨 BD & Illustration</Link>
          <Link href="/formation" className="rounded-2xl border border-violet-500/25 bg-violet-500/10 px-6 py-3 text-sm font-bold text-violet-300 transition-colors hover:bg-violet-500/20">🎓 Formation King of IA</Link>
        </div>
      </section>

    </PrestationLayout>
  );
}
