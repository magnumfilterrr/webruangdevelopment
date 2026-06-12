import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ruang Development",
    short_name: "Ruang Dev",
    description: "Jasa Pembuatan Website Profesional untuk UMKM",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/putih.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}