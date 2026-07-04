import type { ComponentType } from "react";

import { CredentialsBand } from "./credentials-band";

/**
 * Registro de secciones CUSTOM — la ÚNICA parte de components/ que el
 * agente edita al personalizar un sitio (ver AGENT.md → "Secciones
 * custom"). El flujo:
 *
 *  1. Escribe tu componente en components/custom/<nombre>.tsx con props
 *     `{ ns: string }` (su namespace de copy en es.json).
 *  2. Regístralo aquí con una key kebab-case.
 *  3. Úsalo en site.config.ts:
 *     { id: "custom", component: "<key>", ns: "<namespace>" }
 *
 * validate-config falla si un `component` declarado en config no existe
 * aquí, y el renderer truena en build con un error claro (nunca silencio).
 * Las secciones custom cumplen el mismo contrato que el motor: tokens
 * semánticos, copy vía next-intl, motion con los primitives de
 * components/shared/reveal.tsx, sin dependencias nuevas.
 */
export const customSections: Record<string, ComponentType<{ ns: string }>> = {
  "credentials-band": CredentialsBand,
};
