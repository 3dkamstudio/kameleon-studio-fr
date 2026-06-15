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
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CelestialBackground from "@/components/ui/CelestialBackground";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <CelestialBackground />

      <div className="relative z-[1]">
        <SectionWrapper><Hero /></SectionWrapper>
        <SectionDivider variant="scan" />

        <SectionWrapper><Services /></SectionWrapper>
        <SectionDivider variant="chevron" />

        <SectionWrapper><Prestations /></SectionWrapper>
        <SectionDivider variant="wave" />

        <SectionWrapper><Showreel /></SectionWrapper>
        <SectionDivider variant="circuit" />

        <SectionWrapper><Process /></SectionWrapper>
        <SectionDivider variant="scan" />

        <SectionWrapper><Testimonials /></SectionWrapper>
        <SectionDivider variant="wave" />

        <SectionWrapper><PricingVideo /></SectionWrapper>
        <SectionDivider variant="chevron" />

        <SectionWrapper><PricingBD /></SectionWrapper>
        <SectionDivider variant="circuit" />

        <SectionWrapper><WebStudio /></SectionWrapper>
        <SectionDivider variant="scan" />

        <SectionWrapper><FAQ /></SectionWrapper>
        <SectionDivider variant="wave" />

        <SectionWrapper><Contact /></SectionWrapper>
      </div>

      <SectionDivider variant="signal" />
      <Footer />
    </main>
  );
}
