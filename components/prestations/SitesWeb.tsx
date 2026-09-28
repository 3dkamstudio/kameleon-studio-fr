import Image from "next/image";
import type { ReactNode } from "react";
import { KameNote } from "@/components/ks/Kame";
import PrefillLink from "@/components/ks/PrefillLink";
import { Aurora, FD, G } from "@/components/ks/ui";
import { type Badge, CheckList, Head, Pill, Step } from "./parts";

const WEB = { type: "Site web" };

type WebOffer = {
  name: string;
  img: string;
  shadow: string;
  badges: Badge[];
  who: string;
  chips: string[];
  chipBg: string;
  chipInk: string;
  /** Mention avant le prix (« À partir de »), vide pour un prix fixe. */
  from: string;
  price: string;
  grad: string;
  delay: string;
  check: string;
  items: string[];
};

const VITRINE: WebOffer = {
  name: "Site vitrine",
  img: "/web-vitrine-bg.webp",
  shadow: "0 0 0 1.5px rgba(6,182,212,0.4), 0 34px 64px -40px rgba(6,182,212,0.7)",
  badges: [["Essentiel", "#CFFAFE", "#0E7490"]],
  who: "Freelances, artisans, indépendants",
  chips: ["1 page", "Animations de base", "RDV inclus", "SEO de base"],
  chipBg: "#ECFEFF",
  chipInk: "#0E7490",
  from: "",
  price: "800 €",
  grad: "#0891B2,#16A34A",
  delay: "2 à 4 jours ouvrés",
  check: "#0891B2",
  items: [
    "1 page (one-pager) structurée",
    "Design sur mesure (couleurs, typo, logo)",
    "Animations de base (défilement, survol des boutons)",
    "Responsive mobile, tablette et ordinateur",
    "Formulaire de contact inclus",
    "Prise de rendez-vous intégrée (Calendly, Google Agenda…)",
    "SEO de base",
    "1 série de retouches incluse",
    "Mise en ligne incluse",
  ],
};

const SUR_MESURE: WebOffer = {
  name: "Site sur mesure",
  img: "/web-sur-mesure-bg.webp",
  shadow: "0 0 0 2px rgba(192,38,211,0.45), 0 40px 70px -36px rgba(192,38,211,0.7)",
  badges: [
    ["Premium", "#F3E8FF", "#6D28D9"],
    ["✦ Recommandé", "#C026D3", "#FFFFFF"],
  ],
  who: "Marques, créateurs, entreprises",
  chips: ["2 à 5 pages", "Animations avancées", "Visuels IA", "Paiement + RDV"],
  chipBg: "#F5F3FF",
  chipInk: "#6D28D9",
  from: "À partir de",
  price: "1 600 €",
  grad: "#7C3AED,#C026D3",
  delay: "5 à 8 jours ouvrés (selon le nombre de pages)",
  check: "#7C3AED",
  items: [
    "2 pages incluses (jusqu’à 5, +200 € par page supplémentaire)",
    "Direction artistique personnalisée complète",
    "Animations avancées",
    "Visuels IA sur mesure (fonds, illustrations)",
    "Paiement en ligne inclus (Stripe ou équivalent)",
    "Prise de rendez-vous intégrée",
    "Formulaire connecté et suivi des conversions",
    "SEO avancé (métadonnées, sitemap, Open Graph)",
    "2 séries de retouches incluses",
    "Mise en ligne et configuration du domaine",
  ],
};

// [option, prix, liseré, couleur du prix]
const OPTIONS = [
  ["Paiement en ligne", "+120 €", "#CFFAFE", "#0E7490"],
  ["Visuels IA sur mesure", "+150 €", "#F3E8FF", "#6D28D9"],
] as const;

/** Carte d'une offre de site : visuel titré, atouts, prix, inclus ; `children` = encadré et bouton. */
function WebCard({ o, children }: { o: WebOffer; children: ReactNode }) {
  return (
    <article style={{ flex: "1 1 380px", position: "relative", borderRadius: 26, overflow: "hidden", display: "grid", gridTemplateRows: "auto 1fr", background: "#FFFFFF", boxShadow: o.shadow }}>
      <div style={{ position: "relative", aspectRatio: "16/8", overflow: "hidden", background: "#0B0A14" }}>
        <Image src={o.img} alt="" fill sizes="(max-width: 860px) 100vw, 560px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,20,0) 40%, rgba(11,10,20,0.75) 100%)" }} />
        <div style={{ position: "absolute", left: 18, top: 16, display: "flex", gap: 8 }}>
          {o.badges.map(([label, bg, ink]) => (
            <Pill key={label} bg={bg} ink={ink}>
              {label}
            </Pill>
          ))}
        </div>
        <h3 style={{ position: "absolute", left: 22, bottom: 16, margin: 0, fontFamily: FD, fontWeight: 600, fontSize: 26, letterSpacing: "-0.02em", color: "#FFFFFF" }}>{o.name}</h3>
      </div>
      <div style={{ padding: "clamp(20px,2.6vw,30px)", display: "grid", gap: 16, alignContent: "start" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#525B70" }}>{o.who}</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {o.chips.map((c) => (
            <Pill key={c} bg={o.chipBg} ink={o.chipInk}>
              {c}
            </Pill>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          {o.from && <span style={{ fontSize: 14, color: "#525B70" }}>{o.from}</span>}
          <span className="grad-text" style={{ fontFamily: FD, fontSize: 48, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, backgroundImage: `linear-gradient(90deg,${o.grad})` }}>
            {o.price}
          </span>
          <span style={{ fontSize: 14, color: "#525B70" }}>paiement unique</span>
        </div>
        <span style={{ fontSize: 15 }}>
          Délai : <strong>{o.delay}</strong>
        </span>
        <CheckList items={o.items} color={o.check} />
        {children}
      </div>
    </article>
  );
}

