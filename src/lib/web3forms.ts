export async function inviaWeb3Forms(data: Record<string, string>) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    console.error("Manca NEXT_PUBLIC_WEB3FORMS_KEY nelle variabili d'ambiente di Vercel (o serve un redeploy dopo averla aggiunta)");
    return { ok: false, dettaglio: "chiave non configurata sul sito pubblicato" };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, ...data }),
    });
    const json = await res.json();
    if (json.success !== true) {
      console.error("Web3Forms ha risposto con un errore:", json);
    }
    return { ok: json.success === true, dettaglio: json.message };
  } catch (e) {
    console.error(e);
    return { ok: false, dettaglio: "errore di rete" };
  }
}
