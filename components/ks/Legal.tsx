import Link from "next/link";
import type { ReactNode } from "react";
import { FD } from "@/components/ks/ui";

/** Gabarit des pages juridiques (mentions légales, CGV) : fil d’Ariane, titre, blocs, date de mise à jour. */
export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-w" style={{ position: "relative", padding: "clamp(48px,6vw,88px) 0 clamp(64px,8vw,112px)" }}>
      <div className="ks-wrap" style={{ maxWidth: 820, display: "grid", gap: 28 }}>
        <nav aria-label="Fil d’Ariane" style={{ display: "flex", gap: 8, fontSize: 14, color: "#525B70" }}>
          <Link href="/" style={{ color: "#525B70" }}>
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" style={{ color: "#151827", fontWeight: 600 }}>
            {title}
          </span>
        </nav>
        <h1 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>{title}</h1>
        {intro && <div style={{ fontSize: 16, lineHeight: 1.65, color: "#525B70" }}>{intro}</div>}
        {children}
        <p style={{ margin: "14px 0 0", fontSize: 14, color: "#525B70" }}>Dernière mise à jour : {updated}</p>
      </div>
    </section>
  );
}

export function LegalBlock({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} style={{ display: "grid", gap: 10, paddingTop: 22, borderTop: "1px solid #E6E8F0", scrollMarginTop: 96 }}>
      <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 19, letterSpacing: "-0.01em" }}>{title}</h2>
      <div className="legal-body" style={{ fontSize: 16, lineHeight: 1.65, color: "#525B70" }}>
        {children}
      </div>
    </section>
  );
}
