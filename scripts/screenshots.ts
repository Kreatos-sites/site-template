/**
 * Screenshots de entrega. Corre con: pnpm screenshots (o vía pnpm qa).
 *
 * Levanta el build de producción (next start) y captura cada ruta del sitio
 * con Playwright en tres condiciones: desktop light, desktop dark y mobile
 * light (las interiores solo desktop light + mobile). Los PNG quedan en
 * .qa/screenshots/ — el agente los revisa con visión antes de entregar.
 *
 * Requiere `pnpm build` previo (qa.ts lo garantiza).
 */
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

import { chromium } from "playwright";

import config from "../site.config";

const root = process.cwd();
const outDir = join(root, ".qa", "screenshots");
const PORT = Number(process.env.QA_PORT ?? 4321);
const BASE = `http://127.0.0.1:${PORT}`;

const routes = ["/", ...(config.pages ?? []).map((p) => `/${p.slug}`)].slice(0, 6);

type Shot = {
  route: string;
  name: string;
  viewport: { width: number; height: number };
  colorScheme: "light" | "dark";
};

function slugOf(route: string): string {
  return route === "/" ? "home" : route.replace(/\//g, "");
}

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const shots: Shot[] = routes.flatMap((route) => {
  const slug = slugOf(route);
  const base: Shot[] = [
    { route, name: `${slug}-desktop-light`, viewport: DESKTOP, colorScheme: "light" },
    { route, name: `${slug}-mobile-light`, viewport: MOBILE, colorScheme: "light" },
  ];
  // Dark completo solo en la home: es donde el theme se juzga.
  if (route === "/") {
    base.splice(1, 0, {
      route,
      name: `${slug}-desktop-dark`,
      viewport: DESKTOP,
      colorScheme: "dark",
    });
  }
  return base;
});

async function waitForServer(): Promise<void> {
  for (let i = 0; i < 45; i++) {
    try {
      const res = await fetch(BASE, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // aún no levanta
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`next start no respondió en ${BASE} tras 45s`);
}

async function main(): Promise<void> {
  // Navegador presente (idempotente; en el sandbox corre como root y puede
  // instalar dependencias del sistema).
  const installArgs = ["playwright", "install", "chromium"];
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    installArgs.push("--with-deps");
  }
  const install = spawnSync("npx", installArgs, { cwd: root, stdio: "inherit" });
  if (install.status !== 0) {
    throw new Error("playwright install chromium falló");
  }

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  try {
    await waitForServer();
    const browser = await chromium.launch();
    try {
      for (const shot of shots) {
        const context = await browser.newContext({
          viewport: shot.viewport,
          colorScheme: shot.colorScheme,
          reducedMotion: "reduce", // capturas estables: sin animaciones a medias
        });
        // next-themes usa defaultTheme fijo del config (no "system"), así que
        // prefers-color-scheme no basta: se fuerza el modo vía su localStorage.
        await context.addInitScript((mode: string) => {
          window.localStorage.setItem("theme", mode);
        }, shot.colorScheme);
        const page = await context.newPage();
        await page.goto(`${BASE}${shot.route}`, { waitUntil: "networkidle" });
        // Recorrer la página completa: dispara los reveals whileInView
        // (once:true) y el lazy-load de imágenes antes del fullPage.
        await page.evaluate(async () => {
          const step = window.innerHeight;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(500); // fonts/imágenes tardías + settle
        await page.screenshot({
          path: join(outDir, `${shot.name}.png`),
          fullPage: true,
        });
        await context.close();
        console.log(`[screenshots] ${shot.name}.png`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    server.kill("SIGTERM");
  }
  console.log(`[screenshots] ${shots.length} capturas en .qa/screenshots/`);
}

main().catch((error) => {
  console.error(`[screenshots] FALLÓ: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
