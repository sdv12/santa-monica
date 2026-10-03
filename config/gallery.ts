/**
 * Fotos de la sección "La casa en fotos". Con `src: null` se muestra la ilustración provisoria
 * (la misma que usa el resto del sitio) hasta tener la foto real; para agregar o cambiar una,
 * subí el archivo a `public/casa/` y poné su ruta acá, ej. { src: "/casa/living.jpg", alt: "..." }.
 */
export type GalleryPhoto = { src: string | null; alt: string };

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/casa/galeria-1.jpg", alt: "Living acogedor" },
  { src: "/casa/galeria-2.jpg", alt: "Comedor con cocina abierta" },
  { src: "/casa/galeria-3.jpg", alt: "Dormitorio" },
  { src: "/casa/galeria-4.jpg", alt: "Baño" },
  { src: "/casa/galeria-5.jpg", alt: "Pileta" },
  { src: "/casa/galeria-6.jpg", alt: "Atardecer en la pileta" },
];
