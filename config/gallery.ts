/**
 * Fotos de la sección "La casa en fotos". Con `src: null` se muestra la ilustración provisoria
 * (la misma que usa el resto del sitio) hasta que subas la foto real a `public/casa/` y pongas
 * su ruta acá, por ejemplo: { src: "/casa/living.jpg", alt: "Living con chimenea" }.
 */
export type GalleryPhoto = { src: string | null; alt: string };

export const galleryPhotos: GalleryPhoto[] = [
  { src: null, alt: "Living acogedor" },
  { src: null, alt: "Dormitorio con luz natural" },
  { src: null, alt: "Pileta con vista a las sierras" },
  { src: null, alt: "Quincho con parrilla" },
  { src: null, alt: "Galería y jardín" },
  { src: null, alt: "Detalle de bienvenida" },
];
