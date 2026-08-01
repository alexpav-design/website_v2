"use client";
import { useState } from "react";
import * as Icons from "lucide-react";
import type { AmenityItem } from "@/data/chayofa";

export default function AmenitiesModal({ all }: { all: AmenityItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 text-sm font-mono underline text-teal hover:text-teal-bright"
      >
        Vedi tutti i {all.length} servizi &rarr;
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-basalt/70 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-wall max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-sm p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-display text-xl font-bold">Tutti i servizi</h3>
              <button onClick={() => setOpen(false)} className="text-2xl leading-none" aria-label="Chiudi">
                &times;
              </button>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-basalt-soft">
              {all.map((a) => {
                const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[a.icon] ?? Icons.Check;
                return (
                  <li key={a.label} className="flex gap-2 items-center">
                    <IconComp size={16} className="text-teal shrink-0" />
                    {a.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
