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
  metadataBase: new URL("https://www.satelliteguard.com.mx"),
  title: {
    default: "Satellite Guard | Monitoreo GPS y Seguridad Vehicular",
    template: "%s | Satellite Guard",
  },
  description: "Seguridad, rastreo y control para vehículos, flotillas y activos.",
  keywords: [
    "monitoreo gps Mexico CDMX",
    "rastreo gps Mexico CDMX",
    "rastreo satelital Mexico CDMX",
    "seguimiento vehicular Mexico CDMX",
    "localizador gps para autos Mexico CDMX",
    "gps para flotillas Mexico CDMX",
    "control de flotillas Mexico CDMX",
    "monitoreo de flotillas Mexico CDMX",
    "geocercas gps Mexico CDMX",
    "alertas gps en tiempo real Mexico CDMX",
    "plataforma de monitoreo gps Mexico CDMX",
    "seguridad vehicular Mexico CDMX",
    "recuperación vehicular Mexico CDMX",
    "rastreo de activos Mexico CDMX",
    "monitoreo de activos móviles Mexico CDMX",
    "gps para transporte y logística Mexico CDMX",
    "sistema gps para empresas Mexico CDMX",
    "monitoreo 24/7 vehículos Mexico CDMX",
    "rastreo gps méxico Mexico CDMX",
    "monitoreo gps méxico Mexico CDMX",
    "control de flotillas méxico Mexico CDMX",
    "rastreo gps cdmx Mexico CDMX",
    "rastreo gps monterrey Mexico CDMX",
    "rastreo gps guadalajara Mexico CDMX",
    "tecnología satelital para vehículos Mexico CDMX",
  ],
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Satellite Guard | Monitoreo GPS y Seguridad Vehicular",
    description: "Seguridad, rastreo y control para vehículos, flotillas y activos.",
    url: "https://www.satelliteguard.com.mx/",
    siteName: "Satellite Guard",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Satellite Guard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satellite Guard | Monitoreo GPS y Seguridad Vehicular",
    description: "Seguridad, rastreo y control para vehículos, flotillas y activos.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
