"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { calcolaPrezzo } from "@/lib/prezzi";
import { inviaWeb3Forms } from "@/lib/web3forms";
import TimelineCancellazione from "@/components/TimelineCancellazione";

function RiepilogoRichiesta() {
  const params = useSearchParams();
  const checkin = params.get("checkin") ?? "";
  const checkout = params.get("checkout") ?? "";
  const ospiti = Number(params.get("ospiti") ?? "1");

  const risultato = checkin && checkout ? calcolaPrezzo(checkin, checkout, ospiti) : null;

  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [invio, setInvio] = useState<"idle" | "loading" | "errore">("idle");
  const [erroreDettaglio, setErroreDettaglio] = useState("");
  const [inviato, setInviato] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInvio("loading");
    const { ok, dettaglio } = await inviaWeb3Forms({
      subject: "Nuova richiesta di disponibilità — Chayofa B&B",
      from_name: "Sito Chayofa B&B",
      email,
      messaggio: messaggio || "(nessun messaggio)",
      checkin, checkout, ospiti: String(ospiti),
      totale_stimato: risultato ? `${risultato.totale.toFixed(2)}€` : "n/d",
    });
    if (ok) { setInviato(true); setInvio("idle"); }
    else { setInvio("errore"); setErroreDettaglio(dettaglio ?? ""); }
  }

  if (!checkin || !checkout || !risultato) {
    return (
      <div className="px-6 sm:px-12 py-24 max-w-2xl mx-auto text-center">
        <p className="text-basalt-soft mb-6">Non trovo date valide per la richiesta.</p>
        <Link href="/chayofa#disponibilita" className="text-teal underline font-mono text-sm">
          &larr; Torna al calendario
        </Link>
      </div>
    );
  }

  return (
    <main className="px-6 sm:px-12 py-16 max-w-2xl mx-auto">
      <Link href="/chayofa#disponibilita" className="text-teal underline font-mono text-xs">&larr; Cambia le date</Link>
      <h1 className="font-display text-3xl font-bold mt-4 mb-8">Riepilogo della richiesta</h1>

      {/* RIEPILOGO */}
      <section className="bg-wall-deep rounded-sm p-6 mb-8">
        <div className="flex justify-between font-mono text-sm mb-4">
          <div><p className="text-basalt-soft text-xs">Check-in</p><p className="font-bold">{checkin}</p></div>
          <div><p className="text-basalt-soft text-xs">Check-out</p><p className="font-bold">{checkout}</p></div>
          <div><p className="text-basalt-soft text-xs">Ospiti</p><p className="font-bold">{ospiti}</p></div>
        </div>
        <div className="font-mono text-sm space-y-2 border-t border-basalt/15 pt-4">
          <div className="flex justify-between"><span>{risultato.notti} notti × {risultato.prezzoNotte}€</span><span>{risultato.subtotale.toFixed(2)}€</span></div>
          {risultato.scontoValore > 0 && (
            <div className="flex justify-between text-teal"><span>{risultato.scontoLabel}</span><span>-{risultato.scontoValore.toFixed(2)}€</span></div>
          )}
          <div className="flex justify-between"><span>Pulizia</span><span>+{risultato.pulizia.toFixed(2)}€</span></div>
          <div className="flex justify-between"><span>IGIC (7%)</span><span>+{risultato.tasse.toFixed(2)}€</span></div>
          <div className="flex justify-between font-bold text-base border-t border-basalt/20 pt-2 mt-2"><span>Totale</span><span>{risultato.totale.toFixed(2)}€</span></div>
        </div>
      </section>

      {/* CHECK-IN/OUT */}
      <section className="mb-8">
        <h2 className="font-display text-lg font-bold mb-2">Check-in e check-out</h2>
        <p className="text-basalt-soft text-sm">Check-in dalle 13:00 alle 22:00 &middot; Check-out entro le 11:00.</p>
      </section>

      {/* PAGAMENTI */}
      <section className="mb-8">
        <h2 className="font-display text-lg font-bold mb-2">Come funziona il pagamento</h2>
        <p className="text-basalt-soft text-sm leading-relaxed">
          Questa è una richiesta, non una prenotazione istantanea: nessun addebito viene
          effettuato ora. Dopo la conferma di Alessandro, riceverai un link di pagamento sicuro
          (carta di credito/debito) da completare per confermare definitivamente il soggiorno.
        </p>
      </section>

      {/* CANCELLAZIONE */}
      <section className="mb-10">
        <h2 className="font-display text-lg font-bold mb-4">Cancellazione</h2>
        <TimelineCancellazione checkin={checkin} />
      </section>

      {/* FORM FINALE */}
      {inviato ? (
        <div className="bg-teal/10 border border-teal/30 rounded-sm p-6 text-center">
          <p className="text-teal text-3xl mb-2">&#10003;</p>
          <p className="font-display font-bold text-lg">Richiesta inviata correttamente — ti risponderò appena possibile!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border-t border-basalt/15 pt-8">
          <h2 className="font-display text-lg font-bold mb-4">Invia la richiesta</h2>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-mono">La tua email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
          </div>
          <div className="flex flex-col gap-1 mb-6">
            <label className="text-sm font-mono">Messaggio (facoltativo)</label>
            <textarea rows={3} value={messaggio} onChange={(e) => setMessaggio(e.target.value)} className="border border-basalt/20 rounded-sm p-2 bg-wall" />
          </div>
          <button type="submit" disabled={invio === "loading"} className="bg-teal hover:bg-teal-bright transition-colors text-wall px-8 py-3 rounded-sm font-display font-bold disabled:opacity-60">
            {invio === "loading" ? "Invio in corso..." : "Invia richiesta"}
          </button>
          {invio === "errore" && (
            <p className="mt-3 text-sm text-ochre">
              Invio non riuscito — riprova, o scrivimi direttamente se il problema persiste.
              {erroreDettaglio && <span className="block font-mono text-xs mt-1">({erroreDettaglio})</span>}
            </p>
          )}
        </form>
      )}
    </main>
  );
}

export default function RichiestaPage() {
  return (
    <Suspense fallback={null}>
      <RiepilogoRichiesta />
    </Suspense>
  );
}
