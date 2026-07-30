import { useState } from 'react';
import { Calendar } from 'react-calendar';

export default function Booking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(25);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const calculatePrice = (start, end, guests) => {
    const startDay = new Date(start);
    const endDay = new Date(end);
    const diffTime = endDay - startDay;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Base price from table (mock - replace with actual data)
    const basePrice = 150; // €150 per night
    const guestExtra = (guests - 1) * 10; // €10 extra per guest
    
    // Discounts
    let discount = 0;
    if (diffDays > 28) discount = 0.2; // 20% for 28+ days
    else if (diffDays > 7) discount = 0.1; // 10% for 7+ days
    
    const discountedPrice = (basePrice * diffDays) * (1 - discount);
    const guestTotal = guestExtra * diffDays;
    const cleaningFee = 25;
    const tax = (discountedPrice + guestTotal + cleaningFee) * 0.07; // IGIC 7%
    
    return {
      basePrice: basePrice * diffDays,
      guestExtra: guestExtra * diffDays,
      discount: discount * (basePrice * diffDays),
      cleaningFee,
      tax,
      total: discountedPrice + guestTotal + cleaningFee + tax,
    };
  };

  const handleDateChange = (date) => {
    if (!startDate || date > startDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
    setPrice(0);
  };

  const handleGuestsChange = (e) => {
    setGuests(parseInt(e.target.value));
    setPrice(0);
  };

  const handleBook = () => {
    if (!startDate || !endDate) {
      alert('Per favore, selecciona date di Partida e Arrivo.');
      return;
    }
    
    const result = calculatePrice(startDate, endDate, guests);
    setPrice(result);
    alert(`Prezzo totale: €${result.total.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Disponibilità e Prezzi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block mb-2 font-bold">Date di Partida</label>
            <Calendar
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
              className="border border-gray-300 rounded-lg"
            />
            
            <label className="block mt-4 mb-2 font-bold">Date di Arrivo</label>
            <Calendar
              onChange={handleDateChange}
              minDate={startDate}
              maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
              className="border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-bold">Ospiti</label>
            <input
              type="number"
              min={1}
              max={2}
              value={guests}
              onChange={handleGuestsChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            
            {price > 0 && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2">Ricevita</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Prezzo base</span>
                    <span>€{price.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extra ospiti</span>
                    <span>€{price.guestExtra.toFixed(2)}</span>
                  </div>
                  {price.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-€{price.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Pulizia</span>
                    <span>€{price.cleaningFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasse (IGIC)</span>
                    <span>€{price.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span>€{price.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={handleBook}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Calcola il Prezzo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
