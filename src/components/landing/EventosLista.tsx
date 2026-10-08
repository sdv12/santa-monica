"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarHeart, X } from "lucide-react";
import { Button } from "@/components/ui";
import { formatLong, type ISO } from "@/lib/dates";
import type { CalendarDay } from "@/lib/calendar-days";

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

      {open && <Aviso day={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Aviso({ day, onClose }: { day: CalendarDay; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  const href = `/reservar?llegada=${day.date as ISO}`;
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="aviso-titulo"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[min(92vw,34rem)] rounded-card border border-line bg-paper p-6 text-ink shadow-soft backdrop:bg-ink/50 sm:p-8"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="eyebrow">{day.kind === "feriado" ? "Fin de semana largo" : "Evento en la zona"}</p>
        <button type="button" onClick={onClose} aria-label="Cerrar" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-olive text-olive hover:bg-sage">
          <X size={26} strokeWidth={1.7} aria-hidden />
        </button>
      </div>
      <h2 id="aviso-titulo" className="t-h3 mb-2">
        {day.name}
      </h2>
      <p className="mb-2 text-xl font-bold capitalize">{formatLong(day.date)}</p>
      <p className="mb-8 text-xl text-muted">{day.text}</p>
      <div className="flex flex-col gap-3 sm:flex-row-reverse">
        <Button href={href} size="lg" className="sm:flex-1">
          Ver fechas para reservar
        </Button>
        <Button variant="outline" onClick={onClose} className="sm:flex-1">
          Ahora no
        </Button>
      </div>
    </dialog>
  );
}
