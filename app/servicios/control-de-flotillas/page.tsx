import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control de Flotillas GPS",
  description: "Control de flotillas con tableros operativos, métricas de rendimiento y alertas para mejorar seguridad y eficiencia.",
  alternates: { canonical: "/servicios/control-de-flotillas" },
};

export default function Page() {
  return <main className="mx-auto max-w-4xl px-6 py-16 text-white"><h1 className="text-4xl font-bold">Control de flotillas GPS</h1><p className="mt-4 text-white/75">Gestiona unidades, conductores y rutas con indicadores claros para operación y toma de decisiones.</p></main>;
}
