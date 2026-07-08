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
    // NOTA: NO agregar `eslint: { ignoreDuringBuilds }` — Next 16 quitó `eslint`
    // de NextConfig y rompe el typecheck (TS2353); además next.config.ts es
    // archivo de MOTOR (el guard de push lo prohíbe) → si se rompe, el
    // site-builder no puede auto-repararlo y queda en deadlock. Verificado
    // 2026-07-08 con una corrida real que se atoró.
    ignoreBuildErrors: true,
  },
  images: {
    // Los placeholders del template son SVG locales (public/images/*.svg).
    // Al reemplazarlos por JPG/WebP reales esto puede quedarse sin efecto.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
