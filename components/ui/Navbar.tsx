"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const LINKS = [
  { label: "Services",     href: "#services"    },
  { label: "Réalisations", href: "#showreel"    },
  { label: "Process",      href: "#processus"   },
  { label: "Tarifs",       href: "#tarifs-video"},
  { label: "Sites Web",    href: "#sites-web"   },
  { label: "FAQ",          href: "#faq"         },
  { label: "Contact",      href: "#contact"     },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeHash,  setActiveHash]  = useState("");

  /* ── Scroll → fond glassmorphism ────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ────────────────────────── */
  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHash(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  function closeMenu() { setMobileOpen(false); }

  return (
    <>
      {/* ══ HEADER FIXE ══════════════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={scrolled ? {
          background: "rgba(6,6,14,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.45)",
        } : {
          background: "linear-gradient(to bottom, rgba(6,6,14,0.70) 0%, transparent 100%)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">

          {/* ── Logo ───────────────────────────────────────────────────── */}
          <a href="#" className="group flex items-center gap-2">
            <div
              className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl transition-transform duration-200 group-hover:scale-105"
              style={{ boxShadow: "0 0 18px rgba(217,70,239,0.35)" }}
            >
              <Image
                src="/ks-logo.png"
                alt="Kaméléon Studio"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden font-display text-[0.95rem] font-black tracking-tight text-white sm:block">
              Kaméléon{" "}
              <span style={{
                background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Studio
              </span>
            </span>
          </a>

          {/* ── Liens desktop ──────────────────────────────────────────── */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {LINKS.map(({ label, href }) => {
              const isActive = activeHash === href;
              return (
                <a
                  key={href}
                  href={href}
                  className="relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200"
                  style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.50)" }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.50)"; }}
                >
                  {label}
                  {/* Indicateur actif */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Dot actif */}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full"
                      style={{ background: "#d946ef", boxShadow: "0 0 6px #d946ef" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── CTA + burger ───────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* CTA desktop */}
            <motion.a
              href="#contact"
              className="group relative hidden items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-black text-white md:inline-flex"
              style={{
                background: "linear-gradient(135deg, #d946ef, #8b5cf6)",
                boxShadow: "0 0 20px rgba(217,70,239,0.35)",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(217,70,239,0.55)" }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Démarrer un projet
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>

            {/* Burger mobile */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200 md:hidden"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="h-4 w-4 text-white" />
                    </motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="h-4 w-4 text-white" />
                    </motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ══ MENU MOBILE ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            {/* Panneau */}
            <motion.nav
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
              {/* Rainbow top accent */}
              <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #d946ef, #8b5cf6, #06b6d4, #22c55e, #f97316, #d946ef)" }} />

              <div className="flex flex-col p-4 gap-1">
                {LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-2xl px-5 py-4 text-base font-bold transition-colors duration-150"
                    style={{
                      color: activeHash === href ? "#fff" : "rgba(255,255,255,0.62)",
                      background: activeHash === href ? "rgba(217,70,239,0.12)" : "transparent",
                    }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.2 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = activeHash === href ? "rgba(217,70,239,0.12)" : "transparent"; }}
                  >
                    {label}
                    {activeHash === href && (
                      <span className="h-2 w-2 rounded-full" style={{ background: "#d946ef", boxShadow: "0 0 8px #d946ef" }} />
                    )}
                  </motion.a>
                ))}

                {/* CTA mobile */}
                <motion.a
                  href="#contact"
                  onClick={closeMenu}
                  className="mt-2 flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-white"
                  style={{
                    background: "linear-gradient(135deg, #d946ef, #8b5cf6)",
                    boxShadow: "0 4px 24px rgba(217,70,239,0.35)",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.2 }}
                >
                  Démarrer un projet
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
