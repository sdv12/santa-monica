/**
 * "Para el resto del día": trekkings, fiestas, dónde comer, cómo moverse y distancias.
 *
 * ⚠️ MOCK: los nombres de lugares, comercios y distancias de acá abajo son de ejemplo. Antes de
 * publicar, completá cada uno con datos reales y verificados (lugares que sí recomiendan, km reales).
 * No dejar comercios inventados como recomendación.
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
      { name: "[Restaurante recomendado]", detail: "[Tipo de comida y dirección] · a [X] km (MOCK)" },
      { name: "[Cervecería o café]", detail: "[Qué recomiendan] · a [X] km (MOCK)" },
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
      { name: "El río", detail: "A [X] km (MOCK: completar)." },
      { name: "El Durazno", detail: "A [X] km (MOCK: completar)." },
      { name: "El centro del pueblo", detail: "A [X] minutos a pie o en auto (MOCK)." },
    ],
  },
];
