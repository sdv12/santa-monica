import { cn } from "@/lib/cn";

/** Número de paso dentro de un arco. */
export function ArcBadge({ n, className }: { n: number | string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "arc-sm inline-flex h-[72px] w-[60px] shrink-0 items-center justify-center bg-olive pt-2 font-display text-3xl font-semibold text-white",
        className,
      )}
    >
      {n}
    </span>
  );
}
