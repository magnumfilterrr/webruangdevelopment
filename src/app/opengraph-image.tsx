import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ruang Development – Jasa Website Profesional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #050816 0%, #0a0f2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Logo */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "12px 24px",
              marginBottom: 32,
              display: "flex",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ruangdevelopment.my.id/putih.png"
              style={{ width: 200, height: 60, objectFit: "contain" }}
              alt="Ruang Development"
            />
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Jasa Website
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#22d3ee",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Profesional
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#94a3b8",
            }}
          >
            Website modern & terjangkau untuk UMKM Indonesia
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}