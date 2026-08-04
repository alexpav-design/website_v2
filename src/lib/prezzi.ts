import { prezziConfig } from "@/data/chayofa";

export function calcolaPrezzo(checkin: string, checkout: string, ospiti: number) {
  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  const notti = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  if (notti <= 0) return null;

  const prezzoNotte = prezziConfig.prezzoBasePersonaNotte + (ospiti === 2 ? prezziConfig.extraSecondaPersonaGiorno : 0);
  const subtotale = prezzoNotte * notti;

  let sconto = 0;
  let scontoLabel = "";
  if (notti >= 28) {
    sconto = prezziConfig.scontoOltre28Notti;
    scontoLabel = "Sconto soggiorno ≥28 notti (30%)";
  } else if (notti >= 7) {
    sconto = prezziConfig.scontoOltre7Notti;
    scontoLabel = "Sconto soggiorno ≥7 notti (15%)";
  }
  const scontoValore = subtotale * sconto;
  const dopoSconto = subtotale - scontoValore;
  const conPulizia = dopoSconto + prezziConfig.puliziaUnaTantum;
  const tasse = conPulizia * prezziConfig.igic;
  const totale = conPulizia + tasse;

  return { notti, prezzoNotte, subtotale, scontoLabel, scontoValore, dopoSconto, pulizia: prezziConfig.puliziaUnaTantum, tasse, totale };
}
