"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button, Field } from "@/components/ui";
import { Calendar, type DayMark, type DayState } from "@/components/calendar/Calendar";
import { AvisoFecha } from "@/components/landing/AvisoFecha";
import { longWeekendDays, type CalendarDay } from "@/lib/calendar-days";
import { formatShort, type ISO } from "@/lib/dates";
import { bloquear } from "@/app/admin/actions";
import { FeedbackMsg, useAction } from "./useAction";

/** Calendario del panel: estados de reserva, el modo "Bloquear fechas" y los feriados/eventos. */
export function AdminCalendar({ states, days = [], size = "md" }: { states: Record<ISO, DayState>; days?: CalendarDay[]; size?: "md" | "lg" }) {
  const [blocking, setBlocking] = useState(false);
  const [start, setStart] = useState<ISO | null>(null);
  const [end, setEnd] = useState<ISO | null>(null);
  const [reason, setReason] = useState("");
  const [openDay, setOpenDay] = useState<CalendarDay | null>(null);
  const { pending, feedback, run, setFeedback } = useAction();

  const marks: Record<ISO, DayMark> = Object.fromEntries(days.map((d) => [d.date, { kind: d.kind, name: d.name, text: d.text }]));
  const byDate = new Map(days.map((d) => [d.date, d]));

  const reset = () => {
    setBlocking(false);
    setStart(null);
    setEnd(null);
    setReason("");
  };

  function pick(iso: ISO) {
    setFeedback(null);
    if (!start || end || iso < start) {
      setStart(iso);
      setEnd(null);
    } else setEnd(iso); // el último día bloqueado se incluye
  }

  return (
    <div className="flex flex-col gap-5">
      <Calendar
        states={states}
        marks={marks}
        onMarkClick={blocking ? undefined : (iso) => setOpenDay(byDate.get(iso) ?? null)}
        longWeekend={longWeekendDays(days)}
        size={size}
        selectionTone="terra"
        start={blocking ? start : null}
        end={blocking ? (end ?? start) : null}
        onPick={blocking ? pick : undefined}
      />
      {openDay && <AvisoFecha day={openDay} onClose={() => setOpenDay(null)} />}

      {!blocking ? (
        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={() => setBlocking(true)} icon={<Lock size={24} strokeWidth={1.7} aria-hidden />}>
            Bloquear fechas
          </Button>
          <p className="text-base text-muted">Para mantenimiento o uso personal de la casa.</p>
          <FeedbackMsg feedback={feedback} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 rounded-2xl bg-blush p-5">
          <p className="text-xl font-bold">Tocá el primer día y después el último día que querés bloquear.</p>
          <p className="text-xl" aria-live="polite">
            {start ? (
              <>
                Bloqueo: <b>{formatShort(start)}</b>
                {end && end !== start ? (
                  <>
                    {" "}
                    hasta <b>{formatShort(end)}</b>
                  </>
                ) : null}{" "}
                (los dos días incluidos)
              </>
            ) : (
              "Todavía no elegiste ningún día."
            )}
          </p>
          <Field label="Motivo" optional placeholder="Ej.: arreglo del techo" value={reason} onChange={(e) => setReason(e.target.value)} />
          <FeedbackMsg feedback={feedback} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              disabled={pending || !start}
              onClick={() => start && run(() => bloquear(start, end ?? start, reason), reset)}
            >
              {pending ? "Guardando…" : "Bloquear estas fechas"}
            </Button>
            <Button variant="outline" disabled={pending} onClick={reset}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
