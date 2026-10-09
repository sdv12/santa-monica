import { ChevronDown } from "lucide-react";
import { ArcBadge } from "@/components/ui";

const steps = [
  {
    title: "Respondé los pedidos",
    text: "En \"Para responder\" vas a ver los pedidos nuevos. Aceptalo o rechazalo, y escribile por WhatsApp para coordinar la seña.",
  },
  {
    title: "Marcá la seña cuando llegue",
    text: "En \"Próximas estadías\", tocá \"Marcar seña recibida\" apenas te transfieran. Así se sabe de un vistazo quién ya pagó.",
  },
  {
    title: "Usá el calendario",
    text: "Bloqueá fechas para mantenimiento o uso personal, y cargá con \"+ Nueva reserva\" los pedidos que te lleguen por teléfono.",
  },
];

/** Recordatorio breve de cómo se usa el panel, en 3 pasos. Se puede cerrar y volver a abrir. */
export function ComoFunciona() {
  return (
    <details className="group rounded-card border border-line bg-paper open:bg-white">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-xl font-bold sm:px-7 [&::-webkit-details-marker]:hidden">
        Cómo funciona el panel, en 3 pasos
        <ChevronDown size={26} strokeWidth={1.7} aria-hidden className="shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-4 px-5 pb-6 sm:grid-cols-3 sm:gap-5 sm:px-7">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-col gap-3">
            <ArcBadge n={i + 1} />
            <p className="text-lg font-bold">{s.title}</p>
            <p className="text-base text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
