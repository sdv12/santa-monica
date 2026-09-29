/**
 * Reseñas de huéspedes.
 *
 * ⚠️ MOCK: los nombres y comentarios de acá abajo son inventados, para ver cómo queda la sección
 * con contenido (no son huéspedes reales). Antes de publicar, reemplazalos por comentarios reales,
 * con el permiso de cada huésped — nunca dejar nombres o citas inventadas presentadas como reales.
 * Si todavía no tenés reseñas reales, dejar `testimonials` como [] oculta toda la sección.
 */
export type Testimonial = { name: string; date: string; quote: string; rating: number };

export const testimonials: Testimonial[] = [
  {
    name: "Marta y Rubén, CABA",
    date: "Enero 2026",
    quote: "Increíble paz, ideal para desconectar en familia. La atención por WhatsApp fue perfecta de principio a fin.",
    rating: 5,
  },
  {
    name: "Silvina, Rosario",
    date: "Marzo 2026",
    quote: "La casa es tal cual las fotos, muy limpia y bien equipada. La pileta y el quincho fueron el punto alto del viaje.",
    rating: 5,
  },
  {
    name: "Diego y Cintia, Córdoba Capital",
    date: "Julio 2026",
    quote: "Fuimos por un fin de semana largo y nos quedamos con ganas de más. Nos ayudaron un montón para llegar bien.",
    rating: 5,
  },
];
