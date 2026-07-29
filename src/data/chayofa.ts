export const amenitiesCurated = [
  "Wifi veloce (480 Mbps)",
  "Piscina condivisa del complesso",
  "Colazione su richiesta",
  "Parcheggio gratuito in loco",
  "Bagno privato in camera",
  "Bollitore e mini-frigo",
  "Cuscini e coperte extra",
  "Ferro da stiro",
  "Deposito bagagli",
];

export const amenitiesAll = [
  "TV", "Internet", "Wifi", "Piscina", "Parcheggio gratuito", "Fumatori ammessi",
  "Colazione", "Parcheggio in strada", "Citofono", "Kit di primo soccorso",
  "Set essenziale (lenzuola, asciugamani, sapone)", "Shampoo", "Grucce",
  "Asciugacapelli", "Ferro da stiro", "Vasca da bagno", "Tende oscuranti",
  "Acqua calda", "Sapone per il corpo", "Lenzuola", "Cuscini e coperte extra",
  "Microonde", "Macchina del caffè", "Frigorifero", "Alloggio su un solo livello",
  "Patio o balcone", "Deposito bagagli consentito", "Soggiorni lunghi consentiti",
  "Check-in con l'host", "Bollitore", "Mini-frigo", "Bidet", "Pranzo all'aperto",
  "Residence con accesso controllato", "Doccia esterna", "Lettini prendisole",
  "Libri", "Ventilatori portatili", "Accesso al resort", "Gel doccia",
  "Bidoni della spazzatura", "Balsamo", "Prodotti per la pulizia",
  "Stendibiancheria", "Armadio",
];

export const direzioniDallAeroporto = {
  auto: "Dall'aeroporto Reina Sofía: segui le indicazioni per Los Cristianos, prendi l'autostrada per 15 km fino all'uscita 72. All'uscita, invece di Los Cristianos, prendi la direzione Arona. Continua per circa 1 km e prendi la prima a destra, poi prosegui sotto il ponte: l'ingresso principale del complesso è a 50 metri sulla destra. Per parcheggiare più vicino, l'ingresso posteriore è su Calle Armiche, prima traversa a sinistra su Calle Llano del Grillo.",
  bus: "Dall'aeroporto, prendi il bus fino alla stazione centrale di Los Cristianos, poi il bus 480 o 418 in direzione Chayofa. Scendi alla fermata numero 7645 'Rotonda Mojón', attraversa la strada e segui Calle Armiche fino all'incrocio con Calle Llano del Grillo. Orari aggiornati su www.titsa.com.",
};

export type ReviewExtract = {
  testo: string;
  lingua: string;
  periodo: string;
};

// Estratti parafrasati da recensioni reali (469 ricevute), anonimizzati:
// l'export dati di Airbnb non include il nome del recensore, solo un id anonimo.
export const recensioniEstratti: ReviewExtract[] = [
  {
    testo: "Un ospite ha trovato il posto tranquillo ed esattamente come nelle foto, apprezzando anche la disponibilità di Alessandro ad accompagnarlo in aeroporto.",
    lingua: "EN",
    periodo: "2026",
  },
  {
    testo: "Un ospite tedesco ha definito Alessandro un host gentile, disponibile e simpatico, elogiando la colazione con pane e muffin fatti in casa.",
    lingua: "DE",
    periodo: "2026",
  },
  {
    testo: "Diversi ospiti spagnoli sottolineano l'accoglienza calorosa di Alessandro, l'attenzione ai dettagli e la varietà delle colazioni preparate ogni mattina.",
    lingua: "ES",
    periodo: "2026",
  },
  {
    testo: "Un ospite ha apprezzato la comunicazione fluida prima e durante il soggiorno, oltre ai consigli utili di Alessandro per visitare l'isola.",
    lingua: "EN",
    periodo: "2026",
  },
  {
    testo: "Un ospite segnala che il posto è pulito, comodo e facilmente raggiungibile in bus, con istruzioni chiare fornite in anticipo.",
    lingua: "EN",
    periodo: "2026",
  },
];
