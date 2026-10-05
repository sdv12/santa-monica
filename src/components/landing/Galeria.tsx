"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { PhotoPlaceholder, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { galleryPhotos } from "../../../config/gallery";

/**
 * Acordeón horizontal de fotos, con el mismo tamaño de retrato que tenía la foto de "La casa".
 * Tocar un panel lo agranda. Desde ahí se puede ampliar la foto a pantalla completa.
 */
export function Galeria() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (galleryPhotos.length === 0) return null;

  return (
    <Section tone="cream" labelledBy="titulo-galeria">
      <div className="reveal mb-6 max-w-2xl sm:mb-8 lg:mb-10">
        <p className="eyebrow mb-3">Un vistazo</p>
        <h2 id="titulo-galeria" className="t-h2">
          La casa en <em>fotos</em>
        </h2>
      </div>

      <div className="reveal mx-auto w-full max-w-md">
        <div
          role="tablist"
          aria-label="Fotos de la casa"
          className="flex h-[360px] gap-2 overflow-x-auto pb-2 sm:h-[560px] sm:gap-3 sm:overflow-visible"
        >
          {galleryPhotos.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.alt}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="foto-activa"
                aria-label={p.alt}
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-full w-[75vw] shrink-0 overflow-hidden rounded-2xl border-2 transition-[flex-grow] duration-500 sm:w-auto",
                  isActive ? "border-olive sm:grow-[6]" : "border-transparent sm:grow-[1]",
                )}
              >
                {p.src ? (
                  <Image src={p.src} alt="" fill sizes="(min-width: 640px) 448px, 75vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0">
                    <PhotoPlaceholder />
                  </div>
                )}
                {!isActive && <span aria-hidden className="absolute inset-0 hidden bg-ink/30 sm:block" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="reveal mx-auto mt-4 flex max-w-md flex-col items-center gap-3 sm:mt-5">
        <p id="foto-activa" className="text-center text-xl font-bold">
          {galleryPhotos[active].alt}
        </p>
        <button
          type="button"
          onClick={() => setLightbox(active)}
          className="inline-flex min-h-14 items-center gap-2 rounded-full border-2 border-olive px-6 text-lg font-bold text-olive hover:bg-sage"
        >
          <Maximize2 size={22} strokeWidth={1.7} aria-hidden />
          Ampliar foto
        </button>
      </div>

      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          onIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </Section>
  );
}

/** Foto a pantalla completa: se cierra con Esc o el botón, y se puede pasar de a una. */
function Lightbox({ index, onIndex, onClose }: { index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const photo = galleryPhotos[index];
  const n = galleryPhotos.length;

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  const go = (delta: number) => onIndex((index + delta + n) % n);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={`Foto ${index + 1} de ${n}: ${photo.alt}`}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/95"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-full flex-col gap-4 p-4 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-bold">
            {index + 1} de {n} · {photo.alt}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar foto"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/10"
          >
            <X size={28} strokeWidth={1.7} aria-hidden />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          {photo.src && <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className="flex h-16 items-center gap-2 rounded-full border-2 border-white px-5 text-lg font-bold hover:bg-white/10"
          >
            <ChevronLeft size={26} strokeWidth={1.7} aria-hidden /> Anterior
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto siguiente"
            className="flex h-16 items-center gap-2 rounded-full border-2 border-white px-5 text-lg font-bold hover:bg-white/10"
          >
            Siguiente <ChevronRight size={26} strokeWidth={1.7} aria-hidden />
          </button>
        </div>
      </div>
    </dialog>
  );
}
