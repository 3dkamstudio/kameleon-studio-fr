# Refonte Kaméléon Studio — notes de mise en production

Refonte issue de la maquette Claude Design « Kameleon Studio v6 » (septembre 2026), portée dans le projet Next.js existant.

## Arborescence

| Route | Contenu |
|---|---|
| `/` | Hero + extraits à l’affiche, savoir-faire, 14 réalisations, 3 parcours, références, méthode, tarifs + estimateur, coaching/formations, FAQ, contact (`#studio`) |
| `/prestations` | Univers, tarifs vidéo, tarifs BD, sites web, maintenance |
| `/coaching` | Présentation et demande de séance (`#reserver`) |
| `/formations` | King of IA : programme, formules, liste d’attente (`#liste-attente`) |
| `/mentions-legales` | Conservée, mise à jour (formulaires, Formspree, YouTube) |

Redirections temporaires (`next.config.mjs`) : `/realisations` → `/#realisations`, `/studio` et `/contact` → `/#studio`, `/tarifs` → `/prestations`, `/formation` → `/formations`.

Anciennes ancres de la page unique (`components/home/LegacyAnchors.tsx`) : `#services`, `#tarifs` → `/prestations` ; `#tarifs-video`, `#tarifs-bd`, `#sites-web`, `#maintenance` → sections de `/prestations` ; `#showreel` → `/#realisations` ; `#processus` → `/#methode` ; `#avis` → `/#references` ; `#king-of-ia` → `/formations` ; `#waitlist-form` → `/formations#liste-attente`. `#faq`, `#contact`, `#prestations` existent toujours sur l’accueil.

## Connecté ou non

**Fonctionne réellement**
- Formulaire de contact, demande de coaching (+ changement de créneau et annulation), liste d’attente : envoi Formspree (`xykalpon`), succès affiché seulement après réponse du service.
- Lecteurs YouTube chargés au clic (youtube-nocookie), estimateur vidéo (grille réelle 250 → 200 €, +70 € / 30 s), fuseaux Paris / Martinique avec changements d’heure.

**Non repris de la maquette** : l’« Espace studio » (tableau de gestion de démonstration, données fictives) et les « Notes de refonte » (document interne). Un vrai tableau de gestion demande un outil de réservation et une authentification côté serveur.

## Vidéos, contact direct et réservation

- **Bannières vidéo** : `public/videos/hero.mp4` (accueil), `prestations.mp4`, `coaching.mp4`, `formations.mp4`. Pour en changer, remplacer le fichier en gardant le nom (MP4 H.264, sans son, ≤ 5 Mo idéalement). Chargement après la page, fondu d’apparition, fondu enchaîné à chaque boucle sur ordinateur, pause hors écran, bouton Pause, image fixe si « réduire les animations », rien en mode économie de données.
- **Colonne flottante** (`components/ks/Dock.tsx`) : retour en haut (anneau de progression), WhatsApp (+33 7 62 23 64 91), guide Kame.
- **Coaching, phase 1** : demande de créneau par formulaire, confirmation manuelle par e-mail.
- **Coaching, phase 2** : paiement à la réservation. Option retenue : Cal.com (gratuit, Stripe inclus, synchronisé avec Google Agenda et Google Meet), intégré à la section `#reserver`. Variante sans paiement déjà prête : coller l’adresse d’une page de réservation Google Agenda dans `COACHING.googleBookingUrl`.

## Paramètres à fournir avant d’aller plus loin

- **Coaching** : disponibilités réelles (`COACHING.weekly` dans `lib/site.ts` reprend l’exemple de la maquette : mardi et jeudi 10 h, 14 h, 17 h 30 ; samedi 9 h 30 et 11 h, heure de Paris), jours fermés, intitulés définitifs, durées, tarifs, règles de report et d’annulation, outil de visioconférence. Des tarifs 149 € / 399 € / 590 € existaient sur la branche `refonte-kingofia` : non publiés ici, à confirmer.
- **Formations** : programme final, contenu des formules, validation éventuelle des prix 497 € / 997 € (masqués). Pour ouvrir : `FORMATION_STATUS = "ouverte"` dans `lib/site.ts`.
- **Showreel** de 45 à 60 s (16:9 et 9:16) pour remplacer l’enchaînement de 4 extraits du hero.
- Autorisation d’usage des logos clients ; reconfirmation des tarifs repris du site précédent.
- Image de partage 1200 × 630 dédiée (actuellement `banner-ks.png`, carrée).

## Divergences relevées

- L’offre Pro citait un module 09 alors que 8 modules sont présentés : la page affiche Pro = modules 01 à 08.
- Compteurs « 1 inscrit, 100 places, 53 restantes » supprimés (pas de source fiable).
- « Accès immédiat » remplacé par « Bientôt disponible ».
- `og:url`, sitemap et robots pointaient vers `xn--kamlonstudio-debb.fr` (qui répond 404) : tout pointe désormais vers `https://www.kingofia.fr`.
