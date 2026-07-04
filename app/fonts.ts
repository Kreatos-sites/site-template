/**
 * Pares tipográficos curados. SOLO el par activo se exporta.
 *
 * Para cambiar de par: comenta el bloque activo, descomenta el elegido
 * y actualiza design.fontPair en site.config.ts. Las variables CSS
 * (--font-display-face / --font-body-face) NO cambian: theme.css las
 * consume sin importar qué familia haya detrás.
 *
 * PARES CURADOS:
 *  - fraunces-albert  → Fraunces + Albert Sans        (obsidiana: serio, editorial)
 *  - barlow-archivo   → Barlow Condensed + Archivo    (cantera: industrial, directo)
 *  - libre-inter      → Libre Caslon Text + Inter     (clásico notarial, alta lectura)
 *  - spectral-public  → Spectral + Public Sans        (institucional, sobrio)
 */

/* ============ PAR ACTIVO: fraunces-albert ============ */
import { Fraunces, Albert_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
  axes: ["opsz"],
});

const body = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

/* ============ barlow-archivo (cantera) ============
import { Barlow_Condensed, Archivo } from "next/font/google";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});
==================================================== */

/* ============ libre-inter ============
import { Libre_Caslon_Text, Inter } from "next/font/google";

const display = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});
==================================================== */

/* ============ spectral-public ============
import { Spectral, Public_Sans } from "next/font/google";

const display = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});
==================================================== */

export const fontVariables = `${display.variable} ${body.variable}`;
