import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — Kaméléon Studio",
  description: "Mentions légales et informations légales de Kaméléon Studio, auto-entrepreneur.",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen px-6 py-24 text-white" style={{ background: "#0a0a0f" }}>
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors hover:text-white/80"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="mb-10 font-display text-3xl font-black tracking-tight">
          Mentions légales
        </h1>

        <div className="space-y-8 text-sm leading-relaxed text-white/60">

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white/90">
              Éditeur du site
            </h2>
            <p>
              Kaméléon Studio<br />
              Auto-entrepreneur — SIRET en cours d&apos;enregistrement<br />
              Activité : production vidéo, web et contenu créatif par intelligence artificielle<br />
              Email : <a href="mailto:infos.kamstudio@gmail.com" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">infos.kamstudio@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white/90">
              Hébergement
            </h2>
            <p>
              Ce site est hébergé par Vercel Inc.<br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">vercel.com</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white/90">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, vidéos, animations, logo,
              mascotte Kame) sont la propriété exclusive de Kaméléon Studio, sauf mention contraire.
              Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white/90">
              Données personnelles (RGPD)
            </h2>
            <p>
              Les informations collectées via le formulaire de contact (nom, email, message) sont utilisées
              uniquement pour répondre à votre demande. Elles ne sont ni revendues ni transmises à des tiers.
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
              en écrivant à{" "}
              <a href="mailto:infos.kamstudio@gmail.com" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                infos.kamstudio@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white/90">
              Cookies
            </h2>
            <p>
              Ce site n&apos;utilise pas de cookies de traçage publicitaire. Les vidéos YouTube intégrées
              peuvent déposer des cookies tiers selon les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-bold text-white/90">
              Limitation de responsabilité
            </h2>
            <p>
              Kaméléon Studio s&apos;efforce de maintenir les informations de ce site à jour et exactes.
              Cependant, des erreurs ou omissions peuvent survenir. L&apos;éditeur ne saurait être tenu
              responsable des dommages directs ou indirects résultant de l&apos;utilisation du site.
            </p>
          </section>

        </div>

        <p className="mt-14 text-xs text-white/20">
          Dernière mise à jour : juin 2026
        </p>
      </div>
    </main>
  );
}
