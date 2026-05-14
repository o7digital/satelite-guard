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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Satellite Guard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satellite Guard | Monitoreo GPS y Seguridad Vehicular",
    description: "Seguridad, rastreo y control para vehículos, flotillas y activos.",
    images: ["/og-image.jpg"],
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
