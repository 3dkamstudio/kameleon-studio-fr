import type { ReactNode } from "react";
import BgVideo from "./BgVideo";
import { Aurora } from "./ui";
import VideoPause from "./VideoPause";

type Props = {
  id: string;
  kame: string;
  src: string;
  /** Cadrage de la vidéo (object-position) sur ordinateur et sur mobile. */
  position?: string;
  mobilePosition?: string;
  /** Côté du bloc de texte sur ordinateur : on le place là où la vidéo a le moins de sujets. */
  side?: "left" | "right";
  /** Élément posé sur la vidéo, côté opposé au texte (ordinateur uniquement). */
  chip?: ReactNode;
  children: ReactNode;
};

/**
 * En-tête de page en vidéo plein cadre : le texte repose en bas sur un fondu vers la page.
 * Sur mobile, la vidéo devient une bande cadrée sur le sujet, le texte chevauche son fondu.
 */
export default function VideoHero({ id, kame, src, position, mobilePosition, side = "left", chip, children }: Props) {
  const right = side === "right";
  return (
    <section id={id} data-kame={kame} className="vhero bg-w">
      <div className="vhero__media">
        <Aurora
          px={20}
          blobs={[
            ["rgba(139,92,246,.26)", "min(46vw,620px)", { left: "-8%", top: "-12%" }, "ksDrift1", 20],
            ["rgba(6,182,212,.22)", "min(36vw,480px)", { right: "-6%", top: "10%" }, "ksDrift2", 24],
            ["rgba(249,115,22,.18)", "min(30vw,420px)", { left: "30%", bottom: "-14%" }, "ksDrift3", 18],
          ]}
        />
        {/* La vidéo se charge après la page : titres et boutons s'affichent d'abord. */}
        <BgVideo src={src} position={position} mobilePosition={mobilePosition} deferUntilLoad />
      </div>
      <div aria-hidden="true" className="vhero__shade" />
      <VideoPause />
      {chip && <div className={`vhero__chip${right ? " vhero__chip--left" : ""}`}>{chip}</div>}
      <div className="vhero__content" style={{ display: "flex", justifyContent: right ? "flex-end" : "flex-start" }}>
        {/* Panneau en verre dépoli : texte toujours lisible, la vidéo reste visible autour. */}
        <div className="vhero__panel">{children}</div>
      </div>
    </section>
  );
}
