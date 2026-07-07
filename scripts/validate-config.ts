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
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
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
// ("pages" agrupa el copy de las páginas interiores, validado abajo;
//  "email" es el copy de los correos react-email, resuelto en /api/contact)
const allowedGlobalKeys = new Set([
  "common",
  "notFound",
  "privacy",
  "pages",
  "email",
]);
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
  const ns = section.ns;
  usedNs.add(ns);
  if (resolveNs(messages, ns) === undefined) {
    errors.push(
      `[espejo] la sección custom "${section.component}" (home) usa el namespace "${ns}" pero no existe en es.json`,
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
// Anchos FIJOS que rompen el responsive: pixeles literales (w-[420px]) y anchos
// Tailwind grandes (w-40+ = 10rem+). El ancho de layout debe ser RELATIVO
// (w-full, fracción de grid, max-w-*, aspect-*). Se permiten anchos chicos
// (reglas decorativas w-8..w-36, íconos size-*) y max-w/min-w en rem
// (contenedores acotados legítimos, tabla con scroll).
// El lookbehind excluye `min-w-`/`max-w-` (mín/máx = responsive, no fijos) del
// caso `w-N`; el caso pixel sí incluye `min-w-[..px]` (fuerza un mínimo que
// rompe mobile). `size-*` queda exento (íconos/blobs decorativos cuadrados).
const fixedWidthRe =
  /\b(?:w|min-w)-\[\d+(?:\.\d+)?px\]|(?<![-\w])w-(?:40|44|48|52|56|60|64|72|80|96)\b/;

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
    // El guard de anchos aplica al LAYOUT del sitio (blocks/sections/custom),
    // no a los primitivos shadcn de components/ui/ (un popover/menu tiene ancho
    // fijo por diseño — es un overlay, no layout de página).
    if (!rel.startsWith("components/ui/") && fixedWidthRe.test(line))
      errors.push(
        `[ancho] ${rel}:${i + 1}: ancho FIJO no responsive — usa ancho relativo (w-full, fracción de grid, max-w-*, aspect-* para media). Los anchos fijos hacen que el layout se rompa en mobile.`,
      );
  });
}

/* ---------- 5. Secciones custom <-> registry ---------- */
const registeredCustom = new Set(Object.keys(customSections));

