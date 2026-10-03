import { cn } from "@/lib/cn";

type Tone = "cream" | "sage" | "paper" | "blush" | "olive";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  sage: "bg-sage text-ink",
  paper: "bg-paper text-ink",
  blush: "bg-blush text-ink",
  olive: "bg-olive text-white",
};

/** Sección con fondo alternado, padding 96px / márgenes 80px (desktop) y contenedor de 1200px. */
export function Section({
  tone = "cream",
  id,
  className,
  innerClassName,
  labelledBy,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 px-5 py-10 sm:px-10 sm:py-14 lg:px-20 lg:py-24", tones[tone], className)}>
      <div className={cn("mx-auto w-full max-w-[1200px]", innerClassName)}>{children}</div>
    </section>
  );
}
