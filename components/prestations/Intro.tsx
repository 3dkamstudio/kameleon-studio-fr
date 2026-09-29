import Link from "next/link";
import Banners from "@/components/ks/Banners";
import { KameNote } from "@/components/ks/Kame";
import VideoHero from "@/components/ks/VideoHero";
import { Eyebrow, FD, G } from "@/components/ks/ui";

/** Ouverture de la page Prestations : en-tête vidéo, puis les trois univers en affiches. */
export default function Intro() {
  return (
    <>
      <VideoHero id="prestations-page" kame="prestations" src="/videos/prestations.mp4" mobileSrc="/videos/prestations-mobile.mp4" position="50% 50%" mobilePosition="42% 50%" side="right">
        <nav aria-label="Fil d’Ariane" style={{ display: "flex", gap: 8, fontSize: 14, color: "#525B70" }}>
          <Link href="/" style={{ color: "#525B70" }}>
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" style={{ color: "#151827", fontWeight: 600 }}>
            Prestations
          </span>
        </nav>
        <Eyebrow>Nos prestations</Eyebrow>
        <h1 className="tw-balance" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(30px,3.6vw,48px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Trois univers créatifs, <G c="#7C3AED,#0891B2,#16A34A,#CA8A04,#EA580C,#E11D48">une seule vision.</G>
        </h1>
        <p className="lead" style={{ color: "#3A4155" }}>
          Du contenu vidéo qui captive, des planches BD qui racontent, des sites web qui convertissent. Toutes les grilles et conditions, au même endroit.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link href="#tarifs-video" className="btn btn-grad hv-grad" style={{ minHeight: 52, padding: "0 24px", borderRadius: 999, fontSize: 16 }}>
            Voir les tarifs
          </Link>
          <Link href="/#studio" className="btn btn-line hv-ink" style={{ minHeight: 52, padding: "0 22px", borderRadius: 999, fontSize: 16 }}>
            Parler de mon projet
          </Link>
        </div>
      </VideoHero>

      <section data-kame="prestations" className="bg-w" style={{ position: "relative", padding: "clamp(24px,4vw,48px) 0 clamp(56px,7vw,96px)" }}>
        <div className="ks-wrap" style={{ display: "grid", gap: 40 }}>
          <Banners variant="page" />
          <KameNote k="prestations" />
        </div>
      </section>
    </>
  );
}
