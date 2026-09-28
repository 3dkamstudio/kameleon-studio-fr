import { KameNote } from "@/components/ks/Kame";
import PrefillLink from "@/components/ks/PrefillLink";
import { FD, G, GlowRing } from "@/components/ks/ui";
import { type Badge, CheckList, Pill, Step } from "./parts";

const MAINT = { type: "Maintenance de site" };

type Plan = {
  badges: Badge[];
  name: string;
  who: string;
  price: string;
  /** Couleurs du prix. */
  grad: string;
  /** Couleurs du liseré de la carte. */
  border: string;
  shadow: string;
  check: string;
  items: string[];
  /** Bouton plein (formule mise en avant) ou bouton à contour. */
  primary: boolean;
};

const PLANS: Plan[] = [
  {
    badges: [["Essentiel", "#CFFAFE", "#0E7490"]],
    name: "Landing page",
    who: "Page unique, page de vente, page formation",
    price: "49",
    grad: "#0891B2,#7C3AED",
    border: "#67E8F9,#C4B5FD",
    shadow: "0 30px 60px -40px rgba(6,182,212,0.6)",
    check: "#0E7490",
    items: [
      "Modifications illimitées (texte, image, lien, contenu)",
      "Réponse sous 48 h ouvrées",
      "Sauvegarde mensuelle",
      "Vérification sécurité et formulaires",
      "Correction des bugs mineurs",
      "Rapport mensuel de l’état du site",
    ],
    primary: false,
  },
  {
    badges: [
      ["Complet", "#FAE8FF", "#A21CAF"],
      ["✦ Le plus choisi", "#C026D3", "#FFFFFF"],
    ],
    name: "Site complet",
    who: "Site vitrine de 2 à 5 pages",
    price: "79",
    grad: "#C026D3,#E11D48",
    border: "#F0ABFC,#FDA4AF",
    shadow: "0 30px 60px -40px rgba(217,70,239,0.6)",
    check: "#A21CAF",
    items: [
      "Tout le contenu Landing Page",
      "Réponse sous 24 h ouvrées (prioritaire)",
      "Interventions techniques avancées (bugs, sécurité, mises à jour)",
      "Vérification mensuelle de votre visibilité Google",
      "Sauvegardes mensuelles",
      "Rapport mensuel de l’état du site",
    ],
    primary: true,
  },
];

/** Maintenance mensuelle des sites (étape 2) : deux formules, hors forfait, reprise d'un site existant. */
export default function Maintenance() {
  return (
    <section id="maintenance" data-kame="maintenance" className="bg-w" style={{ position: "relative", overflow: "clip", padding: "clamp(64px,8vw,112px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 32 }}>
        <Step n="2" grad="#7C3AED,#C026D3">
          Étape 2 — On maintient votre site
        </Step>
        <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
          <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Maintenance mensuelle, <G c="#7C3AED,#C026D3,#E11D48">sans y penser.</G>
          </h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#525B70" }}>Sécurité, mises à jour, performances : votre site livré, la maintenance prend le relais.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
          {PLANS.map((p) => (
            <article
              key={p.name}
              data-glow="1"
              style={{
                flex: "1 1 340px",
                position: "relative",
                borderRadius: 24,
                padding: "clamp(22px,2.8vw,32px)",
                display: "grid",
                gap: 16,
                alignContent: "start",
                background: `linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(135deg,${p.border}) border-box`,
                border: "1.5px solid transparent",
                boxShadow: p.shadow,
              }}
            >
              <GlowRing />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                {p.badges.map(([label, bg, ink]) => (
                  <Pill key={label} bg={bg} ink={ink}>
                    {label}
                  </Pill>
                ))}
              </div>
              <div style={{ display: "grid", gap: 2 }}>
                <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em" }}>{p.name}</h3>
                <span style={{ fontSize: 15, color: "#525B70" }}>{p.who}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="grad-text" style={{ fontFamily: FD, fontSize: 52, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, backgroundImage: `linear-gradient(90deg,${p.grad})` }}>
                  {p.price}
                </span>
                <span style={{ fontSize: 15, color: "#525B70" }}>€ / mois · engagement 3 mois</span>
              </div>
              <CheckList items={p.items} color={p.check} />
              <PrefillLink
                href="/#studio"
                contact={MAINT}
                className={p.primary ? "btn btn-grad hv-bright" : "btn hv-cyan"}
                style={
                  p.primary
                    ? { display: "flex", minHeight: 50, borderRadius: 14, fontWeight: 700, fontSize: 15 }
                    : { display: "flex", minHeight: 50, borderRadius: 14, background: "#FFFFFF", border: "1.5px solid #0891B2", color: "#0E7490", fontWeight: 700, fontSize: 15 }
                }
              >
                Démarrer la maintenance
              </PrefillLink>
            </article>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <div style={{ flex: "1.4 1 360px", padding: "18px 20px", borderRadius: 18, background: "rgba(255,255,255,0.82)", border: "1px solid #ECEEF4", fontSize: 15, lineHeight: 1.55, color: "#525B70" }}>
            Toute demande dépassant le cadre de l’abonnement est traitée comme intervention hors forfait, après validation préalable du client.{" "}
            <strong style={{ color: "#151827" }}>Tarif hors forfait : 50 €/h.</strong>
          </div>
          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: "18px 20px",
              borderRadius: 18,
              background: "linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(90deg,#22c55e,#06b6d4) border-box",
              border: "1.5px solid transparent",
            }}
          >
            <span style={{ fontSize: 15, lineHeight: 1.5 }}>
              <strong>Vous avez déjà un site ?</strong> On peut le reprendre en maintenance.
            </span>
            <PrefillLink
              href="/#studio"
              contact={MAINT}
              className="btn"
              style={{ minHeight: 44, padding: "0 16px", borderRadius: 12, backgroundImage: "linear-gradient(90deg,#15803D,#0E7490)", color: "#FFFFFF", fontWeight: 700, fontSize: 14 }}
            >
              Diagnostic gratuit
            </PrefillLink>
          </div>
        </div>
        <KameNote k="maintenance" />
      </div>
    </section>
  );
}
