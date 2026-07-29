import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-teal">
          Tenerife sud &middot; prenotazione diretta
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
          Due modi di stare a Tenerife, uno stesso posto da cui partire
        </h1>
        <p className="max-w-xl text-lg text-basalt-soft">
          Scegli la sistemazione che fa per te. Prenotando qui, senza intermediari, il prezzo
          resta più basso per te — e per me.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <Link
            href="/chayofa"
            className="group relative overflow-hidden rounded-sm bg-basalt text-wall text-left p-8 flex flex-col justify-end min-h-[320px] transition-transform hover:-translate-y-1"
          >
            <Image
              src="/images/chayofa/foto-2.jpg"
              alt="Camera del B&B a Chayofa"
              fill
              className="object-cover opacity-70 group-hover:opacity-80 transition-opacity -z-10"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-widest text-star">Chayofa &middot; B&amp;B</p>
              <h2 className="font-display text-2xl font-bold mt-2">
                Una stanza tranquilla, a un passo dal sud turistico
              </h2>
              <p className="mt-2 text-sm text-wall/80">Scopri il B&amp;B &rarr;</p>
            </div>
          </Link>

          <div className="relative overflow-hidden rounded-sm bg-wall-deep text-basalt text-left p-8 flex flex-col justify-end min-h-[320px] border border-basalt/10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-basalt-soft">Costa Adeje &middot; Appartamento</p>
              <h2 className="font-display text-2xl font-bold mt-2">
                In arrivo
              </h2>
              <p className="mt-2 text-sm text-basalt-soft">
                L&apos;appartamento completo a Costa Adeje sarà presto anche qui.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
