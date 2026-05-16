import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Satellite Guard",
    short_name: "SatelliteGuard",
    description: "Monitoreo GPS, control de flotillas y geocercas en México.",
    start_url: "/",
    display: "standalone",
    background_color: "#02050b",
    theme_color: "#02050b",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
