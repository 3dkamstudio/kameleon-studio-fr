import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { RAINBOW } from "@/lib/content";
import { NAV } from "@/lib/nav";
import { CONTACT, LEGAL, SOCIALS } from "@/lib/site";
import { Aurora, Brand, FD, G, Sparkles } from "./ui";

const colTitle = (color: string) => ({ fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color });
const footLink = { color: "#151827", textDecoration: "none", fontWeight: 500 };

function CtaFinal() {
  const common = { alt: "Kame filme une scène devant un mur de graffitis colorés", sizes: "(max-width: 1240px) 100vw, 1240px", quality: 78 };
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: "/cta-final-desktop.webp", width: 1920, height: 1080 });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...common, src: "/cta-final-mobile.webp", width: 1536, height: 2752 });

  return (
    <section aria-labelledby="cta-final" className="bg-w" style={{ position: "relative", zIndex: 1, padding: "clamp(40px,5vw,72px) 0 clamp(56px,7vw,96px)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
        <div data-tilt="0.35" style={{ position: "relative", borderRadius: 30, transform: "perspective(1600px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))", transition: "transform 400ms ease-out" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: -2, borderRadius: 32, backgroundImage: RAINBOW, backgroundSize: "300% 100%", animation: "ksHue 8s ease-in-out infinite alternate", zIndex: 0 }}>
            <div style={{ position: "absolute", inset: 12, borderRadius: 32, backgroundImage: RAINBOW, backgroundSize: "300% 100%", filter: "blur(28px)", opacity: 0.45 }} />
          </div>
          <div style={{ position: "relative", zIndex: 1, borderRadius: 28, overflow: "hidden", minHeight: "clamp(460px,44vw,580px)", display: "flex", alignItems: "flex-end", background: "#151827", isolation: "isolate" }}>
            <picture style={{ position: "absolute", inset: 0, zIndex: -2 }}>
              <source media="(max-width: 700px)" srcSet={mobile} />
              <source media="(min-width: 701px)" srcSet={desktop} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img {...rest} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "68% 35%", display: "block", transform: "scale(var(--zoom, 1))", transition: "transform 1200ms cubic-bezier(.2,.7,.2,1)" }} />
            </picture>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(560px circle at var(--sx, 70%) var(--sy, 40%), rgba(255,255,255,0.2), transparent 60%)", opacity: "var(--so, 0)", transition: "opacity 300ms" }} />
            <div
              style={{
                margin: "clamp(14px,3vw,40px)",
                maxWidth: 560,
                padding: "clamp(24px,3.4vw,44px)",
                borderRadius: 22,
                background: "rgba(21,24,39,0.82)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "#FFFFFF",
                display: "grid",
                gap: 18,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D5D8E3" }}>
                <Image src="/ks-logo.png" alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain" }} />
                Studio de création IA
              </span>
              <h2 id="cta-final" className="tw-balance" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.035em" }}>
                Transformez vos idées <G c="#C4B5FD,#67E8F9,#86EFAC,#FDE047,#FDBA74,#F9A8D4">en chef-d’œuvre.</G>
              </h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#D5D8E3" }}>Vidéos, animations 3D, BD, formations IA : confiez votre projet à Kaméléon Studio et voyez la magie opérer.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Link href="/#studio" className="btn btn-white hv-up" style={{ minHeight: 52, padding: "0 24px", borderRadius: 999, fontSize: 16 }}>
                  Parler de mon projet
                </Link>
                <Link href="/#realisations" className="btn hv-white" style={{ minHeight: 52, padding: "0 22px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.5)", color: "#FFFFFF", fontSize: 16 }}>
                  Voir les réalisations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <>
      <CtaFinal />
      <footer style={{ position: "relative", zIndex: 1, overflow: "clip", background: "rgba(247,246,255,0.72)", color: "#151827", padding: "72px 0 28px" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, backgroundImage: RAINBOW, backgroundSize: "300% 100%", animation: "ksHue 10s ease-in-out infinite alternate" }} />
        <Aurora
          px={20}
          blobs={[
            ["rgba(139,92,246,.26)", "min(50vw,700px)", { left: "-10%", bottom: "-30%" }, "ksDrift2", 24],
            ["rgba(244,63,94,.2)", "min(40vw,560px)", { right: "-8%", bottom: "-20%" }, "ksDrift1", 20],
            ["rgba(234,179,8,.2)", "min(30vw,420px)", { left: "40%", top: "-20%" }, "ksDrift3", 22],
          ]}
        />
        <Sparkles n={20} seed={3} />
        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", display: "grid", gap: 44 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 40 }}>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image src="/ks-logo.png" alt="" width={48} height={48} style={{ width: 48, height: 48, objectFit: "contain", margin: "-6px -4px -6px -8px" }} />
                <Brand />
              </span>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#525B70" }}>Production vidéo, bande dessinée et sites web sur mesure, par IA.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className="hv-violet"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: 40,
                      padding: "0 14px",
                      borderRadius: 999,
                      background: "linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(90deg,#8b5cf6,#06b6d4,#f43f5e) border-box",
                      border: "1.5px solid transparent",
                      color: "#151827",
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <nav aria-label="Pied de page" style={{ display: "grid", gap: 10, alignContent: "start", fontSize: 15 }}>
              <span style={colTitle("#7C3AED")}>Navigation</span>
              {NAV.map((n) => (
                <Link key={n.label} href={n.href} className="hv-violet" style={footLink}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div style={{ display: "grid", gap: 10, alignContent: "start", fontSize: 15 }}>
              <span style={colTitle("#0E7490")}>Contact</span>
              <a href={`mailto:${CONTACT.email}`} className="hv-violet" style={footLink}>
                {CONTACT.email}
              </a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener" className="hv-violet" style={footLink}>
                WhatsApp : {CONTACT.whatsappLabel}
              </a>
              <Link href="/#studio" className="hv-violet" style={footLink}>
                Parler de mon projet
              </Link>
              <Link href="/coaching#reserver" className="hv-violet" style={footLink}>
                Réserver un coaching
              </Link>
            </div>
            <div style={{ display: "grid", gap: 10, alignContent: "start", fontSize: 15 }}>
              <span style={colTitle("#BE123C")}>Informations</span>
              <Link href="/mentions-legales" className="hv-violet" style={footLink}>
                Mentions légales
              </Link>
              <Link href="/cgv" className="hv-violet" style={footLink}>
                Conditions générales de vente
              </Link>
              <Link href="/prestations" className="hv-violet" style={footLink}>
                Tarifs et conditions
              </Link>
              <Link href="/formations#liste-attente" className="hv-violet" style={footLink}>
                Liste d’attente King of IA
              </Link>
            </div>
          </div>
          <div aria-hidden="true" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div style={{ minWidth: 0 }}>
              <span
                className="grad-text"
                style={{
                  display: "block",
                  fontFamily: FD,
                  fontWeight: 600,
                  fontSize: "clamp(40px, 10vw, 156px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.055em",
                  paddingBottom: "0.08em",
                  backgroundImage: "linear-gradient(90deg,#7C3AED,#0891B2,#16A34A,#CA8A04,#EA580C,#E11D48,#C026D3,#7C3AED)",
                  backgroundSize: "220% 100%",
                  animation: "ksHue 12s ease-in-out infinite alternate",
                }}
              >
                Kaméléon Studio
              </span>
            </div>
            <Image
              src="/kame-celebrate.png"
              alt=""
              width={1500}
              height={1500}
              sizes="190px"
              style={{ flex: "none", width: "clamp(84px,13vw,190px)", height: "auto", marginBottom: -12, filter: "drop-shadow(0 20px 24px rgba(139,92,246,0.35))" }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, paddingTop: 22, borderTop: "1px solid #E3E6EE", fontSize: 14, color: "#525B70" }}>
            <span>
              © {new Date().getFullYear()} Kaméléon Studio — Tous droits réservés · Prix nets, {LEGAL.vat}
            </span>
            <span>Fait avec soin, et beaucoup de caféine, par Kame.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
