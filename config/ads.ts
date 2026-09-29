/**
 * Espacios de publicidad de la landing. Contenido real (no son placeholders): promocionan otros
 * proyectos nuestros, no los sitios originales de esos negocios.
 * - Lunagui Viajes → lunagui-viajes.netlify.app
 * - Aura Aromas Córdoba → aura-page.netlify.app
 * Si en algún momento no hay nada para publicitar, dejar `ads` como [] y el espacio no se muestra.
 */
export type Ad = {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  logo: string;
  logoAlt: string;
};

export const ads: Ad[] = [
  {
    eyebrow: "Publicidad",
    title: "¿Vas a viajar hasta acá desde lejos?",
    text: "Lunagui Viajes es una agencia de Córdoba con más de 20 años de trayectoria: paquetes, salidas grupales y viajes a medida.",
    cta: "Ver Lunagui Viajes",
    href: "https://lunagui-viajes.netlify.app/?utm_source=casa-de-campo&utm_medium=referral",
    logo: "/logo-lunagui.png",
    logoAlt: "Logo de Lunagui Viajes",
  },
  {
    eyebrow: "Publicidad",
    title: "Llevate el aroma de tu estadía a casa",
    text: "Aura Aromas Córdoba tiene difusores, aceites esenciales y velas premium para el hogar, venta mayorista y minorista.",
    cta: "Ver catálogo de Aura",
    href: "https://aura-page.netlify.app/?utm_source=casa-de-campo&utm_medium=referral",
    logo: "/logo-aura.png",
    logoAlt: "Logo de Aura Aromas Córdoba",
  },
];
