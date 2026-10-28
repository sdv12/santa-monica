"use client";

import { useState } from "react";
import { CalendarHeart, ChevronDown } from "lucide-react";
import { formatLong } from "@/lib/dates";
import type { CalendarDay } from "@/lib/calendar-days";
import { AvisoFecha } from "./AvisoFecha";

/** Próximos feriados y eventos, en acordeón (igual que el FAQ). Cada uno abre un aviso con invitación a reservar. */
export function EventosLista({ days }: { days: CalendarDay[] }) {
  const [open, setOpen] = useState<CalendarDay | null>(null);
  if (days.length === 0) return null;

  return (
    <details className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold [&::-webkit-details-marker]:hidden">
        <span>
          Feriados y eventos <span className="font-sans text-base font-normal text-muted">({days.length})</span>
        </span>
        <ChevronDown size={26} strokeWidth={1.7} aria-hidden className="shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {days.map((d) => (
          <li key={d.date + d.name}>
            <button
              type="button"
              onClick={() => setOpen(d)}
              className="flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 border-line-strong bg-white px-4 py-3 text-left hover:bg-sage"
            >
              <CalendarHeart size={24} strokeWidth={1.7} aria-hidden className="shrink-0 text-terra" />
              <span className="flex flex-col">
                <span className="text-lg font-bold">{d.name}</span>
                <span className="text-base text-muted capitalize">{formatLong(d.date)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && <AvisoFecha day={open} onClose={() => setOpen(null)} />}
    </details>
  );
}
