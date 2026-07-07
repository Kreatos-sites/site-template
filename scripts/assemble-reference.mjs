/**
 * Ensambla el corpus generado por el fan-out.
 *   node scripts/assemble-reference.mjs
 *     - lee reference/preview/generated/*.json (fragmentos de cada bloque)
 *     - regenera reference/blocks/registry.ts (existentes + nuevos)
 *     - agrega filas nuevas a reference/blocks/catalog.md
 *     - escribe reference/preview/generated-index.ts (fixtures + grupos)
 *   node scripts/assemble-reference.mjs --quarantine key-a,key-b
 *     - saca esas keys de registry + generated-index (y mueve su .tsx a
 *       reference/blocks/_quarantine/) para dejar el typecheck verde.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BLOCKS = join(ROOT, "reference/blocks");
const GEN_DIR = join(ROOT, "reference/preview/generated");
const REGISTRY = join(BLOCKS, "registry.ts");
const CATALOG = join(BLOCKS, "catalog.md");
const GEN_INDEX = join(ROOT, "reference/preview/generated-index.ts");

const quarantineArg = process.argv.find((a) => a.startsWith("--quarantine"));
const quarantineKeys = quarantineArg
  ? (process.argv[process.argv.indexOf(quarantineArg) + 1] || "").split(",").map((s) => s.trim()).filter(Boolean)
  : [];

const pascal = (key) => key.split(/[^a-z0-9]+/i).filter(Boolean).map((p) => p[0].toUpperCase() + p.slice(1)).join("");

// Familia REAL derivada del key (no del bucket de descubrimiento). Orden =
// prioridad: lo más específico primero; "Heroes" solo si el key empieza con hero-.
// Match por INICIO de segmento (sin límite final) para tolerar plurales/sufijos
// (reviews, specialties, benefits, testimonials…).
const CATEGORY_RULES = [
  ["Hospitality y menú", /(^|-)(menu|dining|tasting|culinary|plated|restaurant)/],
  ["Inmobiliaria", /(^|-)(propert|real-estate|realestate|listing|amenit|rooms)/],
  ["Salud y clínicas", /(^|-)(clinic|health|specialt|treatment|patient)/],
  ["Empleo", /(^|-)(job|role|department|apply|hiring|career|vacan)/],
  ["Portafolio y casos", /(^|-)(portfolio|case-study|casestudy|project|architectural|exhibition|work)/],
  ["Blog y noticias", /(^|-)(blog|news|changelog|press|article|release|update|guide)/],
  ["Catálogo y producto", /(^|-)(product|catalog)/],
  ["Reseñas", /(^|-)(testimonial|review|quote)/],
  ["Precios y planes", /(^|-)(pricing|plan|tier|package|seat-calculator|comparison|compare)/],
  ["Dudas (FAQ)", /(^|-)(faq)/],
  ["Equipo", /(^|-)(team|staff|people)/],
  ["Footers", /(^|-)(footer)/],
  ["Headers y nav", /(^|-)(header|navbar|navigation|nav)/],
  ["Contacto", /(^|-)(contact|booking|locations|organization)/],
  ["Proceso", /(^|-)(process|timeline|steps|milestone|journey|phases)/],
  ["Cifras y resultados", /(^|-)(stat|metric|kpi|analytics|uptime|status)/],
  ["Galerías", /(^|-)(gallery|masonry)/],
  ["CTAs y cierre", /(^|-)(cta|conversion|email-capture|banner|waitlist|newsletter)/],
  ["Aliados y logos", /(^|-)(logo|partner|brand|integrations)/],
  ["Nosotros", /(^|-)(about|mission|manifesto|company|values|narrative)/],
  ["Features y servicios", /(^|-)(feature|service|benefit|solutions|bento|incentive|item-list)/],
  ["Heroes", /^hero-/],
];
function categorize(key) {
  for (const [cat, re] of CATEGORY_RULES) if (re.test(key)) return cat;
  return "Otros";
}

// --- Entradas EXISTENTES del registry (key -> Pascal), parseadas del archivo actual.
function parseRegistry() {
  const src = readFileSync(REGISTRY, "utf8");
  const map = {};
  for (const m of src.matchAll(/^\s*"([^"]+)":\s*([A-Za-z0-9_]+),/gm)) map[m[1]] = m[2];
  return map;
}

// --- Fragmentos generados.
function readFragments() {
  if (!existsSync(GEN_DIR)) return [];
  return readdirSync(GEN_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try { return JSON.parse(readFileSync(join(GEN_DIR, f), "utf8")); }
      catch { return null; }
    })
    .filter(Boolean)
    .filter((fr) => fr.key && existsSync(join(BLOCKS, `${fr.key}.tsx`)));
}

function main() {
  const existing = parseRegistry();
  const frags = readFragments();

  // key -> { pascal, fromFragment, fragment? }
  const entries = {};
  for (const [key, p] of Object.entries(existing)) entries[key] = { pascal: p, fragment: null };
  for (const fr of frags) {
    if (quarantineKeys.includes(fr.key)) continue;
    entries[fr.key] = { pascal: fr.pascalName || pascal(fr.key), fragment: fr };
  }
  // Quarantine: saca las keys y mueve su .tsx.
  for (const k of quarantineKeys) {
    delete entries[k];
    const from = join(BLOCKS, `${k}.tsx`);
    if (existsSync(from)) {
      const qdir = join(BLOCKS, "_quarantine");
      mkdirSync(qdir, { recursive: true });
      try { renameSync(from, join(qdir, `${k}.tsx`)); } catch {}
    }
  }

  // Solo keys cuyo .tsx exista (los originales borrados se caen del registry).
  for (const k of Object.keys(entries)) {
    if (!existsSync(join(BLOCKS, `${k}.tsx`))) delete entries[k];
  }

  const keys = Object.keys(entries).sort();

  // --- registry.ts
  const imports = keys.map((k) => `import { ${entries[k].pascal} } from "./${k}";`).join("\n");
  const mapLines = keys.map((k) => `  "${k}": ${entries[k].pascal},`).join("\n");
  const registryOut = `import type { ComponentType } from "react";

${imports}

/**
 * BIBLIOTECA DE BLOQUES — motor, NO se edita a mano. Arquetipos DISTINTOS que el
 * agente COMPONE eligiendo del catálogo (catalog.md) + copy en es.json. Declarar
 * como { id: "block", block: "<key>", ns }. Regenerado por scripts/assemble-reference.mjs.
 */
