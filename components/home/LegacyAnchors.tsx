"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Anciennes ancres de la page unique → nouvel emplacement.
const MOVED: Record<string, string> = {
  services: "/prestations",
  tarifs: "/prestations",
  "tarifs-video": "/prestations#tarifs-video",
  "tarifs-bd": "/prestations#tarifs-bd",
  "sites-web": "/prestations#sites-web",
  maintenance: "/prestations#maintenance",
  showreel: "/#realisations",
  processus: "/#methode",
  avis: "/#references",
  "king-of-ia": "/formations",
  "waitlist-form": "/formations#liste-attente",
};

/** Redirige les liens partagés avant la refonte (ex. kingofia.fr/#tarifs-video). */
export default function LegacyAnchors() {
  const router = useRouter();
  useEffect(() => {
    const target = MOVED[window.location.hash.slice(1)];
    if (target) { router.replace(target); }
  }, [router]);
  return null;
}
