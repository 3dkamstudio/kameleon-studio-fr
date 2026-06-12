# Projet : Kaméléon Studio - Landing Page

## Stack
- Next.js 14 (App Router)
- TypeScript strict
- Tailwind CSS + shadcn/ui
- Framer Motion (animations) - à installer
- lucide-react (icônes)

## Conventions
- Composants en PascalCase dans /components/sections
- Pages en kebab-case dans /app
- Mobile-first obligatoire

## Design system
- Studio de production vidéo/web premium par IA
- Mascotte : Kame, un caméléon 3D style Pixar semi-réaliste (queue arc-en-ciel fuchsia→violet)
- Palette 7 couleurs : fond `#0a0a0f`, accents fuchsia `#d946ef`, rose `#f43f5e`, orange `#f97316`, jaune `#eab308`, vert `#22c55e`, cyan `#06b6d4`, violet `#8b5cf6`
- Style : dark premium, néon, holographique, ambiance studio 3D
- Police titres : **Syne** (600/700/800) — `font-display`
- Police texte : **Inter** — `font-sans`
- Animations : Framer Motion uniquement, max 3 types (apparition fadeUp, hover scale, transition de page)
- Motifs visuels : ring lumineux arc-en-ciel, cards holographiques `.card-holo`, halos radiaux, séparateurs `.divider-rainbow`

## Concept créatif global
Le site entier doit donner l'impression d'entrer dans un studio de production 3D vivant et immersif — ambiance "backstage de studio Pixar/jeu vidéo AAA", colorée, dynamique, premium.

Kame (le caméléon, notre mascotte) est un GUIDE récurrent présent sur toute la page :
- Il apparaît à différents moments selon la section (Hero, Services, Tarifs...)
- Il a des poses/réactions différentes selon le contexte (ex : pointe du doigt vers une offre, lève le pouce, regarde une affiche)
- Toujours en image fixe pour l'instant (image fournie), avec animations CSS/Framer Motion (flottement, apparition, légère rotation au scroll)
- Crée un composant réutilisable /components/ui/Kame.tsx avec une prop "pose" ou "context" pour varier son comportement selon la section

Chaque section doit avoir : fond avec dégradés arc-en-ciel/glow animés, sensation de profondeur (cards en perspective, ombres, lumières de studio).

## Contraintes
- Lighthouse score > 90
- Pas de librairie UI lourde (MUI, Antd, Bootstrap)
- Toujours valider chaque section avant de passer à la suivante
- Mascotte/logo disponible, je le fournirai en image
