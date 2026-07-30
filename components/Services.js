import { House, Bed, Shower, Wifi, Tvd, Trash, Car, Star, Clock } from 'lucide-react';

const services = [
  { icon: House, name: 'Casa Completa', description: 'Alloggio con tutti i servizi' },
  { icon: Bed, name: 'Camere', description: '2 camere con letti 160x90 cm' },
  { icon: Shower, name: 'Bancroni', description: '2 baños con doccia e lavandino' },
  { icon: Wifi, name: 'Wi-Fi', description: 'Connezione internet gratuitamente' },
  { icon: Tvd, name: 'Televisore', description: 'TV 52 pollici' },
  { icon: Trash, name: 'PULIZIA', description: 'Pulizia inclusa nel prezzo' },
  { icon: Car, name: 'Parca', description: 'Parca gratuito' },
  { icon: Star, name: 'Valutazione', description: '4.83 su 5 in 306 recensioni' },
  { icon: Clock, name: 'Check-in', description: 'Check-in da 14:00, Check-out alle 11:00' },
];

export default function Services() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Servizi</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <component of={service.icon} className="text-white w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
