/**
 * Arregla dos roturas recurrentes de iconos en reference/blocks/*.tsx (idempotente):
 *  1) el TIPO `Icon` importado del subpath /dist/ssr (no lo exporta) -> al entry principal.
 *  2) iconos de MARCA que lucide/phosphor ya no exportan -> iconos existentes.
 *   node scripts/fix-icons.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "../reference/blocks");
const LUCIDE = { Instagram: "Camera", Linkedin: "Briefcase", Twitter: "Bird", Facebook: "Globe", Youtube: "Play" };
const PHOSPHOR = {
  // Marca (no existen en phosphor) -> neutros.
  InstagramIcon: "CameraIcon", LinkedinIcon: "LinkIcon", TwitterIcon: "ButterflyIcon", FacebookIcon: "GlobeIcon", YoutubeIcon: "PlayIcon",
  // Nombres phosphor equivocados frecuentes -> el real.
  QuoteIcon: "QuotesIcon", LandmarkIcon: "BankIcon", TrendUpIcon: "TrendUpIcon",
};

let touched = 0;
for (const f of readdirSync(DIR)) {
  if (!f.endsWith(".tsx")) continue;
  const p = join(DIR, f);
  let s = readFileSync(p, "utf8");
  const before = s;

  // 1) `type Icon`/`type Icon as X` dentro del import de /dist/ssr -> import type aparte del entry principal.
  const ssrImport = /import\s*\{([^}]*)\}\s*from\s*"@phosphor-icons\/react\/dist\/ssr";/;
  const m = s.match(ssrImport);
  if (m && /(^|,)\s*type\s+Icon(\s+as\s+\w+)?\s*(,|$)/.test(m[1])) {
    const aliasM = m[1].match(/type\s+Icon(?:\s+as\s+(\w+))?/);
    const alias = aliasM && aliasM[1] ? aliasM[1] : "Icon";
    const cleaned = m[1].split(",").map((x) => x.trim()).filter((x) => x && !/^type\s+Icon/.test(x)).join(",\n  ");
    s = s.replace(ssrImport, `import {\n  ${cleaned},\n} from "@phosphor-icons/react/dist/ssr";\nimport type { Icon as ${alias} } from "@phosphor-icons/react";`);
  }

  // 2) iconos de marca -> existentes (whole-word).
  for (const [k, v] of Object.entries(PHOSPHOR)) s = s.replace(new RegExp(`\\b${k}\\b`, "g"), v);
  for (const [k, v] of Object.entries(LUCIDE)) s = s.replace(new RegExp(`\\b${k}\\b`, "g"), v);

  if (s !== before) { writeFileSync(p, s); touched++; }
}
console.log(`fix-icons: ${touched} archivos tocados`);
