import { ImageResponse } from "next/og";

import { getOgTokens } from "@/lib/og-theme";
import config from "@/site.config";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monograma: inicial del negocio sobre el acento del theme activo. */
export default function Icon() {
  const tokens = getOgTokens();
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
          fontSize: 40,
          fontWeight: 700,
          borderRadius: 10,
        }}
      >
        {initial}
      </div>
    ),
    size,
  );
}
