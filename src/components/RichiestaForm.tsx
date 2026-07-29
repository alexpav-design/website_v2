"use client";
import { useState } from "react";

export default function RichiestaForm() {
  const [inviato, setInviato] = useState(false);

  return (
    <form
      className="grid sm:grid-cols-2 gap-4 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: collegare a Web3Forms/Formspree — invia i dati a alextenbb@gmail.com
        setInviato(true);
      }}
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono">Check-in</label>
        <input type="date" required className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono">Check-out</label>
        <input type="date" required className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono">Ospiti</label>
        <input type="number" min={1} max={2} defaultValue={1} required className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono">Email</label>
        <input type="email" required className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-1">
        <label className="text-sm font-mono">Messaggio (facoltativo — chiedimi pure qualsiasi cosa prima di prenotare)</label>
        <textarea rows={3} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="bg-teal hover:bg-teal-bright transition-colors text-wall px-8 py-3 rounded-sm font-display font-bold"
        >
          Richiedi disponibilità
        </button>
        {inviato && (
          <p className="mt-3 text-sm text-teal">
            Richiesta inviata — ti risponderò appena possibile per confermare.
          </p>
        )}
      </div>
    </form>
  );
}
