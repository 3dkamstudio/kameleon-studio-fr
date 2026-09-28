"use client";

import { useEffect, useState, type FormEvent } from "react";
import { EMAIL_RE, sendForm, takeFormulaPrefill } from "@/lib/forms";
import { FORMATION_STATUS } from "@/lib/site";

const open = FORMATION_STATUS === "ouverte";

// [valeur, libellé] ; « starter » et « pro » sont pré-sélectionnés par les boutons « Être prévenu » des formules.
const FORMULAS: [string, string][] = [
  ["starter", "Starter"],
  ["pro", "Pro"],
  ["indecis", "Je ne sais pas encore"],
];

// Adresses déjà inscrites depuis ce navigateur (en minuscules), pour signaler les doublons sans renvoyer.
const STORE_KEY = "ks-waitlist";

function registered(): string[] {
  try {
    const v: unknown = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function remember(email: string) {
  const list = registered();
  if (list.includes(email)) {
    return;
  }
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([...list, email]));
  } catch {
    // Stockage indisponible (navigation privée, quota…) : l'inscription reste enregistrée côté Formspree.
  }
}

type Fields = { first: string; email: string; formula: string; news: boolean };
type Errors = { email?: string };
type Status = "idle" | "error" | "sending" | "sent" | "duplicate" | "failed";

const EMPTY: Fields = { first: "", email: "", formula: "", news: false };

/** Liste d'attente King of IA : envoi réel via Formspree, succès affiché après confirmation du service. */
export default function WaitlistForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [err, setErr] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failMsg, setFailMsg] = useState("");
  const [trap, setTrap] = useState("");

  // Pré-sélection de la formule depuis les boutons « Être prévenu » (même page ou autre page).
  useEffect(() => {
    const apply = (p: string | null) => {
      if (!p || !FORMULAS.some(([v]) => v === p)) {
        return;
      }
      setF((cur) => ({ ...cur, formula: p }));
      setStatus("idle");
    };
    apply(takeFormulaPrefill());
    const onPrefill = () => apply(takeFormulaPrefill());
    window.addEventListener("ks:formula", onPrefill);
    return () => window.removeEventListener("ks:formula", onPrefill);
  }, []);

  const set = (k: "first" | "email") => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setF((cur) => ({ ...cur, [k]: v }));
    if (k === "email") {
      setErr({});
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") {
      return;
    }
    const email = f.email.trim();
    if (!EMAIL_RE.test(email)) {
      setErr({ email: "Indiquez une adresse e-mail valide, par exemple nom@domaine.fr." });
      setStatus("error");
      return;
    }
    setErr({});
    const key = email.toLowerCase();
    if (registered().includes(key)) {
      setStatus("duplicate");
      return;
    }
    setStatus("sending");
    const res = await sendForm({
      _subject: "Inscription liste d'attente — King of IA",
      Formulaire: "Liste d’attente King of IA",
      Prénom: f.first.trim() || "Non précisé",
      Email: email,
      Formule: FORMULAS.find(([v]) => v === f.formula)?.[1] ?? "Non précisée",
      "Actualités Kaméléon Studio": f.news ? "Oui" : "Non",
      _gotcha: trap,
    });
    if (res.ok) {
      remember(key);
      setStatus("sent");
      setF(EMPTY);
    } else {
      setFailMsg(res.message);
      setStatus("failed");
    }
  };

  const notice: [string, string] | null =
    status === "error"
      ? ["Vérifiez votre adresse e-mail.", "#FDECEA"]
      : status === "sending"
        ? ["Inscription en cours…", "#EEF0F6"]
        : status === "sent"
          ? ["C’est noté ! Vous serez prévenu par e-mail dès l’ouverture des inscriptions King of IA.", "#DCFCE7"]
          : status === "duplicate"
            ? ["Cette adresse est déjà inscrite sur la liste d’attente depuis cet appareil.", "#EEF0F6"]
            : status === "failed"
              ? [failMsg, "#FDECEA"]
              : null;

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label="Inscription à la liste d’attente"
      style={{ flex: "1 1 420px", background: "#FFFFFF", border: "1px solid #E6E8F0", borderRadius: 24, padding: "clamp(24px,3.4vw,40px)", display: "grid", gap: 20 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 20 }}>
        <label htmlFor="w-first" className="field">
          Prénom (facultatif)
          <input id="w-first" className="input" type="text" autoComplete="given-name" value={f.first} onChange={set("first")} />
        </label>
        <label htmlFor="w-email" className="field">
          E-mail *
          <input
            id="w-email"
            className="input"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={f.email}
            onChange={set("email")}
            aria-invalid={err.email ? true : undefined}
            aria-describedby={err.email ? "w-email-err" : undefined}
          />
          {err.email && (
            <span id="w-email-err" className="field-err">
              {err.email}
            </span>
          )}
        </label>
      </div>
      <div role="radiogroup" aria-labelledby="lbl-formule" style={{ display: "grid", gap: 10 }}>
        <span id="lbl-formule" style={{ fontSize: 15, fontWeight: 600 }}>
          Formule qui vous intéresse (facultatif)
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {FORMULAS.map(([v, l]) => {
            const on = f.formula === v;
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setF((cur) => ({ ...cur, formula: cur.formula === v ? "" : v }))}
                style={{
                  minHeight: 44,
                  padding: "0 16px",
                  borderRadius: 999,
                  border: `1.5px solid ${on ? "#151827" : "#D6D9E4"}`,
                  background: on ? "#151827" : "#FFFFFF",
                  color: on ? "#FFFFFF" : "#151827",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>
      <label htmlFor="w-news" style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.5, cursor: "pointer" }}>
        <input
          id="w-news"
          type="checkbox"
          checked={f.news}
          onChange={(e) => {
            const v = e.target.checked;
            setF((cur) => ({ ...cur, news: v }));
          }}
          style={{ flex: "none", width: 20, height: 20, marginTop: 2, accentColor: "#6546D7" }}
        />
        <span>J’accepte aussi de recevoir les actualités de Kaméléon Studio (facultatif, indépendant de la liste d’attente).</span>
      </label>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="w-website">Ne pas remplir</label>
        <input id="w-website" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 20px" }}>
        <button type="submit" disabled={status === "sending"} className="btn btn-grad hv-grad" style={{ minHeight: 54, padding: "0 28px", borderRadius: 999, fontSize: 16 }}>
          {status === "sending" ? "Inscription…" : open ? "Être recontacté" : "Rejoindre la liste d’attente"}
        </button>
        <span style={{ fontSize: 14, color: "#525B70" }}>Désinscription possible à tout moment.</span>
      </div>
      <div aria-live="polite">{notice && <p style={{ margin: 0, padding: "14px 16px", borderRadius: 12, background: notice[1], fontSize: 15, lineHeight: 1.5, color: "#151827" }}>{notice[0]}</p>}</div>
    </form>
  );
}
