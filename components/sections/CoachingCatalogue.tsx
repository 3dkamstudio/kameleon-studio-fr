import Link from "next/link";
import {
  ArrowRight, Crown, Star, Workflow, Mic, Clapperboard,
  LayoutList, Palette, BookOpen, Bot, GraduationCap,
} from "lucide-react";

const ROSE = "#f43f5e";

// ── Catalogue — 7 séances + sur-mesure, 149€ la séance — composant serveur ─────
const SEANCE_VEDETTE = {
  icon: Workflow,
  title: "Ton système de contenu IA",
  desc: "Produire 5 posts et 1 vidéo par semaine, seul.",
  livrable: "Ton workflow complet documenté",
} as const;

const SEANCES = [
  {
    icon: Mic,
    title: "Crée ton avatar IA + clone ta voix",
    livrable: "Ton avatar fonctionnel, prêt à produire",
  },
  {
    icon: Clapperboard,
    title: "Ta première vidéo IA de A à Z",
    livrable: "Une vidéo publiable + le pipeline",
  },
  {
    icon: LayoutList,
    title: "Storyboard express",
    livrable: "Ton script découpé en scènes, prompts prêts",
  },
  {
    icon: Palette,
    title: "Prompts visuels : un style constant",
    livrable: "Ta bibliothèque de prompts personnalisée",
  },
  {
    icon: BookOpen,
    title: "BD & personnages cohérents",
    livrable: "Ton personnage récurrent + la méthode",
  },
  {
    icon: Bot,
    title: "Crée ton assistant IA personnalisé",
    livrable: "Ton assistant configuré pour ton activité",
  },
  {
    icon: Crown,
    title: "Sur mesure : ta problématique IA",
    livrable: "On la règle ensemble en 1h",
    surMesure: true,
  },
] as const;

const PACKS = [
  { qty: "1 séance",  price: "149€" },
  { qty: "3 séances", price: "399€" },
  { qty: "5 séances", price: "590€" },
] as const;

