import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "@/i18n/routing";

/**
 * Configuración de next-intl CON enrutado i18n (locales de config.locales,
 * `localePrefix: "as-needed"`). Un sitio de un solo idioma sigue igual: su
 * único locale es el default y vive en `/` sin prefijo.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // Una clave i18n faltante debe TUMBAR el build, NO renderizar el key crudo.
    // Al lanzar en MISSING_MESSAGE, el prerender de esa ruta falla en `pnpm
    // build` → el agente lo caza y corrige el copy. Suele significar: el copy de
    // messages/<locale>.json no trae una clave que el bloque/sección espera.
    onError(error) {
      if (error.code === "MISSING_MESSAGE") throw error;
      console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      throw new Error(
        `Falta la clave i18n "${namespace ? `${namespace}.` : ""}${key}" en messages/${locale}.json`,
      );
    },
  };
});
