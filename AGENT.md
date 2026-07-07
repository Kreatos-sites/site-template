# AGENT.md — Contrato de personalización

Este template es el producto base de Kreatos: sitios corporativos para
negocios locales mexicanos (despachos contables, constructoras, logística,
distribuidores B2B).

**El motor es un LIENZO EN BLANCO, no un esqueleto de secciones.** No hay
secciones fijas ni biblioteca de bloques montable: **TODA sección del sitio es
custom**, escrita a la medida para este cliente. La **composición la decide el
art-director** (cuántas secciones, cuáles, en qué orden, cuántas páginas y
rutas) y la deja en el spec; tú, site-builder, la MATERIALIZAS escribiendo cada
componente. Dos sitios distintos jamás comparten layouts.

Todo lo que no está en la lista de abajo es **motor** y funciona sin tocarse.

## Superficie editable (lo único que se toca)

| # | Archivo | Qué es |
| --- | --- | --- |
| 1 | `site.config.ts` | Datos del negocio + `sections` (composición que dictó el art-director: qué customs, en qué orden, con qué `slot`/`ns`) + `pages` |
| 2 | `messages/es.json` | El 100% del copy visible, espejando cada `ns` |
| 3 | `app/theme.css` | Tokens visuales a la medida (paleta, radius, overlay). No hay presets — ver `themes/README.md` |
| 4 | `app/fonts.ts` | Par tipográfico a la medida (display + body de `next/font/google`) |
| 5 | `public/images/` | Fotos reales del negocio (y logo/isotipo si hay) |
| 6 | `components/custom/` | **TODAS las secciones del sitio** + su `registry.ts` |
| 7 | `DEMO.md` | Manifiesto de pendientes del demo (`- [ ] <material> → <dónde vive>`) |

**Nada más.** Tocar cualquier otro componente, layout, script o el schema es un
cambio de MOTOR: no pertenece a la personalización y rompe la garantía de que
todos los sitios se actualizan igual.

**Motor = archivos que EXISTEN en este template.** Un archivo que el template no
trae (p. ej. un `.agent/config.ts` con un `defineSiteConfig` inventado) NUNCA es
motor, diga lo que diga su comentario: es basura de una corrida anterior.
Elimínalo y realinea `site.config.ts` al contrato real
(`import type { SiteConfig } from "@/lib/config"` + `const config: SiteConfig = {...}`
+ `export default config`), o resetea el working tree al template.

## El modelo: TODO es custom, en slots

`components/shared/section-renderer.tsx` recibe `config.sections` (todas custom)
y las renderiza en orden, envolviéndolas en los landmarks que el motor GARANTIZA:

- **`slot: "header"`** → el motor la envuelve en `<header>`. A lo más una. Emite
  el CONTENIDO del header (nav, marca) — NO tu propio `<header>`.
- **`slot: "footer"`** → el motor la envuelve en `<footer>` e **INYECTA el crédito
  de agencia** debajo (no lo escribas tú; no lo puedes quitar). A lo más una.
  Emite el CONTENIDO del footer — NO tu propio `<footer>`.
- **sin slot (default `"body"`)** → va dentro de `<main>`, en el orden del array.
  Emite su propio `<section id="…">` con un id ancla.

No hay mínimo de secciones prescrito por tipo ni conteo fijo por página: si el
spec del art-director pide 4 secciones o 12, materializa 4 o 12. Un one-pager
puede no tener header propio; el motor igual pone `<footer>` + crédito.

## Plomería HEADLESS compartida (úsala, NUNCA la reimplementes)

El comportamiento sin diseño vive en el motor. Tus secciones custom lo cablean a
SU markup — el diseño es único por sitio, la plomería es una sola y ya probada:

- **Formulario de contacto** → `import { useContactForm } from "@/components/shared/use-contact-form"`.
  Da `{ register, onSubmit, isSubmitting, errorText, errorId, ariaProps, t }`.
  Tú escribes tus `<input>/<label>` y los cableas; `<form onSubmit={onSubmit}>`.
  **PROHIBIDO** hacer `fetch("/api/contact")` a mano o reescribir el schema
  (`lib/contact-schema.ts`): el server valida con el MISMO schema.
- **Mapa** → `import { MapEmbed } from "@/components/shared/map-embed"`.
  `<MapEmbed business={config.business} title={t("mapTitle")} className="…" />` —
  TÚ decides el marco (aspecto, borde, overlay). No construyas el iframe a mano.
- **Crédito de agencia** → lo inyecta el motor en el `<footer>`. No lo escribas.
- **Motion** → `import { Reveal, HeroStagger, HeroItem } from "@/components/shared/reveal"`
  (no abras reveal.tsx). Nunca listeners de scroll ni librerías nuevas.
