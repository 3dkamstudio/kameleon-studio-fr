import AnimatedCount from "@/components/ui/AnimatedCount";
import Image from "next/image";
import Kame from "@/components/ui/Kame";
import KameSpeech from "@/components/ui/KameSpeech";
import Sparkles from "@/components/ui/Sparkles";

const TESTIMONIALS_SPEECH = [
  "Plus de 20 clients satisfaits — et ça continue ! 🎉",
  "Nos clients reviennent — preuve que la qualité est au rendez-vous !",
  "Rejoignez nos partenaires et donnez vie à votre projet !",
];

const CLIENTS = [
  { name: "Paillette Academy",     logo: "/logo-paillette-academy.png", description: "Vidéos pédagogiques",    glow: "#4dd9ff" },
  { name: "BLR Conseil Formation", logo: "/logo-blr-conseils.png",      description: "Conseil & formation",    glow: "#8a6dff" },
  { name: "Les aventures de Gabi",  logo: "/logo-gabi.webp",              description: "Littérature jeunesse",   glow: "#eab308" },
  { name: "JL Conseils",           logo: "/logo-jl-conseils.png",       description: "Conseil bien-être",      glow: "#5eff9d" },
  { name: "Les Pépites de Lylou",       logo: "/logo-pepites-lylou.png",              description: "Créations chrétiennes",  glow: "#ff9d4d" },
  { name: "Collège Fernand Donatien",   logo: "/logo-college-fernand-donatien.png",   description: "Prévention numérique",   glow: "#eab308" },
  { name: "W&KEYSELITE",               logo: "/logo-wkeyselite.png",                 description: "Conciergerie",            glow: "#f43f5e" },
  { name: "Gommier",                   logo: "/logo-gommier.png",                    description: "Partenaire créatif",      glow: "#ffffff" },
  { name: "Loulou Panthera",           logo: "/logo-loulou-panthera.png",            description: "Série animée",            glow: "#8b5cf6" },
] as const;

const STATS = [
  { value: 20,  suffix: "+",  label: "Clients accompagnés",   color: "#d946ef" },
  { value: 2,   suffix: "",   label: "Formats par vidéo",     color: "#06b6d4" },
  { value: 48,  suffix: "h",  label: "Délai de réponse",      color: "#22c55e" },
  { value: 100, suffix: "%",  label: "Livré dans les délais", color: "#f97316" },
] as const;

// ── Carte logo premium ─────────────────────────────────────────────────────────
type Client = (typeof CLIENTS)[number];

function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <div
      className="card-hover card-hover-lift group relative flex w-full flex-col overflow-hidden rounded-3xl sm:w-[260px] lg:w-[280px]"
      style={{
        background: "rgba(5,5,16,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${client.glow}38`,
        boxShadow: `0 0 36px ${client.glow}18, 0 4px 24px rgba(0,0,0,0.45)`,
        "--tint-border": `${client.glow}75`,
        "--tint-glow": `${client.glow}50`,
      } as React.CSSProperties}
    >
      {/* Barre d'accent colorée en haut */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent 0%, ${client.glow}cc 40%, ${client.glow} 50%, ${client.glow}cc 60%, transparent 100%)`,
        flexShrink: 0,
      }} />

      {/* Zone logo avec halo radial */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 210, padding: "20px 28px", flexShrink: 0 }}
      >
        {/* Halo ambiant derrière le logo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div style={{
            width: 220, height: 220, borderRadius: "50%",
            background: `radial-gradient(circle, ${client.glow}28 0%, ${client.glow}0c 45%, transparent 72%)`,
            animation: "haloPulse 3.5s ease-in-out infinite",
            animationDelay: `${index * 0.6}s`,
          }} />
        </div>

        {/* Image */}
        <div className="relative h-full w-full z-10">
          <Image
            src={client.logo}
            alt={`Logo ${client.name}`}
            fill
            className="object-contain"
            style={{
              filter: `drop-shadow(0 0 28px ${client.glow}70) drop-shadow(0 6px 16px rgba(0,0,0,0.45))`,
            }}
            sizes="(max-width: 640px) 90vw, 280px"
          />
        </div>
      </div>

      {/* Footer de carte */}
      <div
        className="flex flex-col items-center gap-1.5 px-6 pb-6 pt-4 text-center"
        style={{ borderTop: `1px solid ${client.glow}22` }}
      >
        <p
          className="text-sm font-bold leading-tight"
          style={{
            color: client.glow,
            textShadow: `0 0 14px ${client.glow}70`,
          }}
        >
          {client.name}
        </p>
        <p className="text-[0.64rem] text-white/38">{client.description}</p>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Testimonials() {
  return (
    <section
      id="avis"
      className="relative py-24 sm:py-32"
      style={{ background: "transparent" }}
    >
      <style>{`
        @keyframes haloPulse {
          0%, 100% { transform: scale(0.95); opacity: 0.7; }
          50%       { transform: scale(1.08); opacity: 1; }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 rounded-full blur-[180px]"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.13) 0%, rgba(217,70,239,0.08) 50%, transparent 70%)" }}
        />
      </div>
      <Sparkles />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col items-center text-center gap-5">
          <div>
            <span className="badge-pill badge-cyan">✦ Ils nous font confiance</span>
          </div>

          <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ils nous font{" "}
            <span style={{
              background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              confiance.
            </span>
          </h2>

          <p className="max-w-xl text-sm text-white/45 sm:text-base">
            Des créateurs, indépendants et entreprises qui ont choisi King of IA pour leurs projets.
          </p>
        </div>

        {/* ── Logos clients ───────────────────────────────────────────────── */}
        <div className="mb-24 flex flex-wrap justify-center gap-6 sm:gap-8">
          {CLIENTS.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} />
          ))}
        </div>

        {/* ── Stats + Kame ─────────────────────────────────────────────────── */}
        <div className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-12">

          <div className="flex-1 w-full">
            {/* Stats desktop */}
            <div
              className="hidden sm:flex items-stretch rounded-2xl overflow-hidden"
              style={{
                background: "rgba(6,6,18,0.70)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="contents">
                  {i > 0 && (
                    <div style={{ width: 1, background: "rgba(255,255,255,0.06)", flexShrink: 0, alignSelf: "stretch" }} />
                  )}
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 px-4 text-center">
                    <AnimatedCount value={stat.value} suffix={stat.suffix} color={stat.color} />
                    <p className="text-sm font-semibold text-white/45 leading-tight">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats mobile */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {STATS.map(stat => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 rounded-2xl p-5 text-center"
                  style={{
                    background: "rgba(6,6,18,0.70)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(16px)",
                    borderLeft: `3px solid ${stat.color}55`,
                  }}
                >
                  <AnimatedCount value={stat.value} suffix={stat.suffix} color={stat.color} />
                  <p className="text-sm font-semibold text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kame */}
          <div className="flex flex-col items-center gap-6 lg:w-64">
            <KameSpeech variants={TESTIMONIALS_SPEECH}>
              <Kame context="celebrate" src="/kame-celebrate.png" size={200} />
            </KameSpeech>
          </div>

        </div>
      </div>
    </section>
  );
}
