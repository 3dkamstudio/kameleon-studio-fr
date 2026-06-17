"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import Sparkles from "@/components/ui/Sparkles";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";

const FAQ_SPEECH = [
  "Une question pas dans la liste ? Envoyez-nous un message !",
  "On a répondu aux questions les plus fréquentes 😄",
  "Premier échange toujours gratuit et sans engagement !",
];

// ── Données ────────────────────────────────────────────────────────────────────
type FAQItem = {
  num: string;
  cat: string;
  q: string;
  a: string;
  color: string;
};

const FAQS: FAQItem[] = [
  {
    num: "01", cat: "Général",
    color: "#d946ef",
    q: "Comment fonctionne le processus de commande ?",
    a: "C'est simple en 3 étapes : vous remplissez le formulaire de contact avec votre brief, on revient vers vous sous 24h pour un échange rapide (gratuit, sans engagement), puis on démarre la production dès validation. Pas de réunion interminable, pas de devis en 10 pages — on va à l'essentiel.",
  },
  {
    num: "02", cat: "Vidéo",
    color: "#f97316",
    q: "Quel est le délai de livraison pour une vidéo ?",
    a: "7 jours ouvrés maximum pour une vidéo standard (jusqu'à 60 s). Pour les packs de plusieurs vidéos, on s'organise en batch pour tenir les délais. En cas d'urgence déclarée dès le brief, on peut accélérer — contactez-nous directement pour en discuter.",
  },
  {
    num: "03", cat: "Vidéo",
    color: "#f43f5e",
    q: "Puis-je modifier le script ou demander des retouches ?",
    a: "Oui. Chaque production inclut une validation du script avant le lancement, puis 2 allers-retours de retouches sur le rendu final. Au-delà, des retouches supplémentaires sont possibles à un tarif horaire. L'objectif reste que vous soyez 100 % satisfait du résultat.",
  },
  {
    num: "04", cat: "Vidéo",
    color: "#eab308",
    q: "Quels formats de livraison sont inclus ?",
    a: "Chaque vidéo est livrée en 16:9 (YouTube, site, présentations) et 9:16 (Reels, TikTok, Stories) sans surcoût. Les fichiers sont en MP4 haute définition (1080p minimum). Sur demande : sous-titrage, version sans voix-off, export 4K.",
  },
  {
    num: "05", cat: "BD",
    color: "#22c55e",
    q: "Combien de temps pour livrer une planche BD ?",
    a: "Une planche isolée est livrée en 48h ouvrées. Pour des projets multi-planches, comptez 2 à 5 jours selon le volume. Chaque planche passe par une étape de validation du croquis avant la mise en couleur finale — vous gardez le contrôle à chaque étape.",
  },
  {
    num: "06", cat: "BD",
    color: "#06b6d4",
    q: "Les planches sont-elles utilisables commercialement ?",
    a: "Oui, les droits d'utilisation commerciale sont inclus dans toutes nos prestations BD. Vous pouvez utiliser les planches sur votre site, vos réseaux, vos formations, vos supports print ou tout autre usage lié à votre activité professionnelle, sans restriction.",
  },
  {
    num: "07", cat: "Web",
    color: "#8b5cf6",
    q: "Utilisez-vous des templates ou tout est créé de zéro ?",
    a: "Tout est créé sur mesure — aucun template, aucun builder type Wix ou Squarespace. Chaque site est codé avec Next.js, conçu graphiquement pour votre image et optimisé pour la conversion. Résultat : un rendu unique qui se démarque vraiment de la concurrence.",
  },
  {
    num: "08", cat: "Web",
    color: "#d946ef",
    q: "Le SEO et la mise en ligne sont-ils inclus ?",
    a: "Oui. Balises méta, structure sémantique, sitemap, Open Graph pour les réseaux sociaux, optimisation des images — tout est intégré avant la mise en ligne. Pour la Landing Page, le SEO de base est inclus ; pour le Site Complet, c'est un SEO avancé avec audit et stratégie de mots-clés.",
  },
  {
    num: "09", cat: "Général",
    color: "#f97316",
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Paiement en ligne sécurisé par carte bancaire (Stripe), virement bancaire, ou PayPal. Pour les projets d'un montant supérieur à 800 €, un acompte de 50 % est demandé au démarrage, le solde à la livraison. Facturation avec TVA selon situation.",
  },
  {
    num: "10", cat: "Général",
    color: "#22c55e",
    q: "Travaillez-vous avec des clients en dehors de la France ?",
    a: "Absolument. Tous nos échanges se font à distance — brief par formulaire, révisions par e-mail ou visio, livraison par lien de téléchargement sécurisé. Nous travaillons avec des clients en Europe, en Afrique francophone et en Antilles. La langue de travail est le français.",
  },
  {
    num: "11", cat: "Maintenance",
    color: "#06b6d4",
    q: "Quelle est la différence entre les deux formules de maintenance web ?",
    a: "La Maintenance Landing Page (49 €/mois) est conçue pour une page unique — landing page, page de vente, page de capture ou page formation. Elle inclut 30 min d'intervention mensuelle. La Maintenance Site Web Complet (79 €/mois) couvre un site vitrine de plusieurs pages avec 1h d'intervention, un mini contrôle SEO en plus, et une surveillance sécurité renforcée. Les deux formules s'engagent sur 3 mois minimum et incluent mises à jour techniques, vérifications légales et sauvegardes.",
  },
  {
    num: "12", cat: "Maintenance",
    color: "#22c55e",
    q: "La maintenance est-elle obligatoire après la création de mon site ?",
    a: "Non, la maintenance est un service optionnel. Votre site vous est livré clé en main et fonctionnel. Elle est recommandée si vous souhaitez que votre site reste sécurisé, à jour et performant dans le temps, sans vous en occuper vous-même. C'est un accompagnement préventif continu — pas une intervention ponctuelle quand quelque chose tombe en panne.",
  },
];

