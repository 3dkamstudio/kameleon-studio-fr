// Dimensions natives des images de /public affichées avec une hauteur automatique
// (next/image en a besoin pour réserver la place et éviter les sauts de mise en page).
export const DIM: Record<string, [number, number]> = {
  "/ks-logo.png": [1000, 1000],
  "/kame-camera-logo.webp": [1500, 1500],
  "/kame-closeup.webp": [1500, 1500],
  "/kame-mentor.webp": [1204, 1263],
  "/kame-professeur.webp": [1280, 1500],
  "/kame-dessinateur.webp": [1329, 1500],
  "/kame-cameraman.png": [1500, 1500],
  "/kame-celebrate.png": [1500, 1500],
  "/kame-services.png": [1500, 1500],
  "/kame-robot.png": [1500, 1500],
  "/kame-scientist.png": [1500, 1500],
  "/kame-cyberpunk.png": [1500, 1500],
  "/kame-web.png": [1500, 1500],
  "/kame-jump.png": [1500, 1500],
  "/kame-welcome.png": [1500, 1500],
  "/logo-paillette-academy.png": [1920, 1080],
  "/logo-blr-conseils.png": [1500, 1500],
  "/logo-gabi.webp": [1500, 1500],
  "/logo-jl-conseils.png": [1500, 1500],
  "/logo-pepites-lylou.png": [1920, 1080],
  "/logo-college-fernand-donatien.png": [1920, 1080],
  "/logo-wkeyselite.png": [1500, 1500],
  "/logo-gommier.png": [1500, 1500],
  "/logo-loulou-panthera.png": [1280, 1280],
};

export const dim = (src: string) => {
  const d = DIM[src] ?? [1500, 1500];
  return { width: d[0], height: d[1] };
};
