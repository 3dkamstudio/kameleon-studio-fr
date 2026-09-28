/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
