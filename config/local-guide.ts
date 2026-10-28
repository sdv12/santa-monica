/**
 * "Para el resto del día": trekkings, fiestas, dónde comer, cómo moverse y distancias.
 *
 * ⚠️ MOCK: lo que queda entre [corchetes] (senderos, miradores, el almacén, el centro del pueblo)
 * sigue siendo de ejemplo. "Para comer" y "A qué distancia está" ya son datos reales confirmados.
 */
export type GuideItem = { name: string; detail: string };
export type GuideGroup = { title: string; items: GuideItem[] };

export const localGuide: GuideGroup[] = [
  {
    title: "Trekking y naturaleza",
    items: [
      { name: "[Sendero cercano]", detail: "[Dificultad y tiempo: completar] · a [X] km de la casa (MOCK)" },
      { name: "[Mirador de las sierras]", detail: "Vistas panorámicas, ideal para el atardecer · a [X] km (MOCK)" },
      { name: "[Cascada o arroyo]", detail: "Para caminar y refrescarse en verano · a [X] km (MOCK)" },
    ],
  },
  {
    title: "Fiestas de la zona",
    items: [
      { name: "Oktoberfest · Villa General Belgrano", detail: "Octubre. Fechas a confirmar (MOCK)." },
      { name: "[Otra fiesta o evento local]", detail: "[Mes y descripción: completar] (MOCK)" },
    ],
  },
  {
    title: "Para comer",
    items: [
      { name: "La Vaquita", detail: "Bodegón, a poco más de 1 km. Con reserva sí o sí." },
      { name: "Chañar", detail: "Resto-bar, a poco más de 1 km. Preferible ir con reserva." },
      { name: "[Almacén o panadería]", detail: "Para comprar lo del día · a [X] km (MOCK)" },
    ],
  },
  {
    title: "Cómo moverse",
    items: [
      { name: "Uber y remis", detail: "Hay servicio en la zona (MOCK: confirmar disponibilidad y horarios)." },
      { name: "Auto propio", detail: "La casa tiene cochera para 2 autos." },
    ],
  },
  {
    title: "A qué distancia está",
    items: [
      { name: "El río", detail: "4 minutos en auto · 6 en bici · 15 caminando." },
      { name: "Playa Miami", detail: "9 minutos en auto · 13 en bici." },
      { name: "El Durazno", detail: "43 minutos en auto." },
      { name: "El centro del pueblo", detail: "A [X] minutos a pie o en auto (MOCK)." },
    ],
  },
];
