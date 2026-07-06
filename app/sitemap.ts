import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import config from "@/site.config";

/**
 * Sitemap por locale: el idioma default vive en "/" (sin prefijo); los demás
 * en "/<locale>/...". Un sitio de un solo idioma produce las URLs de siempre.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${config.seo.domain}`;
  const now = new Date();
  const localeBase = (locale: string) =>
    locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`;

  return routing.locales.flatMap((locale) => [
    {
      url: localeBase(locale),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...(config.pages ?? []).map((page) => ({
      url: `${localeBase(locale)}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${localeBase(locale)}/aviso-de-privacidad`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ]);
}
