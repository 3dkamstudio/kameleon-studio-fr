"use client";

import { useMotion } from "./motion";

/** Bouton pause/lecture de la vidéo d'en-tête (fige aussi les autres animations du site). */
export default function VideoPause() {
  const { paused, reduced, togglePause } = useMotion();
  if (reduced) {
    return null;
  }
  return (
    <button type="button" className="vhero__ctrl" onClick={togglePause} aria-pressed={paused} aria-label={paused ? "Relancer la vidéo et les animations" : "Mettre en pause la vidéo et les animations"}>
      <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
      {paused ? "Lecture" : "Pause"}
    </button>
  );
}
