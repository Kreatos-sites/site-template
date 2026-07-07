import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3210";
const OUT = process.env.OUT ?? "/tmp/preview-shots";
import { mkdirSync } from "node:fs";
mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "desktop-light", width: 1440, height: 1000, dark: false },
  { name: "desktop-dark", width: 1440, height: 1000, dark: true },
  { name: "mobile-light", width: 390, height: 844, dark: false },
];

const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.addInitScript((dark) => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, s.dark);
  await page.goto(`${BASE}/preview`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: true });
  console.log("shot", s.name);
  await ctx.close();
}
await browser.close();
console.log("done", OUT);
