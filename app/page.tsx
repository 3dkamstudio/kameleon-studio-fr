import dynamic from "next/dynamic";
import HeroRoyal from "@/components/sections/HeroRoyal";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";

// Sections sous le pli : chunks différés (SSR conservé), hydratation hors chemin critique
const Services       = dynamic(() => import("@/components/sections/Services"));
const Portes         = dynamic(() => import("@/components/sections/Portes"));
const Testimonials   = dynamic(() => import("@/components/sections/Testimonials"));
const ShowreelTeaser = dynamic(() => import("@/components/sections/ShowreelTeaser"));
const Process        = dynamic(() => import("@/components/sections/Process"));
const FAQ            = dynamic(() => import("@/components/sections/FAQ"));
const CtaFinal       = dynamic(() => import("@/components/sections/CtaFinal"));

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="relative z-[1]">
        {/* Hero royal : texte LCP visible au SSR — aucun wrapper animé */}
        <HeroRoyal />
        <SectionDivider variant="scan" />

        <RevealSection><Services /></RevealSection>
        <div className="divider-rainbow-glow" />

        <RevealSection><Portes /></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><Testimonials /></RevealSection>
        <SectionDivider variant="scan" />

        <RevealSection><ShowreelTeaser /></RevealSection>
        <SectionDivider variant="scan" />

        <RevealSection><Process /></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><FAQ /></RevealSection>
      </div>

      <CtaFinal />
      <SectionDivider variant="signal" />
    </main>
  );
}
