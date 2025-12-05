import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Primeiros Passos Fiscais para Profissionais da Saúde | Guia Gratuito",
  description: "Guia completo e gratuito sobre organização fiscal e contábil para médicos, dentistas, fisioterapeutas, psicólogos e outros profissionais da saúde. Aprenda sobre PF x PJ, regimes tributários e primeiros passos financeiros.",
  keywords: ["contabilidade médicos", "contabilidade dentistas", "PF x PJ", "Simples Nacional profissionais saúde", "guia fiscal saúde"],
  openGraph: {
    title: "Primeiros Passos Fiscais para Profissionais da Saúde",
    description: "Guia gratuito sobre organização fiscal e contábil para profissionais da saúde e prestadores de serviços",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
