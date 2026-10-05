/**
 * Único lugar para editar los textos y datos de la casa.
 *
 * ⚠️ MOCK: localidad, dirección, mapa, precios, seña, horarios, estadía mínima,
 * descripción y las cantidades de dormitorios/baños de acá abajo son de ejemplo (inventados
 * para ver el sitio con contenido), no los datos reales de la casa.
 * Antes de publicar, reemplazá cada uno por el dato real.
 *
 * Más adelante, precios, seña, horarios, estadía mínima, teléfono y descripción
 * se leen de la tabla `settings` de Supabase (el admin los edita); estos valores
 * quedan como respaldo y para los textos fijos.
 */
export interface SiteConfig {
  name: string;
  hosts: string;
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
  name: "Santa Mónica",
  hosts: "Gabriela y Juan", // quiénes atienden: aparece en el panel de admin y en "Cómo llegar"
  locality: "Villa General Belgrano",
  address: "Camino de las Sierras, km 4, Villa General Belgrano, Córdoba",
  mapEmbedUrl: "https://maps.google.com/maps?q=Villa+General+Belgrano,+C%C3%B3rdoba&z=14&output=embed",

  phone: "351 514-8446", // como se muestra en pantalla
  phoneHref: "5493515148446", // solo dígitos con código de país: 54 + 9 + código de área + número
  whatsappHref: "5493515148446", // igual que phoneHref, para el botón de WhatsApp

  pricePerNight: "$ 70.000", // "Desde ... la noche" en el badge del hero
  prices: {
    weekdays: "$ 70.000", // lunes a jueves
    weekend: "$ 95.000", // viernes a domingo
    holidays: "$ 120.000", // feriados y fines de semana largos
  },
  depositPercent: "30", // % de seña
  minNights: "2",
  maxGuests: "8",
  checkIn: "15:00",
  checkOut: "10:00",

  /**
   * Valores numéricos para calcular el total. Mientras estén en null la reserva muestra "A confirmar".
   * Con Supabase mandan los de la tabla `settings`.
   */
  numbers: {
    priceWeekday: 70_000,
    priceWeekend: 95_000,
    priceHoliday: 120_000,
    depositPercent: 30,
    minNights: 2,
    maxGuests: 8,
  } as Record<"priceWeekday" | "priceWeekend" | "priceHoliday" | "depositPercent" | "minNights" | "maxGuests", number | null>,
  holidays: [] as string[], // noches que se cobran como feriado, "YYYY-MM-DD"

  description:
    "Una casa de campo rodeada de sierras, pensada para desconectar unos días en familia o con amigos. Living con chimenea, pileta y un quincho grande para las tardes de asado.",

  amenities: [
    { icon: "bed", label: "3 dormitorios" },
    { icon: "bath", label: "1 baño: ducha e inodoro separados, lavamanos compartido" },
    { icon: "waves", label: "Pileta" },
    { icon: "flame", label: "Parrilla y quincho" },
    { icon: "trees", label: "Galería" },
    { icon: "wifi", label: "Wi-Fi" },
    { icon: "thermometer", label: "Aire y calefacción" },
    { icon: "car", label: "Cochera para 2 autos" },
    { icon: "camera", label: "Cámaras de seguridad" },
    { icon: "washer", label: "Lavarropas" },
    { icon: "shirt", label: "Tendedero" },
  ],
};
