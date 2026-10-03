// Contenus du site : productions, tarifs, offres, FAQ, programme de formation…
// Source unique : les composants lisent ces données, rien n'est dupliqué dans le JSX.

export const PAL = ["#8b5cf6", "#06b6d4", "#22c55e", "#eab308", "#f97316", "#f43f5e", "#d946ef"];
export const RAINBOW = "linear-gradient(90deg, #8b5cf6, #06b6d4, #22c55e, #eab308, #f97316, #f43f5e, #d946ef, #8b5cf6)";

// ── Vidéos ─────────────────────────────────────────────────────────────────
export type VideoCat = "clip" | "animation" | "biblique" | "recette" | "podcast" | "pedagogique" | "prevention" | "professionnel";

// Clip à la une de l'accueil (section « Avant-première »). Pour en changer : remplacer ces données et l'affiche
// dans /public (vignette YouTube 1280 × 720, i.ytimg.com/vi/<id>/maxresdefault.jpg). La vidéo doit rester
// publique ou non répertoriée sur YouTube : une vidéo privée ne se lit plus sur le site.
export const CLIP = {
  id: "xGcvC_PWvRw",
  title: "Corane Birthday",
  kind: "Clip officiel",
  duration: "3 min 35",
  poster: "/clip-corane-birthday.jpg",
  lead: "Notre nouveau clip : 3 min 35 de fête en animation 3D, réalisé par Kaméléon Studio pour l’anniversaire de Corane.",
  desc: "Soleil, danse, fous rires et ambiance explosive : un clip en animation 3D, porté par une mise en scène cinématographique et toute l’énergie de l’entourage de Corane.",
  tags: ["Animations 3D", "Mise en scène cinématographique", "Ambiance Trap & Afrobeat", "De la Martinique à Toulouse"],
  prefill: "Clip personnalisé dans l’esprit de « Corane Birthday » (anniversaire, mariage, événement…) : ",
};

export const VIDEOS: { id: string; title: string; desc: string; cat: VideoCat }[] = [
  { id: CLIP.id, title: "Corane Birthday : le clip d’anniversaire en animation 3D", desc: "Clip officiel : animation 3D, mise en scène cinématographique et ambiance trap et afrobeat, de la Martinique à Toulouse.", cat: "clip" },
  { id: "ZHCLE0t9lII", title: "Indépendance Artificielle (ép. 1) : le podcast 100 % créé avec l’IA", desc: "Premier épisode du podcast Kaméléon Studio : discussions, coulisses et créativité propulsée par l’IA.", cat: "podcast" },
  { id: "SwQSffhe_jk", title: "Indépendance Artificielle (ép. 2) : l’IA nous rend-elle idiots ?", desc: "Nouvel épisode du podcast : sujets créatifs, tendances et production digitale par intelligence artificielle.", cat: "podcast" },
  { id: "-t3_OPVkmhg", title: "Les Pépites de Lylou : une collection chrétienne pour éveiller la foi des enfants", desc: "Histoire biblique mise en animation : narration épique, visuels immersifs, accessible à tous les âges.", cat: "biblique" },
  { id: "0wa3_fb2W48", title: "Madinina – La Course des Yoles | Histoire animée pour enfants", desc: "Série animée inspirée de la Martinique : course de yoles traditionnelles, personnages expressifs, univers coloré.", cat: "animation" },
  { id: "PccRg7wdaR8", title: "Elisabeth, femme obéissante", desc: "Récit biblique illustré et animé : mise en scène soignée, narration profonde et engageante.", cat: "biblique" },
  { id: "OqgyWgUhq60", title: "Lylou prie pour un cœur obéissant", desc: "Animation chrétienne : personnages expressifs, univers visuel fort, message puissant.", cat: "biblique" },
  { id: "KpHhh8-yIis", title: "Madinina – L’île aux Fleurs | Histoire animée pour enfants", desc: "Épisode de la série Madinina : animation HD, univers tropical vibrant, bande sonore sur mesure.", cat: "animation" },
  { id: "TTMo7o30uWw", title: "La reproduction humaine : le cours simple à retenir", desc: "Formation animée en série : apprentissage visuel, contenu structuré et mémorable.", cat: "pedagogique" },
  { id: "oB0K44-0wTo", title: "E2 Bac Pro ASSP : comment construire une AES sans paniquer", desc: "Épisode de formation animée : vulgarisation claire, livré en quelques jours.", cat: "pedagogique" },
  { id: "xN67wvKBaSQ", title: "Noël en Martinique : pain au beurre et chocolat pays", desc: "Tutoriel culinaire animé : rendu professionnel, montage dynamique, voix-off naturelle.", cat: "recette" },
  { id: "35ELXMQqpyw", title: "Galette créole à la crème (Épiphanie) : la recette fondante entre Martinique et Guyane", desc: "Tutoriel culinaire : rendu professionnel, montage dynamique, voix-off naturelle.", cat: "recette" },
  { id: "-S7dSXuEpYo", title: "Vidéo de prévention", desc: "Production audiovisuelle de sensibilisation : message fort, mise en scène soignée.", cat: "prevention" },
  { id: "Nsi9tKNVPP0", title: "BLR Formation", desc: "Vidéo professionnelle de présentation : identité de marque, message clair.", cat: "professionnel" },
  { id: "9YbpZnqSedE", title: "JL Conseils – Gérer les conflits", desc: "Contenu de conseil professionnel : mise en scène soignée, message impactant.", cat: "professionnel" },
];

