"use client";

import { useState } from "react";
import { CalendarHeart } from "lucide-react";
import { formatLong } from "@/lib/dates";
import type { CalendarDay } from "@/lib/calendar-days";
import { AvisoFecha } from "./AvisoFecha";

/** Próximos feriados y eventos. Cada uno abre un aviso con invitación a reservar esas fechas. */
export function EventosLista({ days }: { days: CalendarDay[] }) {
  const [open, setOpen] = useState<CalendarDay | null>(null);
  if (days.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="t-h3">
        Feriados y <em>eventos</em>
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2">
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
    </div>
  );
}
