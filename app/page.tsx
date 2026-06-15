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

        {/* Hero → Services : scan holographique */}
        <SectionDivider variant="scan" />

        <SectionWrapper><Services /></SectionWrapper>

        {/* Services → Prestations : vague arc-en-ciel défilante */}
        <SectionDivider variant="wave" />

        <SectionWrapper><Prestations /></SectionWrapper>

        {/* Prestations → Showreel : circuit lumineux */}
        <SectionDivider variant="circuit" />

        <SectionWrapper><Showreel /></SectionWrapper>

        {/* Showreel → Process : chevron anguleux néon */}
        <SectionDivider variant="chevron" />

        <SectionWrapper><Process /></SectionWrapper>

        {/* Process → Avis : chevron anguleux */}
        <SectionDivider variant="chevron" />

        <SectionWrapper><Testimonials /></SectionWrapper>

        {/* Avis → Tarifs : scan holographique */}
        <SectionDivider variant="scan" />

        {/* ── Tarifs : 3 sections séparées ────────────────────────────────── */}
        <SectionWrapper><PricingVideo /></SectionWrapper>

        <SectionDivider variant="wave" />

        <SectionWrapper><PricingBD /></SectionWrapper>

        <SectionDivider variant="circuit" />

        <SectionWrapper><WebStudio /></SectionWrapper>

        {/* WebStudio → FAQ : wave */}
        <SectionDivider variant="wave" />

        <SectionWrapper><FAQ /></SectionWrapper>

        {/* FAQ → Contact : chevron tech */}
        <SectionDivider variant="chevron" />

        <SectionWrapper><Contact /></SectionWrapper>
      </div>

      <SectionDivider variant="signal" />
      <Footer />
    </main>
  );
}
