/**
 * Espacios de publicidad de la landing. Contenido real (no son placeholders): promocionan
 * la landing de Lunagui Viajes que hicimos nosotros (lunagui-viajes.netlify.app), no el sitio original.
 * Si en algún momento no hay nada para publicitar, dejar `ads` como [] y los espacios no se muestran.
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
];
