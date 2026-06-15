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
        <SectionDivider variant="hero-services" />

        <SectionWrapper><Services /></SectionWrapper>
        <SectionDivider variant="services-process" />

        <SectionWrapper><Prestations /></SectionWrapper>
        <SectionDivider variant="process-prestations" />

        <SectionWrapper><Showreel /></SectionWrapper>
        <SectionDivider variant="web-showreel" />

        <SectionWrapper><Process /></SectionWrapper>
        <SectionDivider variant="showreel-clients" />

        <SectionWrapper><Testimonials /></SectionWrapper>
        <SectionDivider variant="clients-contact" />

        <SectionWrapper><PricingVideo /></SectionWrapper>
        <SectionDivider variant="process-prestations" />

        <SectionWrapper><PricingBD /></SectionWrapper>
        <SectionDivider variant="prestations-web" />

        <SectionWrapper><WebStudio /></SectionWrapper>
        <SectionDivider variant="web-showreel" />

        <SectionWrapper><FAQ /></SectionWrapper>
        <SectionDivider variant="clients-contact" />

        <SectionWrapper><Contact /></SectionWrapper>
      </div>

      <SectionDivider variant="contact-footer" />
      <Footer />
    </main>
  );
}
