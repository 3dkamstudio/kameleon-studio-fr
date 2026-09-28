import Image from "next/image";
import { MODULES, MODULE_GRADS } from "@/lib/content";
import { Eyebrow, FD, G } from "@/components/ks/ui";

/** Programme King of IA : les huit modules, du script à l’export final. */
export default function Programme() {
  return (
    <section id="programme" data-kame="formations" className="bg-p" style={{ padding: "clamp(72px,9vw,120px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 40 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div style={{ display: "grid", gap: 18, maxWidth: 700 }}>
            <Eyebrow n="01">Programme</Eyebrow>
            <h2 className="h2">
              Huit modules, <G c="#0891B2,#7C3AED">une compétence à chaque étape.</G>
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 380, fontSize: 16, color: "#525B70" }}>Du script à l’export final : chaque module correspond à un maillon de la chaîne de production vidéo IA.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,500px),1fr))", gap: "0 48px" }}>
          {MODULES.map((m, i) => (
            <article key={m.n} className="mod-row" style={{ display: "grid", gridTemplateColumns: "112px minmax(0,1fr)", gap: 20, padding: "24px 0", borderTop: "1px solid #D6D9E4", alignItems: "start" }}>
              <div className="mod-thumb" style={{ position: "relative", width: 112, height: 84, borderRadius: 10, overflow: "hidden", background: "#151827" }}>
                {/* Vignette 4:3 d'un visuel 16:9 : environ 150 px de large une fois recadrée. */}
                <Image src={m.img} alt="" fill sizes="150px" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: FD, fontSize: 12, color: "#525B70", letterSpacing: "0.04em" }}>MODULE {m.n}</span>
                  <span style={{ padding: "2px 8px", borderRadius: 6, background: m.pro ? "#151827" : "#EEF0F6", color: m.pro ? "#FFFFFF" : "#151827", fontSize: 12, fontWeight: 700 }}>
                    {m.pro ? "Pro" : "Starter & Pro"}
                  </span>
                </div>
                <h3
                  className="grad-text"
                  style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 19, lineHeight: 1.25, letterSpacing: "-0.015em", backgroundImage: MODULE_GRADS[i % MODULE_GRADS.length] }}
                >
                  {m.t}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#525B70" }}>{m.d}</p>
                <span style={{ fontSize: 13, color: "#525B70" }}>Outils : {m.tools}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
