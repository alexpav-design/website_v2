"use client";
import { useState } from "react";
import type { Recensione } from "@/data/chayofa";

export default function RecensioniModal({ tutte }: { tutte: Recensione[] }) {
  const [open, setOpen] = useState(false);
  const [visibili, setVisibili] = useState(10);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 text-sm font-mono underline text-teal hover:text-teal-bright"
      >
        Vedi altre recensioni ({tutte.length}) &rarr;
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-basalt/70 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-wall max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-sm p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-display text-xl font-bold">Recensioni</h3>
              <button onClick={() => setOpen(false)} className="text-2xl leading-none" aria-label="Chiudi">
                &times;
              </button>
            </div>
            <div className="space-y-4">
              {tutte.slice(0, visibili).map((r, i) => (
                <div key={i} className="border-l-2 border-teal/40 pl-4 py-1">
                  <p className="text-basalt-soft">{r.testo}</p>
                  <p className="font-mono text-xs text-teal mt-1">{r.lingua}</p>
                </div>
              ))}
            </div>
            {visibili < tutte.length && (
              <button
                onClick={() => setVisibili((v) => v + 10)}
                className="mt-6 bg-teal hover:bg-teal-bright transition-colors text-wall px-6 py-2 rounded-sm font-display font-bold text-sm"
              >
                Vedi altre
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
