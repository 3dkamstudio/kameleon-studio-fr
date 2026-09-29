/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF d'abord (≈ 40 % plus léger que WebP à qualité égale), WebP pour les navigateurs plus anciens.
    formats: ["image/avif", "image/webp"],
    // Images optimisées gardées 7 jours par le navigateur (0 par défaut) ; une image remplacée
    // sous le même nom peut donc rester en cache une semaine chez un visiteur : la renommer si besoin.
    minimumCacheTTL: 604800,
  },
  // Adresses « parlantes » vers les sections de la refonte (temporaires : elles pourront devenir des pages).
  async redirects() {
    return [
      { source: "/realisations", destination: "/#realisations", permanent: false },
      { source: "/studio", destination: "/#studio", permanent: false },
      { source: "/contact", destination: "/#studio", permanent: false },
      { source: "/tarifs", destination: "/prestations", permanent: false },
      { source: "/formation", destination: "/formations", permanent: false },
    ];
  },
  // Vidéos d'arrière-plan : gardées un jour par le navigateur, puis rafraîchies en arrière-plan.
  // (Un fichier remplacé sous le même nom apparaît donc au plus tard le lendemain chez un visiteur déjà venu.)
  async headers() {
    return [{ source: "/videos/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] }];
  },
};

export default nextConfig;
