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
    // Una clave i18n faltante debe TUMBAR el build, NO renderizar el key crudo.
    // El default de next-intl en prod pinta "namespace.key" (el cliente veía
    // "cta-final.primaryCta" literal). Al lanzar en MISSING_MESSAGE, el prerender
    // de esa ruta falla en `pnpm build` → el agente lo caza y corrige el copy,
    // en vez de shippear el key visible. Suele significar: el copy de es.json no
    // trae una clave que el bloque/sección espera (ns shape desalineado).
    onError(error) {
      if (error.code === "MISSING_MESSAGE") throw error;
      console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      // Inalcanzable si onError lanza; red de seguridad para nunca pintar el key.
      throw new Error(
        `Falta la clave i18n "${namespace ? `${namespace}.` : ""}${key}" en messages/es.json`,
      );
    },
  };
});
