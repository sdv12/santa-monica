"use client";

import { useState } from "react";
import { Calendar, type DayMark } from "@/components/calendar/Calendar";
import type { OccupiedRange } from "@/lib/availability";
import { longWeekendDays, type CalendarDay } from "@/lib/calendar-days";
import type { ISO } from "@/lib/dates";
import { AvisoFecha } from "./AvisoFecha";

/** El calendario de la landing: tocar un feriado o evento marcado avisa cuál es. */
export function DisponibilidadCalendario({ occupied, days }: { occupied: OccupiedRange[]; days: CalendarDay[] }) {
  const [open, setOpen] = useState<CalendarDay | null>(null);
  const marks: Record<ISO, DayMark> = Object.fromEntries(days.map((d) => [d.date, { kind: d.kind, name: d.name, text: d.text }]));
  const byDate = new Map(days.map((d) => [d.date, d]));

  return (
    <>
      <Calendar occupied={occupied} marks={marks} onMarkClick={(iso) => setOpen(byDate.get(iso) ?? null)} longWeekend={longWeekendDays(days)} size="md" />
      {open && <AvisoFecha day={open} onClose={() => setOpen(null)} />}
    </>
  );
}
