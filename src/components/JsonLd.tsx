export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ruang Development",
    url: "https://ruangdevelopment.my.id",
    description:
      "Jasa pembuatan website profesional, modern, dan terjangkau untuk UMKM dan bisnis kecil di Indonesia.",
    telephone: "+6285162612828",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    sameAs: [
      "https://instagram.com/ruangdevelopment",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: "700000",
      offerCount: "3",
    },
    serviceType: [
      "Pembuatan Website",
      "Website Company Profile",
      "Toko Online",
      "Landing Page",
      "Web Application",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}