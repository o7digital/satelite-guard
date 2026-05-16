import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geocercas y Alertas Inteligentes",
  description: "Define geocercas, detecta entradas y salidas en zonas críticas y recibe alertas automáticas para responder más rápido.",
  alternates: { canonical: "/servicios/geocercas" },
};

export default function Page() {
  return <main className="mx-auto max-w-4xl px-6 py-16 text-white"><h1 className="text-4xl font-bold">Geocercas y alertas inteligentes</h1><p className="mt-4 text-white/75">Protege activos con zonas de control, desvíos de ruta y alertas por movimiento no autorizado.</p></main>;
}