export default function CoachingCatalogue() {
  return (
    <section id="catalogue" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">

        {/* ══ BANDEAU PRIX — le prix vit au point de décision ═══════════════ */}
        <div className="mb-12 flex flex-col items-center gap-2 text-center">
          <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
            Le catalogue des séances.
          </h2>
          <p className="text-lg font-bold" style={{ color: ROSE }}>
            149€ la séance
          </p>
          <p className="text-sm text-white/40">
            Visio 1h · enregistrée · replay + fiche récap offerts
          </p>
        </div>

        {/* ══ CARD VEDETTE — pleine largeur, seul glow permanent de la page ═ */}
        <div className="relative mb-6">
          <div className="absolute -top-3.5 left-6 z-10">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-widest text-white"
              style={{ background: `linear-gradient(135deg, ${ROSE}, #d946ef)`, boxShadow: `0 0 20px ${ROSE}66` }}
            >
              <Star className="h-3 w-3 fill-current" />
              Recommandée
            </span>
          </div>
          <div
            className="flex flex-col gap-4 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            style={{
              background: "rgba(244,63,94,0.05)",
              border: `2px solid ${ROSE}55`,
              boxShadow: `0 0 45px ${ROSE}1f`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${ROSE}1a` }}>
                <SEANCE_VEDETTE.icon className="h-6 w-6" style={{ color: ROSE }} />
              </div>
              <div>
                <h3 className="mb-1 font-display text-xl font-black text-white sm:text-2xl">
                  {SEANCE_VEDETTE.title}
                </h3>
                <p className="mb-2 text-sm text-white/55">{SEANCE_VEDETTE.desc}</p>
                <p className="text-sm font-semibold" style={{ color: ROSE }}>
                  Tu repars avec : {SEANCE_VEDETTE.livrable}
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="btn-hover group inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-6 py-3.5 text-sm font-black text-white sm:self-center"
              style={{ background: `linear-gradient(135deg, ${ROSE}, #d946ef)`, boxShadow: `0 4px 24px ${ROSE}55` }}
            >
              Réserver mon diagnostic gratuit
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ══ GRILLE — 7 autres séances, discipline ═════════════════════════ */}
        <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SEANCES.map(({ icon: Icon, title, livrable, ...rest }) => {
            const surMesure = "surMesure" in rest;
            return (
              <div
                key={title}
                className="card-hover flex h-full flex-col rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: surMesure ? `1.5px solid ${ROSE}60` : "1px solid rgba(255,255,255,0.08)",
                  "--tint-border": `${ROSE}70`,
                  "--tint-glow": `${ROSE}1a`,
                } as React.CSSProperties}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${ROSE}14` }}>
                  <Icon className="h-5 w-5" style={{ color: ROSE }} />
                </div>
                <h3 className="mb-2 font-display text-base font-black leading-snug text-white">
                  {surMesure && <span className="mr-1.5">👑</span>}
                  {title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-white/45">
                  Tu repars avec : <span className="text-white/65">{livrable}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* ══ BARRE PACKS — rappel prix au point de décision ════════════════ */}
        <div
          className="mb-14 overflow-hidden rounded-3xl"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        >
          <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${ROSE}, #d946ef, ${ROSE})` }} />
          <div className="flex flex-col items-center gap-6 px-7 py-8 sm:flex-row sm:justify-center sm:gap-0">
            {PACKS.map(({ qty, price }, i) => (
              <div key={qty} className="flex items-center">
                {i > 0 && <div className="mx-8 hidden h-10 w-px bg-white/10 sm:block" />}
                <div className="text-center">
                  <p className="font-display text-2xl font-black" style={{ color: i === 0 ? "rgba(255,255,255,0.85)" : ROSE }}>
                    {price}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{qty}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="pb-6 text-center text-xs text-white/35">
            Paiement en 2-3 fois disponible
          </p>
        </div>

        {/* ══ PASSERELLE FORMATION PRO ══════════════════════════════════════ */}
        <div className="mb-20">
          <Link
            href="/formation"
            className="group mx-auto flex max-w-2xl items-center justify-center gap-3 rounded-2xl px-6 py-4 text-center text-sm text-white/55 transition-colors hover:text-white/80"
            style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.20)" }}
          >
            <GraduationCap className="h-4 w-4 shrink-0" style={{ color: "#8b5cf6" }} />
            Le montant d&apos;une séance de coaching est déductible de l&apos;inscription au plan Pro de la formation.
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#8b5cf6" }} />
          </Link>
        </div>

        {/* ══ CTA FINAL — vend le diagnostic + rappel prix ══════════════════ */}
        <div className="text-center">
          <h2 className="mb-6 font-display text-2xl font-black text-white sm:text-3xl">
            On commence par un{" "}
            <span style={{ background: `linear-gradient(90deg,${ROSE},#d946ef)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              diagnostic gratuit.
            </span>
          </h2>
          <Link
            href="/contact"
            className="btn-hover group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-black text-white"
            style={{ background: `linear-gradient(135deg, ${ROSE}, #d946ef)`, boxShadow: `0 4px 30px ${ROSE}40` }}
          >
            Réserver mon diagnostic gratuit — 15 min
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-xs text-white/30">
            Sans engagement · on identifie ensemble la séance qu&apos;il te faut
          </p>
          <p className="mt-2 text-xs text-white/35">
            Séance 149€ · 3 séances 399€ · 5 séances 590€ · paiement en 2-3 fois
          </p>
        </div>

        {/* ── Atelier équipe — une phrase, pas une section ─────────────────── */}
        <p className="mt-20 text-center text-xs text-white/25">
          Atelier IA pour votre équipe —{" "}
          <Link href="/contact" className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/50">
            sur devis
          </Link>.
        </p>

      </div>
    </section>
  );
}
