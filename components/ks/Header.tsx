"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";
import { Brand } from "./ui";

export default function Header() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Sur l'accueil, tout en haut : en-tête transparent posé sur la bannière sombre.
  const ov = pathname === "/" && atTop && !menuOpen;
  const close = () => setMenuOpen(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: ov ? "linear-gradient(180deg, rgba(9,8,18,0.6) 0%, rgba(9,8,18,0) 100%)" : "rgba(255,255,255,0.8)",
        backdropFilter: ov ? "none" : "saturate(1.6) blur(16px)",
        WebkitBackdropFilter: ov ? "none" : "saturate(1.6) blur(16px)",
        borderBottom: `1px solid ${ov ? "transparent" : "rgba(139,92,246,0.14)"}`,
        transition: "background 400ms ease, border-color 400ms ease",
      }}
    >
      <div className="hdr-row" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", height: 72, display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/" aria-label="Kaméléon Studio, retour à l’accueil" className="hdr-logo" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", color: "#151827", flex: "none" }}>
          <Image src="/ks-logo.png" alt="" width={44} height={44} priority className="hv-logo" style={{ width: 44, height: 44, objectFit: "contain", margin: "-6px -6px -6px -8px" }} />
          <Brand dark={ov} />
        </Link>

        <nav aria-label="Navigation principale" className="nav-wide" style={{ flex: 1, justifyContent: "center", gap: 2 }}>
          {NAV.map((n) => {
            const cur = n.page !== null && pathname.startsWith(n.page);
            return (
              <Link
                key={n.label}
                href={n.href}
                aria-current={cur ? "page" : undefined}
                className="hv-nav"
                style={{
                  padding: "9px 14px",
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 500,
                  color: ov ? "#E9EAF2" : cur ? "#151827" : "#525B70",
                  background: !ov && cur ? "#EEF0F6" : "transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/#studio" className="btn btn-grad hv-grad nav-wide" style={{ flex: "none", minHeight: 46, padding: "0 20px", borderRadius: 999, fontSize: 15 }}>
          Parler de mon projet
        </Link>

        <button
          type="button"
          className="nav-narrow"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          style={{ marginLeft: "auto", minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1.5px solid #CDD1DD", background: "#FFFFFF", color: "#151827", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
        >
          {menuOpen ? "Fermer" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav id="menu-mobile" aria-label="Navigation principale" className="nav-narrow" style={{ borderTop: "1px solid #ECEEF4", background: "#FFFFFF", padding: "12px clamp(20px,4vw,48px) 24px", display: "grid", gap: 4 }}>
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              onClick={close}
              aria-current={n.page !== null && pathname.startsWith(n.page) ? "page" : undefined}
              style={{ padding: "14px 4px", borderBottom: "1px solid #F1F2F6", fontSize: 18, fontWeight: 600, color: "#151827", textDecoration: "none" }}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/#studio" onClick={close} className="btn btn-grad" style={{ marginTop: 12, display: "flex", minHeight: 52, borderRadius: 999 }}>
            Parler de mon projet
          </Link>
        </nav>
      )}
    </header>
  );
}
