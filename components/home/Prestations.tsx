import Link from "next/link";
import { EXTRAS } from "@/lib/content";
import Banners from "@/components/ks/Banners";
import { KameNote } from "@/components/ks/Kame";
import { Aurora, Eyebrow, FD, G, GlowRing } from "@/components/ks/ui";
import Estimator from "./Estimator";

/** Prestations & tarifs sur l'accueil : univers, estimateur vidéo, prestations complémentaires. */
export default function Prestations() {
  return (
    <section id="prestations" data-kame="prestations" className="bg-w" style={{ position: "relative", overflow: "clip", padding: "clamp(72px,9vw,128px) 0" }}>
      <Aurora
        px={24}
        blobs={[
          ["rgba(217,70,239,.22)", "min(44vw,600px)", { right: "-12%", top: "-10%" }, "ksDrift2", 24],
          ["rgba(6,182,212,.22)", "min(36vw,480px)", { left: "-10%", top: "18%" }, "ksDrift1", 28],
          ["rgba(234,179,8,.18)", "min(26vw,340px)", { right: "20%", bottom: "-8%" }, "ksDrift3", 20],
        ]}
      />
      <div className="ks-wrap" style={{ display: "grid", gap: 48 }}>
        <div style={{ display: "grid", gap: 18, maxWidth: 760 }}>
          <Eyebrow n="05">Prestations &amp; tarifs</Eyebrow>
          <h2 className="h2">
            Trois univers créatifs, <G c="#7C3AED,#0891B2,#16A34A,#CA8A04,#EA580C,#E11D48,#C026D3">une seule vision.</G>
          </h2>
          <p className="lead">Des vidéos qui captivent, des planches qui racontent, des sites web qui convertissent. Tarifs dégressifs pour les vidéos et les planches BD.</p>
        </div>
        <Banners variant="home" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start" }}>
          <Estimator />
          <div style={{ flex: "1 1 340px", display: "grid", gap: 12, alignContent: "start" }}>
            <h3 style={{ margin: "0 0 6px", fontFamily: FD, fontWeight: 500, fontSize: 22, letterSpacing: "-0.02em" }}>
              Prestations <G c="#7C3AED,#0891B2,#16A34A">complémentaires</G>
            </h3>
            {EXTRAS.map((x) => (
              <Link
                key={x.n}
                href={x.href}
                data-glow="1"
                className="hv-x6"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0,1fr) auto",
                  gap: "4px 14px",
                  alignItems: "center",
                  padding: 18,
                  borderRadius: 20,
                  textDecoration: "none",
                  color: "#151827",
                  background: `linear-gradient(#FFFFFF,#FFFFFF) padding-box, ${x.grad} border-box`,
                  border: "1.5px solid transparent",
                  boxShadow: `0 22px 44px -32px ${x.acc}`,
                  transition: "transform 250ms ease",
                }}
              >
                <GlowRing z={3} />
                <span style={{ gridRow: "span 2", width: 48, height: 48, borderRadius: 14, backgroundImage: x.grad, display: "grid", placeItems: "center", color: "#FFFFFF", fontFamily: FD, fontSize: 13, fontWeight: 600, boxShadow: `0 10px 22px -10px ${x.acc}` }}>{x.n}</span>
                <span style={{ fontSize: 17, fontWeight: 700 }}>{x.name}</span>
                <span className="grad-text" style={{ fontFamily: FD, fontSize: 15, fontWeight: 600, whiteSpace: "nowrap", backgroundImage: x.grad }}>
                  {x.price}
                </span>
                <span style={{ gridColumn: "2 / -1", fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>{x.detail}</span>
              </Link>
            ))}
            <Link href="/#studio" style={{ marginTop: 22, fontWeight: 600, fontSize: 15 }}>
              Demander un devis pour une prestation complémentaire →
            </Link>
            <Link href="/prestations" style={{ marginTop: 10, fontWeight: 700, fontSize: 15, color: "#C026D3" }}>
              Voir toutes les grilles tarifaires →
            </Link>
          </div>
        </div>
        <KameNote k="prestations" />
      </div>
    </section>
  );
}
