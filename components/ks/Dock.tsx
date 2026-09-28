"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/site";
import KameGuide from "./KameGuide";
import { useMotion } from "./motion";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Flèche de retour en haut : apparaît après un écran de défilement, son anneau suit la progression. */
function ScrollTop() {
  const { reduced } = useMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    document.getElementById("contenu")?.focus({ preventScroll: true });
  };

  return (
    <div className="dock-slot">
      <button type="button" className="top-btn" data-show={show} onClick={toTop} aria-label="Remonter en haut de la page" tabIndex={show ? 0 : -1} aria-hidden={!show}>
        <svg className="ring" viewBox="0 0 50 50" aria-hidden="true">
          <defs>
            <linearGradient id="top-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8b5cf6" />
              <stop offset="0.35" stopColor="#06b6d4" />
              <stop offset="0.65" stopColor="#22c55e" />
              <stop offset="1" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <circle className="ring-bg" cx="25" cy="25" r="23" fill="none" strokeWidth="2.5" />
          <circle className="ring-fg" cx="25" cy="25" r="23" fill="none" strokeWidth="2.5" strokeLinecap="round" stroke="url(#top-ring)" />
        </svg>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span className="dock-tip">Haut de page</span>
      </button>
    </div>
  );
}

/** Colonne flottante en bas à droite : retour en haut, WhatsApp et Kame. */
export default function Dock() {
  return (
    <div className="dock">
      <ScrollTop />
      <div className="dock-slot">
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener" className="wa-btn" aria-label={`Écrire au studio sur WhatsApp (${CONTACT.whatsappLabel}, nouvel onglet)`}>
          <WhatsAppIcon />
          <span className="dock-tip">Écrire sur WhatsApp</span>
        </a>
      </div>
      <KameGuide />
    </div>
  );
}
