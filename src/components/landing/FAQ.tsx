import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui";
import { faqs } from "../../../config/faq";

/** Acordeón con <details>/<summary>: funciona sin JavaScript y es accesible por defecto. */
export function FAQ() {
  if (faqs.length === 0) return null;
  return (
    <Section tone="sage" id="faq" labelledBy="titulo-faq">
      <div className="reveal mb-10 max-w-2xl">
        <p className="eyebrow mb-3">Antes de escribirnos</p>
        <h2 id="titulo-faq" className="t-h2">
          ¿Dudas? Te las <em>respondemos</em>
        </h2>
      </div>
      <div className="reveal mx-auto flex max-w-3xl flex-col gap-4">
        {faqs.map((f) => (
          <details key={f.question} className="group rounded-card border border-line bg-paper open:bg-white">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-xl font-bold [&::-webkit-details-marker]:hidden">
              {f.question}
              <ChevronDown size={26} strokeWidth={1.7} aria-hidden className="shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-6 pb-6 text-xl text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
