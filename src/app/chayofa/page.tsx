import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import Lightbox from "@/components/Lightbox";
import AmenitiesModal from "@/components/AmenitiesModal";
import RichiestaForm from "@/components/RichiestaForm";
import RecensioniModal from "@/components/RecensioniModal";
import ContattoModal from "@/components/ContattoModal";
import {
  amenitiesCurated, amenitiesAll, zonaTesto,
  contattiTesto, statisticheAirbnb,
} from "@/data/chayofa";
import recensioniComplete from "@/data/recensioni-complete.json";

const foto = Array.from({ length: 13 }, (_, i) => `/images/chayofa/foto-${i + 1}.jpg`);

const tabs = [
  { id: "foto", label: "Foto" },
  { id: "descrizione", label: "Descrizione" },
  { id: "servizi", label: "Servizi" },
  { id: "disponibilita", label: "Disponibilità" },
  { id: "zona", label: "Zona" },
  { id: "recensioni", label: "Recensioni" },
  { id: "contatti", label: "Contatti" },
];

export default function ChayofaPage() {
  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[460px] flex items-end">
        <Image src="/images/chayofa/foto-2.jpg" alt="Vista del complesso residenziale di Chayofa" fill priority className="object-cover -z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-basalt/90 via-basalt/30 to-transparent -z-10" />
        <div className="relative z-10 px-6 sm:px-12 pb-10 max-w-3xl hero-reveal">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-star mb-4">Chayofa &middot; Tenerife sud</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-wall leading-[1.05]">
            Una stanza tranquilla, a un passo dal sud turistico di Tenerife
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-wall/80">
            <span>{statisticheAirbnb.media}/5</span>
            <span>{statisticheAirbnb.totale} recensioni</span>
            <span>11 anni da host</span>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-30 bg-wall/95 backdrop-blur border-b border-basalt/10 overflow-x-auto">
        <div className="flex gap-6 px-6 sm:px-12 py-3 font-mono text-sm whitespace-nowrap max-w-5xl mx-auto">
          {tabs.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="hover:text-teal transition-colors">{t.label}</a>
          ))}
        </div>
      </nav>

      {/* FOTO — niente titolo, come richiesto */}
      <section id="foto" className="px-6 sm:px-12 py-16 max-w-5xl mx-auto scroll-mt-16">
        <Lightbox photos={foto} />
      </section>

      {/* DESCRIZIONE */}
      <section id="descrizione" className="px-6 sm:px-12 py-16 max-w-3xl mx-auto scroll-mt-16">
        <h2 className="font-display text-2xl font-bold mb-6">La zona, spiegata bene</h2>
        <p className="text-lg leading-relaxed text-basalt-soft">
          Un Bed &amp; Breakfast in un complesso ordinato, in un quartiere residenziale abitato
          dalla popolazione locale — non la classica zona turistica affollata e rumorosa. Qui si
          respira tranquillità: certo, c&apos;è un bar, un ristorante, un supermercato — ma non è
          quello il punto di forza. Il punto di forza è che puoi scegliere: restare nella quiete
          del quartiere, oppure raggiungere in pochi minuti tutta l&apos;offerta della zona
          turistica, a piedi, in auto, in bus (fermata a pochi minuti da casa) o in taxi.
        </p>

        <div className="mt-8 p-6 bg-night text-star rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 starfield" />
          <p className="relative font-mono text-xs uppercase tracking-widest text-teal-bright mb-3">
            Un rapporto privilegiato, se lo desideri
          </p>
          <p className="relative font-host-quote text-lg leading-relaxed">
            Sono Alessandro, vivo ad Arona e ospito da 11 anni. Se preferisci l&apos;autonomia,
            nessun problema. Ma se ti va, hai a disposizione anni di esperienza come guida
            turistica, guida trekking e guida per l&apos;osservazione delle stelle — posso aiutarti
            a costruire un soggiorno su misura.
          </p>
          <Link href="/#chi-sono" className="relative inline-block mt-4 font-mono text-xs underline text-teal-bright hover:text-star">
            Per saperne di più &rarr;
          </Link>
        </div>
      </section>

      {/* SERVIZI con icone */}
      <section id="servizi" className="px-6 sm:px-12 py-16 bg-wall-deep scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">Servizi</h2>
          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-5">
            {amenitiesCurated.map((a) => {
              const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[a.icon] ?? Icons.Check;
              return (
                <li key={a.label} className="text-basalt-soft text-sm flex gap-3 items-center">
                  <IconComp size={20} className="text-teal shrink-0" />
                  {a.label}
                </li>
              );
            })}
          </ul>
          <AmenitiesModal all={amenitiesAll} />
        </div>
      </section>

      {/* DISPONIBILITA con calcolatore prezzi */}
      <section id="disponibilita" className="px-6 sm:px-12 py-16 max-w-3xl mx-auto scroll-mt-16">
        <h2 className="font-display text-2xl font-bold mb-2">Richiedi disponibilità</h2>
        <p className="text-basalt-soft mb-8">
          Nessuna prenotazione istantanea: ogni richiesta viene confermata a mano da Alessandro,
          di solito entro poche ore.
        </p>
        <RichiestaForm />
      </section>

      {/* ZONA — testo reale di Alessandro */}
      <section id="zona" className="px-6 sm:px-12 py-16 bg-wall-deep scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">I dintorni</h2>
          <div className="rounded-sm overflow-hidden mb-8 border border-basalt/10">
            <iframe
              title="Mappa della posizione approssimativa"
              className="w-full h-72"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-16.712%2C28.065%2C-16.685%2C28.080&layer=mapnik&marker=28.0725%2C-16.6986"
            />
          </div>
          {zonaTesto.split("\n\n").map((p, i) => (
            <p key={i} className="text-basalt-soft mb-4 leading-relaxed whitespace-pre-line">{p}</p>
          ))}
        </div>
      </section>

      {/* RECENSIONI — statistiche esatte Airbnb + testo verbatim */}
      <section id="recensioni" className="px-6 sm:px-12 py-16 max-w-3xl mx-auto scroll-mt-16">
        <h2 className="font-display text-2xl font-bold mb-2">Cosa dicono gli ospiti</h2>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display text-4xl font-bold text-teal">{statisticheAirbnb.media}</span>
          <div>
            <p className="font-mono text-sm">su 5 &middot; {statisticheAirbnb.totale} recensioni</p>
            <p className="font-mono text-xs text-ochre">{statisticheAirbnb.badge}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8 font-mono text-xs">
          {statisticheAirbnb.categorie.map((c) => (
            <div key={c.nome}>
              <p className="text-xl font-bold text-teal">{c.voto}</p>
              <p className="text-basalt-soft">{c.nome}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {recensioniComplete.slice(0, 5).map((r, i) => (
            <div key={i} className="border-l-2 border-teal/40 pl-4 py-1">
              <p className="text-basalt-soft">{r.testo}</p>
              <p className="font-mono text-xs text-teal mt-1">{r.lingua}</p>
            </div>
          ))}
        </div>
        <RecensioniModal tutte={recensioniComplete} />
      </section>

      {/* CONTATTI — tono di Alessandro */}
      <section id="contatti" className="px-6 sm:px-12 py-20 bg-basalt text-wall scroll-mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">{contattiTesto.intro}</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <ContattoModal label="Scrivimi" />
          </div>
          <p className="text-wall/80 mb-4 font-host-quote">{contattiTesto.chiusura}</p>
          <a href={contattiTesto.airbnbUrl} target="_blank" className="inline-block border border-wall/30 hover:border-wall/60 transition-colors px-8 py-3 rounded-sm font-display">
            Vedi il profilo Airbnb
          </a>
        </div>
      </section>

      <footer className="px-6 sm:px-12 py-8 text-xs text-basalt-soft font-mono flex flex-wrap gap-x-6 gap-y-2 justify-between">
        <span>N&deg; registrazione: ESHFTU00003801600059935500100000000000A-38-4-00078303</span>
        <Link href="/" className="underline">&larr; Torna alla home</Link>
      </footer>
    </main>
  );
}
