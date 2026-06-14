// Positions déterministes — pas de Math.random() pour SSR
const SPARKS = [
  { x: 5,  y: 8,  s: 2, c: "#d946ef", d: 0,    t: 2.8 },
  { x: 18, y: 3,  s: 1, c: "#06b6d4", d: 0.7,  t: 3.5 },
  { x: 32, y: 15, s: 3, c: "#8b5cf6", d: 1.4,  t: 2.2 },
  { x: 47, y: 6,  s: 1, c: "#eab308", d: 0.3,  t: 4.0 },
  { x: 63, y: 18, s: 2, c: "#22c55e", d: 1.8,  t: 2.6 },
  { x: 78, y: 4,  s: 1, c: "#f97316", d: 0.9,  t: 3.2 },
  { x: 91, y: 12, s: 2, c: "#f43f5e", d: 0.2,  t: 2.9 },
  { x: 10, y: 28, s: 1, c: "#d946ef", d: 1.5,  t: 3.8 },
  { x: 25, y: 42, s: 2, c: "#06b6d4", d: 0.6,  t: 2.4 },
  { x: 55, y: 35, s: 1, c: "#8b5cf6", d: 1.1,  t: 4.5 },
  { x: 72, y: 48, s: 3, c: "#eab308", d: 0.4,  t: 2.1 },
  { x: 88, y: 38, s: 1, c: "#22c55e", d: 1.9,  t: 3.7 },
  { x: 38, y: 58, s: 2, c: "#f97316", d: 0.8,  t: 2.5 },
  { x: 15, y: 65, s: 1, c: "#d946ef", d: 1.3,  t: 4.2 },
  { x: 62, y: 72, s: 2, c: "#06b6d4", d: 0.1,  t: 2.8 },
  { x: 80, y: 62, s: 1, c: "#f43f5e", d: 1.6,  t: 3.4 },
  { x: 45, y: 82, s: 3, c: "#8b5cf6", d: 0.5,  t: 2.3 },
  { x: 22, y: 88, s: 1, c: "#eab308", d: 1.0,  t: 5.0 },
  { x: 68, y: 92, s: 2, c: "#22c55e", d: 0.3,  t: 2.9 },
  { x: 92, y: 78, s: 1, c: "#f97316", d: 1.7,  t: 3.6 },
  { x: 5,  y: 52, s: 2, c: "#d946ef", d: 0.9,  t: 4.1 },
  { x: 35, y: 95, s: 1, c: "#06b6d4", d: 1.2,  t: 2.7 },
  { x: 85, y: 88, s: 3, c: "#8b5cf6", d: 0.6,  t: 3.3 },
  { x: 50, y: 50, s: 1, c: "#eab308", d: 1.4,  t: 2.6 },
  { x: 75, y: 22, s: 2, c: "#f43f5e", d: 0.0,  t: 4.8 },
  { x: 28, y: 75, s: 1, c: "#22c55e", d: 1.8,  t: 3.1 },
  { x: 58, y: 45, s: 2, c: "#d946ef", d: 0.4,  t: 2.4 },
  { x: 12, y: 38, s: 1, c: "#06b6d4", d: 1.1,  t: 3.9 },
];

const FIXED_STARS = [
  { x: 3,  y: 22 }, { x: 42, y: 8  }, { x: 96, y: 33 },
  { x: 17, y: 77 }, { x: 73, y: 14 }, { x: 56, y: 67 },
  { x: 84, y: 54 }, { x: 29, y: 91 }, { x: 66, y: 40 },
  { x: 8,  y: 60 }, { x: 95, y: 85 }, { x: 40, y: 30 },
];

export default function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {SPARKS.map(({ x, y, s, c, d, t }, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            background: c,
            boxShadow: `0 0 ${s * 3}px ${s}px ${c}`,
            animation: `spark-pulse ${t}s ease-in-out ${d}s infinite`,
          }}
        />
      ))}
      {FIXED_STARS.map(({ x, y }, i) => (
        <div
          key={`star-${i}`}
          className="absolute h-px w-px rounded-full bg-white"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: `star-twinkle ${2 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
