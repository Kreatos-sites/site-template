import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const nextConfig: NextConfig = {
  // Raíz explícita: evita que Next infiera mal el workspace cuando el
  // template convive con otros lockfiles (p. ej. dentro de un monorepo).
  turbopack: {
    root: __dirname,
  },
  images: {
    // Los placeholders del template son SVG locales (public/images/*.svg).
    // Al reemplazarlos por JPG/WebP reales esto puede quedarse sin efecto.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
