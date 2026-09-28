import Image from "next/image";
import { CONTACT } from "@/lib/site";
import { KameNote } from "@/components/ks/Kame";
import { Eyebrow, G } from "@/components/ks/ui";
import ContactForm from "./ContactForm";

/** « Le studio » : présentation, coordonnées et demande de production. */
export default function StudioContact() {
  return (
    <section id="studio" data-kame="contact" className="bg-w" style={{ position: "relative", padding: "clamp(72px,9vw,128px) 0" }}>
      <div id="contact" className="ks-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(40px,5vw,72px)", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 380px", display: "grid", gap: 24 }}>
          <Eyebrow n="07">Le studio</Eyebrow>
          <h2 className="h2">
            Parlons de <G c="#E11D48,#EA580C">votre projet.</G>
          </h2>
          <p className="lead">
            Kaméléon Studio produit vidéos, animations 3D, planches BD et sites web avec l’IA, du script au rendu final. Son super-pouvoir : s’adapter à chaque univers, chaque style et chaque budget.
          </p>
          <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: 20, overflow: "hidden", background: "#F7F8FC" }}>
            <Image src="/team-ks.png" alt="L’équipe Kaméléon Studio" fill sizes="(max-width: 860px) 100vw, 560px" style={{ objectFit: "cover" }} />
          </div>
          <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))", gap: 18 }}>
            <div style={{ display: "grid", gap: 4 }}>
              <dt style={{ fontSize: 14, color: "#525B70" }}>E-mail</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>
                <a href={`mailto:${CONTACT.email}`} style={{ color: "#151827", overflowWrap: "anywhere" }}>
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              <dt style={{ fontSize: 14, color: "#525B70" }}>WhatsApp</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener" style={{ color: "#151827" }}>
                  {CONTACT.whatsappLabel}
                </a>
              </dd>
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              <dt style={{ fontSize: 14, color: "#525B70" }}>Premier échange</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>Gratuit, sans engagement</dd>
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              <dt style={{ fontSize: 14, color: "#525B70" }}>Réponse</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>Sous 24 h</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
        <KameNote k="contact" />
      </div>
    </section>
  );
}
