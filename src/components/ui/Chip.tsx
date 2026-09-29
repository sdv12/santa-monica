import { Check, Clock, Ban } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "ok" | "pending" | "blocked" | "neutral";

const tones: Record<Tone, string> = {
  ok: "bg-sage-deep text-olive border-2 border-olive/40",
  pending: "bg-pending-bg text-ink border-2 border-dashed border-pending-border",
  blocked: "bg-blocked-bg text-blocked-fg border-2 border-line-strong",
  neutral: "bg-paper text-ink border-2 border-line-strong",
};

const icons: Record<Tone, React.ReactNode> = {
  ok: <Check size={20} strokeWidth={2} aria-hidden />,
  pending: <Clock size={20} strokeWidth={1.7} aria-hidden />,
  blocked: <Ban size={20} strokeWidth={1.7} aria-hidden />,
  neutral: null,
};

/** Etiqueta de estado: siempre lleva texto (y ícono/borde), nunca solo color. */
export function Chip({ tone = "neutral", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base font-bold", tones[tone], className)}>
      {icons[tone]}
      {children}
    </span>
  );
}
