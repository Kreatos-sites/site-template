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

const mimeByExt: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

/**
 * Lee un asset de public/ en build y lo devuelve como data URI, para
 * incrustarlo en Satori (next/og): ImageResponse acepta <img src="data:...">
 * pero no rutas relativas del sitio. Lo usan app/icon.tsx y
 * app/apple-icon.tsx cuando `business.icon` está declarado.
 * Falla FUERTE si el archivo no existe o la extensión no es soportada:
 * un icon declarado pero roto debe tronar el build, no caer en silencio.
 */
export function readPublicImageAsDataUri(publicPath: string): string {
  const ext = publicPath.slice(publicPath.lastIndexOf(".")).toLowerCase();
  const mime = mimeByExt[ext];
  if (!mime) {
    throw new Error(
      `[og-theme] extensión no soportada para "${publicPath}": usa svg, png, jpg o webp`,
    );
  }

  try {
    const file = readFileSync(join(process.cwd(), "public", publicPath));
    return `data:${mime};base64,${file.toString("base64")}`;
  } catch (cause) {
    throw new Error(
      `[og-theme] no se pudo leer "public${publicPath}" (¿business.icon apunta a un archivo que no existe?)`,
      { cause },
    );
  }
}

/**
 * Variante SUAVE: devuelve null en vez de tronar cuando el archivo no existe
 * o la extensión no es soportada. La usa opengraph-image.tsx, que compone la
 * foto de fondo/el logo si están y cae a la tarjeta sólida si no — un OG sin
 * foto NO debe romper el build (a diferencia de un `business.icon` declarado
 * pero roto, que sí debe tronar).
 */
export function tryReadPublicImageAsDataUri(
  publicPath: string | undefined | null,
): string | null {
  if (!publicPath) return null;
  const ext = publicPath.slice(publicPath.lastIndexOf(".")).toLowerCase();
  if (!mimeByExt[ext]) return null;
  try {
    return readPublicImageAsDataUri(publicPath);
  } catch {
    return null;
  }
}
