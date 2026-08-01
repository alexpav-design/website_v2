export async function inviaWeb3Forms(data: Record<string, string>) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    console.error("Manca NEXT_PUBLIC_WEB3FORMS_KEY nelle variabili d'ambiente di Vercel");
    return { ok: false };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, ...data }),
    });
    const json = await res.json();
    return { ok: json.success === true };
  } catch (e) {
    console.error(e);
    return { ok: false };
  }
}
