# Projet : King of IA — kingofia.fr

## Stack
- Next.js 14 (App Router)
- TypeScript strict
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- lucide-react (icônes)

## Conventions
- Composants en PascalCase dans /components/sections
- Pages en kebab-case dans /app
- Mobile-first obligatoire

## Marque
- Nom : **King of IA** (anciennement Kaméléon Studio)
- Domaine : `kingofia.fr`
- Email : `contact@kingofia.fr`
- Cible : indépendants et solopreneurs (créateurs, freelances, coachs, consultants)
- Ton : "d'indépendant à indépendant"

## Architecture multi-pages (Phase 2 à venir)
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

## Design system
- Studio de production vidéo/web/BD premium par IA
- Mascotte : **Kame**, caméléon 3D style Pixar semi-réaliste — désormais couronné (il est le roi de l'IA)
- Palette 7 couleurs : fond `#0a0a0f`, accents fuchsia `#d946ef`, rose `#f43f5e`, orange `#f97316`, jaune `#eab308`, vert `#22c55e`, cyan `#06b6d4`, violet `#8b5cf6`
- Style : dark premium, néon, holographique, ambiance studio 3D, lumineux, futuriste, coloré
- Police titres : **Outfit** (600/700/800/900) — `font-display`
- Police texte : **Inter** — `font-sans`
- Animations : Framer Motion uniquement, max 3 types (apparition fadeUp, hover scale, transition de page)
- Motifs visuels : ring lumineux arc-en-ciel, cards holographiques `.card-holo`, halos radiaux, séparateurs `.divider-rainbow`

## Teintes par univers (Phase 3)
| Page | Teinte dominante | Pose de Kame |
|---|---|---|
| Accueil | gradient complet (arc-en-ciel néon) | Kame roi, couronne, pose majestueuse |
| Vidéo | magenta | Kame cameraman |
| BD | orange/ambre | Kame dessinateur |
| Web | cyan | Kame développeur |
| Formation | violet | Kame professeur |
| Coaching | rose | Kame mentor |

## Concept créatif global
Le site entier doit donner l'impression d'entrer dans un studio de production 3D vivant et immersif — ambiance "backstage de studio Pixar/jeu vidéo AAA", colorée, dynamique, premium.

Kame est un GUIDE récurrent présent sur toute la page :
- Poses/réactions différentes selon le contexte
- Toujours en image fixe avec animations CSS/Framer Motion (flottement, apparition, légère rotation au scroll)
- Composant réutilisable /components/ui/Kame.tsx avec prop "pose" ou "context"

## Contraintes
- Lighthouse score > 90
- Pas de librairie UI lourde (MUI, Antd, Bootstrap)
- Toujours valider chaque section/page avant de passer à la suivante
- Aucune fausse preuve sociale (pas de faux compteurs, pas de faux témoignages)
- Copy : tutoiement, verbes actifs, phrases courtes, zéro jargon corporate
- Travailler phase par phase selon BRIEF-REFONTE-KINGOFIA.md
