"use client";
import { useState } from "react";
import { prezziConfig, disponibilitaPlaceholder } from "@/data/chayofa";

function calcolaPrezzo(checkin: string, checkout: string, ospiti: number) {
  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  const notti = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  if (notti <= 0) return null;

  const prezzoNotte = prezziConfig.prezzoBasePersonaNotte + (ospiti === 2 ? prezziConfig.extraSecondaPersonaGiorno : 0);
  const subtotale = prezzoNotte * notti;

  let sconto = 0;
  let scontoLabel = "Nessuno sconto";
  if (notti >= 28) {
    sconto = prezziConfig.scontoOltre28Notti;
    scontoLabel = "Sconto soggiorno ≥28 notti (30%)";
  } else if (notti >= 7) {
    sconto = prezziConfig.scontoOltre7Notti;
    scontoLabel = "Sconto soggiorno ≥7 notti (15%)";
  }
  const scontoValore = subtotale * sconto;
  const dopoSconto = subtotale - scontoValore;
  const conPulizia = dopoSconto + prezziConfig.puliziaUnaTantum;
  const tasse = conPulizia * prezziConfig.igic;
  const totale = conPulizia + tasse;

  // finestra massima di prenotazione
  const oggi = new Date();
  const maxData = new Date(oggi);
  maxData.setMonth(maxData.getMonth() + prezziConfig.finestraPrenotazioneMesi);
  const fuoriFinestra = d1 > maxData;

  return {
    notti, prezzoNotte, subtotale, scontoLabel, scontoValore,
    dopoSconto, pulizia: prezziConfig.puliziaUnaTantum, tasse, totale, fuoriFinestra,
  };
}

export default function RichiestaForm() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [ospiti, setOspiti] = useState(1);
  const [inviato, setInviato] = useState(false);

  const risultato = checkin && checkout ? calcolaPrezzo(checkin, checkout, ospiti) : null;

  return (
    <form
      className="max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: collegare a Web3Forms/Formspree — invia i dati a alextenbb@gmail.com
        setInviato(true);
      }}
    >
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono">Check-in</label>
          <input type="date" required value={checkin} onChange={(e) => setCheckin(e.target.value)} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono">Check-out</label>
          <input type="date" required value={checkout} onChange={(e) => setCheckout(e.target.value)} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono">Ospiti</label>
          <select value={ospiti} onChange={(e) => setOspiti(Number(e.target.value))} className="border border-basalt/20 rounded-sm p-2 bg-wall">
            <option value={1}>1 ospite</option>
            <option value={2}>2 ospiti</option>
          </select>
        </div>
      </div>

      {!checkin || !checkout ? (
        <p className="text-basalt-soft font-mono text-sm mb-6">{disponibilitaPlaceholder}</p>
      ) : risultato === null ? (
        <p className="text-ochre font-mono text-sm mb-6">Le date non sono valide.</p>
      ) : risultato.fuoriFinestra ? (
        <p className="text-ochre font-mono text-sm mb-6">
          Le prenotazioni sono aperte fino a un anno da oggi — per queste date non è ancora possibile richiedere disponibilità.
        </p>
      ) : (
        <div className="bg-wall-deep rounded-sm p-6 mb-6 font-mono text-sm space-y-2">
          <div className="flex justify-between"><span>{risultato.notti} notti × {risultato.prezzoNotte}€</span><span>{risultato.subtotale.toFixed(2)}€</span></div>
          <div className="flex justify-between text-teal"><span>{risultato.scontoLabel}</span><span>-{risultato.scontoValore.toFixed(2)}€</span></div>
          <div className="flex justify-between"><span>Pulizia (una tantum)</span><span>+{risultato.pulizia.toFixed(2)}€</span></div>
          <div className="flex justify-between"><span>IGIC (7%)</span><span>+{risultato.tasse.toFixed(2)}€</span></div>
          <div className="flex justify-between font-bold text-base border-t border-basalt/20 pt-2 mt-2"><span>Totale</span><span>{risultato.totale.toFixed(2)}€</span></div>
        </div>
      )}

      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-mono">Email</label>
        <input type="email" required className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <div className="flex flex-col gap-1 mb-6">
        <label className="text-sm font-mono">Messaggio (facoltativo — chiedimi pure qualsiasi cosa prima di prenotare)</label>
        <textarea rows={3} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
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
    </form>
  );
}
