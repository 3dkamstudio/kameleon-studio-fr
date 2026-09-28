import Formules from "@/components/formations/Formules";
import Hero from "@/components/formations/Hero";
import Programme from "@/components/formations/Programme";
import Waitlist from "@/components/formations/Waitlist";
import { Sep } from "@/components/ks/ui";
import { pageMeta } from "@/lib/seo";
import { FORMATION_STATUS } from "@/lib/site";

export const metadata = pageMeta({
  title: "Formations IA King of IA",
  description:
    FORMATION_STATUS === "ouverte"
      ? "King of IA, la formation vidéo IA de Kaméléon Studio : huit modules du prompt au montage final. Inscriptions ouvertes."
      : "King of IA, la formation vidéo IA de Kaméléon Studio : huit modules du prompt au montage final, bientôt disponible ; inscrivez-vous à la liste d’attente.",
  path: "/formations",
});

export default function FormationsPage() {
  return (
    <>
      <Hero />
      <Sep n="01" label="PROGRAMME" bg="p" />
      <Programme />
      <Sep n="02" label="FORMULES" bg="w" />
      <Formules />
      <Sep n="03" label="LISTE D’ATTENTE" bg="p" />
      <Waitlist />
    </>
  );
}
