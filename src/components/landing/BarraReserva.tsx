"use client";

import { useState } from "react";
import { CalendarSearch } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { addDays, todayISO } from "@/lib/dates";
import { Button, Counter, Field } from "@/components/ui";

/** Lleva a /reservar con llegada, salida y personas precargadas (?llegada=&salida=&personas=). */
export function BarraReserva() {
  const site = useSite();
  const today = todayISO();
  const [llegada, setLlegada] = useState("");
  const [salida, setSalida] = useState("");
  const maxGuests = Number(site.maxGuests) || 20;

  return (
    <form
      action="/reservar"
      method="get"
      aria-label="Consultar disponibilidad"
      className="rounded-card border border-line bg-paper p-4 shadow-soft sm:p-8"
    >
      <div className="grid items-end gap-4 sm:gap-5 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <Field
          label="Llegada"
          name="llegada"
          type="date"
          min={today}
          value={llegada}
          onChange={(e) => {
            setLlegada(e.target.value);
            if (salida && e.target.value >= salida) setSalida("");
          }}
        />
        <Field label="Salida" name="salida" type="date" min={llegada ? addDays(llegada, 1) : addDays(today, 1)} value={salida} onChange={(e) => setSalida(e.target.value)} />
        <Counter label="Personas" name="personas" compact max={maxGuests} />
        <Button type="submit" size="lg" icon={<CalendarSearch size={28} strokeWidth={1.7} aria-hidden />}>
          Ver disponibilidad
        </Button>
      </div>
    </form>
  );
}
