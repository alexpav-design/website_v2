"use client";
import { useState } from "react";

type Occupato = { dal: string; al: string };

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

function giornoOccupato(d: Date, occupato: Occupato[]) {
  const t = d.getTime();
  return occupato.some((o) => {
    const b1 = new Date(o.dal).getTime();
    const b2 = new Date(o.al).getTime();
    return t >= b1 && t < b2; // dal incluso, al escluso (giorno di checkout è libero per un altro check-in)
  });
}

function esisteOccupatoTraDate(a: Date, b: Date, occupato: Occupato[]) {
  const cursore = new Date(a);
  while (cursore < b) {
    if (giornoOccupato(cursore, occupato)) return true;
    cursore.setDate(cursore.getDate() + 1);
  }
  return false;
}

const MESI = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const GIORNI = ["L","M","M","G","V","S","D"];

export default function CalendarioDisponibilita({
  occupato,
  checkin,
  checkout,
  onChange,
}: {
  occupato: Occupato[];
  checkin: string;
  checkout: string;
  onChange: (checkin: string, checkout: string) => void;
}) {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  const [meseVisibile, setMeseVisibile] = useState(new Date(oggi.getFullYear(), oggi.getMonth(), 1));

  const maxData = new Date(oggi);
  maxData.setMonth(maxData.getMonth() + 12);

  function renderMese(base: Date) {
    const anno = base.getFullYear();
    const mese = base.getMonth();
    const primoGiorno = new Date(anno, mese, 1);
    const ultimoGiorno = new Date(anno, mese + 1, 0);
    // lunedì = 0
    const offset = (primoGiorno.getDay() + 6) % 7;
    const celle: (Date | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= ultimoGiorno.getDate(); d++) celle.push(new Date(anno, mese, d));

    return (
      <div>
        <p className="font-display font-bold text-center mb-3">{MESI[mese]} {anno}</p>
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs mb-1 text-basalt-soft">
          {GIORNI.map((g, i) => <div key={i}>{g}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {celle.map((d, i) => {
            if (!d) return <div key={i} />;
            const passato = d < oggi;
            const fuoriFinestra = d > maxData;
            const occupatoGiorno = giornoOccupato(d, occupato);
            const disabilitato = passato || fuoriFinestra || occupatoGiorno;
            const iso = isoDay(d);
            const selezionatoCheckin = iso === checkin;
            const selezionatoCheckout = iso === checkout;
            const inRange = checkin && checkout && iso > checkin && iso < checkout;

            return (
              <button
                key={i}
                type="button"
                disabled={disabilitato}
                onClick={() => {
                  if (!checkin || (checkin && checkout) || iso <= checkin) {
                    onChange(iso, "");
                    return;
                  }
                  const dCheckin = new Date(checkin);
                  if (esisteOccupatoTraDate(dCheckin, d, occupato)) {
                    onChange(iso, ""); // non si può prenotare "attraverso" un blocco: si riparte da qui
                    return;
                  }
                  onChange(checkin, iso);
                }}
                className={[
                  "aspect-square text-xs rounded-sm font-mono transition-colors",
                  disabilitato && occupatoGiorno ? "bg-ochre/20 text-ochre/60 line-through cursor-not-allowed" : "",
                  disabilitato && !occupatoGiorno ? "text-basalt-soft/30 cursor-not-allowed" : "",
                  !disabilitato ? "hover:bg-teal/20 cursor-pointer" : "",
                  selezionatoCheckin || selezionatoCheckout ? "bg-teal text-wall font-bold" : "",
                  inRange ? "bg-teal/15" : "",
                ].join(" ")}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const meseSuccessivo = new Date(meseVisibile.getFullYear(), meseVisibile.getMonth() + 1, 1);

  return (
    <div className="border border-basalt/15 rounded-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setMeseVisibile(new Date(meseVisibile.getFullYear(), meseVisibile.getMonth() - 1, 1))}
          className="font-mono text-sm px-2 hover:text-teal"
          aria-label="Mese precedente"
        >
          &#8249;
        </button>
        <div className="flex gap-3 text-xs font-mono text-basalt-soft">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-ochre/20 inline-block rounded-sm" /> occupato</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-teal inline-block rounded-sm" /> selezionato</span>
        </div>
        <button
          type="button"
          onClick={() => setMeseVisibile(new Date(meseVisibile.getFullYear(), meseVisibile.getMonth() + 1, 1))}
          className="font-mono text-sm px-2 hover:text-teal"
          aria-label="Mese successivo"
        >
          &#8250;
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-8">
        {renderMese(meseVisibile)}
        {renderMese(meseSuccessivo)}
      </div>
      <p className="font-mono text-xs text-basalt-soft mt-4">
        {!checkin ? "Seleziona la data di check-in" : !checkout ? "Ora seleziona la data di check-out" : `${checkin} → ${checkout}`}
      </p>
    </div>
  );
}
