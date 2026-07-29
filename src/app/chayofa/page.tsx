import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import AmenitiesModal from "@/components/AmenitiesModal";
import RichiestaForm from "@/components/RichiestaForm";
import { amenitiesCurated, amenitiesAll, direzioniDallAeroporto, recensioniEstratti } from "@/data/chayofa";

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
        <Image
          src="/images/chayofa/foto-2.jpg"
          alt="Vista del complesso residenziale di Chayofa"
          fill
          priority
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-basalt/90 via-basalt/30 to-transparent -z-10" />
        <div className="relative z-10 px-6 sm:px-12 pb-10 max-w-3xl hero-reveal">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-star mb-4">
            Chayofa &middot; Tenerife sud
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-wall leading-[1.05]">
            Una stanza tranquilla, a un passo dal sud turistico di Tenerife
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-wall/80">
            <span>4,81/5</span>
            <span>469 recensioni</span>
            <span>11 anni da host</span>
          </div>
        </div>
      </section>

      {/* TAB NAV */}
      <nav className="sticky top-0 z-30 bg-wall/95 backdrop-blur border-b border-basalt/10 overflow-x-auto">
        <div className="flex gap-6 px-6 sm:px-12 py-3 font-mono text-sm whitespace-nowrap max-w-5xl mx-auto">
          {tabs.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="hover:text-teal transition-colors">
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      {/* FOTO */}
      <section id="foto" className="px-6 sm:px-12 py-16 max-w-5xl mx-auto scroll-mt-16">
        <h2 className="font-display text-2xl font-bold mb-6">Foto</h2>
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
        <p className="text-lg leading-relaxed text-basalt-soft mt-4">
          Camera matrimoniale con letto king size (152&times;203), bagno privato in camera, TV,
          mini-frigo, forno a microonde e bollitore.
        </p>
        <div className="mt-8 p-6 bg-night text-star rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 starfield" />
          <p className="relative font-mono text-xs uppercase tracking-widest text-teal-bright mb-3">
            Un rapporto privilegiato, se lo desideri
          </p>
          <p className="relative leading-relaxed">
            Sono Alessandro, vivo ad Arona e ospito da 11 anni. Se preferisci l&apos;autonomia,
            nessun problema. Ma se ti va, hai a disposizione anni di esperienza come guida
            turistica, guida trekking e guida per l&apos;osservazione delle stelle — posso aiutarti
            a costruire un soggiorno su misura.
          </p>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="servizi" className="px-6 sm:px-12 py-16 bg-wall-deep scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">Servizi</h2>
          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-3">
            {amenitiesCurated.map((a) => (
              <li key={a} className="text-basalt-soft text-sm flex gap-2">
                <span className="text-teal">&#10003;</span> {a}
              </li>
            ))}
          </ul>
          <AmenitiesModal all={amenitiesAll} />
        </div>
      </section>

      {/* DISPONIBILITA */}
      <section id="disponibilita" className="px-6 sm:px-12 py-16 max-w-3xl mx-auto scroll-mt-16">
        <h2 className="font-display text-2xl font-bold mb-2">Richiedi disponibilità</h2>
        <p className="text-basalt-soft mb-8">
          Nessuna prenotazione istantanea: ogni richiesta viene confermata a mano da Alessandro,
          di solito entro poche ore.
        </p>
        <RichiestaForm />
      </section>

      {/* ZONA */}
      <section id="zona" className="px-6 sm:px-12 py-16 bg-wall-deep scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">Zona e collegamenti</h2>
          <div className="rounded-sm overflow-hidden mb-8 border border-basalt/10">
            <iframe
              title="Mappa della posizione approssimativa"
              className="w-full h-72"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-16.712%2C28.065%2C-16.685%2C28.080&layer=mapnik&marker=28.0725%2C-16.6986"
            />
          </div>
          <h3 className="font-display font-bold mb-2">Dall&apos;aeroporto Reina Sofía, in auto</h3>
          <p className="text-basalt-soft mb-6 leading-relaxed">{direzioniDallAeroporto.auto}</p>
          <h3 className="font-display font-bold mb-2">Dall&apos;aeroporto, in bus</h3>
          <p className="text-basalt-soft leading-relaxed">{direzioniDallAeroporto.bus}</p>
        </div>
      </section>

      {/* RECENSIONI */}
      <section id="recensioni" className="px-6 sm:px-12 py-16 max-w-3xl mx-auto scroll-mt-16">
        <h2 className="font-display text-2xl font-bold mb-6">Cosa dicono gli ospiti</h2>
        <div className="grid sm:grid-cols-3 gap-8 mb-4 font-mono">
          <div>
            <p className="text-4xl font-bold text-teal">4,81</p>
            <p className="text-sm text-basalt-soft mt-1">valutazione media</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-teal">469</p>
            <p className="text-sm text-basalt-soft mt-1">recensioni ricevute</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-teal">4,90</p>
            <p className="text-sm text-basalt-soft mt-1">comunicazione</p>
          </div>
        </div>
        <p className="text-xs text-basalt-soft/70 mb-8 font-mono">
          Estratti parafrasati e anonimizzati — l&apos;export Airbnb non include i nomi dei recensori.
        </p>
        <div className="space-y-4">
          {recensioniEstratti.map((r, i) => (
            <div key={i} className="border-l-2 border-teal/40 pl-4 py-1">
              <p className="text-basalt-soft">{r.testo}</p>
              <p className="font-mono text-xs text-teal mt-1">{r.lingua} &middot; {r.periodo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="px-6 sm:px-12 py-20 bg-basalt text-wall scroll-mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Prenota direttamente</h2>
          <p className="text-wall/80 mb-8">
            Nessuna commissione di intermediazione applicata al prezzo — il vantaggio economico
            resta tuo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:alextenbb@gmail.com" className="bg-teal hover:bg-teal-bright transition-colors px-8 py-3 rounded-sm font-display font-bold">
              Scrivimi: alextenbb@gmail.com
            </a>
            <a href="#" className="border border-wall/30 hover:border-wall/60 transition-colors px-8 py-3 rounded-sm font-display">
              Vedi il profilo Airbnb
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-12 py-8 text-xs text-basalt-soft font-mono flex flex-wrap gap-x-6 gap-y-2 justify-between">
        <span>N&deg; registrazione VV Canarie/nazionale: ESHFTU00003801600059935500100000000000A-38-4-00078303</span>
        <Link href="/" className="underline">&larr; Torna alla home</Link>
      </footer>
    </main>
  );
}
