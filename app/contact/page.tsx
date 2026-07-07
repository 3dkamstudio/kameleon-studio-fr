import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — King of IA",
  description: "Contacte King of IA pour un devis vidéo, BD ou web. Réponse en moins de 24h. Premier échange toujours gratuit.",
};

export default function ContactPage() {
  return (
    <main className="relative overflow-x-hidden pt-24">
      <div className="relative z-[1]">
        <Contact />
      </div>
    </main>
  );
}
