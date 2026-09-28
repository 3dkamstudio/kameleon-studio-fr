import Link from "next/link";
import Booking from "@/components/coaching/Booking";
import GoogleBooking from "@/components/coaching/GoogleBooking";
import VideoHero from "@/components/ks/VideoHero";
import { FD, G, Sep } from "@/components/ks/ui";
import { pageMeta } from "@/lib/seo";
import { COACHING } from "@/lib/site";

export const metadata = pageMeta({
  title: "Coaching vidéo IA",
  description:
    "Séance individuelle en visioconférence pour lancer, améliorer ou organiser votre production vidéo IA avec le regard de Kaméléon Studio. Demandez un créneau en ligne, confirmation par e-mail sous 24 h.",
  path: "/coaching",
});

const INTRO = [
  ["Pour qui", "Celles et ceux qui produisent eux-mêmes", "#7C3AED,#C026D3", "Créateurs, formateurs, indépendants et équipes qui réalisent ou veulent réaliser leurs vidéos avec l’IA."],
  ["Ce que ça résout", "Un projet qui bloque", "#E11D48,#EA580C", "Des outils qui s’accumulent sans méthode, un rendu qui ne correspond pas à l’intention, un processus trop long."],
  ["Déroulé", "Votre objectif, votre projet réel", "#0891B2,#7C3AED", "Vous décrivez votre objectif à la réservation. La séance se tient en visio, en travaillant directement sur vos contenus."],
  ["Ce que vous en retirez", "Des réponses concrètes", "#16A34A,#0891B2", "Des pistes de travail priorisées et une méthode applicable à vos prochaines productions."],
];

export default function CoachingPage() {
  return (
    <>
      <VideoHero
        id="coaching"
        kame="coaching"
        src="/videos/coaching.mp4"
        position="50% 45%"
        mobilePosition="30% 50%"
        side="right"
        chip={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, background: "rgba(21,24,39,0.86)", color: "#FFFFFF", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#20BFD1" }} />
            Séance en visioconférence
          </span>
        }
      >
        <nav aria-label="Fil d’Ariane" style={{ display: "flex", gap: 8, fontSize: 14, color: "#525B70" }}>
          <Link href="/" style={{ color: "#525B70" }}>
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" style={{ color: "#151827", fontWeight: 600 }}>
            Coaching
          </span>
        </nav>
        <span style={{ display: "inline-flex", width: "fit-content", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "#EFEBFC", fontSize: 13, fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6546D7" }} />
          Coaching individuel · à distance
        </span>
        <h1 className="tw-balance" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(30px,3.6vw,50px)", lineHeight: 1.08, letterSpacing: "-0.035em" }}>
          Avancez sur vos vidéos IA, <G c="#7C3AED,#0891B2,#16A34A">avec le regard du studio.</G>
        </h1>
        <p className="lead" style={{ color: "#3A4155" }}>
          Une séance individuelle en visioconférence, construite autour de votre projet réel : les bons outils, une méthode claire, un rendu à la hauteur de votre intention.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link href="#reserver" className="btn btn-grad hv-grad" style={{ minHeight: 54, padding: "0 28px", borderRadius: 999, fontSize: 16 }}>
            Choisir un créneau
          </Link>
          <Link href="/#studio" className="btn btn-line hv-ink" style={{ minHeight: 54, padding: "0 24px", borderRadius: 999, fontSize: 16 }}>
            Plutôt une production ? Premier échange gratuit
          </Link>
        </div>
      </VideoHero>

      <Sep n="01" label="LE COACHING" bg="w" />
      <section className="bg-w" style={{ position: "relative", padding: "clamp(56px,7vw,96px) 0" }}>
        <div className="ks-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "36px 28px" }}>
          {INTRO.map(([kicker, title, grad, text]) => (
            <div key={kicker} style={{ display: "grid", gap: 12, alignContent: "start", paddingTop: 22, borderTop: "2px solid #151827" }}>
              <span style={{ fontFamily: FD, fontSize: 13, color: "#525B70" }}>{kicker}</span>
              <h2 className="grad-text" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 19, lineHeight: 1.25, backgroundImage: `linear-gradient(90deg,${grad})` }}>
                {title}
              </h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#525B70" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Sep n="02" label="RÉSERVATION" bg="p" />
      {/* Page de réservation Google Agenda si configurée, sinon demande de créneau par e-mail. */}
      {COACHING.googleBookingUrl ? <GoogleBooking url={COACHING.googleBookingUrl} /> : <Booking />}
    </>
  );
}
