import type { Metadata } from "next";
import { SITE_NAME } from "./site";

export const OG_IMAGE = { url: "/banner-ks.png", width: 1500, height: 1500, alt: "Kaméléon Studio — Production vidéo & web par IA" };

/** Métadonnées d'une page : titre, description, URL canonique et aperçu de partage cohérents. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const full = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "fr_FR", siteName: SITE_NAME, url: path, title: full, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE.url] },
  };
}
