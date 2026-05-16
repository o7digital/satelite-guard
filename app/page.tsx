import SatelliteGuardHome from "@/components/SatelliteGuardHome";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Satellite Guard",
      url: "https://www.satelliteguard.com.mx",
      logo: "https://www.satelliteguard.com.mx/favicon.ico",
    },
    {
      "@type": "LocalBusiness",
      name: "Satellite Guard",
      url: "https://www.satelliteguard.com.mx",
      areaServed: "MX",
      telephone: "+52-000-000-0000",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Qué incluye el monitoreo GPS?", acceptedAnswer: { "@type": "Answer", text: "Ubicación en vivo, historial de rutas, alertas críticas y panel de control." } },
        { "@type": "Question", name: "¿Sirve para flotillas y activos?", acceptedAnswer: { "@type": "Answer", text: "Sí, para flotillas, vehículos y activos móviles." } },
        { "@type": "Question", name: "¿Puedo configurar geocercas?", acceptedAnswer: { "@type": "Answer", text: "Sí, con alertas de entrada, salida y desvíos." } },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SatelliteGuardHome />
    </>
  );
}
