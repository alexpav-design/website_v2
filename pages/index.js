import Head from 'next/head';
import ReviewCard from '../components/ReviewCard';
import ReviewsList from '../components/ReviewsList';
import Link from 'next/link';
import Services from '../components/Services';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>Alloggio Vacanze - B&B al Mare</title>
        <meta name="description" content="Bella residence con vista sul mare, vicino al centro storico." />
        <meta name="keywords" content="alloggio vacanze, b&b, mare, centro storico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">B&B al Mare</h1>
            <p className="text-xl md:text-2xl mb-8">Residenza con vista sul mare, vicino al centro storico</p>
            <Link href="/booking" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition">
              Consulta la Disponibilité
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Reviews Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Recensioni degli Ospiti</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReviewCard review={reviews[0]} />
            <ReviewCard review={reviews[1]} />
            <ReviewCard review={reviews[2]} />
          </div>

          <div className="text-center mt-12">
            <p className="text-lg italic text-gray-600">Un rapporto privilegiato, se lo desideri</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">Per saperne di più</Link>
          </div>

          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Veder altre recensioni
          </button>
        </div>
      </section>
    </div>
  );
}

// Mock data - da replace con reviews.json
const reviews = [
  { text: "L'alloggio era perfetto, pulito e benéquipé. La vista sul mare era splendidissima!", rating: 5 },
  { text: "Ottimo alloggio, molto pulito e bene posto. Ci sono tornati due volte!", rating: 5 },
  { text: "Bella casa, buon ambiente, host molto gentile. Ci recommend!", rating: 5 },
  { text: "Un'esperienza impeccabile, pulizia immacolata, check-in facile, comunicazione perfecta. Qualità/prezzo excellent!", rating: 5 },
  { text: "Bella residence, vista panoramica, centro storico a passo di casa. Molto consigliata!", rating: 5 },
];
