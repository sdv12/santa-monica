import { Star, UserRound } from "lucide-react";
import { Section } from "@/components/ui";
import { testimonials } from "../../../config/testimonials";

export function Testimonios() {
  if (testimonials.length === 0) return null;
  return (
    <Section tone="paper" labelledBy="titulo-testimonios">
      <div className="reveal mb-6 max-w-2xl sm:mb-8 lg:mb-10">
        <p className="eyebrow mb-3">Huéspedes</p>
        <h2 id="titulo-testimonios" className="t-h2">
          Lo que cuentan nuestros <em>huéspedes</em>
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="reveal flex flex-col gap-3 rounded-card border border-line bg-cream p-5 sm:gap-4 sm:p-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-olive">
                <UserRound size={26} strokeWidth={1.7} />
              </span>
              <figcaption>
                <p className="font-bold">{t.name}</p>
                <p className="text-base text-muted">{t.date}</p>
              </figcaption>
            </div>
            <div className="flex items-center gap-2">
              <div aria-hidden className="flex gap-1 text-ochre">
                {Array.from({ length: 5 }, (_, i2) => (
                  <Star key={i2} size={20} strokeWidth={1.7} fill={i2 < t.rating ? "currentColor" : "none"} className={i2 >= t.rating ? "text-line-strong" : undefined} />
                ))}
              </div>
              <span className="text-base font-bold text-muted">{t.rating} de 5</span>
            </div>
            <blockquote className="text-xl text-ink">“{t.quote}”</blockquote>
          </figure>
        ))}
      </div>
    </Section>
  );
}
