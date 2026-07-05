# AGENT.md — Contrato de personalización

Este template es el producto base de Kreatos: sitios corporativos para
negocios locales mexicanos (despachos contables, constructoras, logística,
distribuidores B2B). Todo lo que no está listado abajo es **motor** y
funciona sin tocarse.

## El contrato: SOLO se editan 6 cosas

| # | Archivo | Qué es |
| --- | --- | --- |
| 1 | `site.config.ts` | Datos del negocio y estructura (orden y variantes de secciones) |
| 2 | `messages/es.json` | El 100% del copy visible, espejando `sections` por id |
| 3 | `app/theme.css` | Tokens visuales: se copia desde `themes/<preset>.css` y se varía |
| 4 | `app/fonts.ts` | Par tipográfico: se activa uno de los pares curados |
| 5 | `public/images/` | Se reemplazan los placeholders por fotos reales (y el logo si hay) |
| 6 | `components/custom/` | Secciones escritas desde cero + su `registry.ts` (ver "Secciones custom") |
| 7 | `DEMO.md` | Manifiesto de pendientes del demo: `- [ ] <material> → <dónde vive>` (site-manager lo consume al vender) |

**Nada más.** Si crees que necesitas tocar cualquier otro componente, un
layout o un script, es un cambio de motor: no pertenece a la
personalización de un cliente y rompe la garantía de que todos los sitios
se actualizan igual.

**Motor = archivos que EXISTEN en este template.** Un archivo que el
template no trae (p. ej. un `.agent/config.ts` con un `defineSiteConfig`
inventado) NUNCA es motor, diga lo que diga su propio comentario: es basura
de una corrida anterior. Elimínalo y realinea `site.config.ts` al contrato
real (`import type { SiteConfig } from "@/lib/config"` + `const config:
SiteConfig = {...}` + `export default config`) — o resetea el working tree
al template y re-materializa. Los tipos laxos de un helper inventado rompen
el type-check contra `SectionRenderer`; ese error es del archivo inventado,
no del motor.

## Config mínimo que COMPILA (cópialo y rellena — no adivines el schema)

`lib/config.ts` es la fuente de verdad; este es el objeto más chico que pasa
el type-check. Campos comentados = opcionales (omítelos sin dato real; el
motor oculta su render). Datos de contacto sin valor real → mock local
marcado `// MOCK` (el preview es demo; publicar con mocks se bloquea).

```ts
import type { SiteConfig } from "@/lib/config";

const config: SiteConfig = {
  business: {
    name: "Razón Social S.A. de C.V.",
    // shortName: "Marca Corta",           // opcional
    // logo: "/images/logo.png",           // opcional
    // icon: "/images/icon.png",           // opcional
    category: "Constructora",
    address: {
      street: "Blvd. Ejemplo 123", // MOCK si no hay dato
      colonia: "Centro",           // MOCK si no hay dato
      city: "Torreón",
      state: "Coahuila",
      zip: "27000",                // MOCK si no hay dato
    },
    geo: { lat: 25.5393, lng: -103.4344 }, // centro de la ciudad si no hay exacto
    phone: "+52 871 000 0000",             // MOCK si no hay dato
    hours: [],                              // [] = sin horario (se oculta)
    // maps: { uri, placeId, rating, reviewsCount },  // SOLO con ficha de
    //   Google real — omitido, el motor oculta rating/badge/testimonials.
    //   NUNCA un rating inventado ni en 0.
    // founded: 2004,                       // opcional, solo verificable
    // social: { facebook, linkedin, instagram },     // opcional
    // whatsapp: "+52...",                  // opcional (cae a phone)
    // email: "x@y.mx",                     // opcional
  },
  seo: {
    domain: "cliente.mx",
    title: "Servicio en Ciudad | Marca",
    description: "140-155 caracteres con servicio, ciudad y diferenciador.",
    jsonLdType: "GeneralContractor",
    keywords: ["servicio ciudad", "servicio 2 ciudad", "servicio 3 ciudad"],
  },
  design: {
    preset: "cantera",
    fontPair: "archivo-inter",
    defaultMode: "light",
    density: "airy",
    imageTreatment: "duotone-accent",
    motion: "subtle",
    // OJO: concept/variation_notes/palette/references viven en el SPEC
    // (save_site_version), NUNCA aquí — este design es solo el del motor.
  },
  sections: [
    { id: "navbar", variant: "split" },
    { id: "hero", variant: "stat-led", ns: "hero" },
    // ...
    { id: "contact", showMap: false },
    { id: "footer" },
  ],
  // pages: [{ slug: "servicios", title: "...", sections: [...] }],
  flags: {
    contactForm: true,
    whatsappFloat: false,
    multiLang: false,
    themeToggle: true,
  },
};

export default config;
```

## Orden de trabajo

