"use client";

function formattaData(d: Date) {
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
}

export default function TimelineCancellazione({ checkin }: { checkin: string }) {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  const dataCheckin = new Date(checkin);
  const dataLimite = new Date(dataCheckin);
  dataLimite.setDate(dataLimite.getDate() - 7);

  const totaleGiorni = Math.max((dataCheckin.getTime() - oggi.getTime()) / 86400000, 1);
  const giorniAllaLimite = (dataLimite.getTime() - oggi.getTime()) / 86400000;
  // posizione percentuale del punto "data limite" lungo la linea Oggi → Check-in
  const posLimite = Math.min(Math.max((giorniAllaLimite / totaleGiorni) * 100, 0), 100);
  const limiteGiaPassata = dataLimite <= oggi;

  return (
    <div>
      <div className="bg-wall-deep rounded-sm p-6 mb-6">
        <div className="relative h-10">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-basalt/20" />
          {/* segmento rimborso totale */}
          {!limiteGiaPassata && (
            <div className="absolute top-1/2 h-px bg-teal" style={{ left: 0, width: `${posLimite}%` }} />
          )}
          {/* Oggi */}
          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: "0%" }}>
            <div className="w-3 h-3 rounded-full bg-basalt -translate-x-1/2" />
            <p className="absolute top-4 -translate-x-1/2 font-mono text-xs whitespace-nowrap">Oggi</p>
          </div>
          {/* Data limite */}
          {!limiteGiaPassata && (
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${posLimite}%` }}>
              <div className="w-3 h-3 rounded-full bg-teal border-2 border-wall-deep -translate-x-1/2" />
              <p className="absolute top-4 -translate-x-1/2 font-mono text-xs whitespace-nowrap">{formattaData(dataLimite)}</p>
            </div>
          )}
          {/* Check-in */}
          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: "100%" }}>
            <div className="w-3 h-3 rounded-full bg-basalt/30 -translate-x-1/2" />
            <p className="absolute top-4 -translate-x-1/2 font-mono text-xs whitespace-nowrap right-0">Check-in</p>
          </div>
        </div>
        <div className="flex justify-between font-mono text-[10px] text-basalt-soft mt-8 uppercase tracking-wide">
          {!limiteGiaPassata ? (
            <>
              <span>Rimborso totale</span>
              <span>Rimborso parziale</span>
            </>
          ) : (
            <span className="mx-auto">Rimborso parziale</span>
          )}
        </div>
      </div>

      <ul className="text-basalt-soft text-sm leading-relaxed space-y-4">
        {!limiteGiaPassata && (
          <li>
            <strong className="text-basalt">Prima del {formattaData(dataLimite)}:</strong> rimborso
            totale, tasse incluse.
          </li>
        )}
        <li>
          <strong className="text-basalt">
            {limiteGiaPassata ? "Con queste date:" : `Dopo il ${formattaData(dataLimite)}:`}
          </strong>{" "}
          rimborso proporzionale delle tasse; ad Alessandro spetta l&apos;importo di tutte le
          notti già trascorse più una notte aggiuntiva, oltre al 50% delle notti restanti non
          godute.
        </li>
      </ul>
    </div>
  );
}
