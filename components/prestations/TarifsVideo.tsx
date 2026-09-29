import { KameNote } from "@/components/ks/Kame";
import { Aurora, G } from "@/components/ks/ui";
import { VIDEO_EXTRA_30S, VIDEO_GRID, VIDEO_SAVE, eur } from "@/lib/content";
import { GridPanel, Head, OfferCard, Stats } from "./parts";
import PriceTable from "./PriceTable";

const FIRST = VIDEO_GRID[0];
const BEST = VIDEO_GRID[VIDEO_GRID.length - 1];
const MAX = VIDEO_SAVE[VIDEO_SAVE.length - 1];
const EXTRA = `+${VIDEO_EXTRA_30S} € par tranche de 30 s`;

/** Tarifs de la production vidéo : chiffres clés, offre illustrée, grille dégressive. */
export default function TarifsVideo() {
  return (
    <section id="tarifs-video" data-kame="pricingVideo" className="bg-p" style={{ position: "relative", overflow: "clip", padding: "clamp(64px,8vw,112px) 0" }}>
      <Aurora
        px={22}
        blobs={[
          ["rgba(249,115,22,.24)", "min(44vw,600px)", { left: "-10%", top: "10%" }, "ksDrift2", 22],
          ["rgba(244,63,94,.2)", "min(36vw,500px)", { right: "-8%", bottom: "-6%" }, "ksDrift1", 26],
        ]}
      />
      <div className="ks-wrap" style={{ display: "grid", gap: 36 }}>
        <Head
          eyebrow="Tarifs · Production vidéo"
          lead={`Chaque vidéo inclut script, montage premium et voix-off IA professionnelle. Tarif dégressif jusqu’à −${MAX} % dès 10 vidéos.`}
        >
          Des vidéos premium,{" "}
          <G c="#EA580C,#E11D48" block>
            plus vous commandez, moins ça coûte.
          </G>
        </Head>
        <Stats
          items={[
            [eur(FIRST), "Prix de départ", "#FDBA74,#FDA4AF", "#EA580C,#E11D48"],
            [eur(BEST), "Meilleur tarif", "#86EFAC,#67E8F9", "#16A34A,#0891B2"],
            [`−${MAX} %`, "Économie max", "#F0ABFC,#C4B5FD", "#C026D3,#7C3AED"],
            ["7 jours", "Délai de livraison", "#67E8F9,#93C5FD", "#0891B2,#2563EB"],
          ]}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
          <OfferCard
            img="/prest-video.webp"
            alt="Kame sur un plateau de tournage éclairé par des projecteurs colorés"
            glow="rgba(249,115,22,0.55)"
            name="Production"
            accent="Vidéo"
            grad="#FB923C,#F472B6"
            sub="30 s · 16:9 + 9:16 · Montage premium"
            price={FIRST}
            unit="vidéo"
            note={`Dégressif jusqu’à ${eur(BEST)} dès 10 vidéos`}
            check="#FB923C"
            items={[
              "Script et direction artistique inclus",
              "Formats livrés 16:9 et 9:16 (deux déclinaisons)",
              "Voix-off IA professionnelle",
              "Montage premium et ambiances sonores",
              "Livraison en 7 jours ouvrés maximum",
              `${EXTRA} supplémentaire`,
            ]}
            extra={
              <div style={{ padding: "14px 16px", borderRadius: 16, border: "1px solid rgba(251,146,60,0.45)", background: "rgba(251,146,60,0.08)" }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FDBA74" }}>⚡ Durée supplémentaire</span>
                <span style={{ fontSize: 14, color: "#F1F2F7" }}>{EXTRA} ajoutée, par vidéo.</span>
              </div>
            }
            cta="Commander mes vidéos →"
            ctaGrad="linear-gradient(90deg,#C2410C,#BE123C)"
            type="Production vidéo"
          />
          <GridPanel
            line="linear-gradient(90deg,#f97316,#f43f5e,#d946ef)"
            grad="#EA580C,#E11D48"
            desc="Le tarif le plus bas s’applique automatiquement à toutes les vidéos de la commande."
            max={MAX}
            note={
              <>
                Tarif dégressif appliqué automatiquement à <strong>toutes</strong> les vidéos de la commande. Formats plus longs : {EXTRA} supplémentaire, par vidéo. Paiement en deux
                fois : 50 % à la commande, 50 % à la livraison.
              </>
            }
          >
            <PriceTable
              label="Grille tarifaire des vidéos"
              grid={VIDEO_GRID}
              save={VIDEO_SAVE}
              unit="vidéo"
              grad="linear-gradient(135deg,#EA580C,#E11D48)"
              tint="linear-gradient(90deg, rgba(249,115,22,.14), rgba(244,63,94,.06))"
              ink="#C2410C"
              bestBg="#FFEDD5"
              totalGrad="linear-gradient(90deg,#C026D3,#E11D48)"
            />
          </GridPanel>
        </div>
        <KameNote k="pricingVideo" />
      </div>
    </section>
  );
}
