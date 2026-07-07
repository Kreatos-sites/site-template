/**
 * Screenshots de entrega.
 *
 * Modos:
 *  - `pnpm screenshots`            → todo en uno (server + todas las rutas,
 *    capturas concurrentes). Para uso local/CI.
 *  - `pnpm screenshots:serve`      → SOLO arranca next start persistente
 *    (queda vivo entre comandos; pid en .qa/next.pid). Para el sandbox.
 *  - `pnpm screenshots:page -- --route /servicios` → captura UNA página
 *    contra el server ya vivo (un comando corto por página; los modos salen
 *    solos según defaultMode/themeToggle: home añade el modo alterno solo si
 *    hay toggle; un sitio de un solo modo no genera capturas del otro).
 *  - `pnpm screenshots:stop`       → mata el server persistente.
 *
 * Los PNG quedan en .qa/screenshots/ — el agente los revisa con visión.
 * Requiere `pnpm build` previo.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { chromium } from "playwright";

import config from "../site.config";

const root = process.cwd();
const outDir = join(root, ".qa", "screenshots");
const pidFile = join(root, ".qa", "next.pid");
const PORT = Number(process.env.QA_PORT ?? 4321);
const BASE = `http://127.0.0.1:${PORT}`;

const allRoutes = ["/", ...(config.pages ?? []).map((p) => `/${p.slug}`)].slice(0, 6);

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

function shotsFor(route: string): Shot[] {
  const slug = slugOf(route);
  // Solo se captura lo que el VISITANTE puede ver. El sitio arranca en
  // defaultMode; el modo alterno solo es alcanzable si hay toggle. Un sitio
  // light-only (defaultMode=light, themeToggle=false) NO debe generar capturas
  // dark: el visitante nunca llega ahí, y el reviewer marcaba "critical" por
  // contraste en un modo muerto (bloqueaba el approval y hacía perder tokens
  // arreglando dark que nadie ve).
  const primary = config.design.defaultMode;
  const toggle = config.flags.themeToggle === true;
  const base: Shot[] = [
    { route, name: `${slug}-desktop-${primary}`, viewport: DESKTOP, colorScheme: primary },
    { route, name: `${slug}-mobile-${primary}`, viewport: MOBILE, colorScheme: primary },
  ];
  // El modo alterno se juzga en la home, y solo si el toggle lo hace alcanzable.
  if (toggle && route === "/") {
    const alt = primary === "light" ? "dark" : "light";
    base.splice(1, 0, {
      route,
      name: `${slug}-desktop-${alt}`,
      viewport: DESKTOP,
      colorScheme: alt,
    });
  }
  return base;
}

async function serverAlive(): Promise<boolean> {
  try {
    const res = await fetch(BASE, { redirect: "manual" });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function waitForServer(): Promise<void> {
  for (let i = 0; i < 45; i++) {
    if (await serverAlive()) return;
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`next start no respondió en ${BASE} tras 45s`);
}

function ensureBrowser(): void {
  // Si chromium ya está (precalentado en el sandbox bootstrap), NO reinstales:
  // el `--with-deps` bajo root re-invoca el gestor de paquetes (dnf) en CADA
  // serve por nada. executablePath resuelve la ruta esperada; si el binario
  // existe, saltamos el install completo.
  try {
    const exe = chromium.executablePath();
    if (exe && existsSync(exe)) return;
  } catch {
    // executablePath puede lanzar si playwright no ubica el browser → instala.
  }
  // Idempotente; en el sandbox corre como root y puede instalar deps.
  const installArgs = ["playwright", "install", "chromium"];
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    installArgs.push("--with-deps");
  }
  const install = spawnSync("npx", installArgs, { cwd: root, stdio: "inherit" });
  if (install.status !== 0) {
    throw new Error("playwright install chromium falló");
  }
}

async function capture(browser: import("playwright").Browser, shot: Shot): Promise<void> {
  const context = await browser.newContext({
    viewport: shot.viewport,
    colorScheme: shot.colorScheme,
    reducedMotion: "reduce", // capturas estables: sin animaciones a medias
  });
  try {
    // next-themes usa defaultTheme fijo del config (no "system"), así que
    // prefers-color-scheme no basta: se fuerza el modo vía su localStorage.
    await context.addInitScript((mode: string) => {
      window.localStorage.setItem("theme", mode);
    }, shot.colorScheme);
    const page = await context.newPage();
    // networkidle puede no llegar (analytics/polling): fallback a load — el
    // scroll de abajo dispara el lazy-load igual.
    await page
      .goto(`${BASE}${shot.route}`, { waitUntil: "networkidle", timeout: 20_000 })
      .catch(() =>
        page.goto(`${BASE}${shot.route}`, { waitUntil: "load", timeout: 20_000 }),
      );
    // Recorrer la página completa: dispara los reveals whileInView (once:true)
    // y el lazy-load de imágenes antes del fullPage.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500); // fonts/imágenes tardías + settle
    await page.screenshot({ path: join(outDir, `${shot.name}.png`), fullPage: true });
    console.log(`[screenshots] ${shot.name}.png`);
  } finally {
    await context.close();
  }
}

async function captureAll(shots: Shot[]): Promise<void> {
  const browser = await chromium.launch();
  try {
    // Pool de 3: en serie, 10+ shots con scroll completo tardan demasiado.
    const queue = [...shots];
    const workers = Array.from(
      { length: Math.min(3, queue.length) },
      async () => {
        for (;;) {
          const shot = queue.shift();
          if (!shot) return;
          await capture(browser, shot);
        }
      },
    );
    await Promise.all(workers);
  } finally {
    await browser.close();
  }
}

function startDetachedServer(): void {
  mkdirSync(join(root, ".qa"), { recursive: true });
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: root,
    detached: true,
    stdio: "ignore",
    env: process.env,
  });
  server.unref();
  if (server.pid) writeFileSync(pidFile, String(server.pid));
}

function stopDetachedServer(): void {
  if (!existsSync(pidFile)) {
    console.log("[screenshots] sin server registrado (.qa/next.pid no existe)");
    return;
  }
  const pid = Number(readFileSync(pidFile, "utf8").trim());
  try {
    // Grupo negativo: next start crea hijos; el detached lidera su grupo.
    process.kill(-pid, "SIGTERM");
  } catch {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // ya no existe
    }
  }
  rmSync(pidFile, { force: true });
  console.log("[screenshots] server detenido");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // Lista las rutas que se capturarían, como JSON, y sale. La usa el tool
  // run_visual_qa para recorrer `screenshots:page` una por una SIN correr el
  // modo monolítico (que moría por timeout en el sandbox). Debe ir ANTES del
  // fallback all-in-one del final. Prefijo __ROUTES__ para aislar la línea del
  // ruido de pnpm/tsx.
  if (args.includes("--print-routes")) {
    console.log(`__ROUTES__${JSON.stringify(allRoutes)}`);
    return;
  }

  if (args.includes("--stop")) {
    stopDetachedServer();
    return;
  }

  if (args.includes("--serve")) {
    ensureBrowser(); // precalienta aquí: las capturas por página salen rápido
    if (await serverAlive()) {
      console.log(`[screenshots] server ya vivo en ${BASE}`);
      return;
    }
    startDetachedServer();
    await waitForServer();
    console.log(`[screenshots] server listo en ${BASE} (pid en .qa/next.pid)`);
    return;
  }

  const routeIdx = args.indexOf("--route");
  if (routeIdx !== -1) {
    // Una página por comando (server ya vivo vía --serve).
    const route = args[routeIdx + 1];
    if (!route?.startsWith("/")) {
      throw new Error('Uso: pnpm screenshots:page -- --route /servicios');
    }
    if (!(await serverAlive())) {
      throw new Error(
        `El server de QA no responde en ${BASE}: corre \`pnpm screenshots:serve\` primero.`,
      );
    }
    mkdirSync(outDir, { recursive: true });
    await captureAll(shotsFor(route));
    return;
  }

  // Modo todo-en-uno (local/CI): server propio + todas las rutas.
  ensureBrowser();
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  try {
    await waitForServer();
    await captureAll(allRoutes.flatMap(shotsFor));
  } finally {
    server.kill("SIGTERM");
  }
  console.log(`[screenshots] capturas en .qa/screenshots/`);
}

main().catch((error) => {
  console.error(`[screenshots] FALLÓ: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
