/**
 * QA de entrega. Corre con: pnpm qa
 *
 * Orquesta: pnpm build → validate-config → escribe .qa/qa-report.json.
 * Sale con código 1 si cualquier paso falla.
 *
 * Fase 2 (pendiente, ver `todo` en el reporte):
 *  - Screenshots por sección (light/dark, mobile/desktop) con Playwright.
 *  - Lighthouse (performance/a11y/SEO) contra el build de producción.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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

steps.push(runStep("build", "pnpm", ["build"]));

// Solo validamos si el build compiló; si no, el reporte ya trae el fallo.
if (steps[0].ok) {
  steps.push(runStep("validate-config", "pnpm", ["validate-config"]));
}

const ok = steps.every((s) => s.ok);
const report = {
  generatedAt: new Date().toISOString(),
  ok,
  steps,
  todo: [
    "fase 2: screenshots por sección (light/dark, mobile/desktop) con Playwright",
    "fase 2: lighthouse (performance/accesibilidad/SEO) contra next start",
  ],
};

mkdirSync(join(root, ".qa"), { recursive: true });
writeFileSync(join(root, ".qa", "qa-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`\n[qa] reporte: .qa/qa-report.json — ${ok ? "TODO OK" : "CON FALLAS"}`);
process.exit(ok ? 0 : 1);
