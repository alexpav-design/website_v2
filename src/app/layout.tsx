import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chayofa B&B — Tenerife sud, tranquillo e vicino a tutto",
  description:
    "Una stanza tranquilla in un quartiere residenziale di Chayofa, a un'unica fermata di bus da Los Cristianos. Prenotazione diretta, nessuna commissione.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-wall text-basalt">
        {children}
      </body>
    </html>
  );
}
