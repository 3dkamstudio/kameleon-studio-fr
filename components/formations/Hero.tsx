import Link from "next/link";
import VideoHero from "@/components/ks/VideoHero";
import { FD, G } from "@/components/ks/ui";
import { FORMATION_STATUS } from "@/lib/site";

const open = FORMATION_STATUS === "ouverte";

/** En-tête vidéo de /formations : King of IA, statut des inscriptions et accès à la liste d’attente. */
export default function Hero() {
  return (
    <VideoHero id="formations" kame="formations" src="/videos/formations.mp4" position="50% 50%" mobilePosition="16% 50%" side="right">
      <nav aria-label="Fil d’Ariane" style={{ display: "flex", gap: 8, fontSize: 14, color: "#525B70" }}>
        <Link href="/" style={{ color: "#525B70" }}>
          Accueil
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" style={{ color: "#151827", fontWeight: 600 }}>
          Formations
        </span>
      </nav>
      <span
        style={{
          display: "inline-flex",
          width: "fit-content",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          borderRadius: 999,
          background: "#FFF1EF",
          border: "1px solid #FFD3CE",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF776B" }} />
        {open ? "Inscriptions ouvertes" : "Bientôt disponible"}
      </span>
      <h1 className="tw-balance" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(30px,3.7vw,52px)", lineHeight: 1.08, letterSpacing: "-0.035em" }}>
        Apprenez à créer <G c="#EA580C,#E11D48,#C026D3">vos vidéos avec l’IA.</G>
      </h1>
      <p className="lead" style={{ color: "#3A4155" }}>
        King of IA est l’offre de formation de Kaméléon Studio : un parcours en ligne, à suivre à votre rythme, construit à partir des méthodes du studio pour passer du prompt au montage final.
      </p>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#151827" }}>
        {open
          ? "Les inscriptions sont ouvertes. Laissez votre e-mail pour recevoir le détail des formules."
          : "La date d’ouverture n’est pas encore fixée. Inscrivez-vous à la liste d’attente pour être prévenu dès l’ouverture."}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Link href="#liste-attente" className="btn btn-grad hv-grad" style={{ minHeight: 54, padding: "0 28px", borderRadius: 999, fontSize: 16 }}>
          {open ? "Découvrir les formations" : "Rejoindre la liste d’attente"}
        </Link>
        <Link href="#programme" className="btn btn-line hv-ink" style={{ minHeight: 54, padding: "0 24px", borderRadius: 999, fontSize: 16 }}>
          Voir le programme
        </Link>
      </div>
    </VideoHero>
  );
}
