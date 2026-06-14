// 3 orbes CSS — blur divisé par 2 vs version initiale
const ORBS = [
  { color: "#d946ef", cx: "8%",  cy: "8%",  size: 700, blur: 140, op: 0.13, dur: 22, delay: 0,   anim: "orb-float-a" },
  { color: "#06b6d4", cx: "88%", cy: "55%", size: 650, blur: 130, op: 0.12, dur: 25, delay: 8,   anim: "orb-float-c" },
  { color: "#8b5cf6", cx: "48%", cy: "85%", size: 600, blur: 120, op: 0.11, dur: 29, delay: 4,   anim: "orb-float-b" },
];

// 60 étoiles — positions déterministes (golden ratio)
const STARS = Array.from({ length: 60 }, (_, i) => {
  const idx = i + 1;
  return {
    x:        Number(((idx * 61.8) % 100).toFixed(1)),
    y:        Number(((idx * 38.2) % 100).toFixed(1)),
    size:     idx % 7 === 0 ? 2 : 1,
    delayMs:  (idx * 370) % 4000,
    dur:      2500 + (idx % 5) * 700,
    opacity:  0.35 + (idx % 4) * 0.12,
  };
});

export default function CelestialBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
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

      {/* 60 étoiles */}
      {STARS.map((s, i) => (
        <div
          key={`s${i}`}
          style={{
            position:     "absolute",
            left:         `${s.x}%`,
            top:          `${s.y}%`,
            width:        s.size,
            height:       s.size,
            borderRadius: "50%",
            background:   s.size === 2
              ? `radial-gradient(circle, rgba(255,255,255,${s.opacity}) 0%, transparent 100%)`
              : `rgba(255,255,255,${s.opacity})`,
            boxShadow:    s.size === 2 ? `0 0 3px 1px rgba(255,255,255,0.15)` : "none",
            animation:    `celestial-twinkle ${s.dur}ms ease-in-out ${s.delayMs}ms infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
