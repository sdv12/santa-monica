"use client";

import { useMemo, useState } from "react";
import { CalendarHeart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatLong } from "@/lib/dates";
import type { CalendarDay } from "@/lib/calendar-days";
import { AvisoFecha } from "./AvisoFecha";

/**
 * Próximos feriados y eventos, en acordeón (igual que el FAQ). Ya vienen filtrados desde hoy en
 * adelante (lo que ya pasó no llega acá). Si hay de más de un año, se agrupan con un selector —
 * así no se hace una lista larga mezclando este año y el que viene.
 */
export function EventosLista({ days }: { days: CalendarDay[] }) {
  const [open, setOpen] = useState<CalendarDay | null>(null);
  const years = useMemo(() => [...new Set(days.map((d) => d.date.slice(0, 4)))].sort(), [days]);
  const [year, setYear] = useState(years[0]);
  if (days.length === 0) return null;

  const shown = days.filter((d) => d.date.slice(0, 4) === year);

  return (
    <details className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold [&::-webkit-details-marker]:hidden">
        <span>
          Feriados y eventos <span className="font-sans text-base font-normal text-muted">({days.length})</span>
        </span>
        <ChevronDown size={26} strokeWidth={1.7} aria-hidden className="shrink-0 transition-transform group-open:rotate-180" />
      </summary>

      <div className="mt-3 flex flex-col gap-4">
        {years.length > 1 && (
          <div role="group" aria-label="Elegir año" className="flex gap-2">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                aria-pressed={y === year}
                className={cn(
                  "min-h-11 rounded-full px-5 text-base font-bold",
                  y === year ? "bg-olive text-white" : "border-2 border-line-strong text-ink hover:bg-sage",
                )}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        <ul className="grid gap-3 sm:grid-cols-2">
          {shown.map((d) => (
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
      </div>

      {open && <AvisoFecha day={open} onClose={() => setOpen(null)} />}
    </details>
  );
}
