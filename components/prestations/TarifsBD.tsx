import { KameNote } from "@/components/ks/Kame";
import { Aurora, G } from "@/components/ks/ui";
import { BD_GRID, BD_SAVE, eur } from "@/lib/content";
import { GridPanel, Head, OfferCard, Stats } from "./parts";
import PriceTable from "./PriceTable";

const FIRST = BD_GRID[0];
const BEST = BD_GRID[BD_GRID.length - 1];
const MAX = BD_SAVE[BD_SAVE.length - 1];
const FORMATS = ["PNG haute résolution", "PDF vectoriel", "Fichiers sources"];

/** Tarifs des planches BD : chiffres clés, grille dégressive, offre illustrée. */
export default function TarifsBD() {
  return (
    <section id="tarifs-bd" data-kame="pricingBD" className="bg-w" style={{ position: "relative", overflow: "clip", padding: "clamp(64px,8vw,112px) 0" }}>
      <Aurora
        px={22}
        blobs={[
          ["rgba(139,92,246,.24)", "min(44vw,600px)", { right: "-10%", top: "8%" }, "ksDrift1", 22],
          ["rgba(6,182,212,.22)", "min(36vw,500px)", { left: "-8%", bottom: "-6%" }, "ksDrift2", 26],
        ]}
      />
      <div className="ks-wrap" style={{ display: "grid", gap: 36 }}>
        <Head
          eyebrow="Tarifs · Planches BD"
          lead={`Chaque planche inclut direction artistique, retouches et droits commerciaux. Tarif dégressif jusqu’à −${MAX} % dès 10 planches.`}
        >
          Des planches qui racontent,{" "}
          <G c="#7C3AED,#0891B2" block>
            à un tarif qui récompense l’ambition.
          </G>
        </Head>
        <Stats
          items={[
            [eur(FIRST), "Prix de départ", "#C4B5FD,#F0ABFC", "#7C3AED,#C026D3"],
            [eur(BEST), "Meilleur tarif", "#86EFAC,#67E8F9", "#16A34A,#0891B2"],
            [`−${MAX} %`, "Économie max", "#F0ABFC,#FDA4AF", "#C026D3,#E11D48"],
            ["2 / pl.", "Retouches", "#67E8F9,#C4B5FD", "#0891B2,#7C3AED"],
          ]}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
          <GridPanel
            line="linear-gradient(90deg,#8b5cf6,#06b6d4,#22c55e)"
            grad="#7C3AED,#0891B2"
            desc="Le tarif le plus bas s’applique automatiquement à toutes les planches commandées."
            max={MAX}
            note={
              <>
                Tarif dégressif appliqué automatiquement à <strong>toutes</strong> les planches de la commande. Paiement en deux fois : 50 % à la commande, 50 % à la livraison.
              </>
            }
          >
            <PriceTable
              label="Grille tarifaire des planches BD"
              grid={BD_GRID}
              save={BD_SAVE}
              unit="planche"
              grad="linear-gradient(135deg,#7C3AED,#0891B2)"
              tint="linear-gradient(90deg, rgba(139,92,246,.14), rgba(6,182,212,.06))"
              ink="#6D28D9"
              bestBg="#F3E8FF"
              totalGrad="linear-gradient(90deg,#0E7490,#6D28D9)"
            />
          </GridPanel>
          <OfferCard
            img="/prest-bd.webp"
            alt="Planche de bande dessinée Kaméléon Studio avec Kame en super-héros"
            glow="rgba(139,92,246,0.55)"
            name="Planches"
            accent="BD"
            grad="#A78BFA,#22D3EE"
            sub="Narration · Identité · Direction artistique"
            price={FIRST}
            unit="planche"
            note={`Dégressif jusqu’à ${eur(BEST)} dès 10 planches`}
            check="#A78BFA"
            items={[
              "Direction artistique unique et cohérente",
              "Style graphique sur mesure selon votre univers",
              "Accompagnement créatif du concept à la livraison",
              "2 retouches incluses par planche commandée",
              "Livraison haute résolution PNG et PDF",
              "Droits d’utilisation commerciale inclus",
            ]}
            extra={
              <div style={{ padding: "14px 16px", borderRadius: 16, border: "1px solid rgba(167,139,250,0.45)", background: "rgba(167,139,250,0.08)", display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4B5FD" }}>Formats de livraison</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {FORMATS.map((f) => (
                    <span key={f} style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, fontWeight: 600 }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            }
            cta="Commander mes planches →"
            ctaGrad="linear-gradient(90deg,#6D28D9,#0E7490)"
            type="Bande dessinée"
          />
        </div>
        <KameNote k="pricingBD" />
      </div>
    </section>
  );
}
