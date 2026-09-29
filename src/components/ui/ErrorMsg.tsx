import { CircleAlert } from "lucide-react";

/** Error en lenguaje simple, con ícono + texto (nunca solo color). */
export function ErrorMsg({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="flex items-start gap-2 text-lg font-bold text-error">
      <CircleAlert size={24} strokeWidth={1.7} aria-hidden className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
