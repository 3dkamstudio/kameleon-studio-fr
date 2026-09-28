import Image from "next/image";
import Link from "next/link";
import { FORMATION_STATUS } from "@/lib/site";
import { FD, G, GlowRing, Sparkles } from "@/components/ks/ui";

const open = FORMATION_STATUS === "ouverte";

const THUMBS = [
  ["/module-storytelling.webp", "Storytelling", 0],
  ["/module-motion-design.webp", "Motion design", 14],
  ["/module-animations.webp", "Animations", 0],
  ["/module-montage.webp", "Montage", 14],
] as const;

const card = {
  flex: "1 1 440px",
  position: "relative" as const,
  overflow: "hidden",
  isolation: "isolate" as const,
  borderRadius: 30,
  background: "#0B0A14",
  color: "#FFFFFF",
  padding: "clamp(28px,4vw,48px)",
  display: "grid",
  gap: 20,
  alignContent: "start",
  minHeight: 460,
  transform: "perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
  transition: "transform 400ms ease-out",
};

const pill = (border: string) => ({
  display: "inline-flex",
  width: "fit-content",
  alignItems: "center",
  gap: 8,
  padding: "6px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.1)",
  border: `1px solid ${border}`,
  fontSize: 13,
  fontWeight: 700,
});

/** Invitations au coaching et aux formations, sous les tarifs. */
export default function Teasers() {
  return (
    <section className="bg-w" style={{ position: "relative", padding: "0 0 clamp(72px,9vw,128px)" }}>
      <div className="ks-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <div data-tilt="0.5" data-glow="1" style={{ ...card, boxShadow: "0 50px 100px -50px rgba(124,58,237,0.8)" }}>
          <GlowRing z={3} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -2, background: "radial-gradient(120% 90% at 90% 110%, #7C3AED 0%, #3B0764 42%, #0B0A14 80%), radial-gradient(60% 50% at 0% 0%, rgba(6,182,212,0.25), transparent 70%)" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(420px circle at var(--sx, 70%) var(--sy, 60%), rgba(255,255,255,0.14), transparent 60%)", opacity: "var(--so, 0)", transition: "opacity 300ms" }} />
          <Sparkles n={14} seed={14} />
          <span style={pill("rgba(196,181,253,0.45)")}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#A78BFA", boxShadow: "0 0 10px #A78BFA" }} />
            Coaching individuel · à distance
          </span>
          <h3 className="tw-balance" style={{ margin: 0, maxWidth: 400, fontFamily: FD, fontWeight: 600, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Vous produisez vous-même ? <G c="#C4B5FD,#F0ABFC,#67E8F9">Faites-vous accompagner.</G>
          </h3>
          <p style={{ margin: 0, maxWidth: 360, fontSize: 16, lineHeight: 1.6, color: "#E4E6EE" }}>
            Une séance individuelle pour lancer, améliorer ou organiser votre production vidéo IA. Rien à voir avec le premier échange gratuit, réservé aux demandes de production.
          </p>
          <Link href="/coaching#reserver" className="btn btn-grad hv-up hv-bright" style={{ position: "relative", zIndex: 1, width: "fit-content", minHeight: 52, padding: "0 24px", borderRadius: 999, fontWeight: 700, fontSize: 15 }}>
            Voir les créneaux →
          </Link>
          <Image
            src="/kame-mentor.webp"
            alt=""
            width={1204}
            height={1263}
            sizes="270px"
            style={{
              position: "absolute",
              right: -10,
              bottom: -10,
              width: "min(48%,270px)",
              height: "auto",
              pointerEvents: "none",
              filter: "drop-shadow(0 20px 40px rgba(217,70,239,0.55))",
              transform: "translate3d(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -8px), 0)",
              transition: "transform 1s cubic-bezier(.2,.7,.2,1)",
            }}
          />
        </div>

        <div data-tilt="0.5" data-glow="1" style={{ ...card, boxShadow: "0 50px 100px -50px rgba(244,63,94,0.7)" }}>
          <GlowRing z={3} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -2, background: "radial-gradient(90% 70% at 100% 0%, rgba(249,115,22,0.35), transparent 70%), radial-gradient(80% 70% at 0% 100%, rgba(217,70,239,0.3), transparent 70%)" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(420px circle at var(--sx, 70%) var(--sy, 40%), rgba(255,255,255,0.14), transparent 60%)", opacity: "var(--so, 0)", transition: "opacity 300ms" }} />
          <span style={pill("rgba(253,164,175,0.45)")}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FB7185", boxShadow: "0 0 10px #FB7185" }} />
            Formations IA · {open ? "Inscriptions ouvertes" : "Bientôt disponible"}
          </span>
          <h3 className="tw-balance" style={{ margin: 0, maxWidth: 460, fontFamily: FD, fontWeight: 600, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            King of IA : <G c="#FDBA74,#FB7185,#F0ABFC">apprenez à créer vos vidéos avec l’IA.</G>
          </h3>
          <p style={{ margin: 0, maxWidth: 420, fontSize: 16, lineHeight: 1.6, color: "#E4E6EE" }}>
            Huit modules, du prompt au montage final. {open ? "Les inscriptions sont ouvertes : découvrez le programme." : "Inscrivez-vous à la liste d’attente pour être prévenu de l’ouverture."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10 }}>
            {THUMBS.map(([src, label, y]) => (
              <div
                key={src}
                className="hv-module"
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#1A1830",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.14), 0 18px 30px -18px rgba(0,0,0,0.8)",
                  transform: `translateY(${y}px)`,
                  transition: "transform 400ms cubic-bezier(.2,.7,.2,1)",
                }}
              >
                <Image src={src} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
                <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 8px 8px", background: "linear-gradient(180deg, transparent, rgba(11,10,20,0.9))", fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{label}</span>
              </div>
            ))}
          </div>
          <Link
            href={open ? "/formations#programme" : "/formations#liste-attente"}
            className="btn hv-up hv-bright"
            style={{ width: "fit-content", marginTop: 10, minHeight: 52, padding: "0 24px", borderRadius: 999, backgroundImage: "linear-gradient(90deg,#C2410C,#BE123C)", color: "#FFFFFF", fontWeight: 700, fontSize: 15, boxShadow: "0 14px 30px -14px rgba(244,63,94,0.7)" }}
          >
            {open ? "Découvrir les formations" : "Rejoindre la liste d’attente"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
