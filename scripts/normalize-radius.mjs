/**
 * Normaliza el radius a tokens: reemplaza los radios FIJOS (que ignoran --radius)
 * por rounded-lg (= exactamente var(--radius)), para que la decisión de radius del
 * art-director (incluido radius 0 = cuadrado) SIEMPRE se respete.
 *   rounded-2xl | rounded-3xl | rounded-[Npx|Nrem]  ->  rounded-lg
 * Deja intactos: rounded-sm/md/lg/xl (derivan de --radius), rounded-none y
 * rounded-full (círculos reales: avatares, puntos, pills).
 *   node scripts/normalize-radius.mjs            # aplica
 *   node scripts/normalize-radius.mjs --check    # solo lista, no escribe
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["reference/blocks", "components/custom"];
const check = process.argv.includes("--check");
const RE = /\brounded-(?:2xl|3xl|\[[^\]]*\])/g;

let files = 0, hits = 0;
for (const d of DIRS) {
  const dir = join(ROOT, d);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".tsx")) continue;
    const p = join(dir, f);
    const src = readFileSync(p, "utf8");
    const m = src.match(RE);
    if (!m) continue;
    files++; hits += m.length;
    if (check) { console.log(`${d}/${f}: ${m.join(", ")}`); continue; }
    writeFileSync(p, src.replace(RE, "rounded-lg"));
  }
}
console.log(`${check ? "encontrados" : "normalizados"}: ${hits} radios fijos en ${files} archivos`);
