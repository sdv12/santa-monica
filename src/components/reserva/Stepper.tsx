import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const steps = ["Fechas", "Tus datos", "Confirmar"];

/** Paso actual relleno olive; los demás con borde. El actual se indica también con aria-current. */
export function Stepper({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol aria-label="Pasos de la reserva" className="grid grid-cols-3 gap-2 sm:gap-3">
      {steps.map((label, i) => {
        const n = i + 1;
        const active = n === current;
        const done = n < current;
        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className={cn(
              "flex min-h-14 items-center justify-center gap-2 rounded-full border-2 px-2 text-base font-bold sm:text-xl",
              active ? "border-olive bg-olive text-white" : "border-line-strong bg-paper text-ink",
            )}
          >
            <span aria-hidden className={cn("flex h-7 w-7 items-center justify-center rounded-full text-base", active ? "bg-white text-olive" : "bg-sage-deep text-olive")}>
              {done ? <Check size={18} strokeWidth={2.4} /> : n}
            </span>
            <span>
              <span className="sr-only">Paso {n}: </span>
              {label}
              {done && <span className="sr-only"> (completado)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
