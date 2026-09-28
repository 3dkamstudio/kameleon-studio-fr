import Image from "next/image";
import Link from "next/link";
import { BANNERS } from "@/lib/content";
import { FD } from "./ui";

/** Les trois univers (vidéo, BD, web) en grandes affiches inclinables. */
export default function Banners({ variant }: { variant: "home" | "page" }) {
  const home = variant === "home";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 24 }}>
      {BANNERS.map((bn) => (
        <article
          key={bn.n}
          data-tilt="1"
          style={{
            position: "relative",
            minHeight: home ? 520 : 500,
            borderRadius: 26,
            overflow: "hidden",
            background: "#151827",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            isolation: "isolate",
            transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
            transition: "transform 300ms ease-out",
            boxShadow: "0 40px 70px -42px rgba(21,24,39,0.7)",
          }}
        >
          <Image
            src={bn.img}
            alt={bn.alt}
            fill
            sizes="(max-width: 700px) 100vw, 420px"
            style={{ objectFit: "cover", zIndex: -2, transform: "scale(var(--zoom, 1))", transition: "transform 900ms cubic-bezier(.2,.7,.2,1)" }}
          />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(180deg, rgba(21,24,39,0) 22%, rgba(21,24,39,0.64) 50%, rgba(21,24,39,0.96) 100%)" }} />
          {home && (
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 30%), rgba(255,255,255,0.22), transparent 60%)", opacity: "var(--so, 0)", transition: "opacity 300ms" }} />
          )}
          <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: bn.line }} />
          {home && (
            <div style={{ position: "absolute", top: 18, left: 18, right: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(21,24,39,0.66)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {bn.cat}
              </span>
              <span style={{ fontFamily: FD, fontSize: 13, fontWeight: 500, padding: "6px 10px", borderRadius: 10, background: "rgba(21,24,39,0.66)", border: "1px solid rgba(255,255,255,0.18)" }}>{bn.n}</span>
            </div>
          )}
          <div style={{ padding: "clamp(22px,2.6vw,30px)", display: "grid", gap: 12 }}>
            {!home && (
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D5D8E3" }}>
                {bn.n} · {bn.cat}
              </span>
            )}
            {home ? (
              <h3 className="tw-balance" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(21px,1.9vw,25px)", lineHeight: 1.18, letterSpacing: "-0.02em" }}>
                {bn.title}
              </h3>
            ) : (
              <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(21px,1.9vw,25px)", lineHeight: 1.18, letterSpacing: "-0.02em" }}>{bn.title}</h2>
            )}
            {home && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#D5D8E3" }}>{bn.desc}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.16)" }}>
              <div style={{ display: "grid", gap: 2 }}>
                <span style={{ fontFamily: FD, fontSize: home ? 26 : 24, fontWeight: 500, letterSpacing: home ? "-0.02em" : undefined, lineHeight: home ? 1.1 : undefined }}>
                  {bn.price}{" "}
                  <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 14, fontWeight: 500, color: "#D5D8E3" }}>{bn.unit}</span>
                </span>
                {home && <span style={{ fontSize: 13, color: "#D5D8E3" }}>{bn.note}</span>}
              </div>
              <Link
                href={bn.href}
                className="btn btn-white hv-up"
                style={{ minHeight: home ? 46 : 44, padding: home ? "0 18px" : "0 16px", borderRadius: 999, fontSize: home ? 15 : 14, fontWeight: home ? 600 : 700 }}
              >
                {bn.cta}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
