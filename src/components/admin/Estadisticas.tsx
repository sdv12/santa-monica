"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui";
import { formatMoney } from "@/lib/settings";
import { statsForMonth, statsForYear } from "@/lib/admin-stats";
import type { Booking } from "@/lib/data";
import { MONTHS } from "@/lib/dates";
import { cn } from "@/lib/cn";

/** Caja de estadísticas: reservas, noches, ingreso estimado y seña, por mes o por año. */
export function Estadisticas({ bookings }: { bookings: Booking[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [range, setRange] = useState<"mes" | "año">("mes");

  const stats = useMemo(() => (range === "mes" ? statsForMonth(bookings, year, month) : statsForYear(bookings, year)), [bookings, year, month, range]);

  const goMonth = (delta: number) => {
    const n = year * 12 + month + delta;
    setYear(Math.floor(n / 12));
    setMonth(((n % 12) + 12) % 12);
  };

  const tabClass = (active: boolean) =>
    cn("min-h-12 rounded-full px-5 text-lg font-bold", active ? "bg-olive text-white" : "border-2 border-line-strong text-ink hover:bg-sage");

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="t-h3">
          Estadísticas de <em>reservas</em>
        </h2>
        <div className="flex gap-2">
          <button type="button" className={tabClass(range === "mes")} onClick={() => setRange("mes")}>
            Por mes
          </button>
          <button type="button" className={tabClass(range === "año")} onClick={() => setRange("año")}>
            Por año
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        {range === "mes" && (
          <button type="button" onClick={() => goMonth(-1)} aria-label="Mes anterior" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-olive text-olive hover:bg-sage">
            <ChevronLeft size={24} strokeWidth={1.7} aria-hidden />
          </button>
        )}
        <p className="min-w-40 text-center font-display text-2xl font-semibold capitalize">
          {range === "mes" ? `${MONTHS[month]} ${year}` : year}
        </p>
        {range === "mes" ? (
          <button type="button" onClick={() => goMonth(1)} aria-label="Mes siguiente" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-olive text-olive hover:bg-sage">
            <ChevronRight size={24} strokeWidth={1.7} aria-hidden />
          </button>
        ) : (
          <div className="flex gap-2">
            <button type="button" onClick={() => setYear((y) => y - 1)} aria-label="Año anterior" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-olive text-olive hover:bg-sage">
              <ChevronLeft size={24} strokeWidth={1.7} aria-hidden />
            </button>
            <button type="button" onClick={() => setYear((y) => y + 1)} aria-label="Año siguiente" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-olive text-olive hover:bg-sage">
              <ChevronRight size={24} strokeWidth={1.7} aria-hidden />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Reservas" value={String(stats.count)} />
        <Stat label="Noches" value={String(stats.nights)} />
        <Stat label="Confirmadas" value={String(stats.confirmed)} />
        <Stat label="Pendientes" value={String(stats.pending)} />
        <Stat label="Ingreso estimado" value={stats.revenue != null ? formatMoney(stats.revenue) : "A confirmar"} wide />
        <Stat label="Seña recibida" value={String(stats.depositReceived)} />
        <Stat label="Falta la seña" value={String(stats.depositPending)} />
        <Stat label="Por teléfono" value={`${stats.bySource.admin} de ${stats.count}`} />
      </div>
      <p className="text-base text-muted">
        "Por teléfono" son las reservas que cargó el administrador a mano; el resto llegó por la web. Todavía no se guarda la forma de pago (transferencia, efectivo, etc.) de cada una — se puede sumar si hace falta.
      </p>
    </Card>
  );
}

function Stat({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-2xl bg-sage p-4", wide && "col-span-2")}>
      <p className="text-base font-bold text-muted">{label}</p>
      <p className="font-display text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
