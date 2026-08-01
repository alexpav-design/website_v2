import { NextResponse } from "next/server";
import ical from "node-ical";

export const dynamic = "force-dynamic"; // niente cache statica, controlla sempre il feed fresco

export async function GET() {
  const url = process.env.AIRBNB_ICAL_URL;
  if (!url) {
    return NextResponse.json({ errore: "AIRBNB_ICAL_URL non configurato" }, { status: 500 });
  }

  try {
    const eventi = await ical.async.fromURL(url);
    const occupato: { dal: string; al: string }[] = [];

    for (const key in eventi) {
      const ev = eventi[key];
      if (ev && ev.type === "VEVENT" && ev.start && ev.end) {
        occupato.push({
          dal: ev.start.toISOString().slice(0, 10),
          al: ev.end.toISOString().slice(0, 10),
        });
      }
    }

    return NextResponse.json({ occupato, aggiornato: new Date().toISOString() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ errore: "Impossibile leggere il calendario Airbnb" }, { status: 502 });
  }
}
