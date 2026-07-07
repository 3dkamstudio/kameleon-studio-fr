"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Étoiles bakées en 2 couches de radial-gradients CSS (2 nœuds au lieu de 14),
// twinkle par opacité de couche.
const NAV_STARS = [
  { x: 4,  y: 30 }, { x: 11, y: 68 }, { x: 19, y: 18 }, { x: 28, y: 78 },
  { x: 36, y: 42 }, { x: 45, y: 82 }, { x: 54, y: 22 }, { x: 62, y: 62 },
  { x: 71, y: 15 }, { x: 80, y: 80 }, { x: 87, y: 48 }, { x: 94, y: 72 },
  { x: 33, y: 55 }, { x: 75, y: 35 },
] as const;
const NAV_STAR_LAYERS = [0, 1].map(offset =>
  NAV_STARS.filter((_, i) => i % 2 === offset)
    .map(({ x, y }, i) => `radial-gradient(${i % 3 === 0 ? "2px 2px" : "1.5px 1.5px"} at ${x}% ${y}%, rgba(255,255,255,0.55), transparent)`)
    .join(","),
);

const PRESTATION_LINKS = [
  { label: "Production vidéo",     href: "/video",     color: "#d946ef", emoji: "🎬" },
  { label: "BD & illustration",    href: "/bd",        color: "#f97316", emoji: "🎨" },
  { label: "Sites web",            href: "/web",       color: "#06b6d4", emoji: "🌐" },
  { label: "Formation King of IA", href: "/formation", color: "#8b5cf6", emoji: "🎓" },
  { label: "Coaching IA",          href: "/coaching",  color: "#f43f5e", emoji: "👑" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [dropdownOpen,   setDropdownOpen]   = useState(false);
  const [mobilePrestOpen, setMobilePrestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [pathname]);

  const isPrestActive     = PRESTATION_LINKS.some(l => pathname === l.href);
  const isRealisActive    = pathname === "/realisations";

  return (
    <>
      {/* ══ HEADER ═══════════════════════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={scrolled ? {
          background: "rgba(6,6,14,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.45)",
        } : {
          background: "linear-gradient(to bottom, rgba(6,6,14,0.38) 0%, rgba(6,6,14,0.10) 60%, transparent 100%)",
        }}
      >
        {/* Étoiles scintillantes — 2 couches CSS pur */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: NAV_STAR_LAYERS[0], animation: "star-twinkle 3s ease-in-out infinite" }} />
          <div className="absolute inset-0" style={{ backgroundImage: NAV_STAR_LAYERS[1], animation: "star-twinkle 4.2s ease-in-out 1s infinite" }} />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">

          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl transition-transform duration-200 group-hover:scale-105">
              <Image src="/ks-logo.png" alt="King of IA" fill sizes="44px" className="object-contain" priority />
            </div>
            <span className="hidden font-display text-[1.05rem] font-black tracking-tight sm:block">
              <span style={{
                background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4, #22c55e, #f97316, #d946ef)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-x-flow 4s linear infinite",
              }}>King</span>{" "}
              <span style={{ display: "inline-block", color: "rgba(255,255,255,0.80)", borderBottom: "1.5px solid rgba(217,70,239,0.65)", paddingBottom: "1px" }}>
                of IA
              </span>
            </span>
          </Link>

          {/* ── Nav desktop ────────────────────────────────────────────────── */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">

            {/* Dropdown Prestations */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: isPrestActive ? "#fff" : "rgba(255,255,255,0.50)" }}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                Prestations
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-200"
                  style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
                {isPrestActive && (
                  <m.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <m.div
                    key="dropdown"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-1.5 w-60 overflow-hidden rounded-2xl"
                    style={{
                      background: "rgba(8,8,20,0.97)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                      backdropFilter: "blur(24px)",
                    }}
                  >
                    <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4, #22c55e, #f97316)" }} />
                    <div className="py-2">
                      {PRESTATION_LINKS.map(({ label, href, color, emoji }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all duration-150 hover:bg-white/5"
                          style={{ color: pathname === href ? color : "rgba(255,255,255,0.65)" }}
                        >
                          <span className="text-base shrink-0">{emoji}</span>
                          {label}
                          {pathname === href && (
                            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Réalisations */}
            <Link
              href="/realisations"
              className="relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200 hover:text-white/85"
              style={{ color: isRealisActive ? "#fff" : "rgba(255,255,255,0.50)" }}
            >
              Réalisations
              {isRealisActive && (
                <>
                  <m.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                  <span className="absolute bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full" style={{ background: "#d946ef", boxShadow: "0 0 6px #d946ef" }} />
                </>
              )}
            </Link>

          </nav>

          {/* ── CTA + burger ───────────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <m.div
              className="group relative hidden overflow-hidden rounded-xl md:inline-flex"
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(217,70,239,0.55)" }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: "0 0 20px rgba(217,70,239,0.35)" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-black text-white"
                style={{ background: "linear-gradient(135deg, #d946ef, #8b5cf6)" }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Devis gratuit
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </m.div>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200 md:hidden"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <m.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="h-4 w-4 text-white" />
                    </m.span>
                  : <m.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="h-4 w-4 text-white" />
                    </m.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ══ MENU MOBILE ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              key="backdrop"
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            <m.nav
              key="panel"
              className="fixed inset-x-3 top-[64px] z-50 overflow-hidden rounded-3xl md:hidden"
              style={{
                background: "rgba(8,8,20,0.97)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
                backdropFilter: "blur(24px)",
              }}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4, #22c55e, #f97316, #d946ef)" }} />

              <div className="flex flex-col gap-1 p-4">

                {/* Prestations (accordéon mobile) */}
                <div>
                  <button
                    className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-base font-bold transition-colors duration-150"
                    style={{
                      color: isPrestActive ? "#fff" : "rgba(255,255,255,0.62)",
                      background: isPrestActive ? "rgba(217,70,239,0.12)" : "transparent",
                    }}
                    onClick={() => setMobilePrestOpen(o => !o)}
                  >
                    Prestations
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200"
                      style={{ transform: mobilePrestOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>

                  <AnimatePresence>
                    {mobilePrestOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-0.5 px-2 pb-2 pt-1">
                          {PRESTATION_LINKS.map(({ label, href, color, emoji }, i) => (
                            <m.div
                              key={href}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <Link
                                href={href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
                                style={{ color: pathname === href ? color : "rgba(255,255,255,0.55)" }}
                              >
                                <span className="text-base">{emoji}</span>
                                {label}
                              </Link>
                            </m.div>
                          ))}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Réalisations */}
                <m.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
                  <Link
                    href="/realisations"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-5 py-4 text-base font-bold transition-colors duration-150 hover:bg-white/5"
                    style={{
                      color: isRealisActive ? "#fff" : "rgba(255,255,255,0.62)",
                      background: isRealisActive ? "rgba(217,70,239,0.12)" : "transparent",
                    }}
                  >
                    Réalisations
                    {isRealisActive && <span className="h-2 w-2 rounded-full" style={{ background: "#d946ef", boxShadow: "0 0 8px #d946ef" }} />}
                  </Link>
                </m.div>

                {/* CTA mobile */}
                <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-white"
                    style={{
                      background: "linear-gradient(135deg, #d946ef, #8b5cf6)",
                      boxShadow: "0 4px 24px rgba(217,70,239,0.35)",
                    }}
                  >
                    Devis gratuit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </m.div>

              </div>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
