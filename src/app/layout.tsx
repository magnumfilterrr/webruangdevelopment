import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruang Development – Jasa Pembuatan Website Profesional untuk UMKM",
  description:
    "Ruang Development menyediakan jasa pembuatan website profesional, modern, dan terjangkau untuk UMKM dan bisnis kecil di Indonesia. Website company profile, toko online, landing page, dan web app.",
  keywords: [
    "jasa pembuatan website",
    "jasa website murah",
    "jasa website profesional",
    "jasa website UMKM",
    "jasa website Indonesia",
    "jasa website company profile",
    "jasa website toko online",
    "jasa website landing page",
    "Ruang Development",
    "web developer Indonesia",
  ],
  authors: [
    { name: "Ruang Development", url: "https://ruangdevelopment.my.id" },
  ],
  creator: "Ruang Development",
  metadataBase: new URL("https://ruangdevelopment.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ruangdevelopment.my.id",
    siteName: "Ruang Development",
    title: "Ruang Development – Jasa Pembuatan Website Profesional untuk UMKM",
    description:
      "Jasa pembuatan website profesional, modern, dan terjangkau untuk UMKM dan bisnis kecil di Indonesia.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ruang Development – Jasa Website Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruang Development – Jasa Pembuatan Website Profesional",
    description:
      "Jasa pembuatan website profesional, modern, dan terjangkau untuk UMKM dan bisnis kecil di Indonesia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/putih.png", type: "image/png" }],
    apple: "/putih.png",
    shortcut: "/putih.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
