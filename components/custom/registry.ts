import type { ComponentType } from "react";

import { ContactSplit } from "./contact-split";
import { CredentialsBand } from "./credentials-band";
import { CtaPanel } from "./cta-panel";
import { HeroEditorial } from "./hero-editorial";
import { PageIntro } from "./page-intro";
import { ServicesLedger } from "./services-ledger";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Registro de secciones CUSTOM — el ÚNICO registry montable. TODA sección del
 * sitio es custom (no hay secciones fijas ni bloques): el art-director decide
 * la composición y el site-builder autora cada componente a la medida.
 *
 * Flujo por sección:
 *  1. Escribe components/custom/<nombre>.tsx con props `{ ns: string }`.
 *  2. Regístralo aquí con una key kebab-case.
 *  3. Úsalo en site.config.ts:
 *     { id: "custom", component: "<key>", ns: "<namespace>", slot?: "header"|"body"|"footer" }
 *
 * validate-config falla si un `component` de config no existe aquí, y el
 * section-renderer truena en build con un error claro (nunca silencio).
 *
 * Contrato del componente custom: copy 100% vía next-intl con el `ns`; solo
 * tokens semánticos del theme; motion con los primitives de shared/reveal;
 * plomería compartida headless (useContactForm, MapEmbed, AgencyCredit la
 * inyecta el motor); server component salvo islas de cliente acotadas.
 *
 * NOTA: los componentes de abajo son el DEMO (Despacho López y Asociados) — UN
 * ejemplo de composición, no un esqueleto obligatorio. Cada sitio real trae su
 * propio conjunto de customs.
 */
export const customSections: Record<string, ComponentType<{ ns: string }>> = {
  "site-header": SiteHeader,
  "hero-editorial": HeroEditorial,
  "services-ledger": ServicesLedger,
  "credentials-band": CredentialsBand,
  "contact-split": ContactSplit,
  "cta-panel": CtaPanel,
  "site-footer": SiteFooter,
  "page-intro": PageIntro,
};
