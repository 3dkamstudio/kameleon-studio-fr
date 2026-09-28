"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SPEECH, type KameKey } from "@/lib/content";
import { useMotion } from "./motion";

/** Kame, guide flottant (dans la colonne Dock) : son conseil suit la section affichée ([data-kame]). */
export default function KameGuide() {
  const pathname = usePathname();
  const { tick } = useMotion();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<KameKey>("accueil");

  // Ouvert d'emblée sur grand écran ; replié sur mobile pour ne pas masquer le contenu.
  useEffect(() => {
    if (window.innerWidth >= 640) { setOpen(true); }
  }, []);

  useEffect(() => {
    let raf = 0;
    const detect = () => {
      raf = 0;
      let k: string | null = null;
      const lim = window.innerHeight * 0.55;
      document.querySelectorAll<HTMLElement>("[data-kame]").forEach((el) => {
        if (el.getBoundingClientRect().top < lim) { k = el.dataset.kame ?? null; }
      });
      setKey(k && k in SPEECH ? (k as KameKey) : "accueil");
    };
    const onScroll = () => {
      if (!raf) { raf = requestAnimationFrame(detect); }
    };
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const lines = SPEECH[key];
  const text = lines[tick % lines.length];

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, pointerEvents: "none" }}>
      {open && (
        <div
          role="note"
          style={{
            pointerEvents: "auto",
            position: "relative",
            maxWidth: "min(290px, 68vw)",
            padding: "12px 36px 12px 14px",
            borderRadius: "18px 18px 4px 18px",
            background: "linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(135deg,#8b5cf6,#06b6d4,#22c55e,#f43f5e) border-box",
            border: "1.5px solid transparent",
            boxShadow: "0 20px 44px -22px rgba(139,92,246,0.65)",
          }}
        >
          <span style={{ display: "block", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7C3AED" }}>Le conseil de Kame</span>
          <span style={{ display: "block", fontSize: 14, lineHeight: 1.45, fontWeight: 600, color: "#151827" }}>{text}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Masquer le conseil de Kame"
            style={{ position: "absolute", top: 6, right: 6, width: 26, height: 26, borderRadius: "50%", border: 0, background: "#F1F2F7", color: "#151827", fontSize: 15, lineHeight: 1, cursor: "pointer" }}
          >
            ×
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Masquer le conseil de Kame" : "Afficher un conseil de Kame"}
        aria-expanded={open}
        className="hv-guide kame-btn"
        style={{
          pointerEvents: "auto",
          flex: "none",
          width: 64,
          height: 64,
          padding: 3,
          borderRadius: "50%",
          border: 0,
          cursor: "pointer",
          backgroundImage: "conic-gradient(#8b5cf6,#06b6d4,#22c55e,#eab308,#f97316,#f43f5e,#d946ef,#8b5cf6)",
          boxShadow: "0 14px 30px -12px rgba(139,92,246,0.7)",
          transition: "transform 200ms ease",
        }}
      >
        <Image src="/kame-closeup.webp" alt="" width={116} height={116} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", background: "#FFFFFF", display: "block" }} />
      </button>
    </div>
  );
}
