import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Navegación locale-aware. Usa ESTE `Link` (no `next/link`) para enlaces de
 * RUTA internos (`/`, `/servicios`): preserva el idioma activo al navegar. Los
 * anclas de misma página (`#contacto`) pueden seguir con `<a href>` normal.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
