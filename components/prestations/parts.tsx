import Image from "next/image";
import type { ReactNode } from "react";
import PrefillLink from "@/components/ks/PrefillLink";
import { Check, Eyebrow, FD, G, GlowRing } from "@/components/ks/ui";

// Briques communes de la page Prestations (styles repris de la maquette).

/** En-tête centré d'une section : pastille, titre (h1 ou h2), chapeau. */
export function Head({ eyebrow, lead, h1, children }: { eyebrow: string; lead: string; h1?: boolean; children: ReactNode }) {
  const Title = h1 ? "h1" : "h2";
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "center", textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title className="h2 h2-lg">{children}</Title>
      <p className="lead">{lead}</p>
    </div>
  );
}

/** Chiffre clé : [valeur, libellé, couleurs du liseré, couleurs du chiffre]. */
export type Stat = [value: string, label: string, border: string, grad: string];

/** Rangée de chiffres clés au-dessus d'une grille tarifaire. */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,190px),1fr))", gap: 14 }}>
      {items.map(([value, label, border, grad]) => (
        <div
          key={label}
          style={{
            padding: "20px 14px",
            borderRadius: 18,
            textAlign: "center",
            background: `linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(135deg,${border}) border-box`,
            border: "1.5px solid transparent",
            boxShadow: "0 18px 40px -28px rgba(139,92,246,0.45)",
          }}
        >
          <div className="grad-text" style={{ fontFamily: FD, fontSize: "clamp(24px,2.6vw,32px)", fontWeight: 600, letterSpacing: "-0.03em", backgroundImage: `linear-gradient(90deg,${grad})` }}>
            {value}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#525B70" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

/** Étiquette : [libellé, fond, couleur du texte]. */
export type Badge = [label: string, bg: string, ink: string];

/** Petite étiquette arrondie (formule, atout, caractéristique). */
export function Pill({ bg, ink, children }: { bg: string; ink: string; children: ReactNode }) {
  return <span style={{ padding: "4px 10px", borderRadius: 999, background: bg, color: ink, fontSize: 12, fontWeight: 700 }}>{children}</span>;
}

/** Repère d'étape numéroté (« Étape 1 — … »). */
export function Step({ n, grad, children }: { n: string; grad: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        aria-hidden="true"
        style={{ width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", backgroundImage: `linear-gradient(135deg,${grad})`, color: "#FFFFFF", fontFamily: FD, fontWeight: 600 }}
      >
        {n}
      </span>
      <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

/** Liste à coches ; `color` = couleur des coches, `ink` = couleur du texte. */
export function CheckList({ items, color, gap = 9, ink = "#151827" }: { items: string[]; color: string; gap?: number; ink?: string }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap, fontSize: 15, lineHeight: 1.45, color: ink }}>
      {items.map((it) => (
        <Check key={it} color={color}>
          {it}
        </Check>
      ))}
    </ul>
  );
}

type Offer = {
  img: string;
  alt: string;
  /** Couleur du liseré, du halo et de l'ombre du bouton. */
  glow: string;
  name: string;
  accent: string;
  /** Couleurs du dégradé (mot d'accent du titre et prix). */
  grad: string;
  sub: string;
  price: number;
  unit: string;
  /** Ligne « Dégressif jusqu'à … ». */
  note: string;
  check: string;
  items: string[];
  /** Encadré sous la liste (durée supplémentaire, formats de livraison…). */
  extra: ReactNode;
  cta: string;
  ctaGrad: string;
  /** Type de prestation pré-rempli dans le formulaire de contact de l'accueil. */
  type: string;
};

/** Carte sombre illustrée d'une offre : prix de départ, inclus, bouton de commande. */
export function OfferCard({ img, alt, glow, name, accent, grad, sub, price, unit, note, check, items, extra, cta, ctaGrad, type }: Offer) {
  return (
    <article
      style={{
        flex: "1 1 360px",
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        background: "#0B0A14",
        color: "#FFFFFF",
        minHeight: 680,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        isolation: "isolate",
        boxShadow: `0 0 0 1.5px ${glow}, 0 40px 80px -40px ${glow}`,
      }}
    >
      <Image src={img} alt={alt} fill sizes="(max-width: 940px) 100vw, 480px" style={{ objectFit: "cover", objectPosition: "50% 18%", zIndex: -2 }} />
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(180deg, rgba(11,10,20,0.05) 0%, rgba(11,10,20,0.5) 30%, rgba(11,10,20,0.9) 52%, rgba(11,10,20,0.97) 100%)" }}
      />
      <div style={{ padding: "clamp(22px,2.8vw,32px)", display: "grid", gap: 16 }}>
        <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontSize: "clamp(28px,3vw,38px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
          {name} <G c={grad}>{accent}</G>
        </h3>
        <span style={{ fontSize: 14, color: "#D5D8E3" }}>{sub}</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.16)" }}>
          <span
            className="grad-text"
            style={{ fontFamily: FD, fontSize: "clamp(52px,6vw,72px)", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1, backgroundImage: `linear-gradient(90deg,${grad})` }}
          >
            {price}
          </span>
          <span style={{ fontSize: 15, color: "#D5D8E3" }}>€ / {unit}</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#86EFAC" }}>↘ {note}</span>
        <CheckList items={items} color={check} gap={10} ink="#F1F2F7" />
        {extra}
        <PrefillLink
          href="/#studio"
          contact={{ type }}
          className="btn hv-up hv-bright"
          style={{ display: "flex", minHeight: 54, borderRadius: 16, backgroundImage: ctaGrad, color: "#FFFFFF", fontWeight: 700, fontSize: 16, boxShadow: `0 16px 34px -14px ${glow}` }}
        >
          {cta}
        </PrefillLink>
      </div>
    </article>
  );
}

type Panel = {
  /** Liseré coloré en haut du panneau. */
  line: string;
  /** Couleurs du mot « dégressive ». */
  grad: string;
  desc: string;
  /** Économie maximale, en %. */
  max: number;
  note: ReactNode;
  /** Le tableau des prix. */
  children: ReactNode;
};

/** Panneau blanc de la grille dégressive, avec liseré lumineux au survol. */
export function GridPanel({ line, grad, desc, max, note, children }: Panel) {
  return (
    <div
      data-glow="1"
      style={{
        flex: "1.4 1 480px",
        minWidth: 0,
        position: "relative",
        borderRadius: 26,
        background: "#FFFFFF",
        border: "1px solid #ECEEF4",
        boxShadow: "0 40px 80px -50px rgba(139,92,246,0.45)",
        overflow: "hidden",
      }}
    >
      <GlowRing inset={0} />
      <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, backgroundImage: line }} />
      <div style={{ padding: "clamp(18px,2.6vw,30px)", display: "grid", gap: 16 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 22, letterSpacing: "-0.02em" }}>
              Grille tarifaire <G c={grad}>dégressive</G>
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "#525B70" }}>{desc}</p>
          </div>
          <span style={{ padding: "6px 12px", borderRadius: 12, background: "#DCFCE7", border: "1px solid #86EFAC", color: "#166534", fontSize: 14, fontWeight: 800 }}>↘ Jusqu’à −{max} %</span>
        </div>
        {children}
        <p style={{ margin: 0, padding: "14px 16px", borderRadius: 14, background: "#F7F8FC", fontSize: 14, lineHeight: 1.55, color: "#525B70" }}>{note}</p>
      </div>
    </div>
  );
}