function checkCustomSections(sections: typeof config.sections, where: string) {
  sections.forEach((section, index) => {
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
    // Lightness perceptual (OKLab L, 0..1) desde un hex sRGB. Necesario porque
    // un theme puede declararse en HEX (p. ej. cuando el draft lo genera un
    // modelo chico) — antes solo se parseaba oklch() y TODO el check de
    // contraste se saltaba en silencio, dejando pasar dark modes ilegibles.
    const srgbToLinear = (c: number): number => {
      const s = c / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const hexToL = (hex: string): number | null => {
      let h = hex.replace("#", "").trim();
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      if (h.length !== 6) return null;
      const r = srgbToLinear(parseInt(h.slice(0, 2), 16));
      const g = srgbToLinear(parseInt(h.slice(2, 4), 16));
      const b = srgbToLinear(parseInt(h.slice(4, 6), 16));
      const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
      const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
      const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
      return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    };
    const parseBlock = (selector: string): Record<string, number> => {
      const re = new RegExp(`${selector.replace(/\./g, "\\.")}\\s*\\{([^}]*)\\}`);
      const body = re.exec(css)?.[1] ?? "";
      const tokens: Record<string, number> = {};
      // oklch(L ...): la L es el primer número.
      for (const m of body.matchAll(/--([\w-]+):\s*oklch\(\s*([0-9.]+)/g)) {
        tokens[m[1]] = parseFloat(m[2]);
      }
      // hex (#rgb / #rrggbb): se convierte a L OKLab para el mismo umbral.
      for (const m of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,6})\b/g)) {
        const L = hexToL(m[2]);
        if (L !== null) tokens[m[1]] = Number(L.toFixed(3));
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

/* ---------- 7. Assets de marca: logo/isotipo bien usados ---------- */
// El logo y el isotipo son de MARCA. Dos defectos reales de generación que este
// gate vuelve deterministas (antes solo los cazaba el review visual):
//  a) business.logo apuntando a un logo DERIVADO (logo-mark.webp, etc.) en vez
//     del logo.<ext> que baja fetch_brand_assets — la conversión a webp aplana
//     la transparencia y encajona el logo en negro en el navbar.
//  b) el logo/isotipo REUTILIZADO como imagen de contenido de una sección
//     (salió un monograma gigante llenando un about).
{
  const business = (config as { business?: Record<string, unknown> }).business ?? {};
  const publicOf = (p: string) => join(root, "public", p.replace(/^\//, ""));
  const baseName = (p: string) => p.split("/").pop() ?? p;

  // a) business.logo / business.icon: archivo real + nombre canónico.
  const brandAssets: Array<[string, string, RegExp]> = [
    ["logo", "logo", /^logo\.(png|svg|jpg|jpeg|webp|avif)$/i],
    ["icon", "icon", /^icon\.(png|svg|jpg|jpeg|webp|avif)$/i],
  ];
  for (const [key, canon, re] of brandAssets) {
    const value = business[key];
    if (typeof value !== "string" || !value) continue;
    if (!existsSync(publicOf(value))) {
      errors.push(`[assets] business.${key} = "${value}" no existe en public/. Declara la ruta que bajó fetch_brand_assets.`);
    } else if (!re.test(baseName(value))) {
      errors.push(
        `[assets] business.${key} = "${value}" no es el ${canon}.<ext> descargado. NO derives el ${canon} (p. ej. a .webp con ffmpeg: aplana la transparencia y lo encajona en negro) — apunta a "/images/${canon}.<ext>" tal cual.`,
      );
    }
  }

  // b) ninguna imagen de sección (en es.json) puede ser el logo o el isotipo.
  const brandPaths = new Set(
    (["logo", "icon"] as const)
      .map((k) => business[k])
      .filter((v): v is string => typeof v === "string" && v.length > 0)
      .map((v) => v.replace(/^\//, "")),
  );
  const imgRe = /\.(png|svg|jpg|jpeg|webp|avif)$/i;
  if (brandPaths.size > 0) {
    walkStrings(messages, "", (text, path) => {
      if (!imgRe.test(text)) return;
      if (brandPaths.has(text.replace(/^\//, ""))) {
        errors.push(
          `[assets] ${path} usa el logo/isotipo de marca ("${text}") como imagen de sección. El logo va SOLO en navbar/footer/favicon; las imágenes de sección salen de las fotos (hero.webp, nosotros.webp, servicio-N.webp) o stock del giro.`,
        );
      }
    });
  }
}

/* ---------- 8. Fotos de contenido duplicadas (misma foto, distinto nombre) ---------- */
// Cuando faltan fotos reales, el agente a veces COPIA una a varios nombres
// semánticos (en HR: caso-retail.webp == caso-farma.webp byte a byte). En un
// demo de venta eso se ve repetitivo. Se detecta por hash de bytes de las
// imágenes REFERENCIADAS en el copy; el logo/isotipo se excluyen (son marca).
{
  const business = (config as { business?: Record<string, unknown> }).business ?? {};
  const brandPaths = new Set(
    (["logo", "icon"] as const)
      .map((k) => business[k])
      .filter((v): v is string => typeof v === "string" && v.length > 0),
  );
  // svg fuera: suelen ser decorativos compartidos a propósito.
  const contentImgRe = /\.(png|jpg|jpeg|webp|avif)$/i;
  const referenced = new Set<string>();
  walkStrings(messages, "", (text) => {
    if (text.startsWith("/") && contentImgRe.test(text) && !brandPaths.has(text)) {
      referenced.add(text);
    }
  });
  const byHash = new Map<string, string[]>();
  for (const p of referenced) {
    const fp = join(root, "public", p.replace(/^\//, ""));
    if (!existsSync(fp)) continue;
    const h = createHash("sha1").update(readFileSync(fp)).digest("hex");
    byHash.set(h, [...(byHash.get(h) ?? []), p]);
  }
  for (const paths of byHash.values()) {
    if (paths.length >= 2) {
      errors.push(
        `[imagenes] la MISMA foto se reutiliza con ${paths.length} nombres distintos (${paths.join(", ")}) — byte a byte idéntica. En un demo de venta se ve repetitivo: usa fotos distintas, stock del giro con treatment, o un placeholder DISEÑADO por sección. No dupliques una foto real para rellenar.`,
      );
    }
  }
}

/* ---------- 9. Paridad de keys entre locales (multilenguaje) ---------- */
// Cada messages/<locale>.json declarado en config.locales debe tener EXACTAMENTE
// las mismas keys que el locale de referencia (el default = locales[0]). Si un
// locale traducido pierde o inventa una key, el build truena en runtime con
// MISSING_MESSAGE — mejor cazarlo aquí. Se salta en sitios de un solo idioma.
{
  const locales = (config as { locales?: string[] }).locales ?? ["es"];
  if (locales.length > 1) {
    const leafPaths = (obj: unknown): Set<string> => {
      const set = new Set<string>();
      walkStrings(obj, "", (_s, p) => set.add(p));
      return set;
    };
    const readLocale = (locale: string): Record<string, unknown> | null => {
      if (locale === "es") return messages;
      try {
        return JSON.parse(
          readFileSync(join(root, "messages", `${locale}.json`), "utf8"),
        ) as Record<string, unknown>;
      } catch {
        return null;
      }
    };
    const refLocale = locales[0];
    const refMsgs = readLocale(refLocale);
    if (!refMsgs) {
      errors.push(`[i18n] falta messages/${refLocale}.json (locale default)`);
    } else {
      const refPaths = leafPaths(refMsgs);
      for (const locale of locales) {
        if (locale === refLocale) continue;
        const msgs = readLocale(locale);
        if (!msgs) {
          errors.push(
            `[i18n] falta messages/${locale}.json (declarado en config.locales) — genéralo traduciendo el copy con las MISMAS keys`,
          );
          continue;
        }
        const paths = leafPaths(msgs);
        const missing = [...refPaths].filter((p) => !paths.has(p));
        const extra = [...paths].filter((p) => !refPaths.has(p));
        if (missing.length > 0)
          errors.push(
            `[i18n] messages/${locale}.json: faltan ${missing.length} key(s) que sí tiene ${refLocale} (ej: ${missing.slice(0, 5).join(", ")})`,
          );
        if (extra.length > 0)
          errors.push(
            `[i18n] messages/${locale}.json: tiene ${extra.length} key(s) de más que ${refLocale} no tiene (ej: ${extra.slice(0, 5).join(", ")})`,
          );
      }
    }
  }
}

/* ---------- 10. Anti-texto-hardcodeado en components/custom/ ---------- */
// Toda sección custom la escribe el agente; su copy user-facing DEBE salir de
// next-intl (t()), nunca hardcodeado (objetivo A). Linter heurístico: caza el
// caso común — literales en atributos de alto riesgo (aria-label/alt/
// placeholder/title) y nodos de texto JSX con palabras reales que no pasan por
// {…}. No es exhaustivo (el review visual cubre el resto), pero vuelve
// determinista el defecto #1. Los .tsx limpios (todo `{t(...)}`/`{expr}` entre
// tags) no disparan nada.
{
  const customDir = join(root, "components", "custom");
  const letters = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ";
  const attrRe = new RegExp(
    `\\b(aria-label|alt|placeholder|title)="([^"{}]*[${letters}]{2,}[^"{}]*)"`,
    "g",
  );
  // Texto entre tags con ≥1 palabra de 3+ letras y SIN llaves (si hubiera `{`
  // el contenido es una expresión, no literal).
  const textRe = new RegExp(`>\\s*([^<>{}]*\\b[${letters}]{3,}[^<>{}]*?)\\s*<`, "g");
  if (existsSync(customDir)) {
    for (const file of walkFiles(customDir)) {
      const rel = relative(root, file);
      readFileSync(file, "utf8")
        .split("\n")
        .forEach((line, i) => {
          const trimmed = line.trim();
          // Saltar comentarios de línea/bloque.
          if (/^(\/\/|\*|\/\*)/.test(trimmed)) return;
          let m: RegExpExecArray | null;
          attrRe.lastIndex = 0;
          while ((m = attrRe.exec(line))) {
            errors.push(
              `[hardcode] ${rel}:${i + 1}: atributo ${m[1]}="${m[2].trim()}" con texto literal — sácalo a es.json y usa {t(...)}`,
            );
          }
          textRe.lastIndex = 0;
          while ((m = textRe.exec(line))) {
            const txt = m[1].trim();
            if (/^&[a-z]+;$/i.test(txt)) continue; // entidad HTML suelta
            errors.push(
              `[hardcode] ${rel}:${i + 1}: texto JSX literal "${txt.slice(0, 50)}" — el copy va por next-intl (t()), no hardcodeado`,
            );
          }
        });
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
