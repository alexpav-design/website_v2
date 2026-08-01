"use client";
import { useState } from "react";
import { inviaWeb3Forms } from "@/lib/web3forms";

export default function ContattoModal({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [stato, setStato] = useState<"idle" | "loading" | "ok" | "errore">("idle");
  const [dettaglio, setDettaglio] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStato("loading");
    const { ok, dettaglio: d } = await inviaWeb3Forms({
      subject: "Nuovo messaggio dal sito — Chayofa B&B",
      from_name: nome,
      email,
      messaggio,
    });
    setStato(ok ? "ok" : "errore");
    setDettaglio(d ?? "");
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-teal hover:bg-teal-bright transition-colors px-8 py-3 rounded-sm font-display font-bold">
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-basalt/70 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-wall rounded-sm p-8 max-w-md w-full text-left" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-display text-xl font-bold text-basalt">Scrivimi</h3>
              <button onClick={() => setOpen(false)} className="text-2xl leading-none text-basalt" aria-label="Chiudi">&times;</button>
            </div>
            {stato === "ok" ? (
              <p className="text-teal font-display font-bold">
                Messaggio inviato correttamente — ti risponderò appena possibile!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input required placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="border border-basalt/20 rounded-sm p-2 text-basalt" />
                <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-basalt/20 rounded-sm p-2 text-basalt" />
                <textarea required rows={4} placeholder="Messaggio" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} className="border border-basalt/20 rounded-sm p-2 text-basalt" />
                <button disabled={stato === "loading"} className="bg-teal hover:bg-teal-bright transition-colors text-wall px-6 py-2 rounded-sm font-display font-bold disabled:opacity-60">
                  {stato === "loading" ? "Invio..." : "Invia"}
                </button>
                {stato === "errore" && (
                  <p className="text-ochre text-sm">
                    Invio non riuscito, riprova.
                    {dettaglio && <span className="block font-mono text-xs mt-1">({dettaglio})</span>}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
