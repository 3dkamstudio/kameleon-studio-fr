import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Prestations from "@/components/sections/Prestations";
import Showreel from "@/components/sections/Showreel";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import PricingVideo from "@/components/sections/PricingVideo";
import PricingBD from "@/components/sections/PricingBD";
import WebStudio from "@/components/sections/WebStudio";
import FAQ from "@/components/sections/FAQ";
import KingOfIA from "@/components/sections/KingOfIA";
import CtaFinal from "@/components/sections/CtaFinal";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CelestialBackground from "@/components/ui/CelestialBackground";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <CelestialBackground />

      <div className="relative z-[1]">
        {/* Hero : animation propre interne, pas de RevealSection */}
        <SectionWrapper><Hero /></SectionWrapper>
        <SectionDivider variant="scan" />

        <RevealSection><SectionWrapper><Services /></SectionWrapper></RevealSection>
        <div className="divider-rainbow-glow" />

        <RevealSection><SectionWrapper><Prestations /></SectionWrapper></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><SectionWrapper><Showreel /></SectionWrapper></RevealSection>
        <SectionDivider variant="scan" />

        <RevealSection><SectionWrapper><Process /></SectionWrapper></RevealSection>
        <SectionDivider variant="scan" />

        <RevealSection><SectionWrapper><Testimonials /></SectionWrapper></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><SectionWrapper><PricingVideo /></SectionWrapper></RevealSection>
        <SectionDivider variant="chevron" />

        <RevealSection><SectionWrapper><PricingBD /></SectionWrapper></RevealSection>
        <SectionDivider variant="circuit" />

        <RevealSection><SectionWrapper><WebStudio /></SectionWrapper></RevealSection>
        <SectionDivider variant="scan" />

        <RevealSection><SectionWrapper><FAQ /></SectionWrapper></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><KingOfIA /></RevealSection>
        <SectionDivider variant="wave" />

        <RevealSection><SectionWrapper><Contact /></SectionWrapper></RevealSection>
      </div>

      <CtaFinal />
      <SectionDivider variant="signal" />
      <Footer />
    </main>
  );
}
