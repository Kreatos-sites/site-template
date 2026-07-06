import { getOgTokens } from "@/lib/og-theme";
import config from "@/site.config";

/**
 * Props de MARCA para los correos (react-email). Se computan server-side desde
 * la identidad del sitio que se generó — así cada sitio manda correos con su
 * propio color, logo y nombre, sin configuración por cliente:
 *  - accent: token `--og-*` del theme activo (el color de marca).
 *  - logoUrl: logo de `public/` resuelto a URL absoluta (los correos necesitan
 *    URL absoluta, no ruta relativa).
 *  - siteUrl: NEXT_PUBLIC_SITE_URL, o https://<seo.domain> como fallback.
 */
export interface EmailBrand {
  accent: string;
  businessName: string;
  businessShort: string;
  phone: string | null;
  domain: string;
  siteUrl: string;
  logoUrl: string | null;
}

/** URL pública del sitio (logo absoluto + enlaces del correo). */
export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return env || `https://${config.seo.domain}`;
}

export function emailBrand(): EmailBrand {
  const { accent } = getOgTokens();
  const url = siteUrl();
  return {
    accent,
    businessName: config.business.name,
    businessShort: config.business.shortName ?? config.business.name,
    phone: config.business.phone ?? null,
    domain: config.seo.domain,
    siteUrl: url,
    logoUrl: config.business.logo ? `${url}${config.business.logo}` : null,
  };
}
