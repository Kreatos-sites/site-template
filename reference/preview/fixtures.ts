/**
 * Copy de EJEMPLO para la galería `/preview` (solo dev). Todo el corpus es
 * generado por el fan-out (reference/preview/generated/*.json → generated-index).
 * Cada key = la `block` key, que en el preview también hace de `ns`.
 * Mergeado a los mensajes de next-intl SOLO en desarrollo (ver lib/i18n.ts).
 */
import { generatedFixtures, generatedGroups } from "./generated-index";

export const previewFixtures: Record<string, Record<string, unknown>> = {
  ...generatedFixtures,
};

export const PREVIEW_GROUPS: { category: string; keys: string[] }[] = [
  ...generatedGroups,
];
