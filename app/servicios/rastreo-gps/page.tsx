import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rastreo GPS en Tiempo Real",
  description: "Rastreo GPS en tiempo real para vehículos y activos con alertas inteligentes y soporte 24/7 en México.",
  alternates: { canonical: "/servicios/rastreo-gps" },
};

export default function Page() {
  return <main className="mx-auto max-w-4xl px-6 py-16 text-white"><h1 className="text-4xl font-bold">Rastreo GPS en tiempo real</h1><p className="mt-4 text-white/75">Monitoreo en vivo, historial de rutas, alertas por eventos críticos y visibilidad total de tus unidades.</p></main>;
}
