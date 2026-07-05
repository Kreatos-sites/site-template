/**
 * QA de entrega. Corre con: pnpm qa
 *
 * Orquesta: pnpm build → validate-config → screenshots (Playwright, cada
 * ruta en desktop/mobile y dark en home; quedan en .qa/screenshots/ para la
 * revisión visual del agente) → escribe .qa/qa-report.json.
 *
 * Sale con código 1 si build o validate fallan. El paso de screenshots es
 * no-fatal (infra de navegador puede faltar fuera del sandbox): su fallo se
 * reporta en el JSON pero no bloquea el gate — el agente decide.
 *
 * Pendiente (ver `todo` en el reporte): Lighthouse + axe por ruta.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import config from "../site.config";

const root = process.cwd();

type StepResult = {
  name: string;
  command: string;
  ok: boolean;
  durationMs: number;
  outputTail: string;
};

function runStep(name: string, command: string, args: string[]): StepResult {
  console.log(`\n[qa] ${name}: ${command} ${args.join(" ")}`);
  const start = Date.now();
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  const durationMs = Date.now() - start;
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  const ok = result.status === 0;

  process.stdout.write(output);
  console.log(`[qa] ${name}: ${ok ? "OK" : "FALLÓ"} (${(durationMs / 1000).toFixed(1)}s)`);

  return {
    name,
    command: `${command} ${args.join(" ")}`,
    ok,
    durationMs,
    outputTail: output.split("\n").slice(-25).join("\n"),
  };
}

const steps: StepResult[] = [];

// --skip-build: cuando el caller ACABA de correr `pnpm build` verde (el flujo
// del agente lo garantiza), repetirlo dentro de qa solo quema el presupuesto
// de tiempo del comando en el sandbox. Solo se omite si el build existe.
const skipBuild =
  process.argv.includes("--skip-build") &&
  existsSync(join(root, ".next", "BUILD_ID"));

if (skipBuild) {
  console.log("\n[qa] build: omitido (--skip-build, .next/BUILD_ID presente)");
  steps.push({
    name: "build",
    command: "pnpm build (omitido: --skip-build)",
    ok: true,
    durationMs: 0,
    outputTail: "build omitido: --skip-build con .next/BUILD_ID presente",
  });
} else {
  steps.push(runStep("build", "pnpm", ["build"]));
}

// Solo validamos si el build compiló; si no, el reporte ya trae el fallo.
if (steps[0].ok) {
  steps.push(runStep("validate-config", "pnpm", ["validate-config"]));
  // --skip-screenshots: el agente ya capturó página por página (flujo por
  // pasos del sandbox: screenshots:serve → screenshots:page × N → stop);
  // aquí solo se verifica que existan.
  if (process.argv.includes("--skip-screenshots")) {
    const dir = join(root, ".qa", "screenshots");
    const existing = existsSync(dir)
      ? readdirSync(dir).filter((f) => f.endsWith(".png")).length
      : 0;
    steps.push({
      name: "screenshots",
      command: "pnpm screenshots (omitido: --skip-screenshots)",
      ok: existing > 0,
      durationMs: 0,
      outputTail:
        existing > 0
          ? `${existing} capturas ya presentes en .qa/screenshots/`
          : "no hay capturas en .qa/screenshots/ — corre screenshots:serve + screenshots:page primero",
    });
  } else {
    steps.push(runStep("screenshots", "pnpm", ["screenshots"]));
  }
}

// Gate duro: build + validate. Screenshots es no-fatal (se reporta, no
// bloquea) — sin navegador el sitio sigue siendo entregable y el agente ve
// el fallo en el reporte.
const fatalSteps = steps.filter((s) => s.name !== "screenshots");
const ok = fatalSteps.every((s) => s.ok);

// Rutas renderizables del sitio: home + páginas interiores de config.pages.
const routes = ["/", ...(config.pages ?? []).map((p) => `/${p.slug}`)];

const screenshotsDir = join(root, ".qa", "screenshots");
const screenshots = existsSync(screenshotsDir)
  ? readdirSync(screenshotsDir)
      .filter((f) => f.endsWith(".png"))
      .map((f) => `.qa/screenshots/${f}`)
      .sort()
  : [];

const report = {
  generatedAt: new Date().toISOString(),
  ok,
  routes,
  screenshots,
  steps,
  todo: [
    "lighthouse + axe (performance/accesibilidad/SEO) por ruta contra next start",
  ],
};

mkdirSync(join(root, ".qa"), { recursive: true });
writeFileSync(join(root, ".qa", "qa-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`\n[qa] reporte: .qa/qa-report.json — ${ok ? "TODO OK" : "CON FALLAS"}`);
process.exit(ok ? 0 : 1);