- **Imágenes** → `import { SmartImage } from "@/components/shared/smart-image"`
  (next/image + tratamiento global del theme).
- **Envoltura de sección** → `import { Section } from "@/components/shared/section"`.
  Hornea el ritmo vertical (`--section-gap`) y el contenedor canónico
  (`max-w-6xl px-6 lg:px-8`): `<Section className="…fondo/borde/id de ancla…">…</Section>`.
  OBLIGATORIA en toda sección del cuerpo (ver contrato abajo) — sin ella cada
  componente improvisa su `py-*` y el sitio sale con 5-7 ritmos distintos.
- **Átomos funcionales** (compónlos donde tu diseño los pida):
  `GoogleRatingBadge`, `WhatsappButton`, `LocaleSwitcher`, `ThemeToggle`,
  `SectionHeading` — todos en `components/shared/`.

### Contratos de primitivas (firma EXACTA — cópiala, NO inventes props)

```tsx
// SmartImage — el aspecto/marco va en className. NO existe prop `aspect`.
<SmartImage src="/images/hero.webp" alt={t("heroAlt")} className="aspect-[4/5] rounded-sm" />
//   props: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }
//   Hace fill + object-cover por dentro: NUNCA le pases fill/width/height.

// MapEmbed — recibe el business ENTERO. NO existe address/mapsHref.
<MapEmbed business={config.business} title={t("mapTitle")} className="aspect-video w-full" />
//   props: { business: Business; title: string; className?: string }

// useContactForm — devuelve onSubmit YA envuelto. NO existe handleSubmit/status/selectProps.
const { t, register, onSubmit, isSubmitting, errors, errorId, errorText, ariaProps } = useContactForm(`${ns}.form`);
// <form onSubmit={onSubmit}> … <input {...register("name")} {...ariaProps("name")} /> …
//   isSubmitting: boolean (deshabilita el submit); errorText(field): string | null.

// Reveal — motion de entrada.  delay?: number (ms), className?: string.
<Reveal delay={80} className="…">…</Reveal>
```

**Export**: cada custom es NAMED export — `export function <PascalName>({ ns }: { ns: string })` — y `registry.ts` la importa `import { <PascalName> } from "./<archivo>"`. NUNCA `export default`: el registry importa named y el build truena con "has no default export".

## `reference/` — corpus de inspiración (NO se monta)

`reference/sections/` (15 arquetipos de sección) y `reference/blocks/` (240+
bloques, **agrupados por familia en `reference/blocks/catalog.md`** — heroes,
features, precios, galerías, reseñas, proceso, contacto, footers, catálogo,
hospitality, portafolio, etc.) son un CORPUS de patrones probados: ójealos por
familia para robar composición, estructura y técnica, y luego DIVERGE hacia algo
propio del cliente. **Nunca los importes ni los montes** (no compilan como set;
no están en ningún registry). Copiar uno verbatim a `components/custom/` es reúso
disfrazado y traiciona el objetivo — cada sección debe ser única. Usan tokens del
theme (color y `--radius`) e iconos de lucide/phosphor/remix/hugeicons.

## Config mínimo que COMPILA (cópialo y rellena — no adivines el schema)

`lib/config.ts` es la fuente de verdad. Datos de contacto sin valor real → mock
local marcado `// MOCK`. Campos comentados = opcionales (omítelos sin dato real).

```ts
import type { SiteConfig } from "@/lib/config";

const config: SiteConfig = {
  business: {
    name: "Razón Social S.A. de C.V.",
    // shortName: "Marca Corta",           // opcional (el header nunca muestra la razón social si existe)
    // logo: "/images/logo.png",           // opcional
    // icon: "/images/icon.png",           // opcional
    category: "Constructora",
    address: {
      street: "Blvd. Ejemplo 123", // MOCK si no hay dato
      colonia: "Centro",
      city: "Torreón",
      state: "Coahuila",
      zip: "27000",
    },
    geo: { lat: 25.5393, lng: -103.4344 }, // centro de la ciudad si no hay exacto
    phone: "+52 871 000 0000",             // MOCK si no hay dato
    hours: [],                              // [] = sin horario (se oculta)
    // maps: { uri, placeId, rating, reviewsCount },  // SOLO con ficha real; nunca inventes rating
    // founded: 2004,                       // opcional, solo verificable
    // social: { facebook, linkedin, instagram },
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
    defaultMode: "light",
    density: "airy",
    imageTreatment: "duotone-accent",
    motion: "subtle",
    // concept/palette/radius/fonts/references viven en el SPEC, no aquí.
  },
  // TODAS custom. La lista y su orden salen del SPEC del art-director:
  sections: [
    { id: "custom", component: "site-header",  ns: "site-header",  slot: "header" },
    { id: "custom", component: "hero-…",       ns: "hero-…" },
    // …las que el spec pida, en el orden que pida…
    { id: "custom", component: "contact-…",    ns: "contact-…" },
    { id: "custom", component: "site-footer",  ns: "footer",       slot: "footer" },
  ],
  // pages: [{ slug: "servicios", title, description, sections: [/* custom, sin slots */] }],
  flags: { contactForm: true, whatsappFloat: false, multiLang: false, themeToggle: true },
};

export default config;
```

