export type AmenityItem = { label: string; icon: string };

export const amenitiesCurated: AmenityItem[] = [
  { label: "Letto king size (152 × 203 cm)", icon: "BedDouble" },
  { label: "Wifi veloce (480 Mbps)", icon: "Wifi" },
  { label: "Piscina condivisa del complesso", icon: "Waves" },
  { label: "Colazione su richiesta", icon: "Coffee" },
  { label: "Parcheggio gratuito in loco", icon: "SquareParking" },
  { label: "Bagno privato in camera", icon: "Bath" },
  { label: "Bollitore e mini-frigo", icon: "Refrigerator" },
  { label: "Cuscini e coperte extra", icon: "BedSingle" },
  { label: "Ferro da stiro", icon: "Shirt" },
];

export const amenitiesAll: AmenityItem[] = [
  { label: "TV", icon: "Tv" },
  { label: "Internet", icon: "Globe" },
  { label: "Wifi", icon: "Wifi" },
  { label: "Piscina", icon: "Waves" },
  { label: "Parcheggio gratuito", icon: "SquareParking" },
  { label: "Fumatori ammessi", icon: "Cigarette" },
  { label: "Colazione", icon: "Coffee" },
  { label: "Parcheggio in strada", icon: "ParkingCircle" },
  { label: "Citofono", icon: "Bell" },
  { label: "Kit di primo soccorso", icon: "CircleAlert" },
  { label: "Set essenziale (lenzuola, asciugamani, sapone)", icon: "Package" },
  { label: "Shampoo", icon: "Droplet" },
  { label: "Grucce", icon: "Shirt" },
  { label: "Asciugacapelli", icon: "Wind" },
  { label: "Ferro da stiro", icon: "Shirt" },
  { label: "Vasca da bagno", icon: "Bath" },
  { label: "Tende oscuranti", icon: "Blinds" },
  { label: "Acqua calda", icon: "Droplets" },
  { label: "Sapone per il corpo", icon: "Droplet" },
  { label: "Lenzuola", icon: "BedSingle" },
  { label: "Cuscini e coperte extra", icon: "BedSingle" },
  { label: "Microonde", icon: "Microwave" },
  { label: "Macchina del caffè", icon: "Coffee" },
  { label: "Frigorifero", icon: "Refrigerator" },
  { label: "Alloggio su un solo livello", icon: "Home" },
  { label: "Patio o balcone", icon: "DoorOpen" },
  { label: "Deposito bagagli consentito", icon: "Luggage" },
  { label: "Soggiorni lunghi consentiti", icon: "CalendarRange" },
  { label: "Check-in con l'host", icon: "UserCheck" },
  { label: "Bollitore", icon: "CupSoda" },
  { label: "Mini-frigo", icon: "Refrigerator" },
  { label: "Bidet", icon: "Bath" },
  { label: "Pranzo all'aperto", icon: "UtensilsCrossed" },
  { label: "Residence con accesso controllato", icon: "ShieldCheck" },
  { label: "Doccia esterna", icon: "ShowerHead" },
  { label: "Lettini prendisole", icon: "Sun" },
  { label: "Libri", icon: "BookOpen" },
  { label: "Ventilatori portatili", icon: "Fan" },
  { label: "Accesso al resort", icon: "Building2" },
  { label: "Gel doccia", icon: "Droplet" },
  { label: "Bidoni della spazzatura", icon: "Trash2" },
  { label: "Balsamo", icon: "Droplet" },
  { label: "Prodotti per la pulizia", icon: "SprayCan" },
  { label: "Stendibiancheria", icon: "Shirt" },
  { label: "Armadio", icon: "DoorClosed" },
];

export const zonaTesto = `Dove alloggeresti?

In Chayofa, una zona residenziale abitata dalla popolazione locale e separata dal centro nevralgico del turismo a Tenerife. A 20 minuti dall'aeroporto internazionale Reina Sofía, 5 minuti dal porto turistico di Los Cristianos. Tutti i vantaggi di trovarsi a pochi minuti da Playa de Las Américas, Los Cristianos e Costa Adeje e la loro enorme scelta di servizi e opportunità di divertimento, con tutti i collegamenti al resto dell'isola a portata di mano, senza gli svantaggi di passare le notti nel caos e nel rumore.

Parcheggio gratuito disponibile all'ingresso del complesso, fermata di bus a 5 minuti a piedi e, per gli sportivi, 2 km da Los Cristianos. Minimarket, bar e un paio di ristoranti a pochi passi, se proprio si è troppo stanchi per le alternative.`;

export const direzioniDallAeroporto = {
  auto: "Dall'aeroporto Reina Sofía: segui le indicazioni per Los Cristianos, prendi l'autostrada per 15 km fino all'uscita 72. All'uscita, invece di Los Cristianos, prendi la direzione Arona. Continua per circa 1 km e prendi la prima a destra, poi prosegui sotto il ponte: l'ingresso principale del complesso è a 50 metri sulla destra. Per parcheggiare più vicino, l'ingresso posteriore è su Calle Armiche, prima traversa a sinistra su Calle Llano del Grillo.",
  bus: "Dall'aeroporto, prendi il bus fino alla stazione centrale di Los Cristianos, poi il bus 480 o 418 in direzione Chayofa. Scendi alla fermata numero 7645 'Rotonda Mojón', attraversa la strada e segui Calle Armiche fino all'incrocio con Calle Llano del Grillo. Orari aggiornati su www.titsa.com.",
};

export const disponibilitaPlaceholder = "Aggiungi le date per conoscere i prezzi e la disponibilità";

export const contattiTesto = {
  intro: "Domande? Dubbi? Richieste assurde? Potete usare il form di contatto o scrivermi direttamente!",
  chiusura: "Ed infine, paura di arrivare e scoprire che il posto è in realtà un tubo vulcanico riadattato? Buttate un occhio sulla mia pagina Airbnb, dove sono Superhost da ben oltre un decennio ;)",
  airbnbUrl: "https://www.airbnb.it/rooms/5087672",
};

// Statistiche esatte dalla pagina Airbnb (fornite da Alessandro)
export const statisticheAirbnb = {
  media: 4.83,
  totale: 306,
  distribuzione: [
    { stelle: 5, pct: 88 },
    { stelle: 4, pct: 8 },
    { stelle: 3, pct: 3 },
    { stelle: 2, pct: 1 },
    { stelle: 1, pct: 0 },
  ],
  categorie: [
    { nome: "Pulizia", voto: 4.9 },
    { nome: "Precisione", voto: 4.9 },
    { nome: "Check-in", voto: 4.9 },
    { nome: "Comunicazione", voto: 4.9 },
    { nome: "Posizione", voto: 4.6 },
    { nome: "Qualità/prezzo", voto: 4.8 },
  ],
  badge: "Amato dagli ospiti",
};

export type Recensione = { testo: string; lingua: string };

// Testo esatto e originale scritto dagli ospiti (da reviews.json), nessuna parafrasi.
// L'export Airbnb non include nomi/iniziali dei recensori.
export const recensioniComplete: Recensione[] = [];

// Parametri di calcolo prezzo (da tabella disponibilità e prezzi.ods)
export const prezziConfig = {
  valuta: "EUR",
  prezzoBasePersonaNotte: 38,
  extraSecondaPersonaGiorno: 10,
  scontoOltre7Notti: 0.15,
  scontoOltre28Notti: 0.30, // non cumulabile: si applica solo il più alto
  puliziaUnaTantum: 5,
  igic: 0.07,
  finestraPrenotazioneMesi: 12,
};
