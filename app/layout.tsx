import type {Metadata} from 'next';
import { Instrument_Serif, Barlow } from 'next/font/google';
import './globals.css';

const instrument = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-heading"
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: 'Studio | Plateforme Vidéo',
  description: 'Premium cinematic video learning platform',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${instrument.variable} ${barlow.variable}`}>
      <body className="bg-[#030303] text-white/80 font-body antialiased selection:bg-indigo-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
