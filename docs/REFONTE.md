# Refonte Kaméléon Studio — notes de mise en production

Refonte issue de la maquette Claude Design « Kameleon Studio v6 » (septembre 2026), portée dans le projet Next.js existant.

## Arborescence

| Route | Contenu |
|---|---|
| `/` | Hero + extraits à l’affiche, savoir-faire, 14 réalisations, 3 parcours, références, méthode, tarifs + estimateur, coaching/formations, FAQ, contact (`#studio`) |
| `/prestations` | Univers, tarifs vidéo, tarifs BD, sites web, maintenance |
| `/coaching` | Présentation, 3 formules et réservation payante Cal.com (`#reserver`) |
| `/formations` | King of IA : programme, formules, liste d’attente (`#liste-attente`) |
| `/cgv` | Conditions générales de vente (coaching, prestations sur devis, rétractation, médiation) |
| `/mentions-legales` | Conservée, mise à jour (formulaires, Formspree, Cal.com, Stripe, YouTube) |

Redirections temporaires (`next.config.mjs`) : `/realisations` → `/#realisations`, `/studio` et `/contact` → `/#studio`, `/tarifs` → `/prestations`, `/formation` → `/formations`.

Anciennes ancres de la page unique (`components/home/LegacyAnchors.tsx`) : `#services`, `#tarifs` → `/prestations` ; `#tarifs-video`, `#tarifs-bd`, `#sites-web`, `#maintenance` → sections de `/prestations` ; `#showreel` → `/#realisations` ; `#processus` → `/#methode` ; `#avis` → `/#references` ; `#king-of-ia` → `/formations` ; `#waitlist-form` → `/formations#liste-attente`. `#faq`, `#contact`, `#prestations` existent toujours sur l’accueil.

## Connecté ou non

**Fonctionne réellement**
- Formulaire de contact et liste d’attente : envoi Formspree (`xykalpon`), succès affiché seulement après réponse du service.
- Coaching : réservation et paiement Cal.com + Stripe (voir plus bas) ; l’ancienne demande de créneau Formspree reste disponible avec `COACHING_MODE = "demande"`.
- Lecteurs YouTube chargés au clic (youtube-nocookie), estimateur vidéo (grille réelle 250 → 200 €, +70 € / 30 s), fuseaux Paris / Martinique avec changements d’heure.

**Non repris de la maquette** : l’« Espace studio » (tableau de gestion de démonstration, données fictives) et les « Notes de refonte » (document interne). Un vrai tableau de gestion demande un outil de réservation et une authentification côté serveur.

## Vidéos, contact direct et réservation

- **Bannières vidéo** : `public/videos/hero.mp4` (accueil), `prestations.mp4`, `coaching.mp4`, `formations.mp4`, chacune avec une version téléphone `*-mobile.mp4`. Chargement après la page, fondu d’apparition, fondu enchaîné à chaque boucle sur ordinateur, pause hors écran, bouton Pause, image fixe si « réduire les animations », rien en mode économie de données. Cache navigateur : 1 jour.
  - Encodage (29/09/2026, 21 Mo → 5,4 Mo ordinateur / 2,3 Mo téléphone, SSIM ≥ 0,989) : `ffmpeg -i source.mp4 -an -c:v libx264 -preset veryslow -crf 22 -profile:v high -pix_fmt yuv420p -movflags +faststart sortie.mp4` (Formations ramenée de 4K à 2558×1440 avec `-vf scale=2558:1440`).
  - Versions téléphone = recadrage de la zone visible sur mobile : largeur = rapport maximal du cadre × hauteur, décalage x = (largeur source − largeur) × `mobilePosition`. Accueil `crop=810:1080:442:0` (cadres jusqu’à 0,75), Coaching `crop=1080:1080:250:0`, Prestations `crop=944:944:524:0`, Formations `crop=2160:2160:268:0,scale=1080:1080` (cadres jusqu’à 1:1). Même cadrage garanti tant que `mobilePosition` ne change pas ; au-delà du rapport maximal, la vidéo complète est utilisée.
  - Pour remplacer une vidéo : réencoder les deux versions avec ces réglages en gardant les noms, ou changer les noms dans le code (le cache d’un jour peut sinon montrer l’ancienne version aux visiteurs récents).
- **Bannière d’accueil (image)** : AVIF encodés à la main dans `public/hero/` (35 à 40 % plus légers que le WebP de Next, SSIM ≥ 0,98), WebP en secours. Si `banner-mobile.webp` ou `banner-wide.webp` change, réencoder chaque largeur : `ffmpeg -i public/banner-mobile.webp -vf scale=750:-2:flags=lanczos ref.png` puis `ffmpeg -i ref.png -c:v libaom-av1 -still-picture 1 -crf 28 -cpu-used 3 -pix_fmt yuv420p public/hero/banner-mobile-750.avif` (largeurs listées dans `components/home/Hero.tsx`). Cache navigateur : 7 jours, comme les autres images optimisées.
- **Colonne flottante** (`components/ks/Dock.tsx`) : retour en haut (anneau de progression), WhatsApp (+33 7 62 23 64 91), guide Kame.
- **Coaching, phase 1** (28/09/2026) : demande de créneau par formulaire, confirmation manuelle par e-mail.
- **Coaching, phase 2** (29/09/2026) : paiement à la réservation sur Cal.com (compte `3dkamstudio`), relié à Stripe, Google Agenda (infos.kamstudio@gmail.com) et Google Meet ; calendrier intégré dans `#reserver` par le script officiel de Cal.com, chargé à l’approche de la section (`components/coaching/CalBooking.tsx`).
  - Formules (`COACHING_OFFERS`, `lib/content.ts`) : Analyse & cadrage 30 min 50 € (`/cadrage`), Coaching complet 1 h 100 € (`/coaching`), Accompagnement approfondi 2 h 150 € (`/accompagnement`). Un changement de prix se fait dans Cal.com **et** dans ce fichier.
  - Réglages Cal.com : lun–ven 9 h–18 h (Paris), préavis 24 h, réservation jusqu’à 40 jours ouvrés, 15 min de pause après chaque séance, remboursement automatique si annulation au moins 1 jour avant, case d’acceptation des CGV.
  - Retour à la demande sans paiement : `COACHING_MODE = "demande"` dans `lib/site.ts`.

## Paramètres à fournir avant d’aller plus loin

- **Médiateur de la consommation** : obligatoire pour vendre aux particuliers. Après adhésion, renseigner `LEGAL.mediator` dans `lib/site.ts` : les CGV l’affichent automatiquement.
- **Formations** : programme final, contenu des formules, validation éventuelle des prix 497 € / 997 € (masqués). Pour ouvrir : `FORMATION_STATUS = "ouverte"` dans `lib/site.ts`.
- **Showreel** de 45 à 60 s (16:9 et 9:16) pour remplacer l’enchaînement de 4 extraits du hero.
- Autorisation d’usage des logos clients ; reconfirmation des tarifs repris du site précédent.
- Image de partage 1200 × 630 dédiée (actuellement `banner-ks.png`, carrée).

## Divergences relevées

- L’offre Pro citait un module 09 alors que 8 modules sont présentés : la page affiche Pro = modules 01 à 08.
- Compteurs « 1 inscrit, 100 places, 53 restantes » supprimés (pas de source fiable).
- « Accès immédiat » remplacé par « Bientôt disponible ».
- `og:url`, sitemap et robots pointaient vers `xn--kamlonstudio-debb.fr` (qui répond 404) : tout pointe désormais vers `https://www.kingofia.fr`.
