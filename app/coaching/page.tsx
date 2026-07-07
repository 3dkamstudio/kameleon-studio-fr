import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import CoachingHero from "@/components/sections/CoachingHero";

// Section sous le pli : chunk différé (SSR conservé)
const CoachingCatalogue = dynamic(() => import("@/components/sections/CoachingCatalogue"));
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";

export const metadata: Metadata = {
  title: "Coaching IA — King of IA",
  description: "Séances de coaching IA 1h en visio, 149€. Tu viens avec une problématique, tu repars avec une méthode. Diagnostic gratuit 15 min.",
};

export default function CoachingPage() {
  return (
    <PrestationLayout>
      <CoachingHero />
      <SectionDivider variant="scan" />
      <RevealSection><CoachingCatalogue /></RevealSection>
    </PrestationLayout>
  );
}
