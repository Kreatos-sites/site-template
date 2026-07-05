/**
 * Validador de entrega. Corre con: pnpm validate-config
 *
 * Verifica:
 *  1. site.config.ts cumple el schema zod (lib/config.ts).
 *  2. messages/es.json sin lorem/TODO/emoji (incluye el copy de pages.*).
 *  3. Espejo config<->copy: cada namespace usado (home y páginas) existe
 *     en es.json y no hay keys huérfanas (incluye el subárbol pages.*).
 *     En páginas interiores TODA sección debe traer `ns` explícito.
 *  4. Cero colores literales en components/ (solo tokens semánticos).
 *     Incluye components/custom/ (secciones escritas por el agente).
 *  5. Toda sección { id: "custom" } referencia un componente registrado
 *     en components/custom/registry.ts.
 *
 * Sale con código 1 si algo falla. Es motor: NO modificar al personalizar.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { customSections } from "../components/custom/registry";
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

/* ---------- 3. Espejo secciones <-> keys (home + páginas) ---------- */
// Keys globales permitidas que no corresponden a una sección:
// ("pages" agrupa el copy de las páginas interiores, validado abajo)
const allowedGlobalKeys = new Set(["common", "notFound", "privacy", "pages"]);
// Secciones cuyo copy en es.json es opcional (sus datos salen de site.config.ts):
const sectionsWithoutCopy = new Set(["trust-bar"]);

/** Resuelve un namespace punteado ("pages.servicios.faq") dentro de es.json */
function resolveNs(obj: unknown, ns: string): unknown {
  return ns.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

// Namespaces efectivos que el render consume (home: ns ?? id; páginas: ns).
const usedNs = new Set<string>();

for (const section of config.sections) {
  const ns = section.ns ?? section.id;
  usedNs.add(ns);
  if (!section.ns && sectionsWithoutCopy.has(section.id)) continue;
  if (resolveNs(messages, ns) === undefined) {
    errors.push(
      `[espejo] la sección "${section.id}" (home) usa el namespace "${ns}" pero no existe en es.json`,
    );
  }
}

for (const [pi, page] of (config.pages ?? []).entries()) {
  for (const [si, section] of page.sections.entries()) {
    const where = `pages[${pi}] (/${page.slug}) → sections[${si}] "${section.id}"`;
    if (!section.ns) {
      errors.push(
        `[pages] ${where}: falta \`ns\` — en páginas interiores es obligatorio; sin él se renderizaría el copy de la home`,
      );
      continue;
    }
    usedNs.add(section.ns);
    if (resolveNs(messages, section.ns) === undefined) {
      errors.push(`[espejo] ${where}: el namespace "${section.ns}" no existe en es.json`);
    }
  }
}

/** ¿La ruta de keys está cubierta por algún namespace usado? */
function nsCovered(path: string): boolean {
  for (const ns of usedNs) {
    if (ns === path || ns.startsWith(`${path}.`) || path.startsWith(`${ns}.`)) return true;
  }
  return false;
}

const sectionIds = new Set(config.sections.map((s) => s.id));

for (const key of Object.keys(messages)) {
  if (allowedGlobalKeys.has(key)) continue;
  if (sectionIds.has(key as (typeof config.sections)[number]["id"])) continue;
  if (nsCovered(key)) continue;
  errors.push(
    `[espejo] key huérfana "${key}" en es.json: no corresponde a ninguna sección renderizada`,
  );
}

// Huérfanas dentro del subárbol pages.*: cada rama debe corresponder a un
// ns usado por alguna página de config.pages.
function walkPagesTree(node: unknown, path: string) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return;
  for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
    const childPath = `${path}.${key}`;
    if (!nsCovered(childPath)) {
      errors.push(
        `[espejo] key huérfana "${childPath}" en es.json: ningún \`ns\` de config.pages la usa`,
      );
      continue;
    }
    // Si todavía es solo un prefijo de algún ns (no un ns completo ni su
    // interior), hay que seguir bajando para detectar ramas hermanas huérfanas.
    const insideNs = [...usedNs].some((ns) => childPath === ns || childPath.startsWith(`${ns}.`));
    if (!insideNs) walkPagesTree(child, childPath);
  }
}
if ("pages" in messages) walkPagesTree(messages["pages"], "pages");

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

/* ---------- 5. Secciones custom <-> registry ---------- */
const registeredCustom = new Set(Object.keys(customSections));

function checkCustomSections(sections: typeof config.sections, where: string) {
  sections.forEach((section, index) => {
    if (section.id !== "custom") return;
    if (!registeredCustom.has(section.component)) {
      errors.push(
        `[custom] ${where} sections[${index}]: el componente "${section.component}" no está registrado en components/custom/registry.ts` +
          ` (keys registradas: ${[...registeredCustom].join(", ") || "ninguna"})`,
      );
    }
  });
}

checkCustomSections(config.sections, "home");
for (const [pi, page] of (config.pages ?? []).entries()) {
  checkCustomSections(page.sections, `pages[${pi}] (/${page.slug})`);
}

/* ---------- 6. Contraste mínimo del theme (texto legible) ---------- */
// Un theme con foreground/background o muted-foreground demasiado cercanos en
// lightness produce texto casi invisible — el defecto que más "abarata" un
// sitio (pasó en un demo real). Heurística por L de oklch (0..1): aproxima el
// contraste percibido lo bastante para BLOQUEAR lo ilegible antes de entregar.
{
  const themePath = join(root, "app", "theme.css");
  let css = "";
  try {
    css = readFileSync(themePath, "utf8");
  } catch {
    css = "";
  }
  if (css) {
    const parseBlock = (selector: string): Record<string, number> => {
      const re = new RegExp(`${selector.replace(/\./g, "\\.")}\\s*\\{([^}]*)\\}`);
      const body = re.exec(css)?.[1] ?? "";
      const tokens: Record<string, number> = {};
      for (const m of body.matchAll(/--([\w-]+):\s*oklch\(\s*([0-9.]+)/g)) {
        tokens[m[1]] = parseFloat(m[2]);
      }
      return tokens;
    };
    // [texto, fondo, ΔL mínimo]. El cuerpo exige más separación que lo muted.
    const pairs: Array<[string, string, number]> = [
      ["foreground", "background", 0.45],
      ["card-foreground", "card", 0.45],
      ["muted-foreground", "background", 0.3],
      ["muted-foreground", "muted", 0.25],
      ["muted-foreground", "card", 0.25],
      ["primary-foreground", "primary", 0.4],
      ["accent-foreground", "accent", 0.4],
      ["secondary-foreground", "secondary", 0.4],
    ];
    for (const mode of [":root", ".dark"]) {
      const t = parseBlock(mode);
      if (Object.keys(t).length === 0) continue;
      for (const [fg, bg, min] of pairs) {
        if (t[fg] === undefined || t[bg] === undefined) continue;
        const delta = Math.abs(t[fg] - t[bg]);
        if (delta < min) {
          errors.push(
            `[contraste] ${mode}: --${fg} (L=${t[fg]}) sobre --${bg} (L=${t[bg]}) casi ilegible (ΔL=${delta.toFixed(2)} < ${min}). Separa más los lightness: texto oscuro sobre fondo claro (o al revés en dark).`,
          );
        }
      }
    }
  }
}

/* ---------- Resultado ---------- */
if (errors.length > 0) {
  console.error(`validate-config: ${errors.length} problema(s) encontrados\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  "validate-config: OK (schema, copy, espejo de keys, tokens de color, contraste y registry custom)",
);
