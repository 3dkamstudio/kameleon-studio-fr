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

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <CelestialBackground />

      <div className="relative z-[1]">
        <SectionWrapper><Hero /></SectionWrapper>
        <SectionWrapper><Services /></SectionWrapper>
        <SectionWrapper><Prestations /></SectionWrapper>
        <SectionWrapper><Showreel /></SectionWrapper>
        <SectionWrapper><Process /></SectionWrapper>
        <SectionWrapper><Testimonials /></SectionWrapper>
        <SectionWrapper><PricingVideo /></SectionWrapper>
        <SectionWrapper><PricingBD /></SectionWrapper>
        <SectionWrapper><WebStudio /></SectionWrapper>
        <SectionWrapper><FAQ /></SectionWrapper>
        <SectionWrapper><Contact /></SectionWrapper>
      </div>

      <Footer />
    </main>
  );
}
