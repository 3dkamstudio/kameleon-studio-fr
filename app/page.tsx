import Cockpit, { Marquee } from "@/components/home/Cockpit";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import LegacyAnchors from "@/components/home/LegacyAnchors";
import Method from "@/components/home/Method";
import Prestations from "@/components/home/Prestations";
import References from "@/components/home/References";
import Showreel from "@/components/home/Showreel";
import StudioContact from "@/components/home/StudioContact";
import Teasers from "@/components/home/Teasers";
import Tracks from "@/components/home/Tracks";
import { Sep } from "@/components/ks/ui";

export default function Home() {
  return (
    <>
      <LegacyAnchors />
      <Hero />
      <Marquee />
      <Cockpit />
      <Sep n="01" label="RÉALISATIONS" bg="w" />
      <Showreel />
      <Sep n="02" label="PARCOURS" bg="p" />
      <Tracks />
      <Sep n="03" label="RÉFÉRENCES" bg="w" />
      <References />
      <Sep n="04" label="MÉTHODE" bg="p" />
      <Method />
      <Sep n="05" label="PRESTATIONS" bg="w" />
      <Prestations />
      <Teasers />
      <Sep n="06" label="FAQ" bg="p" />
      <Faq />
      <Sep n="07" label="LE STUDIO" bg="w" />
      <StudioContact />
    </>
  );
}
