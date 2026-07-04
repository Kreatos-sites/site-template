import { getRequestConfig } from "next-intl/server";

/**
 * Configuración de next-intl SIN enrutado i18n: el sitio es es-only,
 * pero la estructura queda lista para agregar locales en fase 2
 * (flags.multiLang) sin tocar componentes.
 */
export default getRequestConfig(async () => {
  const locale = "es";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