/** Sites web : offres vitrine et sur mesure, options à la carte (étape 1 avant la maintenance). */
export default function SitesWeb() {
  return (
    <section id="sites-web" data-kame="web" className="bg-p" style={{ position: "relative", overflow: "clip", padding: "clamp(64px,8vw,112px) 0" }}>
      <Aurora
        px={22}
        blobs={[
          ["rgba(6,182,212,.24)", "min(44vw,600px)", { left: "-10%", top: "6%" }, "ksDrift3", 22],
          ["rgba(34,197,94,.2)", "min(36vw,500px)", { right: "-8%", bottom: "0%" }, "ksDrift2", 26],
        ]}
      />
      <div className="ks-wrap" style={{ display: "grid", gap: 32 }}>
        <Head
          eyebrow="Sites web premium"
          lead="Votre site sur mesure livré en 2 à 8 jours ouvrés, puis maintenu sécurisé et performant chaque mois. Un seul interlocuteur, du début à la fin."
        >
          De la création à la maintenance,{" "}
          <G c="#0891B2,#16A34A" block>
            on s’occupe de tout.
          </G>
        </Head>
        <Step n="1" grad="#0891B2,#16A34A">
          Étape 1 — On crée votre site
        </Step>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
          <WebCard o={VITRINE}>
            <div style={{ display: "grid", gap: 6, padding: "14px 16px", borderRadius: 14, background: "#F7F8FC" }}>
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#525B70" }}>Non inclus</span>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>Pages multiples · Paiement en ligne · Espace membre · Animations avancées (offre Sur mesure)</span>
            </div>
            <PrefillLink
              href="/#studio"
              contact={WEB}
              className="btn hv-cyan"
              style={{ display: "flex", minHeight: 52, borderRadius: 16, background: "#FFFFFF", border: "1.5px solid #0891B2", color: "#0E7490", fontWeight: 700, fontSize: 16 }}
            >
              Démarrer ce projet
            </PrefillLink>
          </WebCard>
          <WebCard o={SUR_MESURE}>
            <div style={{ padding: "14px 16px", borderRadius: 14, background: "#FAF5FF", fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>
              <strong style={{ color: "#6D28D9" }}>Sur devis :</strong> e-commerce complet, espace client, base de données.
            </div>
            <PrefillLink href="/#studio" contact={WEB} className="btn btn-grad hv-bright" style={{ display: "flex", minHeight: 52, borderRadius: 16, fontWeight: 700, fontSize: 16 }}>
              Je veux ce site →
            </PrefillLink>
          </WebCard>
        </div>
        <div style={{ display: "grid", gap: 14, padding: "clamp(20px,2.6vw,28px)", borderRadius: 24, background: "rgba(255,255,255,0.82)", border: "1px solid #ECEEF4" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 19 }}>
              Options à la carte · <G c="#0891B2,#16A34A">offre Essentiel</G>
            </h3>
            <span style={{ fontSize: 14, color: "#525B70" }}>Déjà incluses dans l’offre Sur mesure</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {OPTIONS.map(([label, price, border, ink]) => (
              <div
                key={label}
                style={{ flex: "1 1 220px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 16, background: "#FFFFFF", border: `1.5px solid ${border}` }}
              >
                <span style={{ fontWeight: 700 }}>{label}</span>
                <span style={{ fontFamily: FD, fontWeight: 600, color: ink }}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#525B70" }}>
            Ces options s’appuient sur vos propres comptes tiers : vous restez propriétaire de vos données. L’intégration des mentions légales fournies par le client est incluse dans toute
            offre ; Kaméléon Studio n’assure pas la rédaction ni le conseil juridique.
          </p>
        </div>
        <KameNote k="web" />
      </div>
    </section>
  );
}
