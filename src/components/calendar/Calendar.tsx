"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTHS, WEEKDAYS, addDays, diffDays, formatLong, monthCells, todayISO, type ISO } from "@/lib/dates";
import type { OccupiedRange } from "@/lib/availability";
import { cn } from "@/lib/cn";

export type DayState = "booked" | "pending" | "blocked";

/** Feriado o evento que se marca con un puntito en el día. Tocar el día muestra el nombre. */
export type DayMark = { kind: "feriado" | "evento"; name: string; text: string };

type Props = {
  /** Días ocupados (vista pública). */
  occupied?: OccupiedRange[];
  /** Feriados y eventos a marcar (solo se ven en la vista pública, con puntito y en el texto). */
  marks?: Record<ISO, DayMark>;
  /** Si se pasa, tocar un día marcado (feriado/evento) avisa cuál es, en vez de solo el puntito. */
  onMarkClick?: (iso: ISO, mark: DayMark) => void;
  /** Días que forman parte de un fin de semana largo: se pintan con un fondo propio (ver lib/calendar-days). */
  longWeekend?: Set<ISO>;
  /** Estados detallados por día (panel del admin). Si se pasa, reemplaza a `occupied`. */
  states?: Record<ISO, DayState>;
  /** Solo lectura si no se pasa onPick. */
  onPick?: (iso: ISO) => void;
  start?: ISO | null;
  end?: ISO | null;
  /** Celdas de 72px (paso de fechas) o más compactas (landing). */
  size?: "md" | "lg";
  /** Permite tocar días que la vista marca como ocupados (ej.: el día de salida). Por defecto, no. */
  pickable?: (iso: ISO) => boolean;
  /** Color de la selección: olive (reservar) o terracota (bloquear, para no confundirse con "Reservado"). */
  selectionTone?: "olive" | "terra";
  className?: string;
};

const MAX_MONTHS_AHEAD = 18;

