import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import WebHero from "@/components/sections/WebHero";
import type { FAQItem } from "@/components/sections/FAQ";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";
import Link from "next/link";

// Sections sous le pli : chunks différés (SSR conservé)
const WebConfigurateur = dynamic(() => import("@/components/sections/WebConfigurateur"));
const FAQ              = dynamic(() => import("@/components/sections/FAQ"));

export const metadata: Metadata = {
  title: "Sites web & Landing pages IA — King of IA",
  description: "Landing page premium à partir de 800€ : design sur mesure, animations, responsive, mise en ligne. Compose ton site avec le configurateur.",
};

const WEB_FAQ: FAQItem[] = [
  {
    num: "01", cat: "Paiement",
    color: "#06b6d4",
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Paiement en ligne sécurisé par carte bancaire (Stripe), virement bancaire, ou PayPal. Pour les projets d'un montant supérieur à 800 €, un acompte de 50 % est demandé au démarrage, le solde à la livraison. Facturation avec TVA selon situation.",
  },
];

export default function WebPage() {
  return (
    <PrestationLayout>

      <WebHero />
      <SectionDivider variant="scan" />
      <RevealSection><WebConfigurateur /></RevealSection>
      <SectionDivider variant="wave" />
      <RevealSection>
        <FAQ items={WEB_FAQ} subtitle="Les réponses aux questions les plus posées avant de lancer ton site." />
      </RevealSection>

      {/* CTA final — rappel prix au point de décision */}
      <section className="px-6 py-16 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-black text-white transition-transform hover:scale-[1.04]"
          style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", boxShadow: "0 4px 28px rgba(6,182,212,0.40)" }}
        >
          Demander un devis gratuit
        </Link>
        <p className="mt-3 text-xs text-white/35">À partir de 800€ · options au choix · sans engagement</p>
      </section>

      {/* Cross-sell */}
      <section className="px-6 pb-16 text-center">
        <p className="mb-6 text-sm font-semibold text-white/35 uppercase tracking-widest">Tu pourrais aussi avoir besoin de…</p>
        <div className="mx-auto flex max-w-lg flex-wrap justify-center gap-4">
          <Link href="/video" className="rounded-2xl border border-fuchsia-500/25 bg-fuchsia-500/10 px-6 py-3 text-sm font-bold text-fuchsia-300 transition-colors hover:bg-fuchsia-500/20">🎬 Production vidéo</Link>
          <Link href="/coaching" className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-6 py-3 text-sm font-bold text-rose-300 transition-colors hover:bg-rose-500/20">👑 Coaching IA</Link>
        </div>
      </section>

    </PrestationLayout>
  );
}
