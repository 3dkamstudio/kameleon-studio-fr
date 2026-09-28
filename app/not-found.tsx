import Image from "next/image";
import Link from "next/link";
import { FD, G } from "@/components/ks/ui";

export default function NotFound() {
  return (
    <section data-kame="accueil" className="bg-w" style={{ position: "relative", padding: "clamp(64px,9vw,120px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", justifyItems: "center", textAlign: "center", gap: 22, maxWidth: 720 }}>
        <Image src="/kame-welcome.png" alt="" width={1500} height={1500} sizes="200px" className="kame-float" style={{ width: "clamp(140px,18vw,200px)", height: "auto", filter: "drop-shadow(0 20px 26px rgba(139,92,246,0.3))" }} />
        <span className="ff-d" style={{ fontSize: 13, letterSpacing: "0.12em", color: "#6546D7" }}>
          ERREUR 404
        </span>
        <h1 className="tw-balance" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Cette scène a été coupée <G c="#7C3AED,#C026D3">au montage.</G>
        </h1>
        <p className="lead">La page demandée n’existe pas ou a changé d’adresse avec la nouvelle version du site.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Link href="/" className="btn btn-grad hv-grad" style={{ minHeight: 52, padding: "0 24px", borderRadius: 999, fontSize: 16 }}>
            Retour à l’accueil
          </Link>
          <Link href="/#realisations" className="btn btn-line hv-ink" style={{ minHeight: 52, padding: "0 22px", borderRadius: 999, fontSize: 16 }}>
            Voir les réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
