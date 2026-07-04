import { ImageResponse } from "next/og";

import { getOgTokens, readPublicImageAsDataUri } from "@/lib/og-theme";
import config from "@/site.config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon (motor: no tocar). Mismo criterio que app/icon.tsx
 * (isotipo de `business.icon` o monograma), con dos diferencias que
 * exige iOS: fondo SIEMPRE sólido de esquina a esquina (Apple no respeta
 * transparencia ni esquinas redondeadas propias: aplica su máscara) y
 * padding mayor (~18%) porque el sistema recorta el borde.
 */
export default function AppleIcon() {
  const tokens = getOgTokens();

  if (config.business.icon) {
    const pad = Math.round(size.width * 0.18);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: tokens.background,
            padding: pad,
          }}
        >
          {/* Satori (next/og) requiere <img> con data URI, no next/image */}
          <img
            src={readPublicImageAsDataUri(config.business.icon)}
            width={size.width - pad * 2}
            height={size.height - pad * 2}
            style={{ objectFit: "contain" }}
            alt=""
          />
        </div>
      ),
      size,
    );
  }

  const initial = config.business.name
    .replace(/^(Despacho|Grupo|Firma)\s+/i, "")
    .charAt(0)
    .toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tokens.accent,
          color: tokens.background,
          fontSize: 112,
          fontWeight: 700,
        }}
      >
        {initial}
      </div>
    ),
    size,
  );
}
