import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const nextConfig: NextConfig = {
  // Raíz explícita: evita que Next infiera mal el workspace cuando el
  // template convive con otros lockfiles (p. ej. dentro de un monorepo).
  turbopack: {
    root: __dirname,
  },
  typescript: {
    // El build ladder del site-builder (build_check) ya corre `tsc --noEmit`
    // ANTES del rung build → el chequeo de tipos de `next build` es un pase
    // DUPLICADO que se re-paga en CADA ciclo build-repair y cada rediseño.
    // Lo apagamos aquí (los tipos siguen gateados por el rung typecheck).
    // 2026-07-07 (Fase 0 eficiencia).
    ignoreBuildErrors: true,
  },
  eslint: {
    // Igual: lint no debe frenar el build de PREVIEW. El gate de calidad es
    // VISUAL (review_screenshots), no eslint.
    ignoreDuringBuilds: true,
  },
  images: {
    // Los placeholders del template son SVG locales (public/images/*.svg).
    // Al reemplazarlos por JPG/WebP reales esto puede quedarse sin efecto.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