export const blockSections: Record<string, ComponentType<{ ns: string }>> = {
${mapLines}
};
`;
  writeFileSync(REGISTRY, registryOut);

  // --- catalog.md: se RECONSTRUYE por completo (preámbulo + tablas por familia).
  const liveKeys = new Set(keys);
  const live = frags.filter((fr) => liveKeys.has(fr.key) && fr.catalogRow);
  const byCat = {};
  for (const fr of live) {
    const c = categorize(fr.key);
    (byCat[c] ??= []).push(fr.catalogRow.trim().replace(/\r?\n/g, " "));
  }
  const ORDER2 = CATEGORY_RULES.map(([c]) => c).concat(["Otros"]);
  const cats = Object.keys(byCat).sort((a, b) => ORDER2.indexOf(a) - ORDER2.indexOf(b));
  const N = live.length;
  const PREAMBLE = `# Catálogo de bloques · biblioteca de INSPIRACIÓN (${N} arquetipos)

Estos ${N} bloques viven en \`reference/blocks/\` y son un CORPUS DE INSPIRACIÓN, agrupado
por familia. **NO se montan ni se importan** (no están en ninguna config): el art-director
y el site-builder los OJEAN para robar composición, estructura y técnica, y luego DIVERGEN
hacia algo propio del cliente. Copiar uno verbatim a \`components/custom/\` traiciona el
objetivo — cada sección del sitio debe ser única.

Cómo leer una fila: **arquetipo** = qué es y para qué sirve; **ns** = la forma del copy
(las claves que el patrón usa). Elige por familia según lo que el sitio necesite; ALTERNA
estructuras vecinas (denso/aireado, claro/oscuro, tarjetas/lista/tabla/carrusel) para que
dos secciones no se sientan iguales. Todos respetan los tokens del theme (color y \`--radius\`)
y usan las primitivas del motor (\`Section\`/\`Reveal\`/\`SmartImage\`) e iconos de lucide,
phosphor, remix o hugeicons.
`;
  const body = cats
    .map((c) => {
      const rows = byCat[c].sort();
      return `## ${c} · ${rows.length}\n\n| block (key) | arquetipo · úsalo para | forma del \`ns\` |\n| --- | --- | --- |\n${rows.join("\n")}\n`;
    })
    .join("\n");
  writeFileSync(CATALOG, PREAMBLE + "\n" + body);

  // --- generated-index.ts (solo los que vienen de fragmentos y siguen vivos)
  const liveFrags = frags.filter((fr) => entries[fr.key] && entries[fr.key].fragment);
  const fixtures = {};
  const groupsMap = {};
  const catOrder = [];
  for (const fr of liveFrags) {
    fixtures[fr.key] = fr.fixture ?? {};
    const cat = categorize(fr.key); // familia REAL por key, no el bucket de descubrimiento
    if (!groupsMap[cat]) { groupsMap[cat] = []; catOrder.push(cat); }
    groupsMap[cat].push(fr.key);
  }
  // Orden estable de familias (las conocidas primero, "Otros" al final).
  const ORDER = CATEGORY_RULES.map(([c]) => c).concat(["Otros"]);
  const groups = catOrder
    .sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b))
    .map((cat) => ({ category: cat, keys: groupsMap[cat].sort() }));
  const genOut = `/**
 * ÍNDICE GENERADO — reescrito por scripts/assemble-reference.mjs. No editar a mano.
 */
export const generatedFixtures: Record<string, Record<string, unknown>> = ${JSON.stringify(fixtures, null, 2)};

export const generatedGroups: { category: string; keys: string[] }[] = ${JSON.stringify(groups, null, 2)};
`;
  writeFileSync(GEN_INDEX, genOut);

  console.log(`registry: ${keys.length} bloques (${liveFrags.length} generados vivos)`);
  console.log(`catalog: ${live.length} filas en ${cats.length} familias`);
  if (quarantineKeys.length) console.log(`quarantine: ${quarantineKeys.join(", ")}`);
}

main();
