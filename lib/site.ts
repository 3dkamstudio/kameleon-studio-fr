// Réglages centraux du site : domaine, coordonnées, intégrations, statuts d'offres.
// Modifier ici plutôt que dans les composants.

export const SITE_URL = "https://www.kingofia.fr";
export const SITE_NAME = "Kaméléon Studio";

export const CONTACT = {
  email: "infos.kamstudio@gmail.com",
  whatsappLabel: "+33 7 62 23 64 91",
  whatsappUrl: `https://wa.me/33762236491?text=${encodeURIComponent("Bonjour Kaméléon Studio, je souhaite un devis pour ")}`,
};

// Identité légale de l'éditeur (extrait Kbis). Adresse = domiciliation de l'établissement, jamais le domicile personnel.
export const LEGAL = {
  publisher: "Sebastien Athanase",
  registration: "RCS Paris 933 763 815",
  address: "60 rue François 1er, 75008 Paris",
  // Franchise en base de TVA : mention obligatoire sur les factures, reprise sur le site et dans les CGV.
  vat: "TVA non applicable, art. 293 B du CGI",
  // Médiateur de la consommation (obligatoire pour vendre aux particuliers) : à renseigner après adhésion,
  // par exemple { name: "Nom du médiateur", url: "https://…" }. Affiché dans les CGV.
  mediator: null as { name: string; url: string } | null,
};

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/3d_kamstudio/" },
  { label: "TikTok", href: "https://www.tiktok.com/@3d_kamstudio" },
  { label: "YouTube", href: "https://www.youtube.com/@3Dkamstudio" },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@3Dkamstudio";

// Formulaire Formspree déjà utilisé par le site (contact + liste d'attente).
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykalpon";

// Formations King of IA : "bientot" tant que les inscriptions ne sont pas ouvertes.
// Passer à "ouverte" le jour du lancement : libellés et parcours s'adaptent partout.
export type FormationStatus = "bientot" | "ouverte";
export const FORMATION_STATUS: FormationStatus = "bientot";

// Coaching.
// - "cal" : réservation et paiement en ligne sur Cal.com (Stripe), synchronisés avec Google Agenda et Google Meet.
//   Les formules (intitulé, durée, prix, lien) sont dans `COACHING_OFFERS` (lib/content.ts) :
//   tout changement de prix se fait à la fois là et dans Cal.com.
// - "demande" : les visiteurs envoient une DEMANDE de créneau (Formspree), confirmée ensuite par e-mail ;
//   les réglages de `COACHING` ci-dessous ne servent qu'à ce mode.
export type CoachingMode = "cal" | "demande";
export const COACHING_MODE: CoachingMode = "cal";
// Compte Cal.com du studio et script officiel d'intégration (chargé seulement sur la page Coaching).
export const CAL = { origin: "https://cal.com", user: "3dkamstudio", embedScript: "https://app.cal.com/embed/embed.js" };

export const COACHING = {
  studioTimeZone: "Europe/Paris",
  // Créneaux proposés, en heure de Paris, par jour de semaine (1 = lundi … 7 = dimanche).
  // Exemple repris de la maquette : à remplacer par les disponibilités réelles du studio.
  weekly: {
    2: ["10:00", "14:00", "17:30"],
    4: ["10:00", "14:00", "17:30"],
    6: ["09:30", "11:00"],
  } as Record<number, string[]>,
  // Délai minimum avant une séance (en heures) et horizon de réservation (en semaines).
  minNoticeHours: 24,
  horizonWeeks: 8,
  // Jours fermés, format AAAA-MM-JJ (congés, jours fériés…).
  exceptions: ["2026-11-11", "2026-12-25", "2027-01-01"],
  // Informations affichées dans le récapitulatif tant que durées et tarifs ne sont pas publiés.
  duration: "Précisée dans l’e-mail de confirmation",
  price: "Communiqué avec la confirmation · aucun paiement en ligne",
  rules: "Report ou annulation en répondant à l’e-mail de confirmation",
};
