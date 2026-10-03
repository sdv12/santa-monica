"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoPlaceholder, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { galleryPhotos } from "../../../config/gallery";

/**
 * Acordeón horizontal de fotos: tocar un panel lo agranda y los demás se achican.
 * En celular (donde agrandar/achicar no entra bien) es una tira que se desliza, todos del mismo tamaño.
 * El estado también se indica con el borde y el texto de abajo, no solo con el tamaño.
 */
export function Galeria() {
  const [active, setActive] = useState(0);
  if (galleryPhotos.length === 0) return null;

  return (
    <Section tone="cream" labelledBy="titulo-galeria">
      <div className="reveal mb-10 max-w-2xl">
        <p className="eyebrow mb-3">Un vistazo</p>
        <h2 id="titulo-galeria" className="t-h2">
          La casa en <em>fotos</em>
        </h2>
      </div>

      <div role="tablist" aria-label="Fotos de la casa" className="reveal flex h-64 gap-2 overflow-x-auto pb-2 sm:h-[420px] sm:gap-3 sm:overflow-visible">
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
                <Image src={p.src} alt="" fill sizes="(min-width: 640px) 45vw, 75vw" className="object-cover" />
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
      <p id="foto-activa" className="reveal mt-4 text-center text-xl font-bold sm:text-left">
        {galleryPhotos[active].alt}
      </p>
    </Section>
  );
}
