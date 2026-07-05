import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Contact — King of IA",
  description: "Contacte King of IA pour un devis vidéo, BD ou web. Réponse en moins de 24h. Premier échange toujours gratuit.",
};

export default function ContactPage() {
  return (
    <main className="relative overflow-x-hidden pt-24">
      <div className="relative z-[1]">
        <SectionWrapper>
          <Contact />
        </SectionWrapper>
      </div>
    </main>
  );
}
