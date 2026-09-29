import Link from "next/link";
import { LegalBlock, LegalPage } from "@/components/ks/Legal";
import { pageMeta } from "@/lib/seo";
import { COACHING_MODE, CONTACT, LEGAL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Mentions légales",
  description: "Mentions légales, hébergement, propriété intellectuelle et données personnelles de Kaméléon Studio.",
  path: "/mentions-legales",
});

const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;
const paid = COACHING_MODE === "cal";

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" updated="septembre 2026">
      <LegalBlock title="Éditeur du site">
        <p>
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
          <br />
          {LEGAL.vat}.
        </p>
        <p>
          Les conditions de vente des séances de coaching et des prestations figurent dans les <Link href="/cgv">conditions générales de vente</Link>.
        </p>
      </LegalBlock>

      <LegalBlock title="Hébergement">
        <p>
          Ce site est hébergé par Vercel Inc.
          <br />
          440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          <br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
        </p>
      </LegalBlock>

      <LegalBlock title="Propriété intellectuelle">
        <p>
          L’ensemble des contenus présents sur ce site (textes, images, vidéos, animations, logo, mascotte Kame) sont la propriété exclusive de l’éditeur (Kaméléon Studio), sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
        </p>
      </LegalBlock>

      <LegalBlock title="Données personnelles (RGPD)">
        <p>
          Les informations saisies sur le site (demande de production, réservation d’une séance de coaching, liste d’attente des formations) servent uniquement à répondre à votre demande, à exécuter la prestation réservée ou, pour la liste d’attente, à vous prévenir de l’ouverture des formations. Elles ne sont ni revendues ni cédées.
        </p>
        <p>
          Les formulaires sont transmis au studio par l’intermédiaire du service Formspree (Formspree Inc.), qui agit comme sous-traitant technique. Les actualités du studio ne vous sont envoyées que si vous l’avez accepté séparément.
        </p>
        {paid && (
          <p>
            Les séances de coaching se réservent et se paient sur Cal.com (Cal.com, Inc., États-Unis), intégré à la page Coaching : vos informations servent à créer le rendez-vous dans l’agenda du studio, à générer le lien de visioconférence (Google Agenda et Google Meet, Google Ireland Limited) et à vous envoyer la confirmation. Le paiement est traité par Stripe (Stripe Payments Europe, Limited) : le studio n’a jamais accès à vos données de carte bancaire.
          </p>
        )}
        <p>Si vous contactez le studio sur WhatsApp, vos échanges sont traités par WhatsApp (Meta) selon ses propres conditions.</p>
        <p>
          Les données liées à une réservation ou à une commande sont conservées le temps nécessaire à la prestation, puis archivées pendant la durée imposée par les obligations comptables et fiscales. Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition et de suppression de vos données en écrivant à {mail}. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </LegalBlock>

      <LegalBlock title="Cookies et stockage local">
        <p>
          Ce site n’utilise pas de cookies de traçage publicitaire. Les vidéos YouTube ne sont chargées qu’à votre demande, au clic sur le lecteur, en mode de confidentialité renforcée (youtube-nocookie.com) ; YouTube peut alors déposer ses propres cookies selon les paramètres de votre navigateur. Le site mémorise localement, dans votre navigateur, les adresses déjà inscrites à la liste d’attente afin d’éviter les doublons ; cette information n’est pas transmise.
          {paid && " Le calendrier de réservation Cal.com intégré à la page Coaching, ainsi que le module de paiement Stripe, peuvent déposer les cookies nécessaires à leur fonctionnement et à la sécurité des paiements."}
        </p>
      </LegalBlock>

      <LegalBlock title="Limitation de responsabilité">
        <p>
          Kaméléon Studio s’efforce de maintenir les informations de ce site à jour et exactes. Cependant, des erreurs ou omissions peuvent survenir. L’éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l’utilisation du site.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
