import { defineRouting } from "next-intl/routing";

import config from "@/site.config";

/**
 * Routing de idiomas (next-intl). Los locales salen de `config.locales`; el
 * PRIMERO es el default y vive en `/` SIN prefijo (`localePrefix: "as-needed"`),
 * así un sitio de un solo idioma conserva sus URLs limpias (cero regresión) y
 * habilitar otro idioma agrega `/<locale>/...` sin tocar el default.
 */
const locales = config.locales?.length ? config.locales : ["es"];

export const routing = defineRouting({
  locales,
  defaultLocale: locales[0],
  localePrefix: "as-needed",
});
