/**
 * Reseñas de huéspedes. Quedan en [corchetes] a propósito: no hay que inventar comentarios ni
 * nombres. Reemplazalos por comentarios reales (con el permiso de cada huésped) cuando los tengas;
 * mientras tanto, dejar `testimonials` como [] oculta toda la sección.
 */
export type Testimonial = { name: string; date: string; quote: string; rating: number };

export const testimonials: Testimonial[] = [
  { name: "[Nombre y ciudad del huésped]", date: "[Mes y año]", quote: "[Comentario real de un huésped, con su permiso.]", rating: 5 },
  { name: "[Nombre y ciudad del huésped]", date: "[Mes y año]", quote: "[Comentario real de un huésped, con su permiso.]", rating: 5 },
  { name: "[Nombre y ciudad del huésped]", date: "[Mes y año]", quote: "[Comentario real de un huésped, con su permiso.]", rating: 5 },
];
