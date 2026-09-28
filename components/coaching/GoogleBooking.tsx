import { SESSIONS } from "@/lib/content";
import { CONTACT } from "@/lib/site";
import { KameNote } from "@/components/ks/Kame";
import { Eyebrow, FD, G } from "@/components/ks/ui";

const STEPS = ["Choisissez un créneau", "Indiquez vos coordonnées et votre objectif", "Recevez la confirmation et le lien Google Meet"];

/** Réservation en direct via la page de réservation Google Agenda du studio (intégrée). */
export default function GoogleBooking({ url }: { url: string }) {
  const embed = url + (url.includes("?") ? "&" : "?") + "gv=true";

  return (
    <section id="reserver" data-kame="coaching" className="bg-p" style={{ position: "relative", padding: "clamp(64px,8vw,112px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
          <div style={{ display: "grid", gap: 14 }}>
            <Eyebrow n="RDV">Réservation</Eyebrow>
            <h2 className="h2">
              Réserver <G c="#7C3AED,#C026D3">une séance</G>
            </h2>
          </div>
          <ol aria-label="Étapes de réservation" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "10px 20px" }}>
            {STEPS.map((l, i) => (
              <li key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}>
                <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 13, background: "#FFFFFF", color: "#151827", border: "1.5px solid #C9CDD9" }}>
                  {i + 1}
                </span>
                {l}
              </li>
            ))}
          </ol>
        </div>

        <div role="note" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", borderRadius: 14, background: "#E9FBF1", border: "1px solid #BDEFD2", fontSize: 15, lineHeight: 1.5 }}>
          <span style={{ flex: "none", marginTop: 2, padding: "2px 8px", borderRadius: 6, background: "#15803D", color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>EN DIRECT</span>
          <span>
            <strong>Les créneaux affichés sont les disponibilités réelles du studio.</strong> La confirmation et le lien Google Meet arrivent aussitôt par e-mail ; les horaires s’affichent dans votre fuseau (Paris, Martinique…).
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 260px", display: "grid", gap: 14, background: "#FFFFFF", border: "1px solid #E6E8F0", borderRadius: 20, padding: 24 }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 16 }}>Quel type de séance ?</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {SESSIONS.map((x) => (
                <li key={x.id} style={{ display: "grid", gap: 4, padding: 14, borderRadius: 14, border: "1.5px solid #E0E3EC" }}>
                  <span style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.3 }}>{x.name}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.45, color: "#525B70" }}>{x.desc}</span>
                </li>
              ))}
            </ul>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>Indiquez le type de séance et votre objectif dans le formulaire de réservation : la séance sera construite autour de votre projet.</p>
            <p style={{ margin: 0, paddingTop: 14, borderTop: "1px solid #ECEEF4", fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>
              Aucun horaire ne vous convient ? Écrivez-nous sur{" "}
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener">
                WhatsApp
              </a>{" "}
              ou à <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
          </div>

          <div style={{ flex: "2.4 1 520px", minWidth: 0, display: "grid", gap: 10 }}>
            <div style={{ overflow: "hidden", background: "#FFFFFF", border: "1px solid #E6E8F0", borderRadius: 20, boxShadow: "0 40px 80px -56px rgba(139,92,246,0.45)" }}>
              <iframe src={embed} title="Réserver une séance de coaching — page de réservation Google Agenda de Kaméléon Studio" loading="lazy" className="gbook-frame" />
            </div>
            <a href={url} target="_blank" rel="noopener" style={{ justifySelf: "end", fontSize: 14, fontWeight: 600 }}>
              Le module ne s’affiche pas ? Ouvrir la page de réservation
            </a>
          </div>
        </div>
        <KameNote k="coaching" />
      </div>
    </section>
  );
}
