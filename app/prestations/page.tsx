import { Sep } from "@/components/ks/ui";
import Intro from "@/components/prestations/Intro";
import Maintenance from "@/components/prestations/Maintenance";
import SitesWeb from "@/components/prestations/SitesWeb";
import TarifsBD from "@/components/prestations/TarifsBD";
import TarifsVideo from "@/components/prestations/TarifsVideo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Prestations et tarifs",
  description:
    "Production vidéo dès 250 € (dégressif jusqu’à 200 €), planches BD dès 190 €, site vitrine à 800 €, site sur mesure dès 1 600 € et maintenance à 49 € ou 79 €/mois.",
  path: "/prestations",
});

export default function PrestationsPage() {
  return (
    <>
      <Intro />
      <Sep n="01" label="TARIFS VIDÉO" bg="p" />
      <TarifsVideo />
      <Sep n="02" label="TARIFS BD" bg="w" />
      <TarifsBD />
      <Sep n="03" label="SITES WEB" bg="p" />
      <SitesWeb />
      <Sep n="04" label="MAINTENANCE" bg="w" />
      <Maintenance />
    </>
  );
}
