import { KameNote } from "@/components/ks/Kame";
import { Eyebrow } from "@/components/ks/ui";
import { CONTACT, FORMATION_STATUS } from "@/lib/site";
import WaitlistForm from "./WaitlistForm";

const open = FORMATION_STATUS === "ouverte";

/** Liste d'attente King of IA : usage de l'e-mail, formulaire d'inscription et note de Kame. */
export default function Waitlist() {
  return (
    <section id="liste-attente" data-kame="formations" className="bg-p" style={{ padding: "clamp(72px,9vw,120px) 0" }}>
      <div className="ks-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(40px,5vw,72px)", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 360px", display: "grid", gap: 22 }}>
          <Eyebrow n="03">Liste d’attente</Eyebrow>
          <h2 className="h2">{open ? "Recevoir le détail des formules." : "Soyez prévenu à l’ouverture."}</h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#525B70" }}>
            Laissez votre e-mail : vous recevrez un message lorsque les inscriptions ouvriront. Aucun achat, aucun engagement.
          </p>
          <div style={{ display: "grid", gap: 12, padding: 22, borderRadius: 18, background: "#FFFFFF", border: "1px solid #E6E8F0" }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Utilisation de votre e-mail</h3>
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, fontSize: 15, lineHeight: 1.5, color: "#525B70" }}>
              <li>Il sert uniquement à vous prévenir de l’ouverture des formations King of IA.</li>
              <li>Les autres actualités du studio demandent un accord séparé, facultatif.</li>
              {/* Pas encore d'outil d'e-mailing : désinscription manuelle, sans lien automatique. */}
              <li>
                Pour vous désinscrire, répondez simplement « STOP » à nos messages ou écrivez à{" "}
                <a href={`mailto:${CONTACT.email}`} style={{ color: "#151827", overflowWrap: "anywhere" }}>
                  {CONTACT.email}
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
        <WaitlistForm />
        <KameNote k="formations" />
      </div>
    </section>
  );
}
