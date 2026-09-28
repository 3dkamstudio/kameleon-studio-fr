import Image from "next/image";
import Link from "next/link";
import { CLIENTS } from "@/lib/content";
import { dim } from "@/lib/images";
import { KameNote } from "@/components/ks/Kame";
import { Eyebrow, G, GlowRing } from "@/components/ks/ui";

/** « Ils nous font confiance » : clients réels, logos autorisés. */
export default function References() {
  return (
    <section id="references" data-kame="testimonials" className="bg-w" style={{ position: "relative", padding: "clamp(72px,9vw,128px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 44 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div style={{ display: "grid", gap: 18, maxWidth: 640 }}>
            <Eyebrow n="03">Références</Eyebrow>
            <h2 className="h2">
              Ils nous font <G c="#7C3AED,#C026D3,#0891B2">confiance.</G>
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 380, fontSize: 16, color: "#525B70" }}>Créateurs, formateurs, établissements scolaires et entreprises, en Martinique et au-delà.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,210px),1fr))", gap: 18 }}>
          {CLIENTS.map((k) => (
            <div
              key={k.name}
              data-glow="1"
              className="hv-up5"
              style={{
                position: "relative",
                display: "grid",
                justifyItems: "center",
                alignContent: "start",
                gap: 14,
                padding: "26px 16px 20px",
                borderRadius: 22,
                textAlign: "center",
                background: `linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(165deg, ${k.c1}, rgba(255,255,255,0) 60%) border-box`,
                border: "1.5px solid transparent",
                boxShadow: `0 24px 46px -32px ${k.glow}`,
                transition: "transform 250ms ease",
              }}
            >
              <GlowRing />
              <span style={{ width: 110, height: 110, borderRadius: "50%", display: "grid", placeItems: "center", background: `radial-gradient(circle, ${k.tint} 0%, #FFFFFF 72%)` }}>
                <Image src={k.logo} alt={"Logo " + k.name} {...dim(k.logo)} sizes="92px" style={{ width: "auto", height: "auto", maxWidth: 92, maxHeight: 92, objectFit: "contain" }} />
              </span>
              <span style={{ display: "grid", gap: 2 }}>
                <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: k.ink }}>{k.name}</span>
                <span style={{ fontSize: 14, color: "#525B70" }}>{k.sector}</span>
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 16px", fontSize: 16, color: "#525B70" }}>
          <span style={{ fontWeight: 600, color: "#151827" }}>Projet présenté :</span>
          <span>Les Pépites de Lylou — collection vidéo chrétienne pour enfants.</span>
          <Link href="/#realisations" style={{ fontWeight: 600 }}>
            Regarder
          </Link>
        </div>
        <KameNote k="testimonials" />
      </div>
    </section>
  );
}
