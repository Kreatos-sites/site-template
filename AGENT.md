# AGENT.md — Contrato de personalización

Este template es el producto base de Kreatos: sitios corporativos para
negocios locales mexicanos (despachos contables, constructoras, logística,
distribuidores B2B). Todo lo que no está listado abajo es **motor** y
funciona sin tocarse.

## El contrato: SOLO se editan 5 cosas

| # | Archivo | Qué es |
| --- | --- | --- |
| 1 | `site.config.ts` | Datos del negocio y estructura (orden y variantes de secciones) |
| 2 | `messages/es.json` | El 100% del copy visible, espejando `sections` por id |
| 3 | `app/theme.css` | Tokens visuales: se copia desde `themes/<preset>.css` y se varía |
| 4 | `app/fonts.ts` | Par tipográfico: se activa uno de los pares curados |
| 5 | `public/images/` | Se reemplazan los placeholders por fotos reales |

**Nada más.** Si crees que necesitas tocar un componente, un layout o un
script, es un cambio de motor: no pertenece a la personalización de un
cliente y rompe la garantía de que todos los sitios se actualizan igual.

## Orden de trabajo

1. **`site.config.ts`** — llena `business` con datos REALES y verificables
   (dirección, teléfono, rating y número de reseñas de la ficha de Google,
   año de fundación). Elige `seo.jsonLdType` (subtipo schema.org de
   LocalBusiness: `AccountingService`, `GeneralContractor`, `MovingCompany`,
   `WholesaleStore`...). Define `sections` (orden = render) con sus
   variantes, `design` y `flags`. Ejecuta `pnpm validate-config` temprano.
   **`email` y `founded` son opcionales**: si el lead no los tiene,
   omítelos — el motor oculta sus renders automáticamente (contacto,
   footer, trust-bar, aviso de privacidad y JSON-LD). Nunca los inventes.
2. **`app/theme.css`** — copia el preset de `themes/` que corresponda al
   giro (obsidiana: despachos/servicios profesionales; cantera:
   construcción/industrial) y varía hue/chroma para el cliente siguiendo
   `themes/README.md`. Actualiza `design.preset`.
3. **`app/fonts.ts`** — activa el par tipográfico coherente con el preset
   (instrucciones dentro del archivo). Actualiza `design.fontPair`.
4. **`messages/es.json`** — escribe TODO el copy. Reglas abajo.
5. **`public/images/`** — sustituye `hero.svg` / `about.svg` por fotos
   reales del negocio (idealmente `.jpg`/`.webp`; actualiza las rutas
   `image` en `site.config.ts`). El tratamiento visual lo aplica el motor
   (`design.imageTreatment`), no edites las fotos.
6. **Verifica**: `pnpm qa` (build + validate-config + reporte en
   `.qa/qa-report.json`). Revisa el sitio en ambos modos con el toggle.

## Reglas duras del copy (es.json)

- Español mexicano profesional, trato de **usted**.
- **Prohibido**: emojis, lorem, TODOs, "empresa líder", "soluciones
  integrales", "comprometidos con la excelencia" y cualquier claim hueco.
- Los claims van **anclados a datos** que están en `site.config.ts`:
  años (se calculan solos desde `founded`), rating y reseñas reales,
  número de clientes/empleados verificable.
- Cada key de primer nivel espeja una sección por id (`hero`, `services`,
  `faq`...). Keys globales permitidas: `common`, `notFound`, `privacy` y
  `pages` (copy de páginas interiores, ver abajo). No dejes keys de
  secciones que no están en `config.sections` ni ramas de `pages.*` que
  ningún `ns` use (el validador las marca como huérfanas).
- El aviso de privacidad es boilerplate LFPDPPP del motor, parametrizado
  con `config.business`: no requiere copy propio.

## Páginas interiores (`config.pages`)

El sitio puede tener páginas además de la landing, declaradas en
`site.config.ts` → `pages` y servidas en `/<slug>`. Siguen dentro del
contrato: solo se tocan `site.config.ts` y `messages/es.json`.

**Cuándo crear una página (y cuándo no):**

- Giro con muchos servicios que no caben como teaser en la home →
  `/servicios` con el catálogo extendido.
- Historia, equipo o credenciales con contenido REAL y verificable →
  `/nosotros`.
- **Nunca crees páginas de relleno**: si no hay contenido propio y
  distinto al de la home, la sección en la landing es suficiente. Una
  página que repite el copy de la home daña el SEO y la credibilidad.

