import { FORMSPREE_ENDPOINT } from "./site";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SendResult = { ok: true } | { ok: false; message: string };

/** Envoie un formulaire à Formspree ; le succès n'est annoncé qu'après la réponse du service. */
export async function sendForm(data: Record<string, string>): Promise<SendResult> {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {return { ok: true };}
    const body = (await res.json().catch(() => ({}))) as { errors?: { message?: string }[] };
    return { ok: false, message: body.errors?.[0]?.message ?? "L’envoi a échoué. Réessayez, ou écrivez-nous directement par e-mail." };
  } catch {
    return { ok: false, message: "Connexion impossible. Vérifiez votre réseau puis réessayez." };
  }
}

// ── Pré-remplissage entre composants (même onglet, y compris d'une page à l'autre) ──
/** `keepMsg` : ne remplace pas un message déjà saisi par le visiteur. */
export type ContactPrefill = { type?: string; msg?: string; keepMsg?: boolean };

let pendingContact: ContactPrefill | null = null;
let pendingFormula: string | null = null;

export function prefillContact(p: ContactPrefill) {
  pendingContact = p;
  window.dispatchEvent(new Event("ks:contact"));
}
export function takeContactPrefill() {
  const p = pendingContact;
  pendingContact = null;
  return p;
}

export function prefillFormula(formula: string) {
  pendingFormula = formula;
  window.dispatchEvent(new Event("ks:formula"));
}
export function takeFormulaPrefill() {
  const f = pendingFormula;
  pendingFormula = null;
  return f;
}
