"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type HItem = { id: string; short: string; title: string; children: React.ReactNode };

/**
 * Acordeón horizontal (pensado para celular): una tira angosta por ítem, y el ítem abierto se
 * despliega hacia la derecha ocupando el resto del ancho. Tocar una tira la abre.
 * El título siempre se muestra en el panel abierto (no solo el tamaño indica cuál está abierto).
 */
export function HAccordion({ items, label, initial = 0 }: { items: HItem[]; label: string; initial?: number }) {
  const [open, setOpen] = useState(initial);
  return (
    <div role="group" aria-label={label} className="flex items-stretch gap-2">
      {items.map((it, i) => {
        const isOpen = i === open;
        if (isOpen) {
          return (
            <section key={it.id} className="flex min-w-0 flex-1 flex-col gap-3 rounded-card border-2 border-olive bg-paper p-5">
              <h3 className="t-h3 flex items-center gap-3">
                <span aria-hidden className="arc-sm flex h-10 w-9 shrink-0 items-center justify-center bg-olive pt-1 font-display text-xl font-semibold text-white">
                  {it.short}
                </span>
                {it.title}
              </h3>
              {it.children}
            </section>
          );
        }
        return (
          <button
            key={it.id}
            type="button"
            aria-expanded={false}
            aria-label={`Abrir: ${it.title}`}
            onClick={() => setOpen(i)}
            className={cn(
              "flex w-14 shrink-0 flex-col items-center justify-start gap-3 rounded-card border border-line bg-paper py-4 font-display text-xl font-semibold text-olive",
            )}
          >
            <span aria-hidden>{it.short}</span>
            <ChevronRight size={24} strokeWidth={1.9} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
