import Link from "next/link";
import type { ReactNode } from "react";
import { FD } from "@/components/ks/ui";
import { pageMeta } from "@/lib/seo";
import { COACHING, CONTACT, LEGAL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Mentions légales",
  description: "Mentions légales, hébergement, propriété intellectuelle et données personnelles de Kaméléon Studio.",
  path: "/mentions-legales",
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "grid", gap: 10, paddingTop: 22, borderTop: "1px solid #E6E8F0" }}>
      <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 19, letterSpacing: "-0.01em" }}>{title}</h2>
      <div style={{ fontSize: 16, lineHeight: 1.65, color: "#525B70" }}>{children}</div>
    </section>
  );
}

const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;

export default function MentionsLegales() {
  return (
    <section className="bg-w" style={{ position: "relative", padding: "clamp(48px,6vw,88px) 0 clamp(64px,8vw,112px)" }}>
      <div className="ks-wrap" style={{ maxWidth: 820, display: "grid", gap: 28 }}>
        <nav aria-label="Fil d’Ariane" style={{ display: "flex", gap: 8, fontSize: 14, color: "#525B70" }}>
          <Link href="/" style={{ color: "#525B70" }}>
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" style={{ color: "#151827", fontWeight: 600 }}>
            Mentions légales
          </span>
        </nav>
        <h1 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>Mentions légales</h1>

        <Block title="Éditeur du site">
          <p style={{ margin: 0 }}>
            Le site est édité par {LEGAL.publisher}, entrepreneur individuel, sous le nom « Kaméléon Studio ».
            <br />
            Immatriculation : {LEGAL.registration}
            <br />
            Adresse : {LEGAL.address}
            <br />
            Téléphone : {CONTACT.whatsappLabel}
            <br />
            E-mail : {mail}
            <br />
            Directeur de la publication : {LEGAL.publisher}
          </p>
        </Block>

        <Block title="Hébergement">
          <p style={{ margin: 0 }}>
            Ce site est hébergé par Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </p>
        </Block>

        <Block title="Propriété intellectuelle">
          <p style={{ margin: 0 }}>
            L’ensemble des contenus présents sur ce site (textes, images, vidéos, animations, logo, mascotte Kame) sont la propriété exclusive de l’éditeur (Kaméléon Studio), sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </Block>

        <Block title="Données personnelles (RGPD)">
          <p style={{ margin: "0 0 10px" }}>
            Les informations saisies dans les formulaires du site (demande de production, demande de séance de coaching, liste d’attente des formations) servent uniquement à répondre à votre demande ou, pour la liste d’attente, à vous prévenir de l’ouverture des formations. Elles ne sont ni revendues ni cédées.
          </p>
          <p style={{ margin: "0 0 10px" }}>
            Les formulaires sont transmis au studio par l’intermédiaire du service Formspree (Formspree Inc.), qui agit comme sous-traitant technique. Les actualités du studio ne vous sont envoyées que si vous l’avez accepté séparément.
          </p>
          {COACHING.googleBookingUrl && (
            <p style={{ margin: "0 0 10px" }}>
              Les séances de coaching se réservent sur la page de réservation Google Agenda du studio (Google Ireland Limited) : les informations saisies servent à créer le rendez-vous, à vous envoyer la confirmation et le lien de visioconférence.
            </p>
          )}
          <p style={{ margin: "0 0 10px" }}>Si vous contactez le studio sur WhatsApp, vos échanges sont traités par WhatsApp (Meta) selon ses propres conditions.</p>
          <p style={{ margin: 0 }}>Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition et de suppression de vos données en écrivant à {mail}.</p>
        </Block>

        <Block title="Cookies et stockage local">
          <p style={{ margin: 0 }}>
            Ce site n’utilise pas de cookies de traçage publicitaire. Les vidéos YouTube ne sont chargées qu’à votre demande, au clic sur le lecteur, en mode de confidentialité renforcée (youtube-nocookie.com) ; YouTube peut alors déposer ses propres cookies selon les paramètres de votre navigateur. Le site mémorise localement, dans votre navigateur, les adresses déjà inscrites à la liste d’attente afin d’éviter les doublons ; cette information n’est pas transmise.
            {COACHING.googleBookingUrl && " La page de réservation Google Agenda intégrée à la page Coaching peut déposer des cookies Google."}
          </p>
        </Block>

        <Block title="Limitation de responsabilité">
          <p style={{ margin: 0 }}>
            Kaméléon Studio s’efforce de maintenir les informations de ce site à jour et exactes. Cependant, des erreurs ou omissions peuvent survenir. L’éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l’utilisation du site.
          </p>
        </Block>

        <p style={{ margin: "14px 0 0", fontSize: 14, color: "#525B70" }}>Dernière mise à jour : septembre 2026</p>
      </div>
    </section>
  );
}
