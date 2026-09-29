"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

/** Selector − / + con botones grandes. Manda su valor en un campo oculto (`name`) para formularios. */
export function Counter({
  label,
  name,
  value: controlled,
  onChange,
  defaultValue = 2,
  min = 1,
  max = 20,
  unit = ["persona", "personas"],
  compact,
}: {
  label: string;
  name?: string;
  value?: number;
  onChange?: (n: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  unit?: [string, string];
  compact?: boolean;
}) {
  const [inner, setInner] = useState(defaultValue);
  const value = controlled ?? inner;
  const set = (n: number) => {
    const next = Math.min(max, Math.max(min, n));
    setInner(next);
    onChange?.(next);
  };
  const btn = cn(
    "flex shrink-0 items-center justify-center rounded-full bg-olive text-white hover:bg-[#28331f] disabled:cursor-not-allowed disabled:opacity-40",
    compact ? "h-[52px] w-[52px]" : "h-14 w-14",
  );
  return (
    <div className="flex flex-col gap-2">
      <span id={`${name ?? label}-counter`} className="text-xl font-bold">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={`${name ?? label}-counter`}
        className={cn("flex items-center justify-between gap-2 rounded-full border-2 border-line-strong bg-white px-1", compact ? "min-h-[60px]" : "min-h-16")}
      >
        <button type="button" className={btn} onClick={() => set(value - 1)} disabled={value <= min} aria-label={`Menos ${unit[1]}`}>
          <Minus size={26} strokeWidth={2} aria-hidden />
        </button>
        <output aria-live="polite" className="text-xl font-bold">
          {value} {value === 1 ? unit[0] : unit[1]}
        </output>
        <button type="button" className={btn} onClick={() => set(value + 1)} disabled={value >= max} aria-label={`Más ${unit[1]}`}>
          <Plus size={26} strokeWidth={2} aria-hidden />
        </button>
      </div>
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
