"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { disponibilitaPlaceholder } from "@/data/chayofa";
import { calcolaPrezzo } from "@/lib/prezzi";
import CalendarioDisponibilita from "@/components/CalendarioDisponibilita";

type Occupato = { dal: string; al: string };

export default function RichiestaForm() {
  const router = useRouter();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [ospiti, setOspiti] = useState(1);
  const [occupato, setOccupato] = useState<Occupato[]>([]);

  useEffect(() => {
    fetch("/api/disponibilita")
      .then((r) => r.json())
      .then((d) => setOccupato(d.occupato ?? []))
      .catch(() => setOccupato([]));
  }, []);

  const risultato = checkin && checkout ? calcolaPrezzo(checkin, checkout, ospiti) : null;

  return (
    <div className="max-w-2xl">
      <p className="text-basalt-soft mb-6">
        Hai già in mente le date della tua prossima vacanza? Guarda se sono disponibili — al
        passo successivo trovi tutti i dettagli su prezzo, pagamenti e cancellazione.
      </p>

      <CalendarioDisponibilita
        occupato={occupato}
        checkin={checkin}
        checkout={checkout}
        onChange={(c1, c2) => { setCheckin(c1); setCheckout(c2); }}
      />

      <div className="flex flex-col gap-1 mb-6 max-w-[160px]">
        <label className="text-sm font-mono">Quanti siete?</label>
        <select value={ospiti} onChange={(e) => setOspiti(Number(e.target.value))} className="border border-basalt/20 rounded-sm p-2 bg-wall">
          <option value={1}>1 ospite</option>
          <option value={2}>2 ospiti</option>
        </select>
      </div>

      {!checkin || !checkout ? (
        <p className="text-basalt-soft font-mono text-sm mb-6">{disponibilitaPlaceholder}</p>
      ) : risultato === null ? (
        <p className="text-ochre font-mono text-sm mb-6">Le date non sono valide.</p>
      ) : (
        <div className="bg-wall-deep rounded-sm p-6 mb-6 font-mono text-sm space-y-2">
          <div className="flex justify-between"><span>{risultato.notti} notti × {risultato.prezzoNotte}€</span><span>{risultato.subtotale.toFixed(2)}€</span></div>
          {risultato.scontoValore > 0 && (
            <div className="flex justify-between text-teal"><span>{risultato.scontoLabel}</span><span>-{risultato.scontoValore.toFixed(2)}€</span></div>
          )}
          <div className="flex justify-between"><span>Pulizia</span><span>+{risultato.pulizia.toFixed(2)}€</span></div>
          <div className="flex justify-between"><span>IGIC (7%)</span><span>+{risultato.tasse.toFixed(2)}€</span></div>
          <div className="flex justify-between font-bold text-base border-t border-basalt/20 pt-2 mt-2"><span>Totale</span><span>{risultato.totale.toFixed(2)}€</span></div>
        </div>
      )}

      <button
        type="button"
        disabled={!checkin || !checkout || !risultato}
        onClick={() => router.push(`/chayofa/richiesta?checkin=${checkin}&checkout=${checkout}&ospiti=${ospiti}`)}
        className="bg-teal hover:bg-teal-bright transition-colors text-wall px-8 py-3 rounded-sm font-display font-bold disabled:opacity-60"
      >
        Continua con la richiesta
      </button>
    </div>
  );
}
