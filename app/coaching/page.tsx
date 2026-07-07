import type { Metadata } from "next";
import PrestationLayout from "@/components/layouts/PrestationLayout";
import CoachingHero from "@/components/sections/CoachingHero";
import CoachingCatalogue from "@/components/sections/CoachingCatalogue";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";
import RevealSection from "@/components/ui/RevealSection";

export const metadata: Metadata = {
  title: "Coaching IA — King of IA",
  description: "Séances de coaching IA 1h en visio, 149€. Tu viens avec une problématique, tu repars avec une méthode. Diagnostic gratuit 15 min.",
};

export default function CoachingPage() {
  return (
    <PrestationLayout>
      <SectionWrapper><CoachingHero /></SectionWrapper>
      <SectionDivider variant="scan" />
      <RevealSection><CoachingCatalogue /></RevealSection>
    </PrestationLayout>
  );
}
