import Image from "next/image";
import PrefillLink from "@/components/ks/PrefillLink";
import { Eyebrow, FD, G } from "@/components/ks/ui";

// Contenu des formules. Les prix ne sont volontairement pas publiés : « Tarif communiqué à l’ouverture ».
const STARTER = ["Maîtriser les outils IA, du script au montage final", "Créer ses premières vidéos animées en 3D", "Suivre un processus de production complet"];
const PRO = ["Tout le contenu Starter", "Créer sa musique IA et un podcast vidéo", "Concevoir son assistant IA personnel", "Automatiser son processus de production"];

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10, fontSize: 16 }}>
      {items.map((t) => (
        <li key={t} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          <span aria-hidden="true" style={{ flex: "none", width: 7, height: 7, borderRadius: 2, background: color, transform: "translateY(-2px)" }} />
          {t}
        </li>
      ))}
    </ul>
  );
}

const card = { flex: "1 1 380px", borderRadius: 24, overflow: "hidden", display: "grid", gridTemplateRows: "auto 1fr" } as const;
const body = { padding: "clamp(24px,3vw,36px)", display: "grid", gap: 18, alignContent: "start" } as const;
const foot = { display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 14, paddingTop: 18 } as const;
const cta = { minHeight: 48, padding: "0 20px", borderRadius: 999, fontSize: 15 } as const;
const title = { margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 26, letterSpacing: "-0.02em" } as const;
// Visuels carrés recadrés en 16:7 sur toute la largeur de la carte.
const imgSizes = "(max-width: 860px) 100vw, 580px";

/** Formules King of IA : Starter (modules 01 à 05) et Pro (modules 01 à 08). */
export default function Formules() {
  return (
    <section className="bg-w" style={{ padding: "clamp(72px,9vw,120px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 40 }}>
        <div style={{ display: "grid", gap: 18, maxWidth: 700 }}>
          <Eyebrow n="02">Formules</Eyebrow>
          <h2 className="h2">
            Choisissez votre <G c="#7C3AED,#C026D3">niveau d’ambition.</G>
          </h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <article style={{ ...card, border: "1.5px solid rgba(6,182,212,0.5)", background: "#FFFFFF", boxShadow: "0 34px 64px -36px rgba(6,182,212,0.75)" }}>
            <div style={{ position: "relative", aspectRatio: "16/7", background: "#EEF0F6" }}>
              <Image src="/offer-starter.webp" alt="" fill sizes={imgSizes} style={{ objectFit: "cover" }} />
            </div>
            <div style={body}>
              <div style={{ display: "grid", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#525B70" }}>Modules 01 à 05</span>
                <h3 style={title}>
                  King of IA <G c="#0891B2,#7C3AED">Starter</G>
                </h3>
              </div>
              <Bullets items={STARTER} color="#20BFD1" />
              <div style={{ ...foot, borderTop: "1px solid #ECEEF4" }}>
                <span style={{ fontSize: 15, color: "#525B70" }}>Tarif communiqué à l’ouverture</span>
                <PrefillLink
                  href="/formations#liste-attente"
                  formula="starter"
                  aria-label="Être prévenu de l’ouverture de King of IA Starter"
                  className="btn hv-to-grad"
                  style={{ ...cta, background: "#151827", color: "#FFFFFF" }}
                >
                  Être prévenu
                </PrefillLink>
              </div>
            </div>
          </article>

          <article style={{ ...card, background: "#151827", color: "#FFFFFF", boxShadow: "0 0 0 2px rgba(217,70,239,0.55), 0 34px 70px -30px rgba(217,70,239,0.8)" }}>
            <div style={{ position: "relative", aspectRatio: "16/7", background: "#232738" }}>
              <Image src="/offer-pro.webp" alt="" fill sizes={imgSizes} style={{ objectFit: "cover" }} />
            </div>
            <div style={body}>
              <div style={{ display: "grid", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#C9CDDA" }}>Modules 01 à 08</span>
                <h3 style={title}>
                  King of IA <G c="#F0ABFC,#FDA4AF,#FDBA74">Pro</G>
                </h3>
              </div>
              <Bullets items={PRO} color="#FF776B" />
              <div style={{ ...foot, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                <span style={{ fontSize: 15, color: "#C9CDDA" }}>Tarif communiqué à l’ouverture</span>
                <PrefillLink href="/formations#liste-attente" formula="pro" aria-label="Être prévenu de l’ouverture de King of IA Pro" className="btn btn-white hv-mint" style={cta}>
                  Être prévenu
                </PrefillLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
