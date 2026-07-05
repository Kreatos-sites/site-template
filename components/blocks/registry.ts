import type { ComponentType } from "react";

import { FeatureZigzag } from "./feature-zigzag";
import { StatWall } from "./stat-wall";

/**
 * BIBLIOTECA DE BLOQUES — motor, NO se edita al personalizar (a diferencia de
 * components/custom/, que el agente escribe). Son secciones curadas, probadas y
 * de arquetipos DISTINTOS que el agente COMPONE eligiendo del catálogo
 * (components/blocks/catalog.md) y llenando su copy en messages/es.json.
 *
 * El objetivo: que "distintivo" sea el camino FÁCIL (elegir bloque + copy) en
 * vez del difícil (escribir .tsx). Más bloques = más variedad = menos sitios
 * que se ven a plantilla. Se declara en site.config.ts como
 * `{ id: "block", block: "<key>", ns: "<namespace>" }`.
 */
export const blockSections: Record<string, ComponentType<{ ns: string }>> = {
  "stat-wall": StatWall,
  "feature-zigzag": FeatureZigzag,
};