// [libellé, encre, teinte]
export const CATS: Record<"all" | VideoCat, [string, string, string]> = {
  all: ["Tout voir", "#6D28D9", "#F3E8FF"],
  clip: ["Clip", "#BE185D", "#FCE7F3"],
  animation: ["Dessin animé", "#C2410C", "#FFEDD5"],
  biblique: ["Biblique", "#6D28D9", "#EDE9FE"],
  recette: ["Recette", "#15803D", "#DCFCE7"],
  podcast: ["Podcast", "#0E7490", "#CFFAFE"],
  pedagogique: ["Pédagogique", "#A16207", "#FEF9C3"],
  prevention: ["Prévention", "#BE123C", "#FFE4E6"],
  professionnel: ["Professionnel", "#A21CAF", "#FAE8FF"],
};

// Extraits « À l’affiche » du hero.
export const HERO_CLIPS = [
  { id: CLIP.id, title: "Corane Birthday — Clip officiel", cat: "Nouveau · Clip 3D", accent: "#D946EF" },
  { id: "0wa3_fb2W48", title: "Madinina — La Course des Yoles", cat: "Dessin animé", accent: "#20BFD1" },
  { id: "-t3_OPVkmhg", title: "Les Pépites de Lylou", cat: "Biblique", accent: "#6546D7" },
  { id: "PccRg7wdaR8", title: "Elisabeth, femme obéissante", cat: "Biblique", accent: "#6546D7" },
  { id: "SwQSffhe_jk", title: "Indépendance Artificielle — Épisode 2", cat: "Podcast", accent: "#FF776B" },
];

