# Themes — anatomía y reglas de variación

Cada preset es un archivo CSS autocontenido. Para activar uno:

1. Copia `themes/<preset>.css` sobre `app/theme.css` (reemplazo completo).
2. Ajusta `design.preset` en `site.config.ts` con el mismo nombre.
3. Varía los valores oklch para el cliente (ver reglas abajo).

## Anatomía obligatoria de un theme

Todo theme DEBE contener estos tres bloques, siempre los tres:

### 1. `:root` — modo claro completo

Todas las variables shadcn (`--background`, `--foreground`, `--card`,
`--popover`, `--primary`, `--secondary`, `--muted`, `--accent`,
`--destructive`, `--border`, `--input`, `--ring` y sus `-foreground`),
más `--radius` y los tokens propios del motor:

| Token | Qué controla |
| --- | --- |
| `--section-gap` | Padding vertical de cada sección (`py-(--section-gap)`) |
| `--hero-overlay` | Gradiente sobre la imagen del hero `full-bleed` |
| `--og-background` / `--og-foreground` / `--og-accent` | Paleta HEX para `opengraph-image.tsx` e `icon.tsx` (Satori no soporta oklch; mantenlos sincronizados a ojo con la paleta principal) |

### 2. `.dark` — modo oscuro completo

Mismas variables de color que `:root`. **Nunca omitas este bloque**,
aunque el sitio arranque en claro: el toggle existe.
No repitas `--radius` ni `--og-*` (no cambian por modo).

### 3. `@theme inline` — mapeo a utilidades Tailwind v4

Mapea cada variable a `--color-*` para que existan `bg-background`,
`text-primary`, etc. Aquí también viven `--font-display` y `--font-body`,
que referencian `--font-display-face` / `--font-body-face` (los llena
`app/fonts.ts` vía la opción `variable` de next/font). Este bloque
casi nunca cambia entre presets: copia y no toques.

## Reglas de variación (al personalizar para un cliente)

- **Varía hue y chroma, no la arquitectura.** Un despacho jurídico sobre
  obsidiana puede mover el fondo de hue 260 a 250 y el acento de ámbar
  a bronce; no agregues variables nuevas ni segundos acentos.
- **Un solo acento.** `--primary` es el único color con protagonismo.
  Si todo es acento, nada es acento.
- **Contraste AA mínimo** entre `--background`/`--foreground` y entre
  `--primary`/`--primary-foreground` en ambos modos. Verifica con un
  checker antes de entregar.
- **`--muted-foreground` legible**: chroma bajo, lightness intermedia.
  Es el color más usado del sitio después del foreground.
- **El modo por defecto se decide en `site.config.ts`**
  (`design.defaultMode`), no en el CSS.
- **oklch siempre** para colores de UI; hex solo en los tokens `--og-*`.
- **`--radius` define el carácter**: 0–0.25rem serio/editorial,
  0.5rem+ amable. No mezcles radios por componente.

## Crear un preset nuevo

1. Copia el preset existente más cercano en carácter.
2. Renómbralo (nombre de material o piedra, en español: `obsidiana`,
   `cantera`, `salitre`, `parota`...).
3. Escribe el encabezado de comentario: para quién es, carácter,
   gesto memorable, par tipográfico sugerido y `defaultMode` recomendado.
4. Ajusta paleta según las reglas de variación.
5. Cópialo a `app/theme.css` y revisa ambos modos con el toggle.