// ── Composant accordion item ───────────────────────────────────────────────────
function FAQRow({ item, isOpen, onToggle }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: isOpen
          ? `linear-gradient(135deg, ${item.color}0c 0%, rgba(255,255,255,0.02) 100%)`
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${isOpen ? item.color + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow: isOpen ? `0 0 40px ${item.color}14` : "none",
      }}
    >
      {/* Accent bar gauche */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl transition-opacity duration-300"
        style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}44)`, opacity: isOpen ? 1 : 0 }}
      />

      {/* Question row */}
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-5 px-6 py-5 text-left sm:items-center sm:px-8 sm:py-6"
      >
        {/* Numéro */}
        <span
          className="mt-0.5 shrink-0 font-display text-xs font-black sm:mt-0 sm:text-sm"
          style={{ color: item.color }}
        >
          {item.num}
        </span>

        {/* Question + badge */}
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span className={`font-display text-base font-bold leading-snug transition-colors duration-200 sm:text-lg ${isOpen ? "text-white" : "text-white/75 group-hover:text-white/90"}`}>
            {item.q}
          </span>
          <span
            className="shrink-0 self-start rounded-full px-2.5 py-0.5 text-[0.58rem] font-black uppercase tracking-widest sm:self-auto"
            style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}28` }}
          >
            {item.cat}
          </span>
        </div>

        {/* Toggle icon */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300"
          style={{
            background: isOpen ? item.color : "rgba(255,255,255,0.06)",
            boxShadow: isOpen ? `0 0 16px ${item.color}60` : "none",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen
              ? <motion.span key="minus" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Minus className="h-3.5 w-3.5 text-white" />
                </motion.span>
              : <motion.span key="plus" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Plus className="h-3.5 w-3.5 text-white/60" />
                </motion.span>
            }
          </AnimatePresence>
        </div>
      </button>

      {/* Réponse */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 sm:px-8 sm:pb-7">
              {/* Séparateur */}
              <div className="mb-4 h-px" style={{ background: `linear-gradient(90deg, ${item.color}40, transparent)` }} />
              <p className="text-sm leading-relaxed text-white/55 sm:text-[0.95rem]">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section principale ─────────────────────────────────────────────────────────
export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIdx(prev => (prev === i ? null : i));
  }

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32"
      style={{ background: "transparent" }}
    >
      {/* ── Fond ──────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Glow centré */}
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, rgba(217,70,239,0.06) 40%, transparent 70%)" }}
        />
        {/* Grille fine */}
        {/* Grand "?" décoratif */}
        <div
          className="pointer-events-none absolute right-[-40px] top-1/2 -translate-y-1/2 font-display text-[22rem] font-black leading-none select-none opacity-[0.018] sm:right-0 sm:text-[28rem]"
          style={{ color: "#8b5cf6" }}
        >
          ?
        </div>
      </div>
      <Sparkles />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">

        {/* ══ HEADER ════════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-pill badge-violet mb-7">❓ Questions fréquentes</span>

          <h2 className="mb-4 tracking-tight">
            <span className="block font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Tout ce que vous
            </span>
            <span className="block font-display text-3xl font-black leading-tight text-gradient-warm sm:text-4xl md:text-5xl">
              voulez savoir.
            </span>
          </h2>

          <p className="max-w-md text-sm text-white/40 sm:text-base">
            Les réponses aux questions les plus posées avant de démarrer un projet avec Kaméléon Studio.
          </p>

          <motion.div
            className="mx-auto mt-8 w-40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="divider-rainbow" />
          </motion.div>
        </motion.div>

        {/* ══ ACCORDION ════════════════════════════════════════════════════ */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          {FAQS.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <FAQRow
                item={item}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ══ CTA BOTTOM ═══════════════════════════════════════════════════ */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-4 rounded-3xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "rgba(217,70,239,0.15)", border: "1px solid rgba(217,70,239,0.30)" }}
          >
            <MessageCircle className="h-5 w-5 text-fuchsia-400" />
          </div>
          <div>
            <p className="mb-1 font-display text-lg font-bold text-white">
              Vous n&apos;avez pas trouvé votre réponse ?
            </p>
            <p className="text-sm text-white/38">
              Posez-nous directement votre question — on répond sous 24h.
            </p>
          </div>
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-black text-white"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
              boxShadow: "0 4px 24px rgba(139,92,246,0.40)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 36px rgba(217,70,239,0.50)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Nous écrire directement
          </motion.a>
        </motion.div>

      </div>

      {/* ── Kame guide ─────────────────────────────────────────────────────── */}
      <div className="pointer-events-none relative z-20 flex w-full justify-center mt-20 pb-4 md:absolute md:bottom-8 md:right-8 md:mt-0 md:pb-0 md:w-auto">
        <KameSpeech variants={FAQ_SPEECH} position="above" positionMd="left">
          <Kame context="default" src="/kame-welcome.png" size={185} />
        </KameSpeech>
      </div>
    </section>
  );
}
