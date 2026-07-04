import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Lee los tokens `--og-*` (hex) de app/theme.css para que
 * opengraph-image.tsx e icon.tsx hereden la paleta del preset activo.
 *
 * Los OG tokens existen porque Satori (next/og) no soporta oklch:
 * cada theme declara equivalentes hex de background/foreground/acento.
 */
export function getOgTokens() {
  let css = "";
  try {
    css = readFileSync(join(process.cwd(), "app", "theme.css"), "utf8");
  } catch {
    // build sin theme.css: caemos a la paleta neutra de abajo
  }

  const pick = (name: string, fallback: string) => {
    const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`));
    return match ? match[1] : fallback;
  };

  return {
    background: pick("--og-background", "#14181f"),
    foreground: pick("--og-foreground", "#f2efe6"),
    accent: pick("--og-accent", "#d9a441"),
  };
}