export const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
export const ytEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`;
export const ytWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

// ── Kame : répliques et poses par section ────────────────────────────────────
export type KameKey =
  | "accueil" | "clip" | "cockpit" | "showreel" | "process" | "prestations" | "pricingVideo" | "pricingBD"
  | "web" | "maintenance" | "testimonials" | "faq" | "contact" | "coaching" | "formations";

export const SPEECH: Record<KameKey, string[]> = {
  accueil: ["Bienvenue dans le studio ! Je suis Kame, je vous guide.", "Nouveau : le clip « Corane Birthday » vous attend juste en dessous !", "Le premier échange est toujours gratuit et sans engagement.", "Lancez un extrait à l’affiche pour voir notre travail."],
  clip: ["Montez le son et passez en plein écran : ce clip se vit !", "Anniversaire, mariage, départ : votre histoire mérite aussi son film.", "Décors, personnages, mise en scène : chaque clip est créé sur mesure."],
  cockpit: ["Vidéo, 3D, voix, BD : tout est fait sur mesure.", "Chaque format est livré en 16:9 et en 9:16."],
  showreel: ["Cliquez sur une production pour la lancer sans quitter la page.", "Chaque vidéo ici a été créée pour un vrai client. La prochaine, c’est la vôtre ?", "Filtrez par univers : dessin animé, podcast, recette, formation…"],
  process: ["Voilà notre méthode : 5 étapes, zéro stress pour vous.", "De l’idée à la livraison, on vous accompagne à chaque étape.", "Vous posez les bases, on s’occupe du reste."],
  prestations: ["Vidéo, BD ou site web : chaque format est pensé pour votre impact.", "Faites varier le nombre de vidéos : le tarif baisse automatiquement.", "Dès 10 vidéos, vous obtenez le meilleur tarif : 200 € par vidéo."],
  pricingVideo: ["Nos tarifs sont transparents : aucune surprise à la livraison.", "Plus de 30 s ? Comptez +70 € par tranche de 30 s, par vidéo.", "Paiement en deux fois : 50 % à la commande, 50 % à la livraison."],
  pricingBD: ["Deux retouches sont incluses pour chaque planche.", "Dès 10 planches, le prix passe à 150 € la planche.", "Vos planches sont livrées en PNG haute résolution et en PDF."],
  web: ["Un site vitrine livré en 2 à 4 jours ouvrés.", "Design 100 % sur mesure : aucun template importé.", "Besoin du paiement en ligne ? L’offre Sur mesure l’inclut."],
  maintenance: ["Votre site mérite un gardien : je veille sur lui chaque mois.", "Sécurisé, à jour, performant : vous dormez, on veille.", "Déjà un site ? Demandez un diagnostic gratuit."],
  testimonials: ["Des créateurs, formateurs et entreprises nous font confiance.", "Rejoignez nos partenaires et donnez vie à votre projet !"],
  faq: ["Une question pas dans la liste ? Écrivez-nous !", "Le premier échange est toujours gratuit et sans engagement."],
  contact: ["Parlez-moi de votre projet : je transmets directement à l’équipe.", "On vous répond sous 24 h.", "Remplissez le formulaire, on prépare déjà votre brief."],
  coaching: ["Vérifiez le fuseau affiché : Paris, Martinique ou ailleurs, les horaires s’adaptent.", "Décrivez votre objectif : la séance sera construite autour de votre projet."],
  formations: ["Inscrivez-vous : je vous préviens dès l’ouverture.", "Huit modules, du prompt au montage final."],
};

export const POSE: Record<KameKey, string> = {
  accueil: "/kame-closeup.webp",
  clip: "/kame-celebrate.png",
  cockpit: "/kame-services.png",
  showreel: "/kame-cameraman.png",
  process: "/kame-robot.png",
  prestations: "/kame-scientist.png",
  pricingVideo: "/kame-cyberpunk.png",
  pricingBD: "/kame-dessinateur.webp",
  web: "/kame-web.png",
  maintenance: "/kame-jump.png",
  testimonials: "/kame-celebrate.png",
  faq: "/kame-welcome.png",
  contact: "/kame-closeup.webp",
  coaching: "/kame-mentor.webp",
  formations: "/kame-professeur.webp",
};

// ── Cockpit : compétences du studio ─────────────────────────────────────────
export type Tile = { n: string; label: string; stat: string; sub: string; c1: string; c2: string; tint: string; ink: string; glow: string };
const T = (n: string, label: string, stat: string, sub: string, c1: string, c2: string, tint: string, ink: string, glow: string): Tile => ({ n, label, stat, sub, c1, c2, tint, ink, glow });
export const TILES_L: Tile[] = [
  T("01", "Vidéos pédagogiques", "7 j", "Livraison max", "#0891B2", "#2563EB", "#E0F7FB", "#0E7490", "rgba(6,182,212,.6)"),
  T("02", "Animation 3D & avatars", "3D·IA", "Animation", "#7C3AED", "#C026D3", "#F3E8FF", "#6D28D9", "rgba(139,92,246,.6)"),
  T("03", "Storytelling & BD", "BD", "Récit visuel", "#E11D48", "#EA580C", "#FFE4E6", "#BE123C", "rgba(244,63,94,.55)"),
  T("04", "Avatar IA & clonage", "IA", "Avatar sur mesure", "#16A34A", "#0891B2", "#DCFCE7", "#15803D", "rgba(34,197,94,.55)"),
];
export const TILES_R: Tile[] = [
  T("05", "Vidéos commerciales", "100 %", "Sur mesure", "#EA580C", "#E11D48", "#FFEDD5", "#C2410C", "rgba(249,115,22,.55)"),
  T("06", "Voix-off & clonage vocal", "Voix", "Clonage IA", "#C026D3", "#7C3AED", "#FAE8FF", "#A21CAF", "rgba(217,70,239,.55)"),
  T("07", "Direction artistique", "DA", "Identité", "#CA8A04", "#EA580C", "#FEF9C3", "#A16207", "rgba(234,179,8,.55)"),
  T("08", "Vidéos généalogiques", "ADN", "Mémoire visuelle", "#2563EB", "#0891B2", "#DBEAFE", "#1D4ED8", "rgba(37,99,235,.5)"),
];

export const MARQUEE_WORDS = ["Vidéos 3D", "Podcasts IA", "Planches BD", "Avatars IA", "Voix-off", "Direction artistique", "Sites web", "Coaching", "Formations IA"];
export const MARQUEE_GRADS = ["#7C3AED,#C026D3", "#0891B2,#7C3AED", "#16A34A,#0891B2", "#EA580C,#E11D48", "#C026D3,#E11D48", "#CA8A04,#EA580C"];

// ── Références clients ─────────────────────────────────────────────────────
const CL = [
  ["#06b6d4", "rgba(6,182,212,.6)", "#E0F7FB", "#0E7490"], ["#8b5cf6", "rgba(139,92,246,.6)", "#F3E8FF", "#6D28D9"],
  ["#eab308", "rgba(234,179,8,.6)", "#FEF9C3", "#A16207"], ["#22c55e", "rgba(34,197,94,.55)", "#DCFCE7", "#15803D"],
  ["#f97316", "rgba(249,115,22,.55)", "#FFEDD5", "#C2410C"], ["#d946ef", "rgba(217,70,239,.55)", "#FAE8FF", "#A21CAF"],
  ["#f43f5e", "rgba(244,63,94,.55)", "#FFE4E6", "#BE123C"], ["#2563EB", "rgba(37,99,235,.5)", "#DBEAFE", "#1D4ED8"],
  ["#0891B2", "rgba(8,145,178,.5)", "#CFFAFE", "#0E7490"],
];
export const CLIENTS = ([
  ["Paillette Academy", "Vidéos pédagogiques", "/logo-paillette-academy.png"],
  ["BLR Conseil Formation", "Conseil & formation", "/logo-blr-conseils.png"],
  ["Les aventures de Gabi", "Littérature jeunesse", "/logo-gabi.webp"],
  ["JL Conseils", "Conseil bien-être", "/logo-jl-conseils.png"],
  ["Les Pépites de Lylou", "Créations chrétiennes", "/logo-pepites-lylou.png"],
  ["Collège Fernand Donatien", "Prévention numérique", "/logo-college-fernand-donatien.png"],
  ["W&KEYSELITE", "Conciergerie", "/logo-wkeyselite.png"],
  ["Gommier", "Partenaire créatif", "/logo-gommier.png"],
  ["Loulou Panthera", "Série animée", "/logo-loulou-panthera.png"],
] as const).map(([name, sector, logo], i) => {
  const c = CL[i % CL.length];
  return { name, sector, logo, c1: c[0], glow: c[1], tint: c[2], ink: c[3] };
});

// ── Méthode ─────────────────────────────────────────────────────────────────
export const STEPS = [
  { n: "01", t: "Brief", d: "Un échange simple sur votre objectif, votre audience et votre ton. Réponse sous 24 h." },
  { n: "02", t: "Script & storyboard", d: "Le studio écrit le script et fixe la direction artistique. Vous validez avant la production." },
  { n: "03", t: "Production", d: "Images 3D, animation, voix-off IA et montage premium avec ambiances sonores." },
  { n: "04", t: "Retours", d: "Vous visionnez la vidéo et indiquez vos ajustements avant la version finale." },
  { n: "05", t: "Livraison", d: "Fichiers finaux en 16:9 et 9:16, livrés sous 7 jours ouvrés maximum." },
];
export const STEP_ACC = ["#8b5cf6", "#d946ef", "#06b6d4", "#22c55e", "#f97316"];
export const STEP_GRAD = ["#C4B5FD,#F0ABFC", "#F0ABFC,#FDA4AF", "#67E8F9,#C4B5FD", "#86EFAC,#67E8F9", "#FDBA74,#FDA4AF"];

// ── Tarifs ─────────────────────────────────────────────────────────────────
// Prix par vidéo (base 30 s) selon la quantité commandée : index 0 = 1 vidéo … index 9 = 10 vidéos et plus.
export const VIDEO_GRID = [250, 240, 235, 230, 225, 220, 215, 210, 205, 200];
export const VIDEO_SAVE = [0, 4, 6, 8, 10, 12, 14, 16, 18, 20];
export const VIDEO_EXTRA_30S = 70;
export const BD_GRID = [190, 185, 182, 178, 175, 170, 167, 163, 157, 150];
export const BD_SAVE = [0, 3, 4, 6, 8, 11, 12, 14, 17, 21];

export const eur = (n: number) => n.toLocaleString("fr-FR") + " €";

export const BANNERS = [
  { n: "01", cat: "Production vidéo", title: "Des vidéos qui captent et qui convertissent.", desc: "Publicités, reels, animations et formations, du script à la livraison en quelques jours.", price: "250 €", unit: "/ vidéo", note: "Dégressif jusqu’à 200 €", img: "/prest-video.png", alt: "Kame filme sur un plateau entouré d’écrans de production", line: "linear-gradient(90deg,#8b5cf6,#06b6d4)", cta: "Voir la grille", href: "/prestations#tarifs-video" },
  { n: "02", cat: "Planches BD", title: "Des histoires qui marquent.", desc: "Direction artistique unique, 2 retouches par planche, droits commerciaux inclus.", price: "190 €", unit: "/ planche", note: "Dégressif jusqu’à 150 €", img: "/prest-bd.png", alt: "Kame dessine une bande dessinée sur une tablette graphique", line: "linear-gradient(90deg,#06b6d4,#22c55e,#eab308)", cta: "Voir la grille", href: "/prestations#tarifs-bd" },
  { n: "03", cat: "Sites web premium", title: "Votre vitrine, taillée pour convertir.", desc: "Site vitrine ou sur mesure, livré en 2 à 8 jours ouvrés, maintenance possible.", price: "800 €", unit: "→ 1 600 €", note: "Vitrine ou site sur mesure", img: "/prest-web.png", alt: "Kame conçoit un site web devant un grand écran", line: "linear-gradient(90deg,#f97316,#f43f5e,#d946ef)", cta: "Voir les offres", href: "/prestations#sites-web" },
];

export const EXTRAS = [
  { n: "01", name: "Planches BD", price: "dès 190 €", detail: "Par planche, dégressif jusqu’à 150 € dès 10 planches. 2 retouches par planche, droits d’utilisation commerciale inclus.", grad: "linear-gradient(135deg,#7C3AED,#0891B2)", acc: "#8b5cf6", href: "/prestations#tarifs-bd" },
  { n: "02", name: "Site vitrine", price: "800 €", detail: "Une page sur mesure, responsive, formulaire et prise de rendez-vous inclus. Livré en 2 à 4 jours ouvrés.", grad: "linear-gradient(135deg,#0891B2,#16A34A)", acc: "#06b6d4", href: "/prestations#sites-web" },
  { n: "03", name: "Site sur mesure", price: "dès 1 600 €", detail: "2 pages incluses (+200 € par page, jusqu’à 5), animations avancées, paiement en ligne. Livré en 5 à 8 jours ouvrés.", grad: "linear-gradient(135deg,#C026D3,#E11D48)", acc: "#d946ef", href: "/prestations#sites-web" },
  { n: "04", name: "Maintenance", price: "49 € ou 79 €/mois", detail: "Landing page ou site complet, engagement 3 mois. Hors forfait : 50 €/h après validation.", grad: "linear-gradient(135deg,#EA580C,#CA8A04)", acc: "#f97316", href: "/prestations#maintenance" },
];

export const INCLUSIONS = [
  "30 s inclus, formats 16:9 et 9:16",
  "Script et direction artistique",
  "Voix-off IA professionnelle",
  "Montage premium et ambiances sonores",
  "Livraison sous 7 jours ouvrés maximum",
  "+70 € par tranche de 30 s supplémentaire",
];

// ── FAQ ────────────────────────────────────────────────────────────────────
export const FAQS = [
  { q: "Comment se déroule une commande ?", a: "Vous décrivez votre projet dans le formulaire. Le studio revient vers vous sous 24 h pour un premier échange gratuit et sans engagement, puis la production démarre après validation." },
  { q: "Quel est le délai de livraison d’une vidéo ?", a: "Chaque vidéo est livrée en 7 jours ouvrés maximum." },
  { q: "Quels formats sont livrés ?", a: "Deux déclinaisons pour chaque vidéo : 16:9 pour YouTube et le web, 9:16 pour les formats verticaux des réseaux sociaux." },
  { q: "Comment se passe le paiement ?", a: "En deux fois : 50 % à la commande, 50 % à la livraison." },
  { q: "Premier échange gratuit ou coaching : quelle différence ?", a: "Le premier échange est gratuit : il sert à cadrer une production confiée au studio. Le coaching est une séance individuelle réservée pour progresser sur vos propres productions." },
];
export const FAQ_GRADS = ["linear-gradient(135deg,#7C3AED,#C026D3)", "linear-gradient(135deg,#0891B2,#7C3AED)", "linear-gradient(135deg,#16A34A,#0891B2)", "linear-gradient(135deg,#EA580C,#E11D48)", "linear-gradient(135deg,#C026D3,#E11D48)"];

// ── Coaching ───────────────────────────────────────────────────────────────
export const SESSIONS = [
  { id: "demarrer", name: "Démarrer la vidéo IA", desc: "Choisir ses outils, comprendre les étapes et lancer un premier projet." },
  { id: "ameliorer", name: "Améliorer un projet", desc: "Retravailler un script, des visuels, une voix ou un montage existant." },
  { id: "organiser", name: "Organiser sa production", desc: "Structurer un processus répétable, du brief à la livraison." },
];

// Formules réservées et payées sur Cal.com : `slug` = fin du lien Cal.com, prix identiques à ceux réglés dans Cal.com.
export const COACHING_OFFERS = [
  { slug: "cadrage", name: "Analyse & cadrage", duration: "30 min", price: 50, desc: "Un échange ciblé pour analyser votre besoin, comprendre votre projet, identifier les bons outils et structurer les prochaines étapes." },
  { slug: "coaching", name: "Coaching complet", duration: "1 h", price: 100, desc: "Une séance complète dédiée à un sujet précis : conseils personnalisés, démonstrations, méthodologie et réponses adaptées à votre projet." },
  { slug: "accompagnement", name: "Accompagnement approfondi", duration: "2 h", price: 150, desc: "Un travail plus complet avec analyse, mise en pratique, configuration des outils et construction d’un workflow directement applicable à votre activité." },
];
export const COACHING_FROM = Math.min(...COACHING_OFFERS.map((o) => o.price));

// ── Formations King of IA ───────────────────────────────────────────────────
export const MODULES = [
  { n: "01", t: "Prompt & storytelling", d: "Transformer une idée en script cinématographique et structurer un récit visuel qui captive.", tools: "ChatGPT · Claude", pro: false, img: "/module-storytelling.webp" },
  { n: "02", t: "Création d’images 3D", d: "Générer des visuels 3D de qualité cinématographique et penser le mouvement dès la création.", tools: "Nano Banana · Genspark · ChatGPT", pro: false, img: "/module-motion-design.webp" },
  { n: "03", t: "Synthèse vocale & timing", d: "Créer des voix-off professionnelles, cloner sa voix et maîtriser le rythme audio.", tools: "ElevenLabs", pro: false, img: "/module-synthese-vocale.webp" },
  { n: "04", t: "Animations & lip-sync", d: "Animer des personnages et synchroniser les lèvres avec la voix.", tools: "Kling AI · Motion control", pro: false, img: "/module-animations.webp" },
  { n: "05", t: "Montage & design final", d: "Assembler, mixer et exporter des vidéos prêtes à diffuser.", tools: "Filmora", pro: false, img: "/module-montage.webp" },
  { n: "06", t: "Création de musique IA", d: "Composer musiques, jingles et ambiances sonores sur mesure.", tools: "Suno · ChatGPT", pro: true, img: "/module-music.webp" },
  { n: "07", t: "Assistant IA personnel", d: "Concevoir des agents IA pour soutenir sa production de contenu.", tools: "GPTs · Claude", pro: true, img: "/module-assistant-ia.webp" },
  { n: "08", t: "Automatisation du workflow", d: "Relier les étapes de production avec des pipelines IA.", tools: "Claude · GPTs", pro: true, img: "/module-workflow-ia.webp" },
];
export const MODULE_GRADS = ["linear-gradient(90deg,#7C3AED,#C026D3)", "linear-gradient(90deg,#0891B2,#7C3AED)", "linear-gradient(90deg,#C026D3,#E11D48)", "linear-gradient(90deg,#16A34A,#0891B2)", "linear-gradient(90deg,#EA580C,#E11D48)", "linear-gradient(90deg,#CA8A04,#EA580C)", "linear-gradient(90deg,#2563EB,#7C3AED)", "linear-gradient(90deg,#E11D48,#C026D3)"];
