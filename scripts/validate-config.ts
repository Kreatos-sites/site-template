/**
 * Validador de entrega. Corre con: pnpm validate-config
 *
 * Verifica:
 *  1. site.config.ts cumple el schema zod (lib/config.ts).
 *  2. messages/es.json sin lorem/TODO/emoji.
 *  3. Espejo config<->copy: cada sección tiene su key en es.json y no
 *     hay keys huérfanas (keys de secciones que no se renderizan).
 *  4. Cero colores literales en components/ (solo tokens semánticos).
 *
 * Sale con código 1 si algo falla. Es motor: NO modificar al personalizar.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { siteConfigSchema } from "../lib/config";
import config from "../site.config";

const root = process.cwd();
const errors: string[] = [];

/* ---------- 1. Schema ---------- */
const parsed = siteConfigSchema.safeParse(config);
if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    errors.push(`[schema] ${issue.path.join(".") || "(raíz)"}: ${issue.message}`);
  }
}

/* ---------- 2. Contenido de es.json ---------- */
const messagesPath = join(root, "messages", "es.json");
const messagesRaw = readFileSync(messagesPath, "utf8");
const messages = JSON.parse(messagesRaw) as Record<string, unknown>;

const loremRe = /\b(lorem|ipsum|dolor sit amet)\b/i;
const todoRe = /\b(TODO|FIXME|TBD|PLACEHOLDER|XXX)\b/;
const emojiRe = /\p{Extended_Pictographic}/u;

function walkStrings(value: unknown, path: string, visit: (s: string, p: string) => void) {
  if (typeof value === "string") {
    visit(value, path);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walkStrings(v, `${path}[${i}]`, visit));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      walkStrings(v, path ? `${path}.${k}` : k, visit);
    }
  }
}

walkStrings(messages, "", (text, path) => {
  if (loremRe.test(text)) errors.push(`[copy] ${path}: contiene texto lorem/relleno`);
  if (todoRe.test(text)) errors.push(`[copy] ${path}: contiene marcador pendiente (TODO/TBD/...)`);
  if (emojiRe.test(text)) errors.push(`[copy] ${path}: contiene emoji (prohibido en el copy)`);
});

/* ---------- 3. Espejo secciones <-> keys ---------- */
// Keys globales permitidas que no corresponden a una sección:
const allowedGlobalKeys = new Set(["common", "notFound", "privacy"]);
// Secciones sin copy propio (todo sale de site.config.ts):
const sectionsWithoutCopy = new Set(["trust-bar"]);

const sectionIds = new Set(config.sections.map((s) => s.id));
const messageKeys = new Set(Object.keys(messages));

for (const id of sectionIds) {
  if (sectionsWithoutCopy.has(id)) continue;
  if (!messageKeys.has(id)) {
    errors.push(`[espejo] la sección "${id}" está en site.config.ts pero no tiene key en es.json`);
  }
}

for (const key of messageKeys) {
  if (allowedGlobalKeys.has(key)) continue;
  if (!sectionIds.has(key as (typeof config.sections)[number]["id"])) {
    errors.push(`[espejo] key huérfana "${key}" en es.json: no corresponde a ninguna sección renderizada`);
  }
}

/* ---------- 4. Colores literales en components/ ---------- */
const hexRe = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![\w-])/;
const fnColorRe = /\b(?:rgb|rgba|hsl|hsla|oklch|oklab)\(/;
const palettes =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone";
const twPaletteRe = new RegExp(
  `\\b(?:bg|text|border|from|to|via|fill|stroke|ring|outline|shadow|accent|caret|decoration|divide)-(?:${palettes})-\\d{2,3}\\b`,
);

function* walkFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walkFiles(full);
    } else if (/\.(tsx?|css)$/.test(entry)) {
      yield full;
    }
  }
}

for (const file of walkFiles(join(root, "components"))) {
  const rel = relative(root, file);
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    // Los paths de SVG (d="M...") no llevan '#'; los tests aplican tal cual.
    if (hexRe.test(line))
      errors.push(`[color] ${rel}:${i + 1}: color hex literal — usa tokens semánticos`);
    if (fnColorRe.test(line) && !line.includes("var(--"))
      errors.push(`[color] ${rel}:${i + 1}: color funcional literal (rgb/hsl/oklch) — usa tokens semánticos`);
    if (twPaletteRe.test(line))
      errors.push(`[color] ${rel}:${i + 1}: clase de paleta Tailwind directa — usa tokens semánticos`);
  });
}

/* ---------- Resultado ---------- */
if (errors.length > 0) {
  console.error(`validate-config: ${errors.length} problema(s) encontrados\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log("validate-config: OK (schema, copy, espejo de keys y tokens de color)");
