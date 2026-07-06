import { ImageResponse } from "next/og";

import { getOgTokens, tryReadPublicImageAsDataUri } from "@/lib/og-theme";
import messages from "@/messages/es.json";
import config from "@/site.config";

// nodejs (no edge): getOgTokens lee theme.css del disco y el build de
// @vercel/og para Node decodifica webp/svg en <img> (el de edge no).
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = config.seo.title;

/**
 * Eyebrow REAL del hero (ns resuelto sobre messages, no `messages.hero`
 * hardcodeado: el hero puede usar un ns anidado) como tagline; fallback a la
 * descripción SEO.
 */
function taglineText(): string {
  const heroNs = config.sections.find((s) => s.id === "hero")?.ns ?? "hero";
  const heroCopy = heroNs.split(".").reduce<unknown>(
    (obj, key) =>
      obj && typeof obj === "object"
        ? (obj as Record<string, unknown>)[key]
        : undefined,
    messages,
  );
  return (
    (heroCopy as { eyebrow?: string } | undefined)?.eyebrow ??
    config.seo.description
  );
}

/**
 * OG image (1200x630). Preferente: una FOTO real del sitio (hero/marca) a
 * sangre, con overlay oscuro para contraste y el logo arriba en placa clara;
 * el copy va claro sobre la foto. Si no hay foto usable, cae a una tarjeta
 * sólida con la paleta de marca (tokens --og-* de theme.css). Satori (next/og)
 * incrusta la imagen como data URI —ver lib/og-theme— y no soporta oklch, por
 * eso el acento sale de los tokens hex.
 */
export default function OpengraphImage() {
  const tokens = getOgTokens();
  const tagline = taglineText();

  // Foto de fondo: la designada en el spec, o la hero por convención, o una
  // interior/marca. La PRIMERA que exista y sea decodable (webp/jpg/png/svg).
  const bg =
    tryReadPublicImageAsDataUri(config.seo.ogImage) ??
    tryReadPublicImageAsDataUri("/images/hero.webp") ??
    tryReadPublicImageAsDataUri("/images/nosotros.webp") ??
    tryReadPublicImageAsDataUri("/images/brand-1.webp");
  const logo = tryReadPublicImageAsDataUri(config.business.logo);

  if (bg) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          <img
            src={bg}
            width={1200}
            height={630}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              objectFit: "cover",
            }}
          />
          {/* Overlay oscuro (negro translúcido, no depende del theme): garantiza
              contraste del texto claro sobre CUALQUIER foto. */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              display: "flex",
              background:
                "linear-gradient(to top, rgba(10,12,16,0.88) 0%, rgba(10,12,16,0.46) 46%, rgba(10,12,16,0.30) 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "64px 72px",
              color: "#ffffff",
            }}
          >
            {/* Logo arriba: en placa clara para que sea legible sea cual sea la
                tinta del logo (los logos se diseñan para fondo claro). */}
            <div style={{ display: "flex" }}>
              {logo ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#ffffff",
                    borderRadius: 10,
                    padding: "14px 22px",
                  }}
                >
                  <img src={logo} height={48} style={{ height: 48 }} />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    fontSize: 30,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {config.business.shortName ?? config.business.name}
                </div>
              )}
            </div>

            {/* Bloque de marca abajo: nombre + regla de acento + tagline + NAP. */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 72,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.04,
                  maxWidth: 980,
                  textShadow: "0 2px 24px rgba(0,0,0,0.35)",
                }}
              >
                {config.business.name}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 24,
                  width: 88,
                  height: 6,
                  backgroundColor: tokens.accent,
                }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 24,
                  fontSize: 30,
                  maxWidth: 920,
                  opacity: 0.92,
                }}
              >
                {tagline}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 40,
                  fontSize: 24,
                  opacity: 0.9,
                }}
              >
                <div style={{ display: "flex" }}>
                  {config.business.address.city}, {config.business.address.state}
                </div>
                {config.business.maps && (
                  <div style={{ display: "flex", fontWeight: 600 }}>
                    {config.business.maps.rating.toFixed(1)} ·{" "}
                    {config.business.maps.reviewsCount} reseñas en Google
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      size,
    );
  }

  // ——— Fallback SIN foto usable: tarjeta sólida de marca (paleta --og-*). ———
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
            {config.business.name
              .replace(/^(Despacho|Grupo|Firma)\s+/i, "")
              .charAt(0)}
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
          {config.business.maps && (
            <div
              style={{ display: "flex", color: tokens.accent, fontWeight: 600 }}
            >
              {config.business.maps.rating.toFixed(1)} ·{" "}
              {config.business.maps.reviewsCount} reseñas en Google
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
