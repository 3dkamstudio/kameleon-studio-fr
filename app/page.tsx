import HeroRoyal from "@/components/sections/HeroRoyal";
import Services from "@/components/sections/Services";
import Portes from "@/components/sections/Portes";
import Testimonials from "@/components/sections/Testimonials";
import ShowreelTeaser from "@/components/sections/ShowreelTeaser";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CtaFinal from "@/components/sections/CtaFinal";
import CelestialBackground from "@/components/ui/CelestialBackground";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <CelestialBackground />

      <div className="relative z-[1]">
        {/* Hero royal : animation propre interne, pas de RevealSection */}
        <SectionWrapper><HeroRoyal /></SectionWrapper>
        <SectionDivider variant="scan" />

        <RevealSection><SectionWrapper><Services /></SectionWrapper></RevealSection>
        <div className="divider-rainbow-glow" />

        <RevealSection><SectionWrapper><Portes /></SectionWrapper></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><SectionWrapper><Testimonials /></SectionWrapper></RevealSection>
        <SectionDivider variant="scan" />

        <RevealSection><SectionWrapper><ShowreelTeaser /></SectionWrapper></RevealSection>
        <SectionDivider variant="scan" />

        <RevealSection><SectionWrapper><Process /></SectionWrapper></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><SectionWrapper><FAQ /></SectionWrapper></RevealSection>
      </div>

      <CtaFinal />
      <SectionDivider variant="signal" />
    </main>
  );
}