1. **`site.config.ts`** — llena `business` con datos REALES y verificables
   (dirección, teléfono, rating y número de reseñas de la ficha de Google,
   año de fundación). Elige `seo.jsonLdType` (subtipo schema.org de
   LocalBusiness: `AccountingService`, `GeneralContractor`, `MovingCompany`,
   `WholesaleStore`...). Define `sections` (orden = render) con sus
   variantes, `design` y `flags`. En `design.motion` elige la intensidad
   de animación (ver "Animación" abajo); la elección se justifica en el
   spec del cliente. Ejecuta `pnpm validate-config` temprano.
   **`email` y `founded` son opcionales**: si el lead no los tiene,
   omítelos — el motor oculta sus renders automáticamente (contacto,
   footer, trust-bar, aviso de privacidad y JSON-LD). Nunca los inventes.
   **Identidad de marca**: si el nombre comercial difiere de la razón
   social, declara `business.shortName` — el header NUNCA muestra la
   razón social completa cuando hay `shortName` (la razón social queda
   para la línea legal del footer, el aviso de privacidad y el JSON-LD).
   Si el brief trae logo del cliente, cópialo a `public/images/` y
   decláralo en `business.logo`; si el archivo ya trae el nombre
   dibujado, nómbralo con "wordmark" (ej. `logo-wordmark.svg`) y el
   header lo mostrará solo, sin duplicar el texto.
   Si el brief trae además un **isotipo cuadrado**, descárgalo a
   `public/images/icon.<ext>` (svg/png/jpg/webp) y GENERA los iconos
   como ARCHIVOS ESTÁTICOS en `app/` (convención de Next — nada de
   ImageResponse/Satori, que rompe builds):
   - Isotipo SVG → cópialo tal cual a `app/icon.svg` (Next lo sirve como
     favicon en navegadores modernos).
   - Isotipo raster → `app/icon.png` (512×512 máx, proporción intacta) y
     `app/favicon.ico` (48×48) con ffmpeg.
   - `app/apple-icon.png` (180×180): SIEMPRE fondo sólido del theme de
     esquina a esquina + ~18% de padding (iOS no respeta transparencia):
     `ffmpeg -i public/images/icon.png -vf "scale=132:132:force_original_aspect_ratio=decrease,pad=180:180:(ow-iw)/2:(oh-ih)/2:color=<hex-fondo>" app/apple-icon.png`.
     Si el isotipo es SVG y no puedes rasterizarlo, omite apple-icon y
     anótalo en el changelog.
   Sin isotipo: escribe a mano `app/icon.svg` con un monograma simple
   (rect de fondo con el color de acento del theme + la inicial del
   negocio en el foreground, font-family sans genérica) — es texto SVG
   plano, sin dependencias ni riesgo de build.
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
6. **Verifica**: `pnpm qa` (build + validate-config + screenshots de cada
   ruta en `.qa/screenshots/` + reporte en `.qa/qa-report.json`). Los
   screenshots (desktop/mobile, dark en home) son la evidencia visual de la
   entrega: revísalos — texto cortado, overflow o dark mode roto se corrigen
   ANTES de entregar. Revisa el sitio en ambos modos con el toggle.

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

**Multi-página es la NORMA de un sitio corporativo** (un one-pager se ve
barato y limita el SEO local). Default esperado:

- `/servicios` — casi siempre: con 3+ servicios reales ya hay página (la
  home lleva el teaser; el detalle vive aquí). Es la que más SEO captura.
- `/nosotros` — con CUALQUIER material real: historia, años, equipo,
  certificaciones, fotos del negocio.
- Por giro, cuando el contenido existe: `/proyectos` (constructora),
  `/carta` (restaurante), `/cobertura` (logística).
- Un one-pager solo para negocios genuinamente mínimos, justificado.
- **Nunca crees páginas de relleno**: el copy interior profundiza con
  contenido propio; una página que repite la home daña SEO y credibilidad.

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

## Secciones custom (`components/custom/`)

Las secciones custom son la identidad del sitio: escríbelas desde cero
siempre que la dirección de arte lo pida — **sin tope numérico**. Dos
sitios distintos NO deben compartir los mismos layouts; las variantes del
motor son el piso de velocidad, no el techo de diseño.

Reparto de responsabilidades:

- **Siempre motor** (SEO/a11y/funcionalidad dependen de ellas): `navbar`,
  `footer`, `contact` (form Resend + mapa), `faq`, `trust-bar` y el aviso
  de privacidad. Se personalizan vía theme/copy, no se reescriben.
