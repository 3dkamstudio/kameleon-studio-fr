"use client";

import { useEffect, useState, type FormEvent } from "react";
import { EMAIL_RE, sendForm, takeContactPrefill, type ContactPrefill } from "@/lib/forms";
import { FD } from "@/components/ks/ui";

const TYPES = ["Production vidéo", "Bande dessinée", "Site web", "Maintenance de site", "Autre / plusieurs prestations"];
const BUDGETS: [string, string][] = [
  ["", "Non précisé"],
  ["< 500 €", "Moins de 500 €"],
  ["500 – 1 000 €", "500 € à 1 000 €"],
  ["1 000 – 3 000 €", "1 000 € à 3 000 €"],
  ["> 3 000 €", "Plus de 3 000 €"],
  ["Je ne sais pas encore", "Je ne sais pas encore"],
];

type Fields = { name: string; email: string; type: string; budget: string; msg: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "error" | "sending" | "sent" | "failed";

const EMPTY: Fields = { name: "", email: "", type: "", budget: "", msg: "" };

/** Demande de production : envoi réel via Formspree, succès affiché après confirmation du service. */
export default function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [err, setErr] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failMsg, setFailMsg] = useState("");
  const [trap, setTrap] = useState("");

  // Pré-remplissage depuis « Créer un projet similaire », l'estimateur, les offres…
  useEffect(() => {
    const apply = (p: ContactPrefill | null) => {
      if (!p) { return; }
      setF((cur) => ({ ...cur, type: p.type ?? cur.type, msg: p.msg !== undefined && !(p.keepMsg && cur.msg.trim()) ? p.msg : cur.msg }));
      setStatus("idle");
    };
    apply(takeContactPrefill());
    const onPrefill = () => apply(takeContactPrefill());
    window.addEventListener("ks:contact", onPrefill);
    return () => window.removeEventListener("ks:contact", onPrefill);
  }, []);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setF((cur) => ({ ...cur, [k]: v }));
    setErr((cur) => ({ ...cur, [k]: "" }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const x: Errors = {};
    if (!f.name.trim()) { x.name = "Indiquez votre nom et prénom."; }
    if (!EMAIL_RE.test(f.email.trim())) { x.email = "Indiquez une adresse e-mail valide, par exemple nom@domaine.fr."; }
    if (!f.type) { x.type = "Choisissez le type de prestation."; }
    if (f.msg.trim().length < 10) { x.msg = "Décrivez votre projet en quelques mots (10 caractères minimum)."; }
    if (Object.keys(x).length) {
      setErr(x);
      setStatus("error");
      return;
    }
    setErr({});
    setStatus("sending");
    const res = await sendForm({
      _subject: `Demande de production — ${f.type}`,
      Formulaire: "Demande de production",
      Nom: f.name.trim(),
      Email: f.email.trim(),
      Prestation: f.type,
      Budget: f.budget || "Non précisé",
      Message: f.msg.trim(),
      _gotcha: trap,
    });
    if (res.ok) {
      setStatus("sent");
      setF(EMPTY);
    } else {
      setFailMsg(res.message);
      setStatus("failed");
    }
  };

  const notice =
    status === "error"
      ? ["Le formulaire contient des erreurs : corrigez les champs signalés.", "#FDECEA"]
      : status === "sending"
        ? ["Envoi en cours…", "#EEF0F6"]
        : status === "sent"
          ? ["Merci ! Votre demande a bien été envoyée. Le studio vous répond sous 24 h pour un premier échange gratuit.", "#DCFCE7"]
          : status === "failed"
            ? [failMsg, "#FDECEA"]
            : null;

  return (
    <form onSubmit={submit} noValidate aria-labelledby="form-titre" style={{ flex: "1.1 1 420px", background: "#F7F8FC", borderRadius: 24, padding: "clamp(24px,3.4vw,44px)", display: "grid", gap: 20 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <h3 id="form-titre" style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 22, letterSpacing: "-0.02em" }}>
          Demande de production
        </h3>
        <p style={{ margin: 0, fontSize: 15, color: "#525B70" }}>Les champs marqués d’un astérisque sont obligatoires.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 20 }}>
        <label htmlFor="c-name" className="field">
          Nom et prénom *
          <input id="c-name" className="input" type="text" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={err.name ? true : undefined} aria-describedby={err.name ? "c-name-err" : undefined} />
          {err.name && (
            <span id="c-name-err" className="field-err">
              {err.name}
            </span>
          )}
        </label>
        <label htmlFor="c-email" className="field">
          Adresse e-mail *
          <input id="c-email" className="input" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={err.email ? true : undefined} aria-describedby={err.email ? "c-email-err" : undefined} />
          {err.email && (
            <span id="c-email-err" className="field-err">
              {err.email}
            </span>
          )}
        </label>
        <label htmlFor="c-type" className="field">
          Type de prestation *
          <select id="c-type" className="input" value={f.type} onChange={set("type")} aria-invalid={err.type ? true : undefined} aria-describedby={err.type ? "c-type-err" : undefined}>
            <option value="">Choisissez une prestation…</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err.type && (
            <span id="c-type-err" className="field-err">
              {err.type}
            </span>
          )}
        </label>
        <label htmlFor="c-budget" className="field">
          Budget estimé (facultatif)
          <select id="c-budget" className="input" value={f.budget} onChange={set("budget")}>
            {BUDGETS.map(([v, l]) => (
              <option key={l} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label htmlFor="c-msg" className="field">
        Décrivez votre projet *
        <textarea id="c-msg" className="input" rows={5} value={f.msg} onChange={set("msg")} aria-invalid={err.msg ? true : undefined} aria-describedby={err.msg ? "c-msg-err" : undefined} />
        {err.msg && (
          <span id="c-msg-err" className="field-err">
            {err.msg}
          </span>
        )}
      </label>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="c-website">Ne pas remplir</label>
        <input id="c-website" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 20px" }}>
        <button type="submit" disabled={status === "sending"} className="btn btn-grad hv-grad" style={{ minHeight: 54, padding: "0 28px", borderRadius: 999, fontSize: 16 }}>
          {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
        </button>
        <span style={{ fontSize: 14, color: "#525B70" }}>Réponse personnalisée sous 24 h</span>
      </div>
      <div aria-live="polite">{notice && <p style={{ margin: 0, padding: "14px 16px", borderRadius: 12, background: notice[1], fontSize: 15, lineHeight: 1.5, color: "#151827" }}>{notice[0]}</p>}</div>
    </form>
  );
}
