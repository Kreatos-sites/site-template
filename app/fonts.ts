/**
 * Par tipográfico del sitio. NO hay pares fijos "curados": el art-director
 * elige el par a la medida del negocio y site-builder reescribe este archivo
 * con esas dos familias (cualquiera de next/font/google). Lo de abajo es solo
 * el DEFAULT del template para que buildee — se sobrescribe cada corrida.
 *
 * Contrato (respétalo al reescribir):
 *  - Exactamente dos fuentes de `next/font/google`: display + body.
 *  - `variable: "--font-display-face"` y `"--font-body-face"` (theme.css las
 *    consume por esas variables, sin importar la familia detrás).
 *  - `display: "swap"`, `subsets: ["latin"]`, y los `weight`/`axes` que la
 *    familia requiera.
 *  - Export final: `export const fontVariables = ...`.
 */
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

export const fontVariables = `${display.variable} ${body.variable}`;
