// 3 orbes CSS — blur divisé par 2 vs version initiale
const ORBS = [
  { color: "#d946ef", cx: "8%",  cy: "8%",  size: 700, blur: 140, op: 0.13, dur: 22, delay: 0,   anim: "orb-float-a" },
  { color: "#06b6d4", cx: "88%", cy: "55%", size: 650, blur: 130, op: 0.12, dur: 25, delay: 8,   anim: "orb-float-c" },
  { color: "#8b5cf6", cx: "48%", cy: "85%", size: 600, blur: 120, op: 0.11, dur: 29, delay: 4,   anim: "orb-float-b" },
];

// 60 étoiles — positions déterministes (golden ratio), bakées en 2 couches
// de radial-gradients CSS : 2 nœuds DOM au lieu de 60, twinkle par opacité
// de couche (compositor-only).
function starLayer(offset: number): string {
  const stops: string[] = [];
  for (let i = offset; i < 60; i += 2) {
    const idx = i + 1;
    const x = ((idx * 61.8) % 100).toFixed(1);
    const y = ((idx * 38.2) % 100).toFixed(1);
    const size = idx % 7 === 0 ? "2px 2px" : "1px 1px";
    const op = (0.35 + (idx % 4) * 0.12).toFixed(2);
    stops.push(`radial-gradient(${size} at ${x}% ${y}%, rgba(255,255,255,${op}), transparent)`);
  }
  return stops.join(",");
}
const STAR_LAYER_A = starLayer(0);
const STAR_LAYER_B = starLayer(1);

// Fond commun à toutes les pages (rendu depuis le layout).
// `fixed` : la couche ne bouge pas au scroll — zéro re-compositing des orbes.
export default function CelestialBackground() {
  return (
    <div
      aria-hidden="true"
      className="celestial-bg pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Dégradé cosmique de base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 140% 70% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 55%)," +
            "radial-gradient(ellipse 100% 80% at 10% 100%, rgba(217,70,239,0.05) 0%, transparent 55%)," +
            "radial-gradient(ellipse 80% 60% at 90% 80%, rgba(6,182,212,0.04) 0%, transparent 55%)",
        }}
      />

      {/* 3 orbes CSS */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position:     "absolute",
            left:         orb.cx,
            top:          orb.cy,
            width:        orb.size,
            height:       orb.size,
            marginLeft:   -orb.size / 2,
            marginTop:    -orb.size / 2,
            borderRadius: "50%",
            background:   `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
            filter:       `blur(${orb.blur}px)`,
            opacity:      orb.op,
            animation:    `${orb.anim} ${orb.dur}s ease-in-out ${orb.delay}s infinite alternate`,
            willChange:   "transform",
          }}
        />
      ))}

      {/* 60 étoiles — 2 couches CSS pur */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: STAR_LAYER_A, animation: "star-twinkle 3.4s ease-in-out infinite" }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: STAR_LAYER_B, animation: "star-twinkle 4.6s ease-in-out 1.2s infinite" }}
      />
    </div>
  );
}
