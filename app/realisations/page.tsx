import type { Metadata } from "next";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import Showreel from "@/components/sections/Showreel";
import RevealSection from "@/components/ui/RevealSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Réalisations — King of IA",
  description: "Portfolio King of IA : vidéos IA, BD, sites web. Découvre les créations.",
};

export default function RealisationsPage() {
  return (
    <PrestationLayout>

      <RevealSection><Showreel /></RevealSection>

      {/* Cross-sell */}
      <section className="px-6 py-16 text-center">
        <p className="mb-6 text-sm font-semibold text-white/35 uppercase tracking-widest">Ton projet mérite le même traitement</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-black text-white"
          style={{ background: "linear-gradient(135deg, #d946ef, #8b5cf6)", boxShadow: "0 4px 28px rgba(217,70,239,0.40)" }}
        >
          Demander un devis gratuit
        </Link>
      </section>

    </PrestationLayout>
  );
}
