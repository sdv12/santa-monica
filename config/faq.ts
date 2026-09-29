/**
 * Preguntas frecuentes de la landing.
 *
 * ⚠️ MOCK: las respuestas de acá abajo son de ejemplo (inventadas para ver cómo queda la sección),
 * no la política real de la casa. Antes de publicar, reemplazá cada una por la respuesta verdadera
 * (mascotas, cancelación, Wi-Fi, etc.) — si se dejan así, le van a prometer al huésped algo que
 * capaz no es cierto.
 */
export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "¿Aceptan mascotas?",
    answer: "Sí, aceptamos mascotas sin cargo extra. Te pedimos que no suban a los sillones ni a las camas, y que los mantengas atados si hay otras visitas.",
  },
  {
    question: "¿Tienen Wi-Fi?",
    answer: "Sí, toda la casa tiene Wi-Fi. La señal es un poco más floja en el quincho, pero alcanza bien para las redes y para trabajar.",
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer: "Si cancelás hasta 7 días antes de la llegada, te devolvemos la seña completa. Después de eso, la seña queda como parte del pago de tu próxima reserva.",
  },
  {
    question: "¿La casa incluye ropa de cama y toallas?",
    answer: "Sí, la casa incluye sábanas, toallas y repasadores. Lo único que tenés que traer es tu toalla de pileta.",
  },
  {
    question: "¿Hay comercios cerca?",
    answer: "Sí, a 5 cuadras hay un almacén y una farmacia. El supermercado más cercano queda a 10 minutos en auto.",
  },
];
