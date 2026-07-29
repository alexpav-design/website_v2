"use client";
import { useState } from "react";
import Image from "next/image";

export default function Lightbox({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {photos.slice(0, 5).map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(true)}
            className={`relative overflow-hidden rounded-sm ${
              i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
            }`}
          >
            <Image src={src} alt={`Foto ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform" />
            {i === 4 && photos.length > 5 && (
              <span className="absolute inset-0 bg-basalt/60 flex items-center justify-center text-wall font-display font-bold text-sm">
                +{photos.length - 5} foto
              </span>
            )}
          </button>
        ))}
      </div>

      {open && index === null && (
        <div
          className="fixed inset-0 z-50 bg-basalt/95 overflow-y-auto p-4 sm:p-10"
          onClick={() => setOpen(false)}
        >
          <button
            className="fixed top-4 right-4 text-wall text-3xl z-10"
            onClick={() => setOpen(false)}
            aria-label="Chiudi"
          >
            &times;
          </button>
          <div
            className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {photos.map((src, i) => (
              <button key={src} className="relative aspect-square" onClick={() => setIndex(i)}>
                <Image src={src} alt={`Foto ${i + 1}`} fill className="object-cover rounded-sm" />
              </button>
            ))}
          </div>
        </div>
      )}

      {open && index !== null && (
        <div
          className="fixed inset-0 z-50 bg-basalt/98 flex items-center justify-center p-4"
          onClick={() => setIndex(null)}
        >
          <button
            className="fixed top-4 right-4 text-wall text-3xl"
            onClick={() => setIndex(null)}
            aria-label="Torna alla griglia"
          >
            &times;
          </button>
          {index > 0 && (
            <button
              className="fixed left-2 sm:left-6 text-wall text-4xl px-2"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(index - 1);
              }}
              aria-label="Foto precedente"
            >
              &#8249;
            </button>
          )}
          {index < photos.length - 1 && (
            <button
              className="fixed right-2 sm:right-6 text-wall text-4xl px-2"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(index + 1);
              }}
              aria-label="Foto successiva"
            >
              &#8250;
            </button>
          )}
          <div className="relative w-full h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[index]}
              alt={`Foto ${index + 1} a piena risoluzione`}
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
}
