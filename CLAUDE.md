# Projet : Kaméléon Studio — www.kingofia.fr

## Stack
- Next.js 14 (App Router), TypeScript strict, React 18
- Styles : `app/globals.css` (classes partagées, keyframes `ks*`) + styles en ligne repris de la maquette Claude Design
- Tailwind disponible (preflight désactivé : chaque composant pose ses marges)
- Déploiement Vercel : production = branche `main`, prévisualisation = toute autre branche poussée

## Structure
- `app/` : `/` accueil, `/prestations`, `/coaching`, `/formations`, `/mentions-legales`
- `components/ks/` : socle visuel (en-tête, pied de page + bannière finale, fond animé, guide Kame, primitives `ui.tsx`)
- `components/home|prestations|coaching|formations/` : sections de chaque page
- `lib/site.ts` : réglages (domaine, contact, Formspree, statut des formations, disponibilités du coaching)
- `lib/content.ts` : contenus (vidéos, tarifs, FAQ, modules…) — source unique, ne pas dupliquer dans le JSX
- `docs/REFONTE.md` : arborescence, redirections, paramètres encore à fournir

## Design system — « Le studio du futur, en pleine lumière »
- Surfaces claires #FFFFFF / #F7F8FC (≈ 80 %), texte #151827, secondaire #525B70
- Actions : dégradé #7C3AED → #C026D3 (classe `btn-grad`), violet #6546D7
- #20BFD1 et #FF776B : décor et statuts uniquement, jamais de texte sur fond blanc
- Titres Unbounded (`FD`, `--font-display`), texte Instrument Sans (`--font-body`), 16 px minimum sur mobile
- Kame : guide flottant (`KameGuide`) + notes « Kame conseille » (`KameNote`) choisies via l’attribut `data-kame` des sections
- Animations en CSS, figées par `data-motion="off"` (bouton pause du hero) et par `prefers-reduced-motion`

## Formulaires
- Envoi réel via Formspree (`lib/forms.ts`), succès affiché uniquement après réponse du service
- Coaching : demande de créneau, confirmée manuellement par e-mail (aucune réservation automatique)
- Formations : liste d’attente tant que `FORMATION_STATUS = "bientot"` ; prix 497 € / 997 € non publiés

## Conventions
- Composants en PascalCase, pages en kebab-case dans `/app`, mobile-first
- Textes en français avec apostrophes typographiques (’)
- Pas de librairie UI lourde ; objectif Lighthouse > 90
