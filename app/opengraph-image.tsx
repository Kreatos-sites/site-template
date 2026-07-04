import { ImageResponse } from "next/og";

import { getOgTokens } from "@/lib/og-theme";
import messages from "@/messages/es.json";
import config from "@/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = config.seo.title;

/**
 * OG image generada con la paleta del theme activo (tokens --og-* de
 * app/theme.css). La tipografía es la default de Satori: cargar la
 * webfont del par activo aquí requeriría red en build (frágil), así
 * que se compensa con jerarquía y color.
 */
export default function OpengraphImage() {
  const tokens = getOgTokens();
  const tagline = messages.hero.eyebrow;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: tokens.background,
          color: tokens.foreground,
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              backgroundColor: tokens.accent,
              color: tokens.background,
              fontSize: 34,
              fontWeight: 700,
              borderRadius: 6,
            }}
          >
            {config.business.name.replace(/^(Despacho|Grupo|Firma)\s+/i, "").charAt(0)}
          </div>
          <div style={{ display: "flex", fontSize: 26, opacity: 0.85 }}>
            {config.seo.domain}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: 950,
            }}
          >
            {config.business.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              width: 88,
              height: 6,
              backgroundColor: tokens.accent,
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              opacity: 0.9,
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          <div style={{ display: "flex" }}>
            {config.business.address.city}, {config.business.address.state}
          </div>
          <div style={{ display: "flex", color: tokens.accent, fontWeight: 600 }}>
            {config.business.maps.rating.toFixed(1)} · {config.business.maps.reviewsCount}{" "}
            reseñas en Google
          </div>
        </div>
      </div>
    ),
    size,
  );
}