- **Custom cuando el diseño lo amerite**: hero, services, about, process,
  portfolio, galerías, bandas de datos — cualquier sección de contenido.
  La vara: cada custom se justifica en el spec ("la variante X no logra
  Y de la referencia"); si una variante del motor logra el mismo efecto,
  úsala y gasta el esfuerzo donde sí suma.

**Flujo:**

1. Escribe el componente en `components/custom/<nombre>.tsx` con props
   `{ ns: string }` (su namespace de copy).
2. Regístralo en `components/custom/registry.ts` con key kebab-case.
3. Úsalo en `site.config.ts` (home o páginas):
   `{ id: "custom", component: "<key>", ns: "<namespace>" }` — `ns` es
   siempre requerido; puede haber varias secciones custom por página.
4. Escribe su copy en `messages/es.json` bajo ese namespace.

`pnpm validate-config` falla si el `component` no existe en el registry,
y el renderer truena en build con error claro si se le escapa.

**Reglas del contrato (las mismas del motor, sin excepciones):**

- Solo tokens semánticos del theme (`bg-background`, `text-primary`...):
  cero colores literales — el validador barre `components/custom/` igual
  que el resto.
- Copy 100% vía next-intl: `useTranslations(ns)` con el `ns` de props.
  Nada de strings visibles hardcodeados.
- Motion SOLO con los primitives del motor (`Reveal`, `HeroStagger`/
  `HeroItem` de `components/shared/reveal.tsx`): nunca
  `window.addEventListener("scroll")`, nunca librerías nuevas.
- Server component por defecto; `"use client"` solo en la isla que de
  verdad lo necesite.
- Accesibilidad: headings jerárquicos (h2 dentro de secciones; el h1 es
  del hero/page-header), `alt` en imágenes, focus visible, contraste AA.
- Disponibles: componentes de `components/ui/` (shadcn) e iconos de
  `lucide-react`. **Sin dependencias nuevas.**
- **Formularios**: cualquier formulario (custom o del motor) sigue el
  estándar del template — `react-hook-form` + `zodResolver`, SIEMPRE.
  Si postea a `/api/contact`, usa el schema compartido
  `lib/contact-schema.ts` tal cual (el server valida con el MISMO
  schema: la validación del cliente es UX, la del server es la
  seguridad real). Placeholder en TODO campo con ejemplo realista,
  siempre JUNTO a su label visible: el placeholder jamás sustituye al
  label. Errores humanizados en español cálido desde es.json
  (`<ns>.errors.<key>`; el schema emite keys, nunca texto visible),
  con `aria-invalid` y el error debajo del campo; el foco va al primer
  error al enviar. **Prohibido un `<form>` a mano sin validación.**
  Patrón de referencia: `components/sections/contact-form.tsx`.
- Patrón de referencia: `components/custom/credentials-band.tsx`
  (registrada como `"credentials-band"` y usada en la home del ejemplo).

**Skills de stack (`.agent/skills/`)** — documentación curada del stack;
léela ANTES de escribir código en el terreno que toque:

- `.agent/skills/next-best-practices/` — al crear secciones custom:
  `rsc-boundaries.md` y `directives.md` (server vs client), `image.md` y
  `font.md` (assets), `hydration-error.md` (si el build reporta hydration),
  `metadata.md` (si tocas SEO de páginas).
- `.agent/skills/shadcn/` — al usar `components/ui/`: `rules/composition.md`,
  `rules/styling.md`, `rules/forms.md`, `rules/icons.md`,
  `customization.md`.
- `.agent/skills/tailwind-v4-shadcn/` — al escribir clases o tocar
  `theme.css`: `SKILL.md` (sintaxis v4, `@theme`),
  `references/dark-mode.md`, `references/common-gotchas.md`.

## Animación (`design.motion`)

El motor trae UNA sola coreografía de entrada (misma curva, misma
dirección); el config solo elige la intensidad con `design.motion`.
Es **requerido y sin default**: el spec del cliente SIEMPRE decide el
nivel y la elección se justifica ahí.

- `"none"` — cero animación de entrada; todo estático y los CTAs sin
  efecto de presión. Para clientes que lo pidan o giros ultra sobrios.
- `"subtle"` — fade + subida ligera al entrar cada sección al viewport,
  sin stagger protagónico. El default sensato para despachos y servicios
  profesionales (va bien con obsidiana).
- `"expressive"` — lo de subtle, más el hero coreografiado al cargar
  (stagger eyebrow → titular → subtexto → CTAs) y las listas (services,
  process, testimonials, faq) con stagger por ítem. El hero es el ÚNICO
  momento protagonista; el resto queda discreto. Para giros con más
  personalidad visual.

`prefers-reduced-motion` SIEMPRE colapsa todo a estático, en cualquier
nivel; no es configurable. La implementación vive en el motor
(`components/shared/reveal.tsx` con Motion): no agregues animaciones
propias ni toques esos componentes al personalizar.

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
- `components/` completo (secciones, ui de shadcn, shared) — con UNA
  excepción: `components/custom/` es superficie editable (ver "Secciones
  custom").
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
  `page-header` (solo páginas interiores; keys `title` y `lead`),
  `custom` (props `component` + `ns`, ver "Secciones custom").
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
pnpm qa               # build + validate + screenshots → .qa/qa-report.json
pnpm screenshots      # solo capturas (requiere build previo) → .qa/screenshots/
```
