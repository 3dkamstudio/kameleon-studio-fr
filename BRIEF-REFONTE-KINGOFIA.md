# BRIEF DE REFONTE — KINGOFIA.FR

> Ce document est la source de vérité de la refonte. Il complète CLAUDE.md (design system existant).
> En cas de conflit entre ce brief et le code existant, ce brief gagne.
> Travailler PHASE PAR PHASE. Ne jamais enchaîner deux phases sans validation visuelle de Sébastien dans le navigateur.

---

## 0. CONTEXTE

- Fusion de marque : **Kaméléon Studio devient King of IA**. Une seule marque, un seul domaine : `kingofia.fr`.
- Objectif : transformer la landing page unique en **site multi-pages premium** présentant 5 prestations.
- Cible : **indépendants et solopreneurs** (créateurs de contenu, freelances, coachs, consultants). Ils paient de leur poche. Ton du site : "d'indépendant à indépendant".
- Stack existante à conserver : Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
- DA à conserver : fond dark, gradients néon colorés, mascotte 3D **Kame** (caméléon). Évolution : Kame porte désormais une **couronne** (il est le roi de l'IA). Direction : lumineux, futuriste, coloré, premium.

---

## PHASE 1 — MIGRATION DE MARQUE (à faire en premier, avant toute nouvelle page)

1. Remplacer **toutes** les occurrences de "Kaméléon Studio" par "King of IA" : navbar, footer, mentions légales, page contact, metadata (`title`, `description`), `manifest`, alt des images.
2. Corriger les métadonnées Open Graph : `og:url`, `og:site_name`, `canonical` doivent pointer vers `https://kingofia.fr` (elles pointent actuellement vers l'ancien domaine kaméléonstudio).
3. Ajouter dans `next.config.js` des redirects 301 depuis les anciennes ancres si les URLs changent. La redirection domaine kameleonstudio.fr → kingofia.fr se fait côté Vercel/Ionos (hors code) — le signaler à Sébastien, ne pas tenter de le faire dans le code.
4. **Supprimer le compteur de waitlist** ("X créateurs inscrits / places restantes") de la section formation. Ne le remplacer par aucun faux compteur. Si preuve sociale nécessaire : rien tant qu'il n'y a pas de vrais chiffres.
5. **Corriger le module 09 fantôme** : le plan Pro mentionne les "modules exclusifs 06, 07, 08 & 09" alors que seuls 8 modules sont présentés. Aligner le texte du plan Pro sur les modules réellement affichés.
6. Email de contact : remplacer `infos.kamstudio@gmail.com` par `contact@kingofia.fr` partout dans le code (la création de la boîte se fait chez Ionos, hors code — le rappeler à Sébastien).
7. Mettre à jour `CLAUDE.md` : nouveau nom de marque, Kame couronné, architecture multi-pages, teintes par univers (voir Phase 3).

**Validation Phase 1 : Sébastien vérifie dans le navigateur qu'aucune trace de "Kaméléon Studio" ne subsiste, puis commit.**

---

## PHASE 2 — ARCHITECTURE DES ROUTES

Créer la structure App Router suivante :

```
app/
  page.tsx              → Accueil
  video/page.tsx        → Production vidéo IA
  bd/page.tsx           → BD & illustration
  web/page.tsx          → Sites web & landing pages
  formation/page.tsx    → Formation King of IA
  coaching/page.tsx     → Coaching IA
  realisations/page.tsx → Portfolio
  contact/page.tsx      → Contact
```

- **Navbar** : logo King of IA (Kame couronné) à gauche ; dropdown "Prestations" (Vidéo, BD, Web, Formation, Coaching) ; liens Réalisations ; CTA "Devis gratuit" persistant à droite (bouton accentué). Mobile : menu plein écran.
- **Footer** : commun à toutes les pages — liens prestations, mentions légales, WhatsApp `+33762236491`, email `contact@kingofia.fr`.
- Créer un **template de page prestation** réutilisable (composant partagé) avec ces sections dans cet ordre :
  1. Hero — Kame dans une pose dédiée + promesse en une phrase + CTA
  2. Bénéfices (3 max)
  3. Réalisations / exemples de la prestation
  4. Tarifs
  5. FAQ ciblée (4-6 questions)
  6. CTA final
  7. Cross-sell — bloc "Tu pourrais aussi avoir besoin de…" pointant vers 1-2 autres prestations
- Migrer le contenu existant de la landing vers les pages correspondantes. La landing actuelle ne doit rien perdre : tout contenu existant a une nouvelle maison.

**Validation Phase 2 : navigation fonctionnelle entre toutes les pages, même vides. Commit.**

---

## PHASE 3 — CONTENU PAR PAGE

Chaque univers a une **teinte dominante** dérivée de la palette néon existante (le fond reste dark, les gradients restent multicolores, mais la teinte d'accent des titres/CTA/bordures change par page) :

| Page | Teinte dominante | Pose de Kame |
|---|---|---|
| Accueil | gradient complet (arc-en-ciel néon) | Kame roi, couronne, pose majestueuse |
| Vidéo | magenta | Kame cameraman |
| BD | orange/ambre | Kame dessinateur |
| Web | cyan | Kame développeur |
| Formation | violet | Kame professeur |
| Coaching | rose | Kame mentor |

### 3.1 Accueil
- **Règle absolue : zéro tarif sur l'accueil.** Les prix vivent sur les pages prestations.
- Hero : UNE promesse. Proposition : "L'IA au service de ton contenu. Vidéo, BD, web, formation — un seul royaume." (Sébastien valide ou réécrit la formule.)
- 5 portes d'entrée visuelles vers les prestations (cards avec teinte + pose de Kame + une phrase chacune).
- Preuve sociale : logos clients existants + compteurs animés existants.
- Showreel : 1 vidéo teaser max, pas la grille complète (elle va sur /realisations et /video).
- CTA final : diagnostic gratuit 15 min (Calendly).

### 3.2 /video
- Reprendre la grille tarifaire vidéo existante (tarifs dégressifs) sans modification de prix.
- Showreel filtré : uniquement les vidéos.
- FAQ : délais, révisions, formats livrés, droits d'usage.

### 3.3 /bd
- **Ajouter des exemples de planches visibles** (actuellement absents du site — c'est bloquant pour vendre : demander les assets à Sébastien si introuvables dans le repo).
- Reprendre la grille tarifaire BD existante.

### 3.4 /web
Tarification (source de vérité) :

| Offre | Prix |
|---|---|
| Landing page premium (1 page, design sur mesure, animations, responsive, mise en ligne) | 800€ |
| Page supplémentaire | 250€ |

Options :

| Option | Prix |
|---|---|
| Rédaction des textes (copywriting) | 150€/page |
| SEO technique + données structurées | 290€ |
| Blog / CMS | 450€ |
| Version multilingue | 290€/langue |
| Réservation Calendly + paiement Stripe | 190€ |
| Animation 3D mascotte personnalisée | 350€ |
| Maintenance — 2 interventions/mois | 49€/mois |

- Affichage : "à partir de 800€". Ne JAMAIS écrire "maintenance illimitée".
- Présenter les options comme un configurateur visuel (cards cochables ou tableau stylé), pas une liste plate.

### 3.5 /formation
- Reprendre la section King of IA existante (modules, plans Starter/Pro) avec les corrections de la Phase 1 (waitlist supprimée, module 09 corrigé).
- Ajouter la mention : **"Le montant d'une séance de coaching est déductible de l'inscription au plan Pro."**
- Paiement en 2-3 fois à mentionner sur les plans (mise en place Stripe hors code).

### 3.6 /coaching — page à créer entièrement
Positionnement : "D'indépendant à indépendant. Tu viens avec une problématique, tu repars avec une méthode."
Format affiché : visio 1h · enregistrée · replay + fiche récap offerts.

Catalogue (7 séances + sur-mesure), **149€ la séance** :

| Séance | Livrable annoncé |
|---|---|
| ⭐ Ton système de contenu IA (produire 5 posts / 1 vidéo par semaine, seul) | Ton workflow complet documenté |
| Crée ton avatar IA + clone ta voix | Ton avatar fonctionnel, prêt à produire |
| Ta première vidéo IA de A à Z | Une vidéo publiable + le pipeline |
| Storyboard express | Ton script découpé en scènes, prompts prêts |
| Prompts visuels : un style constant | Ta bibliothèque de prompts personnalisée |
| BD & personnages cohérents | Ton personnage récurrent + la méthode |
| Crée ton assistant IA personnalisé | Ton assistant configuré pour ton activité |
| 👑 Sur mesure : ta problématique IA | On la règle ensemble en 1h |

- **"Ton système de contenu IA" est la séance vedette** : card mise en avant visuellement (bordure accentuée, badge "La plus demandée" UNIQUEMENT si c'est vrai un jour — au lancement, badge "Recommandée").
- La card "Sur mesure" porte la couronne (icône), bordure rose.
- Packs : 3 séances 399€ · 5 séances 590€ · paiement en 2-3 fois disponible.
- Passerelle : "Séance déductible de la formation Pro".
- Ligne discrète en bas de page : "Atelier IA pour votre équipe — sur devis" (une phrase, pas une section).
- CTA principal : **"Réserver mon diagnostic gratuit — 15 min"** → Calendly. Sous-texte : "Sans engagement · on identifie ensemble la séance qu'il te faut".
- Le CTA de page ne vend pas la séance, il vend le diagnostic.

### 3.7 /realisations
- Grille portfolio filtrable par univers (Vidéo / BD / Web). Réutiliser les assets existants.

### 3.8 /contact
- Formulaire Formspree existant (`https://formspree.io/f/xykalpon`), Calendly, WhatsApp.

**Validation Phase 3 : page par page, dans cet ordre : coaching → web → accueil → video → bd → formation → realisations → contact. Une page validée dans le navigateur = un commit.**

---

## PHASE 4 — SEO & TECHNIQUE

1. `generateMetadata` unique par page : title (≤60 car.), description (≤155 car.), OG images par univers.
2. `sitemap.ts` et `robots.ts` (App Router natif).
3. JSON-LD : `Organization` (accueil), `Service` (pages prestations), `FAQPage` (là où il y a une FAQ), `Product` avec `offers` (coaching et web).
4. **Lazy-loading des embeds YouTube** : façade (miniature + bouton play), iframe injectée au clic uniquement. La page actuelle charge une dizaine d'iframes — interdit sur le nouveau site.
5. `next/image` avec `sizes` corrects — pas d'images servies en w=3840 sur mobile.
6. Respecter `prefers-reduced-motion` sur toutes les animations Framer Motion.
7. Focus clavier visible sur tous les éléments interactifs.

---

## RÈGLES DE DESIGN (rappels)

- La boldness se dépense à UN endroit par page : le hero avec Kame. Le reste est discipliné — espacements généreux, hiérarchie typographique nette.
- Les effets néon/glow servent la hiérarchie (CTA, card vedette), jamais la décoration gratuite. Si tout brille, rien ne brille.
- Copy : verbes actifs, tutoiement ("Tu viens avec une problématique"), phrases courtes, zéro jargon corporate ("leverage", "seamless" interdits).
- Aucune fausse preuve sociale : pas de faux compteurs, pas de faux témoignages, pas de fausses raretés. Vide vaut mieux que faux.
- Chaque nom d'action reste identique dans tout le flux (un bouton "Réserver mon diagnostic" ne devient pas "Prendre RDV" ailleurs).

---

## MÉTHODE DE TRAVAIL AVEC SÉBASTIEN

- Débutant en code : expliquer chaque étape en une phrase simple avant de l'exécuter.
- **Une phase à la fois, une page à la fois.** Jamais de refonte globale en un seul passage.
- Avant la Phase 1 : créer une branche `refonte-kingofia` et vérifier que `main` est propre.
- Après chaque page validée visuellement : commit avec message clair (`feat: page coaching`).
- Corrections de bugs visuels : chirurgicales et ciblées, jamais de réécriture massive d'un composant qui fonctionne.
- En cas de doute sur un contenu, un prix ou un asset manquant : demander à Sébastien, ne jamais inventer.
