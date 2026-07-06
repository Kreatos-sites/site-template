# Theme — anatomía y reglas (se genera A LA MEDIDA)

**No hay presets.** No existe una lista de themes que copiar: cada sitio
tiene el suyo, diseñado desde la marca del negocio. El art-director decide
la paleta, el `--radius` y el par tipográfico; site-builder los materializa
escribiendo `app/theme.css` y `app/fonts.ts` desde cero cada corrida. El
`app/theme.css` que vive en el repo es un baseline gris de emergencia
(`REEMPLÁZAME`) — solo para que el template buildee.

Este documento es el **contrato**: la estructura que TODO `app/theme.css`
debe respetar para que el build y los tokens funcionen. La libertad está en
los VALORES (paleta, radius, carácter), no en la arquitectura.

## Anatomía obligatoria — siempre los tres bloques

### 1. `:root` — modo claro completo

Todas las variables shadcn (`--background`, `--foreground`, `--card`,
`--popover`, `--primary`, `--secondary`, `--muted`, `--accent`,
`--destructive`, `--border`, `--input`, `--ring` y sus `-foreground`),
más `--radius` y los tokens propios del motor:

| Token | Qué controla |
| --- | --- |
| `--section-gap` | Padding vertical de cada sección (`py-(--section-gap)`) |
| `--hero-overlay` | Gradiente sobre la imagen del hero `full-bleed` (derívalo del fondo oscuro de la paleta) |
| `--og-background` / `--og-foreground` / `--og-accent` | Paleta HEX para `opengraph-image.tsx` e `icon.tsx` (Satori no soporta oklch; deriva estos HEX de la paleta principal) |

### 2. `.dark` — modo oscuro completo

Mismas variables de color que `:root`. **Nunca omitas este bloque**,
aunque el sitio arranque en claro: el toggle existe.
No repitas `--radius` ni `--og-*` (no cambian por modo).

### 3. `@theme inline` — mapeo a utilidades Tailwind v4

Mapea cada variable a `--color-*` para que existan `bg-background`,
`text-primary`, etc. Aquí también viven `--font-display` y `--font-body`,
que referencian `--font-display-face` / `--font-body-face` (los llena
`app/fonts.ts` vía la opción `variable` de next/font). Este bloque es
ESTRUCTURA fija: cópialo tal cual, no cambia entre sitios.

## Reglas de diseño (al crear el theme del cliente)

- **La paleta NACE de la marca.** Los colores de la ficha de marca son la
  base innegociable; las referencias analizadas (`analysis.tokens`) inspiran,
  no dictan. Nunca dos sitios del mismo giro con el mismo acento — varía el
  hue del acento ±15-30° si chocaría con un hermano.
- **Un solo acento.** `--primary` es el único color con protagonismo.
  Si todo es acento, nada es acento.
- **`--radius` define el carácter, y lo decide el REGISTRO del negocio:**
  serio / institucional / editorial → `0`–`0.125rem` (esquinas rectas);
  cercano / casual / de servicio → `0.5rem`+ (amable). No mezcles radios
  por componente — un solo `--radius` gobierna todo.
- **Contraste AA mínimo** entre `--background`/`--foreground` y entre
  `--primary`/`--primary-foreground` en AMBOS modos. Verifícalo
  (validate-config lo checa) antes de entregar.
- **`--muted-foreground` legible**: chroma bajo, lightness intermedia.
  Es el color más usado del sitio después del foreground.
- **El modo por defecto se decide en `site.config.ts`** (`design.defaultMode`),
  no en el CSS.
- **oklch siempre** para colores de UI; hex solo en los tokens `--og-*`.

## Cómo se materializa

1. El art-director pone en el spec la `design.palette` completa (light + dark,
   token→hex), el `radius` y `design.fonts` (`{ display, body }`, cualquier
   familia de `next/font/google`).
2. site-builder escribe `app/theme.css` con esos valores (convierte la paleta
   hex a oklch para los bloques de UI, deja los `--og-*` en hex) y `app/fonts.ts`
   con las dos fuentes — vía `draft_surface`.
3. `pnpm validate-config` verifica contraste, ausencia de literales de color y
   la anatomía; `pnpm build` confirma que compila.
