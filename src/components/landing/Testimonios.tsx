import { Star, UserRound } from "lucide-react";
import { HAccordion, Section } from "@/components/ui";
import { testimonials } from "../../../config/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div aria-hidden className="flex gap-1 text-ochre">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={20} strokeWidth={1.7} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-line-strong" : undefined} />
        ))}
      </div>
      <span className="text-base font-bold text-muted">{rating} de 5</span>
    </div>
  );
}

function Person({ name, date }: { name: string; date: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-olive">
        <UserRound size={26} strokeWidth={1.7} />
      </span>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-base text-muted">{date}</p>
      </div>
    </div>
  );
}

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

      {/* Celular: acordeón horizontal, se despliega hacia la derecha */}
      <div className="reveal sm:hidden">
        <HAccordion
          label="Reseñas de huéspedes"
          items={testimonials.map((t, i) => ({
            id: `${i}`,
            short: `${i + 1}`,
            title: t.name,
            children: (
              <>
                <Person name={t.name} date={t.date} />
                <Stars rating={t.rating} />
                <blockquote className="text-xl text-ink">“{t.quote}”</blockquote>
              </>
            ),
          }))}
        />
      </div>

      {/* Tablet y escritorio: tarjetas */}
      <div className="hidden gap-6 sm:grid md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="reveal flex flex-col gap-4 rounded-card border border-line bg-cream p-7">
            <Person name={t.name} date={t.date} />
            <Stars rating={t.rating} />
            <blockquote className="text-xl text-ink">“{t.quote}”</blockquote>
          </figure>
        ))}
      </div>
    </Section>
  );
}
