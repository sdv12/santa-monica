import Image from "next/image";

type Photo = { src: string; alt: string };

/**
 * Foto del hero. A diferencia del resto del sitio, no usa el marco en arco: una esquina grande y
 * asimétrica (eco del arco, sin ser la puerta) y el borde derecho se funde con el fondo de la
 * sección en vez de cortar en seco. Las 3 fotos se van revelando con un barrido de izquierda a
 * derecha — ver `.hero-slide` en globals.css. Solo CSS, sin JS ni video.
 */
export function HeroPhoto({ photos, className }: { photos: Photo[]; className?: string }) {
  return (
    <div
      className={`hero-photo-fade relative overflow-hidden rounded-tl-[120px] rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-sage-deep ${className ?? ""}`}
    >
      {photos.map((p, i) => (
        <Image
          key={p.src}
          src={p.src}
          alt={p.alt}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="hero-slide object-cover"
        />
      ))}
    </div>
  );
}
