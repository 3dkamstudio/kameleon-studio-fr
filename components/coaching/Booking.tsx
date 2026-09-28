"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { SESSIONS } from "@/lib/content";
import { EMAIL_RE, sendForm } from "@/lib/forms";
import { COACHING, CONTACT } from "@/lib/site";
import { MONTHS, TZN, dayKey, fmtD, fmtT, monthRange, slotsFor, wallTime } from "@/lib/slots";
import { KameNote } from "@/components/ks/Kame";
import { Eyebrow, FD, G } from "@/components/ks/ui";

type Tz = "Europe/Paris" | "America/Martinique";
type Errors = Partial<Record<"type" | "slot" | "name" | "email" | "goal", string>>;
type Status = "form" | "sending" | "sent" | "cancelling" | "cancelled";

const PARIS: Tz = "Europe/Paris";
const MQ: Tz = "America/Martinique";
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const panel: CSSProperties = { background: "#FFFFFF", border: "1px solid #E6E8F0", borderRadius: 20, padding: 24 };
const h3: CSSProperties = { margin: 0, fontFamily: FD, fontWeight: 500, fontSize: 16 };
const pillBtn = (on: boolean): CSSProperties => ({
  flex: 1,
  minHeight: 44,
  borderRadius: 999,
  border: `1.5px solid ${on ? "#151827" : "#D6D9E4"}`,
  background: on ? "#151827" : "#FFFFFF",
  color: on ? "#FFFFFF" : "#151827",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
});
const outlineBtn = (strong: boolean): CSSProperties => ({
  minHeight: 46,
  padding: "0 18px",
  borderRadius: 999,
  border: `1.5px solid ${strong ? "#151827" : "#D6D9E4"}`,
  background: "#FFFFFF",
  color: "#151827",
  fontWeight: 600,
  cursor: "pointer",
});
const tag = (bg: string): CSSProperties => ({ width: "fit-content", padding: "3px 9px", borderRadius: 6, background: bg, color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" });

/** Réservation d'une séance de coaching : demande de créneau envoyée au studio, confirmée par e-mail. */
export default function Booking() {
  const [now, setNow] = useState<Date | null>(null);
  const [monthIdx, setMonthIdx] = useState(0);
  const [type, setType] = useState("");
  const [tz, setTz] = useState<Tz>(PARIS);
  const [date, setDate] = useState("");
  const [slotId, setSlotId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [trap, setTrap] = useState("");
  const [err, setErr] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("form");
  const [mode, setMode] = useState<"new" | "reschedule">("new");
  const [sentLabel, setSentLabel] = useState("");
  const [failMsg, setFailMsg] = useState("");

  // Les créneaux dépendent de l'heure actuelle : calculés dans le navigateur uniquement.
  useEffect(() => setNow(new Date()), []);

  const other: Tz = tz === PARIS ? MQ : PARIS;
  const months = useMemo(() => (now ? monthRange(now) : []), [now]);
  const cur = months[Math.min(monthIdx, Math.max(0, months.length - 1))];

  const cal = useMemo(() => {
    if (!now || !cur) { return []; }
    const lead = (new Date(Date.UTC(cur.y, cur.m, 1)).getUTCDay() + 6) % 7;
    const dim = new Date(Date.UTC(cur.y, cur.m + 1, 0)).getUTCDate();
    const cells: ({ d: number; key: string; avail: boolean } | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= dim; d++) {
      cells.push({ d, key: dayKey(cur.y, cur.m, d), avail: slotsFor(cur.y, cur.m, d, now).length > 0 });
    }
    return cells;
  }, [now, cur]);

  const firstOpen = useMemo(
    () =>
      now
        ? months.findIndex(({ y, m }) => {
            const dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
            for (let d = 1; d <= dim; d++) {
              if (slotsFor(y, m, d, now).length > 0) {
                return true;
              }
            }
            return false;
          })
        : 0,
    [now, months],
  );
  const anyAvail = firstOpen !== -1;

  // Ouvre le calendrier sur le premier mois qui propose des créneaux.
  useEffect(() => {
    if (firstOpen > 0) { setMonthIdx(firstOpen); }
  }, [firstOpen]);

  const [selY, selM, selD] = date ? date.split("-").map(Number) : [0, 0, 0];
  const daySlots = now && date ? slotsFor(selY, selM - 1, selD, now) : [];
  const slot = daySlots.find((s) => s.id === slotId);
  const session = SESSIONS.find((s) => s.id === type);
  const infoOk = !!(name.trim() && EMAIL_RE.test(email.trim()) && goal.trim().length >= 10);
  const done = [!!type, !!slot, infoOk, status === "sent"];

  const slotLabel = (d: Date, zone: Tz) => `${fmtD(d, zone)} à ${fmtT(d, zone)}`;

  const recap: [string, string][] = [
    ["Séance", session ? session.name : "—"],
    ["Date", slot ? fmtD(slot.date, tz) : "—"],
    ["Heure", slot ? `${fmtT(slot.date, tz)} à ${TZN[tz]} · ${fmtT(slot.date, other)} à ${TZN[other]}` : "—"],
    ["Durée", COACHING.duration],
    ["Modalité", "À distance, en visioconférence"],
    ["Tarif", COACHING.price],
    ["Report et annulation", COACHING.rules],
  ];

  const submit = async () => {
    const x: Errors = {};
    if (!type) { x.type = "Choisissez un type de séance."; }
    if (!slot) { x.slot = "Choisissez un jour puis un créneau."; }
    if (!name.trim()) { x.name = "Indiquez votre nom."; }
    if (!EMAIL_RE.test(email.trim())) { x.email = "Indiquez une adresse e-mail valide."; }
    if (goal.trim().length < 10) { x.goal = "Décrivez l’objectif de la séance (10 caractères minimum)."; }
    setErr(x);
    if (Object.keys(x).length || !slot || !session) { return; }
    setFailMsg("");
    setStatus("sending");
    const paris = slotLabel(slot.date, PARIS);
    const res = await sendForm({
      _subject: `${mode === "reschedule" ? "Changement de créneau" : "Demande de coaching"} — ${session.name} — ${paris} (Paris)`,
      Formulaire: mode === "reschedule" ? "Changement de créneau de coaching" : "Demande de coaching",
      Séance: session.name,
      "Créneau (heure de Paris)": paris,
      "Créneau (heure de Martinique)": slotLabel(slot.date, MQ),
      "Fuseau affiché par le client": TZN[tz],
      ...(mode === "reschedule" && sentLabel ? { "Remplace la demande du": sentLabel } : {}),
      Nom: name.trim(),
      Email: email.trim(),
      Objectif: goal.trim(),
      _gotcha: trap,
    });
    if (res.ok) {
      setSentLabel(`${slotLabel(slot.date, tz)} (heure de ${TZN[tz]})`);
      setStatus("sent");
    } else {
      setFailMsg(res.message);
      setStatus("form");
    }
  };

  const cancelRequest = async () => {
    setFailMsg("");
    setStatus("cancelling");
    const res = await sendForm({
      _subject: `Annulation de demande de coaching — ${session?.name ?? ""} — ${sentLabel}`,
      Formulaire: "Annulation de demande de coaching",
      Séance: session?.name ?? "",
      "Créneau annulé": sentLabel,
      Nom: name.trim(),
      Email: email.trim(),
      _gotcha: trap,
    });
    if (res.ok) { setStatus("cancelled"); }
    else {
      setFailMsg(res.message);
      setStatus("sent");
    }
  };

  const reschedule = () => {
    setMode("reschedule");
    setDate("");
    setSlotId("");
    setStatus("form");
  };
  const restart = () => {
    setMode("new");
    setSentLabel("");
    setDate("");
    setSlotId("");
    setStatus("form");
  };

  const field = (k: "name" | "email" | "goal", set: (v: string) => void) => (e: { target: { value: string } }) => {
    set(e.target.value);
    setErr((x) => ({ ...x, [k]: "" }));
  };
  const input: CSSProperties = { minHeight: 48, padding: "10px 14px" };

  return (
    <section id="reserver" data-kame="coaching" className="bg-p" style={{ position: "relative", padding: "clamp(64px,8vw,112px) 0" }}>
      <div className="ks-wrap" style={{ display: "grid", gap: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
          <div style={{ display: "grid", gap: 14 }}>
            <Eyebrow n="RDV">Réservation</Eyebrow>
            <h2 className="h2">
              Réserver <G c="#7C3AED,#C026D3">une séance</G>
            </h2>
          </div>
          <ol aria-label="Étapes de réservation" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "10px 20px" }}>
            {["Séance", "Date et heure", "Vos informations", "Confirmation"].map((l, i) => (
              <li key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}>
                <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 13, background: done[i] ? "#151827" : "#FFFFFF", color: done[i] ? "#FFFFFF" : "#151827", border: `1.5px solid ${done[i] ? "#151827" : "#C9CDD9"}` }}>
                  {done[i] ? "✓" : i + 1}
                </span>
                {l}
                {done[i] && <span className="sr-only"> (terminé)</span>}
              </li>
            ))}
          </ol>
        </div>

        <div role="note" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", borderRadius: 14, background: "#F3F0FD", border: "1px solid #DDD5F7", fontSize: 15, lineHeight: 1.5 }}>
          <span style={{ flex: "none", marginTop: 2, padding: "2px 8px", borderRadius: 6, background: "#151827", color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>DEMANDE</span>
          <span>
            <strong>Réservation sur demande.</strong> Choisissez un créneau proposé : le studio vous confirme la séance par e-mail sous 24 h, avec le lien de visioconférence. Aucun paiement en ligne.
          </span>
        </div>
        {mode === "reschedule" && status === "form" && (
          <div role="status" style={{ padding: "14px 18px", borderRadius: 14, background: "#EFEBFC", fontSize: 15 }}>
            <strong>Changement de créneau :</strong> choisissez un nouveau créneau. Votre nouvelle demande remplacera celle du {sentLabel}.
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
          {/* 1. Type de séance et fuseau */}
          <div style={{ ...panel, flex: "1 1 270px", display: "grid", gap: 26 }}>
            <div role="radiogroup" aria-labelledby="lbl-type" style={{ display: "grid", gap: 10 }}>
              <h3 id="lbl-type" style={{ ...h3, margin: "0 0 4px" }}>
                1. Type de séance
              </h3>
              {SESSIONS.map((x) => {
                const on = type === x.id;
                return (
                  <button
                    key={x.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => {
                      setType(x.id);
                      setErr((e) => ({ ...e, type: "" }));
                    }}
                    style={{ display: "grid", gridTemplateColumns: "20px minmax(0,1fr)", gap: "4px 12px", textAlign: "left", padding: 14, borderRadius: 14, border: `1.5px solid ${on ? "#6546D7" : "#E0E3EC"}`, background: on ? "#F3F0FD" : "#FFFFFF", cursor: "pointer", color: "#151827" }}
                  >
                    <span aria-hidden="true" style={{ gridRow: "span 3", width: 20, height: 20, marginTop: 2, borderRadius: "50%", border: `2px solid ${on ? "#6546D7" : "#B9BECC"}`, display: "grid", placeItems: "center" }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: on ? "#6546D7" : "transparent" }} />
                    </span>
                    <span style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.3 }}>{x.name}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.45, color: "#525B70" }}>{x.desc}</span>
                    <span style={{ fontSize: 13, color: "#525B70" }}>Durée et tarif précisés à la confirmation</span>
                  </button>
                );
              })}
              {err.type && (
                <span role="alert" className="field-err">
                  {err.type}
                </span>
              )}
            </div>
            <div role="radiogroup" aria-labelledby="lbl-tz" style={{ display: "grid", gap: 10 }}>
              <h3 id="lbl-tz" style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                Fuseau horaire d’affichage
              </h3>
              <div style={{ display: "flex", gap: 6 }}>
                {([PARIS, MQ] as Tz[]).map((z) => (
                  <button key={z} type="button" role="radio" aria-checked={z === tz} onClick={() => setTz(z)} style={pillBtn(z === tz)}>
                    {TZN[z]}
                  </button>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#525B70" }}>Les changements d’heure sont pris en compte automatiquement.</p>
            </div>
          </div>

          {/* 2. Date et heure */}
          <div style={{ ...panel, flex: "2 1 440px", minWidth: 0, display: "grid", gap: 18 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h3 style={h3}>2. Date et heure</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button type="button" onClick={() => setMonthIdx((i) => Math.max(0, i - 1))} disabled={!now || monthIdx === 0} aria-label="Mois précédent" style={monthBtn(!now || monthIdx === 0)}>
                  ‹
                </button>
                <span aria-live="polite" style={{ minWidth: 140, textAlign: "center", fontWeight: 600 }}>
                  {cur ? `${cap(MONTHS[cur.m])} ${cur.y}` : "…"}
                </span>
                <button
                  type="button"
                  onClick={() => setMonthIdx((i) => Math.min(months.length - 1, i + 1))}
                  disabled={!now || monthIdx >= months.length - 1}
                  aria-label="Mois suivant"
                  style={monthBtn(!now || monthIdx >= months.length - 1)}
                >
                  ›
                </button>
              </div>
            </div>
            <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "repeat(7,minmax(0,1fr))", gap: 6, fontSize: 13, fontWeight: 600, color: "#525B70", textAlign: "center" }}>
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,minmax(0,1fr))", gap: 6, minHeight: 50 }}>
              {cal.map((c, i) => {
                if (!c) {return <span key={"b" + i} aria-hidden="true" />;}
                const sel = date === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    disabled={!c.avail}
                    onClick={() => {
                      setDate(c.key);
                      setSlotId("");
                    }}
                    aria-label={`${c.d} ${cur ? MONTHS[cur.m] : ""}${c.avail ? ", créneaux disponibles" : ", aucun créneau disponible"}`}
                    aria-pressed={sel}
                    style={{
                      position: "relative",
                      height: 50,
                      borderRadius: 12,
                      border: `1.5px solid ${sel ? "#6546D7" : c.avail ? "#DDE0EA" : "transparent"}`,
                      background: sel ? "#6546D7" : c.avail ? "#FFFFFF" : "transparent",
                      color: sel ? "#FFFFFF" : c.avail ? "#151827" : "#A6ABBA",
                      fontSize: 15,
                      fontWeight: c.avail ? 600 : 400,
                      cursor: c.avail ? "pointer" : "default",
                      padding: 0,
                    }}
                  >
                    {c.d}
                    <span aria-hidden="true" style={{ position: "absolute", bottom: 6, left: "50%", width: 5, height: 5, marginLeft: -2.5, borderRadius: "50%", background: sel ? "#FFFFFF" : c.avail ? "#20BFD1" : "transparent" }} />
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", fontSize: 13, color: "#525B70" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#20BFD1" }} />
                Créneaux proposés
              </span>
              <span>Jours grisés : aucun créneau</span>
            </div>
            <div style={{ borderTop: "1px solid #ECEEF4", paddingTop: 18, display: "grid", gap: 14 }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{date ? fmtD(wallTime(selY, selM - 1, selD, 12, 0, PARIS), PARIS) : "Créneaux"}</h4>
                <span style={{ fontSize: 14, color: "#525B70" }}>Heure de {TZN[tz]}</span>
              </div>
              <div aria-live="polite">
                {!now ? (
                  <div style={{ display: "grid", gap: 10 }}>
                    <span style={{ fontSize: 14, color: "#525B70" }}>Chargement des disponibilités…</span>
                    <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
                      {[0, 1, 2].map((k) => (
                        <span key={k} style={{ height: 66, borderRadius: 12, background: "#F1F2F6" }} />
                      ))}
                    </div>
                  </div>
                ) : !anyAvail ? (
                  <p style={{ margin: 0, fontSize: 15, color: "#525B70" }}>
                    Aucun créneau n’est proposé pour le moment. Écrivez-nous à <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> : nous trouverons un horaire ensemble.
                  </p>
                ) : !date ? (
                  <p style={{ margin: 0, fontSize: 15, color: "#525B70" }}>Sélectionnez un jour marqué d’un point pour afficher ses créneaux.</p>
                ) : daySlots.length === 0 ? (
                  <p style={{ margin: 0, fontSize: 15, color: "#525B70" }}>Ce jour n’a plus de créneau disponible : choisissez une autre date.</p>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
                    {daySlots.map((x) => {
                      const on = slotId === x.id;
                      return (
                        <button
                          key={x.id}
                          type="button"
                          onClick={() => {
                            setSlotId(x.id);
                            setErr((e) => ({ ...e, slot: "" }));
                          }}
                          aria-pressed={on}
                          style={{ display: "grid", gap: 2, textAlign: "left", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${on ? "#6546D7" : "#D6D9E4"}`, background: on ? "#6546D7" : "#FFFFFF", color: on ? "#FFFFFF" : "#151827", cursor: "pointer" }}
                        >
                          <span style={{ fontFamily: FD, fontSize: 18, fontWeight: 500 }}>{fmtT(x.date, tz)}</span>
                          <span style={{ fontSize: 13, color: on ? "#FFFFFF" : "#525B70" }}>
                            {fmtT(x.date, other)} à {TZN[other]}
                          </span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: on ? "#FFFFFF" : "#525B70" }}>{on ? "Sélectionné" : "Proposé"}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {err.slot && (
                <span role="alert" className="field-err">
                  {err.slot}
                </span>
              )}
            </div>
          </div>

          {/* 3. Informations, récapitulatif et envoi */}
          <div style={{ ...panel, flex: "1 1 310px", display: "grid", gap: 20 }}>
            {status === "form" && (
              <>
                <h3 style={h3}>3. Vos informations</h3>
                <label htmlFor="b-name" className="field">
                  Nom *
                  <input id="b-name" className="input" type="text" autoComplete="name" value={name} onChange={field("name", setName)} aria-invalid={err.name ? true : undefined} aria-describedby={err.name ? "b-name-err" : undefined} style={input} />
                  {err.name && (
                    <span id="b-name-err" className="field-err">
                      {err.name}
                    </span>
                  )}
                </label>
                <label htmlFor="b-email" className="field">
                  E-mail *
                  <input id="b-email" className="input" type="email" inputMode="email" autoComplete="email" value={email} onChange={field("email", setEmail)} aria-invalid={err.email ? true : undefined} aria-describedby={err.email ? "b-email-err" : undefined} style={input} />
                  {err.email && (
                    <span id="b-email-err" className="field-err">
                      {err.email}
                    </span>
                  )}
                </label>
                <label htmlFor="b-goal" className="field">
                  Objectif de la séance *
                  <textarea id="b-goal" className="input" rows={3} value={goal} onChange={field("goal", setGoal)} aria-invalid={err.goal ? true : undefined} aria-describedby={err.goal ? "b-goal-err" : undefined} style={{ padding: "10px 14px" }} />
                  {err.goal && (
                    <span id="b-goal-err" className="field-err">
                      {err.goal}
                    </span>
                  )}
                </label>
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="b-website">Ne pas remplir</label>
                  <input id="b-website" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                </div>
                <div style={{ display: "grid", gap: 10, paddingTop: 18, borderTop: "1px solid #ECEEF4" }}>
                  <h3 style={h3}>4. Récapitulatif</h3>
                  <dl style={{ margin: 0, display: "grid", gap: 10 }}>
                    {recap.map(([k, v]) => (
                      <div key={k} style={{ display: "grid", gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)", gap: 12, fontSize: 14, lineHeight: 1.45 }}>
                        <dt style={{ color: "#525B70" }}>{k}</dt>
                        <dd style={{ margin: 0, fontWeight: 600 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <button type="button" onClick={submit} className="btn btn-grad hv-grad" style={{ minHeight: 54, borderRadius: 999, fontSize: 16 }}>
                  {mode === "reschedule" ? "Demander ce nouveau créneau" : "Envoyer ma demande de séance"}
                </button>
                {failMsg && (
                  <p role="alert" style={{ margin: 0, padding: "12px 14px", borderRadius: 12, background: "#FDECEA", fontSize: 14, lineHeight: 1.5 }}>
                    {failMsg}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#525B70" }}>Vos coordonnées ne sont transmises qu’au studio. Le planning public n’affiche que les créneaux proposés.</p>
              </>
            )}
            {status === "sending" && (
              <div role="status" style={{ display: "grid", gap: 10, padding: "8px 0" }}>
                <h3 style={{ ...h3, fontSize: 18 }}>Envoi de votre demande…</h3>
                <p style={{ margin: 0, fontSize: 15, color: "#525B70" }}>Le studio vérifie chaque créneau avant de le confirmer, pour qu’il ne soit jamais réservé deux fois.</p>
              </div>
            )}
            {(status === "sent" || status === "cancelling") && (
              <div role="status" style={{ display: "grid", gap: 14 }}>
                <span style={tag("#15803D")}>DEMANDE ENVOYÉE</span>
                <h3 style={{ ...h3, fontSize: 20, lineHeight: 1.2 }}>Votre demande est bien transmise.</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#525B70" }}>
                  Créneau demandé : <strong style={{ color: "#151827" }}>{sentLabel}</strong>. Le studio vérifie sa disponibilité et vous répond par e-mail sous 24 h avec :
                </p>
                <ul className="bullets" style={{ fontSize: 15, lineHeight: 1.5, color: "#151827" }}>
                  <li>la confirmation de la séance, ou un autre horaire si le créneau n’est plus libre ;</li>
                  <li>le lien de visioconférence ;</li>
                  <li>la durée, le tarif et les règles de report.</li>
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <button type="button" onClick={reschedule} disabled={status === "cancelling"} style={outlineBtn(true)}>
                    Changer de créneau
                  </button>
                  <button type="button" onClick={cancelRequest} disabled={status === "cancelling"} style={outlineBtn(false)}>
                    {status === "cancelling" ? "Annulation…" : "Annuler ma demande"}
                  </button>
                </div>
                {failMsg && (
                  <p role="alert" style={{ margin: 0, padding: "12px 14px", borderRadius: 12, background: "#FDECEA", fontSize: 14 }}>
                    {failMsg}
                  </p>
                )}
              </div>
            )}
            {status === "cancelled" && (
              <div role="status" style={{ display: "grid", gap: 14 }}>
                <span style={tag("#151827")}>ANNULATION ENVOYÉE</span>
                <h3 style={{ ...h3, fontSize: 20, lineHeight: 1.2 }}>Votre demande est annulée.</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#525B70" }}>Le studio est prévenu : le créneau du {sentLabel} est libéré.</p>
                <button type="button" onClick={restart} style={{ ...outlineBtn(true), width: "fit-content" }}>
                  Choisir un nouveau créneau
                </button>
              </div>
            )}
          </div>
        </div>
        <KameNote k="coaching" />
      </div>
    </section>
  );
}

function monthBtn(disabled: boolean): CSSProperties {
  return { width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #D6D9E4", background: "#FFFFFF", color: "#151827", fontSize: 18, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1 };
}
