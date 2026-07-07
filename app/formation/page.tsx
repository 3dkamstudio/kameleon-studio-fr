import type { Metadata } from "next";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import KingOfIA from "@/components/sections/KingOfIA";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Formation King of IA — Maîtrise l'IA créative",
  description: "Formation 100% en ligne pour maîtriser l'IA créative : vidéo, prompt, automatisation. 8 modules. Starter 497€ · Pro 997€.",
};

export default function FormationPage() {
  return (
    <PrestationLayout>

      {/* Première section = LCP : pas de wrapper animé */}
      <KingOfIA />

      {/* Cross-sell */}
      <section className="px-6 py-16 text-center">
        <p className="mb-6 text-sm font-semibold text-white/35 uppercase tracking-widest">Tu pourrais aussi avoir besoin de…</p>
        <div className="mx-auto flex max-w-lg flex-wrap justify-center gap-4">
          <Link href="/coaching" className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-6 py-3 text-sm font-bold text-rose-300 transition-colors hover:bg-rose-500/20">👑 Coaching IA — La séance est déductible du plan Pro</Link>
        </div>
      </section>

    </PrestationLayout>
  );
}
