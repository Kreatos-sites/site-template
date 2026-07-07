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

  let messages = (await import(`../messages/${locale}.json`)).default as Record<
    string,
    unknown
  >;
  // Solo en desarrollo: la galería /preview (reference/preview) monta cada bloque
  // de la biblioteca con copy de ejemplo. Sus namespaces se mergean aquí para
  // que next-intl los resuelva. En producción (sitios de cliente) NO se cargan:
  // cero contaminación del copy real ni del build.
  if (process.env.NODE_ENV !== "production") {
    const { previewFixtures } = await import("../reference/preview/fixtures");
    messages = { ...messages, ...previewFixtures };
  }

  return {
    locale,
    messages,
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
