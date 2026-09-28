import { getImageProps } from "next/image";
import Link from "next/link";
import BgVideo from "@/components/ks/BgVideo";
import { FD, Sparkles } from "@/components/ks/ui";
import HeroPlayer from "./HeroPlayer";

// Espaces insécables : « 7 j » et « 100 % » ne doivent pas se couper.
const STATS = [
  ["Livraison max", "7 j", "#67E8F9,#A78BFA"],
  ["Types de contenus", "7+", "#FDE047,#FB923C"],
  ["Sur mesure", "100 %", "#F0ABFC,#FB7185"],
  ["Compétence requise", "0", "#86EFAC,#67E8F9"],
];

export default function Hero() {
  const common = {
    alt: "Kame, la mascotte du studio, fait jaillir le logo KS entouré de bobines, de claps et de rubans de couleurs",
    sizes: "100vw",
    quality: 78,
    priority: true,
  };
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: "/banner-wide.webp", width: 2752, height: 1536 });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...common, src: "/banner-mobile.webp", width: 1536, height: 2752 });

  return (
    <section id="accueil" data-kame="accueil" style={{ position: "relative", marginTop: -72 }}>
      <div style={{ position: "relative", zIndex: 1, overflow: "hidden", minHeight: "clamp(700px,100vh,980px)", background: "#0B0A14", isolation: "isolate", display: "flex", alignItems: "center" }}>
        {/* Image affichée immédiatement, puis bannière vidéo en fondu une fois la page chargée. */}
        <div className="hero-media">
          <picture style={{ position: "absolute", inset: 0 }}>
            <source media="(max-width: 760px)" srcSet={mobile} />
            <source media="(min-width: 761px)" srcSet={wide} />
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img {...rest} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "64% 50%", display: "block", filter: "saturate(1.35) brightness(1.18) contrast(1.05)" }} />
          </picture>
          <BgVideo src="/videos/hero.mp4" position="62% 50%" mobilePosition="40% 50%" filter="saturate(1.12) brightness(1.06)" deferUntilLoad />
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -2,
            background:
              "linear-gradient(90deg, rgba(9,8,18,0.74) 0%, rgba(9,8,18,0.52) 30%, rgba(9,8,18,0.12) 54%, rgba(9,8,18,0) 68%), radial-gradient(60% 80% at 78% 40%, rgba(217,70,239,0.18), transparent 70%), radial-gradient(50% 60% at 60% 90%, rgba(6,182,212,0.16), transparent 70%)",
          }}
        />
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "clamp(160px,24vh,260px)", zIndex: -1, background: "linear-gradient(180deg, rgba(250,248,255,0) 0%, rgba(250,248,255,0.6) 50%, #FAF8FF 100%)" }} />
        <Sparkles n={30} seed={7} />
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1240,
            margin: "0 auto",
            padding: "clamp(128px,15vh,170px) clamp(20px,4vw,48px) clamp(180px,25vh,270px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div style={{ flex: "1 1 460px", maxWidth: 620, display: "grid", gap: 24, color: "#FFFFFF", textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}>
            <span
              style={{
                display: "inline-flex",
                width: "fit-content",
                alignItems: "center",
                gap: 10,
                padding: "7px 14px 7px 10px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(94,234,212,0.45)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#A5F3FC",
                textShadow: "none",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22D3EE", boxShadow: "0 0 12px #22D3EE" }} />
              Studio créatif propulsé par l’IA
            </span>
            <h1 className="tw-balance" style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontSize: "clamp(34px,4.4vw,60px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
              <span style={{ display: "block" }}>Vos idées prennent vie.</span>
              <span
                className="grad-text"
                style={{
                  display: "block",
                  backgroundImage: "linear-gradient(90deg,#F0ABFC,#FB7185,#FDBA74,#FDE047,#F0ABFC)",
                  backgroundSize: "250% 100%",
                  textShadow: "none",
                  animation: "ksHue 7s ease-in-out infinite alternate",
                }}
              >
                Votre message prend de l’ampleur.
              </span>
            </h1>
            <p className="tw-pretty" style={{ margin: 0, fontSize: "clamp(17px,1.4vw,19px)", lineHeight: 1.6, color: "#E4E6EE" }}>
              Vidéos 3D, contenus pédagogiques et films de marque : Kaméléon Studio transforme vos idées en expériences visuelles grâce à l’IA.{" "}
              <strong style={{ color: "#FFFFFF" }}>Demandez à Kame, il ne ment jamais !</strong>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, textShadow: "none" }}>
              <Link href="/#studio" className="btn btn-grad hv-up hv-bright" style={{ minHeight: 54, padding: "0 28px", borderRadius: 16, fontWeight: 700, fontSize: 16 }}>
                Parler de mon projet →
              </Link>
              <Link
                href="/#realisations"
                className="btn hv-glass"
                style={{
                  gap: 10,
                  minHeight: 54,
                  padding: "0 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#FFFFFF",
                  fontSize: 16,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span aria-hidden="true" style={{ width: 0, height: 0, borderLeft: "10px solid #FFFFFF", borderTop: "6px solid transparent", borderBottom: "6px solid transparent" }} />
                Voir les réalisations
              </Link>
            </div>
            <dl style={{ margin: 0, paddingTop: 8, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,130px),1fr))", gap: 10, textShadow: "none" }}>
              {STATS.map(([label, value, grad]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column-reverse", gap: 2, padding: "12px 14px", borderRadius: 16, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
                  <dt style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#D5D8E3" }}>{label}</dt>
                  <dd className="grad-text" style={{ margin: 0, fontFamily: FD, fontSize: "clamp(24px,2.4vw,32px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, backgroundImage: `linear-gradient(90deg,${grad})` }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroPlayer />
        </div>
      </div>
    </section>
  );
}
