import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui";
import { localGuide } from "../../../config/local-guide";

/** Acordeón con <details>/<summary> (igual que el FAQ): cada categoría cerrada hasta que se toca. */
export function GuiaLocal() {
  if (localGuide.length === 0) return null;
  return (
    <Section tone="paper" labelledBy="titulo-guia">
      <div className="reveal mb-6 max-w-2xl sm:mb-8 lg:mb-10">
        <p className="eyebrow mb-3">Para el resto del día</p>
        <h2 id="titulo-guia" className="t-h2">
          Disfrutá <em>Córdoba</em>
        </h2>
        <p className="t-lead mt-2">Trekkings, fiestas, dónde comer y cómo moverse, cerca de la casa.</p>
      </div>

      <div className="reveal mx-auto flex max-w-3xl flex-col gap-3 sm:gap-4">
        {localGuide.map((g) => (
          <details key={g.title} className="group rounded-card border border-line bg-cream open:bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-xl font-bold sm:min-h-16 sm:px-6 sm:py-4 [&::-webkit-details-marker]:hidden">
              <span>
                {g.title} <span className="font-sans text-base font-normal text-muted">({g.items.length})</span>
              </span>
              <ChevronDown size={26} strokeWidth={1.7} aria-hidden className="shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="flex flex-col divide-y divide-line px-5 pb-4 sm:px-6 sm:pb-6">
              {g.items.map((it) => (
                <li key={it.name} className="py-3">
                  <p className="text-lg font-bold">{it.name}</p>
                  <p className="text-base text-muted">{it.detail}</p>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </Section>
  );
}
