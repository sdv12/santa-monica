/**
 * "Para el resto del día": trekkings, fiestas, dónde comer, cómo moverse y distancias.
 *
 * ⚠️ MOCK: solo "Cómo moverse" (Uber/remis) sigue siendo de ejemplo. El resto ya son datos
 * reales, confirmados por el dueño. "Para comer" tiene solo 2 lugares a propósito — van a
 * sumar más adelante.
 */
export type GuideItem = { name: string; detail: string };
export type GuideGroup = { title: string; items: GuideItem[] };

export const localGuide: GuideGroup[] = [
  {
    title: "Trekking y naturaleza",
    items: [
      {
        name: "Reserva Natural La Cascada (Santa Rosa)",
        detail:
          "1,6 a 5,6 km, fácil a moderada. Bordea el arroyo Loyola (10 postas numeradas) hasta un salto de 6 m. Ruta Provincial 5, km 90,5. Con arancel (~$3.000) y horario limitado, viernes a domingo de 10 a 16 (confirmar en Turismo Santa Rosa).",
      },
      {
        name: "Cerro Vía Crucis (Santa Rosa)",
        detail: "1,4 km, dificultad media a alta, hasta 800 msnm, entre piedras. Vistas de la ciudad y el valle. Llevá calzado con buen agarre y agua.",
      },
      {
        name: "Calicanto Jesuita (Santa Rosa)",
        detail: "Caminata tranquila y fácil junto al río Santa Rosa, con historia colonial y patrimonio jesuita.",
      },
      {
        name: "Desafío Guaraiba (Santa Rosa)",
        detail: "Trekking guiado de unas 3 horas y media, solo con guías habilitados de la Secretaría de Turismo local.",
      },
      {
        name: "Cerro de la Virgen y Pico Alemán (Villa Gral. Belgrano)",
        detail: "Dificultad media, 1 a 2 horas ida y vuelta, hasta 980 msnm. Sale de la Ruta Provincial 5, cerca de la Shell. Vistas de la villa y los diques.",
      },
      {
        name: "Pozo Verde y Cerro Mirador (Villa Gral. Belgrano)",
        detail: "Dificultad baja a media, ~40 minutos. Arroyo con sombra hasta un espejo de agua natural y un mirador, hasta 864 msnm.",
      },
      {
        name: "Paseo de los Arroyos (Villa Gral. Belgrano)",
        detail: "Caminata muy fácil y accesible en el casco urbano, bordeando los arroyos El Molle, El Sauce y La Toma.",
      },
      {
        name: "La Cumbrecita y Los Reartes",
        detail: "Para caminatas más exigentes, un poco más lejos: la Cascada Grande o el Cerro Wank en La Cumbrecita, o los senderos de Los Reartes.",
      },
    ],
  },
  {
    title: "Fiestas de la zona",
    items: [
      {
        name: "Oktoberfest · Villa General Belgrano",
        detail: "Octubre. La edición de este año ya pasó — actualizamos la fecha de 2027 apenas se confirme.",
      },
    ],
  },
  {
    title: "Para comer",
    items: [
      { name: "La Vaquita", detail: "Bodegón, a poco más de 1 km. Con reserva sí o sí." },
      { name: "Chañar", detail: "Resto-bar, a poco más de 1 km. Preferible ir con reserva." },
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
      { name: "El centro del pueblo", detail: "15 minutos en auto." },
    ],
  },
];