**Reglas duras:**

- Cada página: `{ slug, title, description, sections }`. `slug` en
  kebab-case; **slugs reservados** (los valida el schema):
  `aviso-de-privacidad` y `api`.
- `navbar` y `footer` **no se declaran** en `pages[].sections`: el motor
  los inyecta desde `config.sections` de la home, idénticos en todo el
  sitio (el schema rechaza declararlos).
- TODA sección de una página interior debe traer `ns` explícito
  (namespace de traducción, convención `pages.<slug>.<seccion>`).
  `pnpm validate-config` falla si falta: sin `ns` la sección
  renderizaría el copy de la home, y eso casi siempre es un bug.
- El copy vive en `messages/es.json` bajo `pages.<slug>.*`, espejando
  cada `ns`. Debe ser contenido PROPIO de la página, no un copy-paste
  de la home (mismas reglas de copy de arriba).
- La sección `page-header` (h1 + párrafo lead; keys `title` y `lead`)
  abre las páginas interiores. Solo tiene sentido en `pages`, su `ns`
  es obligatorio por schema.
- En la home, `ns` es opcional en cualquier sección (default = id de la
  sección); úsalo solo si necesitas dos veces la misma sección con copy
  distinto.
- Si una página debe aparecer en el menú, edita `navbar.links` en
  es.json con `href: "/<slug>"` (el footer reusa esos links). Los
  anclajes de la home van como `/#seccion` para funcionar desde
  cualquier página.
- El sitemap y los metadatos por página (title, description, canonical,
  OpenGraph) los genera el motor desde `config.pages`: no hay nada que
  tocar.

## Regla de color (la más importante)

**PROHIBIDO usar colores literales en componentes**: nada de hex, `rgb()`,
`oklch()` sueltos ni clases de paleta Tailwind (`bg-blue-500`,
`text-amber-400`...). Los componentes SOLO usan tokens semánticos:
`bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`,
`text-muted-foreground`, `border-border`, `bg-card`, `bg-accent`...
Los únicos lugares con valores de color reales son `app/theme.css` y
`themes/*.css`. `pnpm validate-config` lo verifica con grep y falla si
encuentra violaciones.

## Qué NO tocar (motor)

- `app/` salvo `theme.css` y `fonts.ts` (layout, page, rutas de metadata,
  aviso de privacidad, API de contacto).
- `components/` completo (secciones, ui de shadcn, shared).
- `lib/` completo (schema zod, JSON-LD, i18n, utils).
- `scripts/`, configs raíz (`next.config.ts`, `tsconfig.json`,
  `postcss.config.mjs`, `eslint.config.mjs`, `package.json`).
- `themes/*.css` son la biblioteca de presets: para un cliente se varía la
  **copia** en `app/theme.css`. Solo se edita `themes/` para crear un
  preset nuevo reutilizable (eso es trabajo de motor, no de cliente).

## Referencia rápida de la estructura

- Secciones disponibles (id → variantes):
  `navbar` (minimal | split | centered-logo), `hero` (editorial |
  split-image | full-bleed | stat-led), `trust-bar`, `services`
  (numbered-list | asym-grid | bordered-table), `about` (portrait |
  timeline | plain), `process`, `portfolio` (masonry | rows), `coverage`,
  `testimonials`, `faq`, `cta-band`, `contact` (prop `showMap`), `footer`,
  `page-header` (solo páginas interiores; keys `title` y `lead`).
- Toda sección acepta `ns` (namespace de traducción; default = su id).
  Obligatorio en páginas interiores, opcional en la home.
- `trust-bar` no lleva copy en es.json: sus datos salen de
  `config.business` (años calculados, rating, reseñas).
- Flags: `contactForm` (si es false, el endpoint /api/contact responde 404
  y el formulario no se monta), `whatsappFloat`, `themeToggle`,
  `multiLang` (reservado fase 2).
- Formulario de contacto: requiere `RESEND_API_KEY` (y opcional
  `CONTACT_FROM` con remitente verificado) en el entorno del deploy.

## Comandos

```bash
pnpm install          # standalone (tiene su propio pnpm-workspace.yaml)
pnpm dev              # desarrollo
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
pnpm validate-config  # schema + copy + espejo de keys + tokens de color
pnpm qa               # build + validate-config → .qa/qa-report.json
```
