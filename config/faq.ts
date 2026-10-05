/**
 * Preguntas frecuentes de la landing.
 *
 * ⚠️ MOCK: las respuestas marcadas con (MOCK) son de ejemplo, no la política real de la casa.
 * Antes de publicar, reemplazalas por la respuesta verdadera. Las que tienen datos confirmados
 * (cochera, cámaras, lavarropas, horarios) ya están bien.
 *
 * Regla de la casa: NO se aceptan mascotas (no aparece en las preguntas a propósito).
 */
export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "¿Cómo se reserva y se paga?",
    answer:
      "Elegís las fechas y dejás tus datos. Te escribimos por WhatsApp para confirmar y coordinar la seña del 30% por transferencia. El resto se paga al llegar (MOCK: confirmar medio de pago).",
  },
  {
    question: "¿Cuál es el horario de ingreso y de salida?",
    answer: "Ingreso desde las 15:00 y salida hasta las 10:00.",
  },
  {
    question: "¿Hay lugar para estacionar?",
    answer: "Sí, la casa tiene cochera para 2 autos.",
  },
  {
    question: "¿La casa tiene seguridad?",
    answer: "Sí, tiene cámaras de seguridad.",
  },
  {
    question: "¿Tienen Wi-Fi?",
    answer: "Sí, toda la casa tiene Wi-Fi. La señal es un poco más floja en el quincho, pero alcanza para las redes y para trabajar (MOCK).",
  },
  {
    question: "¿La casa incluye ropa de cama y toallas?",
    answer: "Sí, la casa incluye sábanas, toallas y repasadores. Lo único que tenés que traer es tu toalla de pileta (MOCK).",
  },
  {
    question: "¿Hay lavarropas y tendedero?",
    answer: "Sí, la casa tiene lavarropas y tendedero.",
  },
  {
    question: "¿Cómo llego desde Córdoba capital?",
    answer: "Por la ruta, en aproximadamente 1 hora y media (MOCK: completar ruta y tiempo real). Te mandamos la ubicación exacta por WhatsApp.",
  },
  {
    question: "¿Hay Uber o remis en la zona?",
    answer: "Sí, hay Uber y remises en la zona (MOCK: confirmar disponibilidad).",
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer: "Si cancelás hasta 7 días antes de la llegada, te devolvemos la seña completa. Después de eso, la seña queda como parte del pago de tu próxima reserva (MOCK).",
  },
  {
    question: "¿Hay comercios cerca?",
    answer: "Sí, a 5 cuadras hay un almacén y una farmacia. El supermercado más cercano queda a 10 minutos en auto (MOCK).",
  },
];