export function Calendar({ occupied = [], marks, onMarkClick, longWeekend, states, onPick, start, end, size = "md", pickable, selectionTone = "olive", className }: Props) {
  const today = todayISO();
  const [view, setView] = useState(() => ({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 }));
  const busy = useMemo(() => {
    const set = new Set<ISO>();
    for (const r of occupied) for (let i = 0; i < diffDays(r.start, r.end); i++) set.add(addDays(r.start, i));
    return set;
  }, [occupied]);

  const offset = (view.y - Number(today.slice(0, 4))) * 12 + view.m - (Number(today.slice(5, 7)) - 1);
  const go = (delta: number) =>
    setView(({ y, m }) => {
      const n = y * 12 + m + delta;
      return { y: Math.floor(n / 12), m: n % 12 };
    });

  const cells = monthCells(view.y, view.m);
  const interactive = Boolean(onPick);
  const height = size === "lg" ? "h-14 sm:h-[72px]" : "h-12 sm:h-14";

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={offset <= 0}
          aria-label="Mes anterior"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-olive text-olive hover:bg-sage disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={28} strokeWidth={1.7} aria-hidden />
        </button>
        <h3 aria-live="polite" className="text-center font-display text-2xl font-semibold capitalize sm:text-3xl">
          {MONTHS[view.m]} {view.y}
        </h3>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={offset >= MAX_MONTHS_AHEAD}
          aria-label="Mes siguiente"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-olive text-olive hover:bg-sage disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={28} strokeWidth={1.7} aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {WEEKDAYS.map((w) => (
          <abbr key={w.long} title={w.long} className="pb-1 text-center text-base font-bold uppercase tracking-wide text-muted no-underline">
            {w.short}
          </abbr>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <span key={`gap-${i}`} aria-hidden />;
          const day = Number(iso.slice(8));
          const past = iso < today;
          const dayState = states?.[iso];
          const isBusy = states ? Boolean(dayState) : busy.has(iso);
          const isEdge = iso === start || iso === end;
          const inRange = Boolean(start && end && iso > start && iso < end);
          const canPick = interactive && !past && (pickable ? pickable(iso) : !isBusy);
          const mark = marks?.[iso];
          const canOpenMark = Boolean(mark) && Boolean(onMarkClick) && !canPick;

          const state = isEdge
            ? "elegido"
            : inRange
              ? "dentro del rango"
              : dayState === "booked"
                ? "reservado"
                : dayState === "pending"
                  ? "pendiente"
                  : dayState === "blocked"
                    ? "bloqueado"
                    : isBusy
                      ? "ocupado"
                      : past
                        ? "ya pasó"
                        : "libre";
          const style = isEdge
            ? cn("font-bold text-white", selectionTone === "terra" ? "bg-terra" : "bg-olive")
            : inRange
              ? cn("font-bold text-ink", selectionTone === "terra" ? "bg-blush" : "bg-sage-deep")
              : dayState === "booked"
                ? "bg-occupied-bg text-occupied-fg font-bold line-through"
                : dayState === "pending"
                  ? "border-2 border-dashed border-pending-border bg-pending-bg font-bold text-ink"
                  : dayState === "blocked"
                    ? "bg-blocked-bg text-blocked-fg line-through"
                    : states
                      ? longWeekend?.has(iso)
                        ? "bg-blush font-bold text-ink"
                        : "bg-free-bg font-bold text-free-fg"
                      : isBusy
                        ? "bg-occupied-bg text-occupied-fg font-bold line-through"
                        : past
                          ? "bg-paper text-muted/60"
                          : longWeekend?.has(iso)
                            ? "bg-blush font-bold text-ink"
                            : "bg-free-bg font-bold text-free-fg";
          const classes = cn(
            "relative flex w-full items-center justify-center rounded-2xl text-xl sm:text-2xl",
            height,
            style,
            (canPick || canOpenMark) && !isEdge && !inRange && "hover:brightness-95",
          );
          const label = `${formatLong(iso)}, ${state}${mark ? ` — ${mark.name}${canOpenMark ? ": tocá para ver más" : ""}` : ""}`;
          const content = (
            <>
              {day}
              {mark && <span aria-hidden className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-terra" />}
            </>
          );

          if (canPick) {
            return (
              <button key={iso} type="button" onClick={() => onPick?.(iso)} aria-label={label} aria-pressed={isEdge} className={classes}>
                {content}
              </button>
            );
          }
          if (canOpenMark) {
            return (
              <button key={iso} type="button" onClick={() => onMarkClick?.(iso, mark!)} aria-label={label} className={classes}>
                {content}
              </button>
            );
          }
          return (
            <div key={iso} role={interactive ? "button" : undefined} aria-disabled={interactive ? true : undefined} aria-label={label} className={cn(classes, interactive && "cursor-not-allowed")}>
              {content}
            </div>
          );
        })}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-lg">
        {states ? (
          <>
            <Legend swatch="bg-free-bg font-bold text-free-fg">Libre</Legend>
            <Legend swatch="bg-occupied-bg font-bold text-occupied-fg line-through">Reservado</Legend>
            <Legend swatch="border-2 border-dashed border-pending-border bg-pending-bg">Pendiente</Legend>
            <Legend swatch="bg-blocked-bg text-blocked-fg line-through">Bloqueado</Legend>
          </>
        ) : (
          <>
            <Legend swatch="bg-free-bg font-bold text-free-fg">Disponible</Legend>
            <Legend swatch="bg-occupied-bg font-bold text-occupied-fg line-through">Ocupado</Legend>
          </>
        )}
        {longWeekend && longWeekend.size > 0 && <Legend swatch="bg-blush font-bold text-ink">Fin de semana largo</Legend>}
        {marks && (
          <Legend swatch="border border-line bg-paper" dot>
            {onMarkClick ? "Feriado o evento: tocá el día para ver cuál es" : "Feriado o evento"}
          </Legend>
        )}
        {interactive && <Legend swatch={selectionTone === "terra" ? "bg-terra text-white" : "bg-olive text-white"}>Elegido</Legend>}
      </ul>
    </div>
  );
}

function Legend({ swatch, dot, children }: { swatch: string; dot?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span aria-hidden className={cn("relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", swatch)}>
        {dot && <span className="h-2.5 w-2.5 rounded-full bg-terra" />}
      </span>
      {children}
    </li>
  );
}
