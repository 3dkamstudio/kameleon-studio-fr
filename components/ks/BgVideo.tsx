"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./motion";

type Props = {
  src: string;
  /** Cadrage (object-position) sur ordinateur, puis sur mobile. */
  position?: string;
  mobilePosition?: string;
  /** Bannière d'accueil : l'image reste prioritaire, la vidéo se charge après la page. */
  deferUntilLoad?: boolean;
  filter?: string;
};

type Connection = { saveData?: boolean; effectiveType?: string };

// Durée (s) des fondus : apparition de la vidéo et enchaînement de la boucle.
const FADE = 1.2;

/**
 * Vidéo d'ambiance en arrière-plan : muette, en boucle, décorative.
 * - fondu d'apparition au-dessus de l'image ou du fond de la section ;
 * - sur ordinateur, deux lecteurs se relaient pour un fondu enchaîné à chaque boucle ;
 * - lecture seulement à l'écran, pause avec le bouton « Mettre en pause » du site ;
 * - rien n'est chargé en mode économie de données ; image fixe si les animations sont réduites.
 */
export default function BgVideo({ src, position = "50% 50%", mobilePosition, deferUntilLoad, filter }: Props) {
  const { on, reduced } = useMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const engine = useRef({ cur: 0, fading: false, timer: 0 });
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageShown, setPageShown] = useState(true);
  const [dual, setDual] = useState(false);

  // Onglet en arrière-plan : lecture suspendue.
  useEffect(() => {
    const sync = () => setPageShown(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // Charger ou non : pas en économie de données ni en 2G ; après le chargement de la page si demandé.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: Connection }).connection;
    if (conn?.saveData || /2g$/.test(conn?.effectiveType ?? "")) {
      return;
    }
    setDual(window.matchMedia("(min-width: 761px) and (pointer: fine)").matches);
    const arm = () => setArmed(true);
    if (deferUntilLoad && document.readyState !== "complete") {
      window.addEventListener("load", arm, { once: true });
      return () => window.removeEventListener("load", arm);
    }
    arm();
  }, [deferUntilLoad]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) {
      return;
    }
    // Premier état calculé tout de suite (l'observateur peut tarder quand l'onglet n'est pas au premier plan).
    const r = el.getBoundingClientRect();
    setVisible(r.bottom > -160 && r.top < window.innerHeight + 160);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "160px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Lecture, pause et fondu enchaîné.
  useEffect(() => {
    const vids = [aRef.current, bRef.current].filter((v): v is HTMLVideoElement => !!v);
    if (!armed || !vids.length) {
      return;
    }
    vids.forEach((v) => {
      v.muted = true;
      v.defaultMuted = true;
    });
    const st = engine.current;
    const front = vids[st.cur] ?? vids[0];
    const show = (v: HTMLVideoElement) => {
      v.dataset.top = "true";
      v.dataset.on = "true";
    };

    if (!on || !visible || !pageShown) {
      vids.forEach((v) => v.pause());
      // Animations réduites : image fixe tirée de la vidéo, sans lecture.
      if (reduced && front.dataset.on !== "true") {
        const still = () => show(front);
        if (front.readyState >= 2) {
          still();
        } else {
          front.addEventListener("loadeddata", still, { once: true });
          return () => front.removeEventListener("loadeddata", still);
        }
      }
      return;
    }

    // Filet de sécurité : si un fondu enchaîné échoue, le lecteur repart du début.
    const onEnded = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      if (!st.fading && v === vids[st.cur]) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    };
    vids.forEach((v) => v.addEventListener("ended", onEnded));

    // Les promesses de lecture peuvent se résoudre après une pause : on ignore celles d'un cycle terminé.
    let alive = true;
    let raf = 0;
    front
      .play()
      .then(() => {
        if (alive) {
          show(front);
        }
      })
      .catch(() => {
        // Lecture automatique refusée (mode économie d'énergie…) : l'image de fond reste affichée.
      });

    if (dual && vids.length === 2) {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        const v = vids[st.cur];
        const n = vids[1 - st.cur];
        if (st.fading || v.paused || !v.duration || v.duration - v.currentTime > FADE) {
          return;
        }
        st.fading = true;
        n.currentTime = 0;
        n.play()
          .then(() => {
            if (!alive) {
              return;
            }
            // Le lecteur entrant apparaît par-dessus ; le sortant reste visible dessous jusqu'à la fin du fondu.
            v.dataset.top = "false";
            show(n);
            st.timer = window.setTimeout(() => {
              if (!alive) {
                return;
              }
              v.pause();
              v.dataset.on = "false";
              v.currentTime = 0;
              st.cur = 1 - st.cur;
              st.fading = false;
            }, FADE * 1000);
          })
          .catch(() => {
            if (alive) {
              st.fading = false;
            }
          });
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(st.timer);
      vids.forEach((v) => v.removeEventListener("ended", onEnded));
      if (st.fading) {
        // Fondu interrompu : on garde au premier plan le lecteur déjà affiché.
        const v = vids[st.cur];
        const n = vids[1 - st.cur];
        if (n.dataset.on === "true") {
          v.dataset.on = "false";
          v.dataset.top = "false";
          v.currentTime = 0;
          st.cur = 1 - st.cur;
        } else {
          n.currentTime = 0;
        }
        st.fading = false;
      }
      vids.forEach((v) => v.pause());
    };
  }, [armed, visible, pageShown, on, reduced, dual]);

  const vars = { "--vpos": position, "--vpos-m": mobilePosition ?? position, filter } as React.CSSProperties;
  const source = armed ? (reduced ? `${src}#t=0.1` : src) : undefined;

  return (
    <div ref={wrap} aria-hidden="true" className="bgv" style={vars}>
      <video ref={aRef} src={source} muted playsInline loop={!dual} preload={armed ? (reduced ? "metadata" : "auto") : "none"} tabIndex={-1} disablePictureInPicture disableRemotePlayback />
      {dual && <video ref={bRef} src={source} muted playsInline preload={armed && !reduced ? "auto" : "none"} tabIndex={-1} disablePictureInPicture disableRemotePlayback />}
    </div>
  );
}
