"use client";
import { useState, useEffect } from "react";
import { prezziConfig, disponibilitaPlaceholder } from "@/data/chayofa";
import { inviaWeb3Forms } from "@/lib/web3forms";
import CalendarioDisponibilita from "@/components/CalendarioDisponibilita";

type Occupato = { dal: string; al: string };

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

  return { notti, prezzoNotte, subtotale, scontoLabel, scontoValore, dopoSconto, pulizia: prezziConfig.puliziaUnaTantum, tasse, totale };
}

export default function RichiestaForm() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [ospiti, setOspiti] = useState(1);
  const [inviato, setInviato] = useState(false);

  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [invio, setInvio] = useState<"idle" | "loading" | "errore">("idle");
  const [erroreDettaglio, setErroreDettaglio] = useState("");
  const [occupato, setOccupato] = useState<Occupato[]>([]);

  useEffect(() => {
    fetch("/api/disponibilita")
      .then((r) => r.json())
      .then((d) => setOccupato(d.occupato ?? []))
      .catch(() => setOccupato([]));
  }, []);

  const risultato = checkin && checkout ? calcolaPrezzo(checkin, checkout, ospiti) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInvio("loading");
    const { ok, dettaglio } = await inviaWeb3Forms({
      subject: "Nuova richiesta di disponibilità — Chayofa B&B",
      from_name: "Sito Chayofa B&B",
      email,
      messaggio: messaggio || "(nessun messaggio)",
      checkin,
      checkout,
      ospiti: String(ospiti),
      totale_stimato: risultato ? `${risultato.totale.toFixed(2)}€` : "n/d",
    });
    if (ok) {
      setInviato(true);
      setInvio("idle");
    } else {
      setInvio("errore");
      setErroreDettaglio(dettaglio ?? "");
    }
  }

  return (
    <form className="max-w-2xl" onSubmit={handleSubmit}>
      <CalendarioDisponibilita
        occupato={occupato}
        checkin={checkin}
        checkout={checkout}
        onChange={(c1, c2) => { setCheckin(c1); setCheckout(c2); }}
      />

      <div className="flex flex-col gap-1 mb-6 max-w-[160px]">
        <label className="text-sm font-mono">Ospiti</label>
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
          <div className="flex justify-between text-teal"><span>{risultato.scontoLabel}</span><span>-{risultato.scontoValore.toFixed(2)}€</span></div>
          <div className="flex justify-between"><span>Pulizia</span><span>+{risultato.pulizia.toFixed(2)}€</span></div>
          <div className="flex justify-between"><span>IGIC (7%)</span><span>+{risultato.tasse.toFixed(2)}€</span></div>
          <div className="flex justify-between font-bold text-base border-t border-basalt/20 pt-2 mt-2"><span>Totale</span><span>{risultato.totale.toFixed(2)}€</span></div>
        </div>
      )}

      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-mono">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <div className="flex flex-col gap-1 mb-6">
        <label className="text-sm font-mono">Messaggio (facoltativo — chiedimi pure qualsiasi cosa prima di prenotare)</label>
        <textarea rows={3} value={messaggio} onChange={(e) => setMessaggio(e.target.value)} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
      </div>
      <button
        type="submit"
        disabled={invio === "loading" || !checkin || !checkout}
        className="bg-teal hover:bg-teal-bright transition-colors text-wall px-8 py-3 rounded-sm font-display font-bold disabled:opacity-60"
      >
        {invio === "loading" ? "Invio in corso..." : "Richiedi disponibilità"}
      </button>
      {invio === "errore" && (
        <p className="mt-3 text-sm text-ochre">
          Invio non riuscito — riprova, o scrivimi direttamente se il problema persiste.
          {erroreDettaglio && <span className="block font-mono text-xs mt-1">({erroreDettaglio})</span>}
        </p>
      )}

      {inviato && (
        <div className="fixed inset-0 z-50 bg-basalt/70 flex items-center justify-center p-4" onClick={() => setInviato(false)}>
          <div className="bg-wall rounded-sm p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-teal text-3xl mb-3">&#10003;</p>
            <p className="font-display font-bold text-lg mb-2">
              Richiesta inviata correttamente — ti risponderò appena possibile!
            </p>
            <button onClick={() => setInviato(false)} className="mt-4 bg-teal hover:bg-teal-bright transition-colors text-wall px-6 py-2 rounded-sm font-display font-bold text-sm">
              Chiudi
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
