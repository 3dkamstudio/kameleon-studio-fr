import Link from "next/link";
import { LegalBlock, LegalPage } from "@/components/ks/Legal";
import { COACHING_OFFERS, eur } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { CONTACT, LEGAL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de Kaméléon Studio : séances de coaching réservées en ligne, prestations sur devis, paiement, annulation, rétractation et médiation.",
  path: "/cgv",
});

const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;

export default function Cgv() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      updated="29 septembre 2026"
      intro={
        <p style={{ margin: 0 }}>
          Les présentes conditions générales de vente (CGV) s’appliquent aux séances de coaching réservées sur le site www.kingofia.fr et aux prestations commandées à Kaméléon Studio sur devis. Toute réservation ou commande vaut acceptation des CGV en vigueur à sa date.
        </p>
      }
    >
      <LegalBlock title="1. Prestataire" id="prestataire">
        <p>
          Kaméléon Studio est le nom commercial de {LEGAL.publisher}, entrepreneur individuel immatriculé au {LEGAL.registration}, établissement domicilié {LEGAL.address}. Contact : {mail}, téléphone et WhatsApp {CONTACT.whatsappLabel}. {LEGAL.vat}.
        </p>
      </LegalBlock>

      <LegalBlock title="2. Séances de coaching : formules et prix" id="coaching">
        <ul>
          {COACHING_OFFERS.map((o) => (
            <li key={o.slug}>
              <strong>
                {o.name} ({o.duration}) : {eur(o.price)}
              </strong>
              . {o.desc}
            </li>
          ))}
        </ul>
        <p>
          Les séances sont individuelles et se déroulent en visioconférence sur Google Meet, à l’horaire réservé. Les prix sont indiqués en euros, nets de taxes ({LEGAL.vat}). Le prix applicable est celui affiché au moment de la réservation.
        </p>
      </LegalBlock>

      <LegalBlock title="3. Réservation et paiement" id="reservation">
        <p>
          La réservation s’effectue sur le calendrier intégré à la page <Link href="/coaching#reserver">Coaching</Link> (service Cal.com) : le client choisit une formule et un créneau, renseigne ses coordonnées, le thème et l’objectif de la séance, accepte les présentes CGV, puis règle le prix par carte bancaire.
        </p>
        <p>
          Le prix est payable en totalité à la réservation. Le paiement est traité de façon sécurisée par Stripe : le studio n’a jamais accès aux données de carte bancaire. La réservation est ferme dès la validation du paiement ; le client reçoit alors par e-mail une confirmation qui récapitule la séance et contient le lien Google Meet ainsi que les liens pour reporter ou annuler. Une facture lui est adressée par e-mail.
        </p>
      </LegalBlock>

      <LegalBlock title="4. Déroulement des séances" id="deroulement">
        <ul>
          <li>Le client se connecte à l’heure prévue avec un équipement adapté (ordinateur, connexion Internet, micro, caméra de préférence) et peut partager son écran et ses contenus.</li>
          <li>En cas de retard du client, la séance se termine à l’heure prévue, sans prolongation ni remboursement. Au-delà de 15 minutes sans nouvelles, la séance est considérée comme non honorée.</li>
          <li>Si le studio annule ou ne peut assurer la séance, il propose un nouveau créneau ou rembourse intégralement le client, au choix de ce dernier.</li>
          <li>Les séances ne sont pas enregistrées, sauf accord exprès des deux parties. Les supports remis pendant une séance sont réservés à l’usage du client et ne peuvent être revendus ni diffusés publiquement sans accord.</li>
          <li>
            Le coaching est une prestation de conseil et d’accompagnement : le studio met en œuvre tous les moyens raisonnables pour aider le client, sans garantie d’un résultat particulier. Le client reste responsable de l’usage qu’il fait des outils tiers (logiciels et services d’intelligence artificielle) et du respect de leurs conditions d’utilisation.
          </li>
        </ul>
      </LegalBlock>

      <LegalBlock title="5. Report, annulation et remboursement" id="annulation">
        <p>
          Le client peut reporter ou annuler sa séance gratuitement jusqu’à 24 heures avant son début, à l’aide des liens figurant dans l’e-mail de confirmation. En cas d’annulation dans ce délai, le prix est intégralement remboursé sur le moyen de paiement utilisé, au plus tard sous 14 jours.
        </p>
        <p>Moins de 24 heures avant la séance, ou en cas d’absence, la séance est due et n’est pas remboursée, sauf cas de force majeure.</p>
      </LegalBlock>

      <LegalBlock title="6. Droit de rétractation" id="retractation">
        <p>
          Le client consommateur dispose d’un délai de 14 jours à compter de la réservation ou de l’acceptation du devis pour se rétracter, sans avoir à se justifier (article L221-18 du Code de la consommation), en adressant une déclaration dénuée d’ambiguïté à {mail} ou le <a href="#formulaire-retractation">formulaire de rétractation</a> ci-dessous. Le remboursement intervient au plus tard 14 jours après réception de la demande, par le même moyen de paiement.
        </p>
        <p>
          Lorsque la séance ou la prestation doit commencer avant la fin de ce délai, le client en fait la demande expresse lors de la réservation ou de la commande. S’il se rétracte après le début de la prestation, il reste redevable d’un montant proportionnel au service déjà fourni (article L221-25). Il perd son droit de rétractation une fois la prestation entièrement exécutée (article L221-28).
        </p>
      </LegalBlock>

      <LegalBlock title="7. Prestations sur devis" id="devis">
        <p>
          Les productions vidéo, planches de bande dessinée, sites web et contrats de maintenance font l’objet d’un devis gratuit. La commande est ferme à l’acceptation écrite du devis (signature ou accord par e-mail) et au versement de l’acompte.
        </p>
        <ul>
          <li>Sauf mention contraire du devis, le paiement s’effectue en deux fois : 50 % à la commande, 50 % à la livraison, avant la remise des fichiers définitifs, par virement ou par lien de paiement sécurisé.</li>
          <li>
            Les délais de livraison, le nombre de retouches incluses et les droits d’utilisation sont ceux indiqués sur le devis et sur la page <Link href="/prestations">Prestations</Link>. Les délais courent à compter de la réception de l’acompte et des éléments nécessaires fournis par le client. Les modifications qui dépassent les retouches incluses font l’objet d’un devis complémentaire.
          </li>
          <li>
            Après paiement intégral, le client peut utiliser les créations livrées pour sa communication, y compris commerciale, dans les limites prévues au devis. Le studio peut citer le projet et en présenter des extraits dans ses références, sauf opposition du client.
          </li>
        </ul>
      </LegalBlock>

      <LegalBlock title="8. Données personnelles" id="donnees">
        <p>
          Les données collectées lors d’une réservation ou d’une commande sont traitées comme décrit dans les <Link href="/mentions-legales">mentions légales</Link>, uniquement pour exécuter la prestation, la facturer et en assurer le suivi.
        </p>
      </LegalBlock>

      <LegalBlock title="9. Réclamations et médiation" id="mediation">
        <p>Toute réclamation est à adresser en priorité au studio, par e-mail à {mail}.</p>
        <p>
          Si la réclamation écrite reste sans solution, le client consommateur peut recourir gratuitement à un médiateur de la consommation (articles L611-1 et suivants du Code de la consommation) :{" "}
          {LEGAL.mediator ? (
            <a href={LEGAL.mediator.url} target="_blank" rel="noopener noreferrer">
              {LEGAL.mediator.name}
            </a>
          ) : (
            "désignation en cours, ses coordonnées seront publiées sur cette page"
          )}
          .
        </p>
      </LegalBlock>

      <LegalBlock title="10. Droit applicable" id="droit">
        <p>
          Les présentes CGV sont soumises au droit français. À défaut de solution amiable, le litige est porté devant la juridiction compétente selon le droit commun ; le client consommateur peut saisir, à son choix, la juridiction du lieu où il demeurait lors de la conclusion du contrat ou de la survenance du fait dommageable.
        </p>
      </LegalBlock>

      <LegalBlock title="Formulaire de rétractation" id="formulaire-retractation">
        <p>(Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.)</p>
        <p>
          À l’attention de Kaméléon Studio, {LEGAL.publisher}, {LEGAL.address}, {CONTACT.email} :
        </p>
        <p>Je vous notifie par la présente ma rétractation du contrat portant sur la prestation de services ci-dessous :</p>
        <ul>
          <li>Prestation et date de réservation ou de commande :</li>
          <li>Nom du consommateur :</li>
          <li>Adresse du consommateur :</li>
          <li>Signature du consommateur (uniquement en cas d’envoi sur papier) :</li>
          <li>Date :</li>
        </ul>
      </LegalBlock>
    </LegalPage>
  );
}
