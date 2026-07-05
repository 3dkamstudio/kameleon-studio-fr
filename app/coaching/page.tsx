import type { Metadata } from "next";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Coaching IA — King of IA",
  description: "Séances de coaching IA 1h en visio. Tu viens avec une problématique, tu repars avec une méthode. 149€ · Diagnostic gratuit 15 min.",
};

export default function CoachingPage() {
  return (
    <PrestationLayout>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[130px]" style={{ background: "radial-gradient(ellipse, rgba(244,63,94,0.10) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="badge-pill badge-fuchsia mb-6 inline-block">👑 Coaching IA</span>
          <h1 className="mb-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            D&apos;indépendant{" "}
            <span style={{ background: "linear-gradient(90deg,#f43f5e,#d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              à indépendant.
            </span>
          </h1>
          <p className="mx-auto mb-4 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Tu viens avec une problématique, tu repars avec une méthode.
          </p>
          <p className="mx-auto mb-10 max-w-md text-sm text-white/35">
            Visio 1h · enregistrée · replay + fiche récap offerts · <strong className="text-white/60">149€ la séance</strong>
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg, #f43f5e, #d946ef)", boxShadow: "0 4px 28px rgba(244,63,94,0.40)" }}
          >
            Réserver mon diagnostic gratuit — 15 min
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-white/30">Sans engagement · on identifie ensemble la séance qu&apos;il te faut</p>

          <div className="mt-16 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 py-4 text-sm text-white/30">
            Le catalogue complet des séances arrive bientôt sur cette page.
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="px-6 py-16 text-center">
        <p className="mb-6 text-sm font-semibold text-white/35 uppercase tracking-widest">Tu pourrais aussi avoir besoin de…</p>
        <div className="mx-auto flex max-w-lg flex-wrap justify-center gap-4">
          <Link href="/formation" className="rounded-2xl border border-violet-500/25 bg-violet-500/10 px-6 py-3 text-sm font-bold text-violet-300 transition-colors hover:bg-violet-500/20">🎓 Formation King of IA — La séance est déductible du plan Pro</Link>
        </div>
      </section>

    </PrestationLayout>
  );
}