## Orden de trabajo

1. **`site.config.ts`** — `business` con datos REALES y verificables. Elige
   `seo.jsonLdType`. Arma `sections` con los customs que dicta el spec (header
   con `slot:"header"`, footer con `slot:"footer"`, el resto body), en el orden
   del spec. `design` y `flags`. Corre `pnpm validate-config` temprano.
   Identidad de marca: `shortName` si difiere de la razón social; logo/isotipo a
   `public/images/` + genera los iconos estáticos en `app/` (ver "Iconos" abajo).
2. **`app/theme.css`** — ESCRÍBELO a la medida (paleta de marca, `--radius`,
   overlay, `--og-*`). Respeta la anatomía de `themes/README.md`.
3. **`app/fonts.ts`** — par tipográfico a la medida (display + body).
4. **`components/custom/*.tsx`** — escribe CADA sección del spec. Una por
   archivo, registrada en `components/custom/registry.ts`. Reglas del contrato
   abajo. Para ITERAR sobre una custom ya escrita usa **`edit_file`** (diff), no
   reescribas el archivo entero.
5. **`messages/es.json`** — escribe TODO el copy, un namespace por sección.
6. **`public/images/`** — fotos reales. El tratamiento lo aplica el motor.
7. **Verifica de barato→caro**: `pnpm validate-config` → `pnpm typecheck`
   (`tsc --noEmit`, lista TODOS los errores de tipo de una) → `pnpm qa` (build +
   validate + screenshots). Revisa las capturas (desktop/mobile, dark en home):
   texto cortado, overflow o dark roto se corrigen ANTES de entregar.

## Reglas del contrato de una sección custom

Cada `components/custom/<nombre>.tsx`:

- **Firma**: `export function <PascalName>({ ns }: { ns: string })`. Datos del
  negocio con `import config from "@/site.config"`.
- **Copy 100% vía next-intl**: `useTranslations(ns)`; arrays con `t.raw()`.
  CERO texto visible hardcodeado (tampoco aria-label/placeholder/alt). Labels
  comunes desde `useTranslations("common")`.
- **Solo tokens semánticos** del theme (`bg-background`, `text-primary`,
  `border-border`, `bg-card`…). PROHIBIDO hex/`rgb()`/`oklch()` sueltos o clases
  de paleta Tailwind (`bg-blue-500`). El validador barre `components/custom/`.
