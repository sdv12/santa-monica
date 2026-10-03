import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui";
import { faqs } from "../../../config/faq";

/** Acordeón con <details>/<summary>: funciona sin JavaScript y es accesible por defecto. */
export function FAQ() {
  if (faqs.length === 0) return null;
  return (
    <Section tone="sage" id="faq" labelledBy="titulo-faq">
      <div className="reveal mb-6 max-w-2xl sm:mb-8 lg:mb-10">
        <p className="eyebrow mb-3">Antes de escribirnos</p>
        <h2 id="titulo-faq" className="t-h2">
          ¿Dudas? Te las <em>respondemos</em>
        </h2>
      </div>
      <div className="reveal mx-auto flex max-w-3xl flex-col gap-3 sm:gap-4">
        {faqs.map((f) => (
          <details key={f.question} className="group rounded-card border border-line bg-paper open:bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-xl font-bold sm:min-h-16 sm:px-6 sm:py-4 [&::-webkit-details-marker]:hidden">
              {f.question}
              <ChevronDown size={26} strokeWidth={1.7} aria-hidden className="shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-4 text-xl text-muted sm:px-6 sm:pb-6">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
