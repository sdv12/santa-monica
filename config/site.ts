/**
 * Único lugar para editar los textos y datos de la casa.
 * Todo lo que está entre [corchetes] es un placeholder: reemplazalo por el dato real.
 *
 * Más adelante, precios, seña, horarios, estadía mínima, teléfono y descripción
 * se leen de la tabla `settings` de Supabase (el admin los edita); estos valores
 * quedan como respaldo y para los textos fijos.
 */
export interface SiteConfig {
  name: string;
  locality: string;
  address: string;
  mapEmbedUrl: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  pricePerNight: string;
  prices: { weekdays: string; weekend: string; holidays: string };
  depositPercent: string;
  minNights: string;
  maxGuests: string;
  checkIn: string;
  checkOut: string;
  numbers: Record<"priceWeekday" | "priceWeekend" | "priceHoliday" | "depositPercent" | "minNights" | "maxGuests", number | null>;
  holidays: string[];
  description: string;
  amenities: { icon: string; label: string }[];
}

export const site: SiteConfig = {
  name: "[Nombre de la casa]",
  locality: "[Localidad]",
  address: "[Dirección completa]",
  mapEmbedUrl: "", // URL "embed" de Google Maps; vacío = se muestra un placeholder

  phone: "[TELÉFONO]", // como se muestra en pantalla
  phoneHref: "", // solo dígitos con código de país, ej. 5493510000000; vacío = sin enlace
  whatsappHref: "", // igual que phoneHref, para el botón de WhatsApp

  pricePerNight: "[$ PRECIO]", // "Desde ... la noche" en el badge del hero
  prices: {
    weekdays: "[$ PRECIO]", // lunes a jueves
    weekend: "[$ PRECIO]", // viernes a domingo
    holidays: "[$ PRECIO]", // feriados y fines de semana largos
  },
  depositPercent: "[X]", // % de seña
  minNights: "[N]",
  maxGuests: "[N]",
  checkIn: "[HH:MM]",
  checkOut: "[HH:MM]",

  /**
   * Valores numéricos para calcular el total. Mientras estén en null la reserva muestra "A confirmar".
   * Con Supabase mandan los de la tabla `settings`.
   */
  numbers: {
    priceWeekday: null,
    priceWeekend: null,
    priceHoliday: null,
    depositPercent: null,
    minNights: null,
    maxGuests: null,
  } as Record<"priceWeekday" | "priceWeekend" | "priceHoliday" | "depositPercent" | "minNights" | "maxGuests", number | null>,
  holidays: [] as string[], // noches que se cobran como feriado, "YYYY-MM-DD"

  description: "[Descripción de la casa: 2 o 3 frases cálidas y concretas.]",

  amenities: [
    { icon: "bed", label: "[N] dormitorios" },
    { icon: "bath", label: "[N] baños" },
    { icon: "waves", label: "Pileta" },
    { icon: "flame", label: "Parrilla y quincho" },
    { icon: "trees", label: "Galería" },
    { icon: "wifi", label: "Wi-Fi" },
    { icon: "thermometer", label: "Aire y calefacción" },
    { icon: "car", label: "Cochera" },
  ],
};
