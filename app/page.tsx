import HeroRoyal from "@/components/sections/HeroRoyal";
import Services from "@/components/sections/Services";
import Portes from "@/components/sections/Portes";
import Testimonials from "@/components/sections/Testimonials";
import ShowreelTeaser from "@/components/sections/ShowreelTeaser";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CtaFinal from "@/components/sections/CtaFinal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="relative z-[1]">
        {/* Hero royal : animation propre interne, pas de RevealSection */}
        <SectionWrapper><HeroRoyal /></SectionWrapper>
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
