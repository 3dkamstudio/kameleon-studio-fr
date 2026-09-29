import { Suspense } from "react";
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

// Chaque bloc sous la bannière a sa propre frontière <Suspense> : le HTML est identique, mais React
// active la page par morceaux (bannière d'abord) au lieu d'un seul long calcul, ce qui libère plus tôt
// l'affichage de l'image principale sur les téléphones modestes.
export default function Home() {
  return (
    <>
      <LegacyAnchors />
      <Hero />
      <Suspense>
        <Marquee />
        <Cockpit />
      </Suspense>
      <Suspense>
        <Sep n="01" label="RÉALISATIONS" bg="w" />
        <Showreel />
      </Suspense>
      <Suspense>
        <Sep n="02" label="PARCOURS" bg="p" />
        <Tracks />
      </Suspense>
      <Suspense>
        <Sep n="03" label="RÉFÉRENCES" bg="w" />
        <References />
      </Suspense>
      <Suspense>
        <Sep n="04" label="MÉTHODE" bg="p" />
        <Method />
      </Suspense>
      <Suspense>
        <Sep n="05" label="PRESTATIONS" bg="w" />
        <Prestations />
        <Teasers />
      </Suspense>
      <Suspense>
        <Sep n="06" label="FAQ" bg="p" />
        <Faq />
      </Suspense>
      <Suspense>
        <Sep n="07" label="LE STUDIO" bg="w" />
        <StudioContact />
      </Suspense>
    </>
  );
}
