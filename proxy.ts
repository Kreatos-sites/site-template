import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * Middleware de next-intl: resuelve el locale (default sin prefijo por
 * "as-needed") y reescribe. Para un sitio de un solo idioma es casi no-op.
 */
export default createMiddleware(routing);

export const config = {
  // Excluye API, assets de Next y archivos con extensión (imágenes, etc.).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