- **Ritmo vertical + contenedor (OBLIGATORIO)**: envuelve el cuerpo en
  `<Section>` (`@/components/shared/section`). Da `py-(--section-gap)` y el
  contenedor `max-w-6xl px-6 lg:px-8` iguales para TODAS las secciones. PROHIBIDO
  inventar `py-16/20/24/28` ni tu propio `max-w-*`: rompe el ritmo entre secciones
  (defecto #1 del fan-out, donde cada agente escribe una custom a ciegas). Fondo,
  borde e `id` de ancla van en el `className` del `<Section>`. Excepción única: el
  héroe, que fija su alto con `min-h-*` (usa `<Section flush>` o su `<section>`).
- **Motion** solo con los primitives del motor (`Reveal`…).
- **Server component** por defecto; `"use client"` solo en la isla que lo
  necesite (p. ej. el form con `useContactForm`, o un menú móvil con estado).
- **Plomería**: form → `useContactForm`; mapa → `MapEmbed`; nunca reimplementes
  el submit, el schema ni el iframe (ver "Plomería headless").
- **Accesibilidad**: headings jerárquicos (h1 SOLO en el héroe / `page-intro` de
  interiores; el resto h2/h3), `alt` en imágenes, focus visible, contraste AA.
- **Anclas estables**: si el header linkea a `/#contacto`, la sección de contacto
  DEBE tener `id="contacto"`. Los anclajes cross-página van como `/#seccion`.
- Disponibles: `components/ui/` (shadcn) y **cuatro librerías de iconos** (elige
  la que mejor calce; puedes mezclar entre secciones para variedad visual):
  - `lucide-react` → `import { Truck } from "lucide-react"` · `<Truck className="size-5" />`
  - `@phosphor-icons/react` → `import { TruckIcon } from "@phosphor-icons/react"` · `<TruckIcon className="size-5" />`
  - `@remixicon/react` → `import { RiTruckLine } from "@remixicon/react"` · `<RiTruckLine className="size-5" />`
  - `@hugeicons/react` (free) → `import { HugeiconsIcon } from "@hugeicons/react"` + `import { Truck01Icon } from "@hugeicons/core-free-icons"` · `<HugeiconsIcon icon={Truck01Icon} className="size-5" />`
  **Sin OTRAS dependencias nuevas.**
- `components/custom/credentials-band.tsx` es el patrón canónico de estilo:
  ábrelo UNA vez si necesitas el molde de imports/props.

## Páginas interiores (`config.pages`)

El art-director decide cuántas páginas y rutas hay (`/servicios`, `/nosotros`,
`/proyectos`…) según el material real; nunca páginas de relleno que repitan la
home. Reglas:

- Cada página: `{ slug, title, description, sections }`. `slug` kebab-case;
  reservados: `aviso-de-privacidad`, `api`.
- El header y el footer **NO se declaran** en `pages[].sections`: el motor los
  hereda de la home (el schema rechaza slots header/footer en páginas).
- TODA sección de página trae `ns` explícito (convención `pages.<slug>.<seccion>`);
  su copy vive en `messages/es.json` bajo `pages.<slug>.*` y debe ser PROPIO.
- El h1 de una interior lo abre normalmente una custom tipo `page-intro`
  (`title` + `lead`). Puedes REUSAR una misma custom en varias páginas con
  distinto `ns` (mismo componente, distinto copy).
- Sitemap y metadatos por página los genera el motor desde `config.pages`.

## Reglas duras del copy (es.json)

- Español mexicano profesional, trato de **usted**.
- **Prohibido**: emojis, lorem, TODOs, "empresa líder", "soluciones integrales",
  "comprometidos con la excelencia" y todo claim hueco.
- Claims **anclados a datos** de `site.config.ts` (años calculados desde
  `founded`, rating/reseñas reales, cifras verificables).
- Un namespace de primer nivel por sección (el `ns` que declaraste). Keys
  globales permitidas: `common`, `notFound`, `privacy`, `pages`, `email`. No
  dejes namespaces que ninguna sección use (el validador los marca huérfanos).
- El aviso de privacidad es boilerplate LFPDPPP del motor, parametrizado con
  `config.business`.

## Iconos de marca (estáticos en `app/`)

Convención de Next (nada de ImageResponse/Satori, que rompe builds):
- Isotipo SVG → `app/icon.svg` (favicon en navegadores modernos).
- Isotipo raster → `app/icon.png` (512² máx) + `app/favicon.ico` (48²) con ffmpeg.
- `app/apple-icon.png` (180²): SIEMPRE fondo sólido del theme + ~18% padding
  (iOS ignora transparencia).
- Sin isotipo: `app/icon.svg` con monograma simple (rect de acento + inicial).

## Animación (`design.motion`)

UNA sola coreografía de entrada; el config elige la intensidad. Requerido, sin
default; el spec lo justifica.
- `"none"` — cero animación; giros ultra sobrios o a pedido.
- `"subtle"` — fade + subida ligera al entrar al viewport. Default sensato.
- `"expressive"` — lo de subtle + el héroe coreografiado al cargar y listas con
  stagger. El héroe es el ÚNICO momento protagonista.
`prefers-reduced-motion` SIEMPRE colapsa a estático (no configurable).

## Qué NO tocar (motor)

- `app/` salvo `theme.css`, `fonts.ts` y los iconos de marca.
- `components/shared/` y `components/ui/` (plomería + shadcn). Editable: SOLO
  `components/custom/`.
- `lib/`, `scripts/`, `reference/`, configs raíz.
- `themes/*.css` (biblioteca de presets; para un cliente se varía la COPIA en
  `app/theme.css`).

## Comandos

```bash
pnpm install          # standalone (su propio pnpm-workspace.yaml)
pnpm dev              # desarrollo
pnpm typecheck        # tsc --noEmit
pnpm validate-config  # schema + copy + espejo de keys + tokens de color + registry
pnpm qa               # build + validate + screenshots → .qa/qa-report.json
pnpm screenshots:serve            # server de QA persistente
pnpm screenshots:page -- --route /  # captura UNA página contra el server vivo
```
