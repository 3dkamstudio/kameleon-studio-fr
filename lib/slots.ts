import { COACHING } from "./site";

// Créneaux de coaching calculés à partir de la configuration (lib/site.ts),
// en heure du studio, avec gestion correcte des changements d'heure.

export const TZN: Record<string, string> = { "Europe/Paris": "Paris", "America/Martinique": "Martinique" };
export const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const pad = (n: number) => String(n).padStart(2, "0");

export const fmtT = (d: Date, tz: string) => new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(d);
export const fmtD = (d: Date, tz: string) => cap(new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(d));

/** Décalage (ms) entre l'heure locale d'un fuseau et UTC à un instant donné. */
function tzOffset(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second")) - date.getTime();
}

/** Instant correspondant à une date et une heure « murales » dans un fuseau. */
export function wallTime(y: number, m: number, d: number, h: number, mi: number, tz: string) {
  const guess = Date.UTC(y, m, d, h, mi);
  const off = tzOffset(new Date(guess), tz);
  let t = guess - off;
  const off2 = tzOffset(new Date(t), tz);
  if (off2 !== off) { t = guess - off2; }
  return new Date(t);
}

/** Date du jour (année, mois, jour) dans le fuseau du studio. */
export function studioToday(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: COACHING.studioTimeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get("year"), m: get("month") - 1, d: get("day") };
}

export const dayKey = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

export type Slot = { id: string; date: Date };

/** Créneaux proposés un jour donné (heure du studio), filtrés par délai minimum et horizon. */
export function slotsFor(y: number, m: number, d: number, now: Date): Slot[] {
  const key = dayKey(y, m, d);
  if (COACHING.exceptions.includes(key)) { return []; }
  const weekday = ((new Date(Date.UTC(y, m, d)).getUTCDay() + 6) % 7) + 1; // 1 = lundi … 7 = dimanche
  const times = COACHING.weekly[weekday] ?? [];
  const min = now.getTime() + COACHING.minNoticeHours * 3600000;
  const max = now.getTime() + COACHING.horizonWeeks * 7 * 86400000;
  return times
    .map((t) => {
      const [h, mi] = t.split(":").map(Number);
      return { id: `${key}T${t}`, date: wallTime(y, m, d, h, mi, COACHING.studioTimeZone) };
    })
    .filter((s) => s.date.getTime() >= min && s.date.getTime() <= max);
}

/** Mois consultables : du mois en cours à celui qui contient la fin de l'horizon. */
export function monthRange(now: Date) {
  const start = studioToday(now);
  const end = studioToday(new Date(now.getTime() + COACHING.horizonWeeks * 7 * 86400000));
  const list: { y: number; m: number }[] = [];
  let y = start.y;
  let m = start.m;
  while (y < end.y || (y === end.y && m <= end.m)) {
    list.push({ y, m });
    m += 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
  }
  return list;
}
