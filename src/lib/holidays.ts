import type { ISO } from "./dates";

export type Holiday = { date: ISO; name: string; text: string };

const TYPE_TEXT: Record<string, string> = {
  inamovible: "Feriado nacional.",
  trasladable: "Feriado nacional (trasladable).",
  puente: "Puente turístico, no laborable.",
  nolaborable: "Día no laborable.",
};

/**
 * Feriados nacionales de Argentina, desde la API pública api.argentinadatos.com (incluye puentes
 * turísticos). Se cachea un día. Si la API falla, no se marca ningún feriado para ese año —
 * mejor no mostrar nada que inventar una fecha.
 */
export async function getHolidays(year: number): Promise<Holiday[]> {
  try {
    const res = await fetch(`https://api.argentinadatos.com/v1/feriados/${year}`, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) throw new Error(`feriados ${year}: HTTP ${res.status}`);
    const data = (await res.json()) as { fecha: string; tipo: string; nombre: string }[];
    return data.map((d) => ({ date: d.fecha as ISO, name: d.nombre, text: TYPE_TEXT[d.tipo] ?? "Feriado." }));
  } catch (e) {
    console.error("[getHolidays]", e);
    return [];
  }
}

/** Feriados del año de `today` y del siguiente, para cubrir los meses que se ven en el calendario. */
export async function getUpcomingHolidays(today: ISO): Promise<Holiday[]> {
  const year = Number(today.slice(0, 4));
  const [a, b] = await Promise.all([getHolidays(year), getHolidays(year + 1)]);
  return [...a, ...b];
}
