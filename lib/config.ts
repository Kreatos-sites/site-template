import { z } from "zod";

/**
 * Contrato de datos del sitio. `site.config.ts` DEBE cumplir este schema.
 * `scripts/validate-config.ts` lo usa para validar antes de entregar.
 *
 * NO modificar este archivo al personalizar un sitio: es motor.
 */

const hoursSchema = z.object({
  /** Texto visible, en español: "Lunes a viernes" */
  days: z.string().min(1),
  /** Nombres schema.org para JSON-LD: ["Monday", ..., "Friday"] */
  dayOfWeek: z.array(z.string()).min(1),
  /** Formato 24h "HH:MM" */
  open: z.string().regex(/^\d{2}:\d{2}$/),
  close: z.string().regex(/^\d{2}:\d{2}$/),
});

export const businessSchema = z.object({
  /** Razón social / nombre completo: footer legal, aviso de privacidad y JSON-LD. */
  name: z.string().min(2),
  /**
   * Nombre de marca corto para header y footer ("Zúñiga & Asociados"),
   * NUNCA la razón social completa. Si existe, el header lo usa siempre.
   */
  shortName: z.string().min(2).optional(),
  /**
   * Logo del cliente, ruta en public/ ("/images/logo.svg").
   * Criterio de render (navbar): si el nombre del archivo contiene
   * "wordmark", el logo ya trae el nombre dibujado y se muestra solo;
   * cualquier otro logo se trata como isotipo y va acompañado del
   * shortName. El alt siempre es shortName ?? name.
   */
  logo: z.string().optional(),
  /**
   * ISOTIPO cuadrado de la marca, ruta en public/ ("/images/icon.svg").
   * NO es lo mismo que `logo`: `logo` es la marca del header (puede ser
   * un wordmark horizontal); `icon` es la versión cuadrada/compacta de
   * la que el motor genera favicon y apple-icon (app/icon.tsx y
   * app/apple-icon.tsx). Si se omite, el motor cae al monograma con la
   * inicial del negocio. svg/png/jpg/webp.
   */
  icon: z.string().optional(),
  /** Categoría legible: "Despacho contable", "Constructora"... */
  category: z.string().min(2),
  address: z.object({
    street: z.string().min(2),
    colonia: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2),
    zip: z.string().regex(/^\d{5}$/),
  }),
  geo: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  /** Formato internacional legible: "+52 871 712 3456" */
  phone: z.string().min(8),
  /** Opcional: sin número de WhatsApp propio, los enlaces wa.me usan phone
   *  (en negocios locales casi siempre son el mismo número). */
  whatsapp: z.string().min(8).optional(),
  /** Opcional: los leads de Google Maps rara vez lo publican. Nunca inventarlo. */
  email: z.email().optional(),
  /** Opcional como todo dato del negocio: sin horario real, contact oculta
   *  el bloque y el JSON-LD omite openingHours — nunca se inventa. */
  hours: z.array(hoursSchema).default([]),
  /**
   * Ficha de Google Maps. Opcional: un lead manual sin ficha lo OMITE — el
   * motor oculta el rating (trust-bar, badge, testimonials, OG) y el JSON-LD
   * omite aggregateRating/hasMap. NUNCA un rating inventado ni en 0.
   */
  maps: z
    .object({
      /** URL pública de la ficha de Google Maps */
      uri: z.url(),
      placeId: z.string().min(4),
      rating: z.number().min(0).max(5),
      reviewsCount: z.number().int().nonnegative(),
    })
    .optional(),
  /**
   * Año de fundación (los años de experiencia se calculan en el motor).
   * Opcional: si el dato no es verificable, omítelo — nunca lo inventes.
   */
  founded: z.number().int().min(1900).max(2100).optional(),
  /** Redes reales del negocio. Opcional: sin redes, el footer las oculta. */
  social: z
    .object({
      facebook: z.url().optional(),
      linkedin: z.url().optional(),
      instagram: z.url().optional(),
    })
    .optional(),
});

export const seoSchema = z.object({
  /** Sin protocolo: "lopezyasociados.mx" */
  domain: z.string().min(3),
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(170),
  /** Subtipo schema.org de LocalBusiness: "AccountingService", "GeneralContractor", "MovingCompany"... */
  jsonLdType: z.string().min(3),
  keywords: z.array(z.string()).min(3),
  /**
   * Foto de fondo del Open Graph. DEBE ser JPG/PNG/SVG, NUNCA webp: Satori
   * (@vercel/og) no decodifica webp y rompe el build del OG. Normalmente NO se
   * declara: fetch_brand_assets genera "/images/og.jpg" desde la primera foto
   * de marca y app/opengraph-image.tsx lo toma solo (foto + overlay + logo).
   * Declárala únicamente para forzar OTRA imagen, y debe ser un jpg/png real
   * (no la hero.webp del sitio). Sin foto usable → tarjeta sólida de marca.
   */
  ogImage: z.string().optional(),
});

export const designSchema = z.object({
  /**
   * Metadata opcional heredada (ya NO hay presets: el theme se genera a la
   * medida en app/theme.css). Se conserva optional solo por compatibilidad
   * con specs viejos; el motor no lo lee en runtime.
   */
  preset: z.string().min(2).optional(),
  /** Metadata opcional: el par real vive en app/fonts.ts. */
  fontPair: z.string().min(2).optional(),
  defaultMode: z.enum(["light", "dark"]),
  density: z.enum(["airy", "compact"]),
  imageTreatment: z.enum(["duotone-accent", "bw", "warm", "none"]),
  /**
   * Intensidad de la coreografía de entrada. Es UNA sola coreografía por
   * sitio (misma curva [0.16, 1, 0.3, 1], misma dirección); este campo
   * solo elige cuánta. Requerido y sin default: el spec del cliente
   * SIEMPRE decide el nivel y lo justifica.
   * - "none": cero animación de entrada; todo se renderiza estático y
   *   los CTAs no llevan efecto de presión.
   * - "subtle": fade + subida ligera (16px, 0.5s) al entrar al viewport,
   *   sin stagger protagónico. Va bien con giros sobrios (despachos).
   * - "expressive": lo de subtle, más el hero coreografiado al cargar
   *   (stagger eyebrow → titular → subtexto → CTAs) y listas con stagger
   *   por ítem. El hero es el ÚNICO momento protagonista.
   * prefers-reduced-motion SIEMPRE colapsa a estático; no es configurable.
   */
  motion: z.enum(["none", "subtle", "expressive"]),
});

/**
 * TODA sección es CUSTOM: escrita a la medida por el site-builder para ESTE
 * sitio (ver AGENT.md). No hay secciones fijas ni biblioteca de bloques
 * montable — cada componente del sitio es único. El corpus de patrones vive en
 * `reference/` (no se monta; es inspiración few-shot para el agente).
 *
 * `slot` ubica la sección en un landmark del motor:
 *  - "header": el section-renderer la envuelve en <header> (cabecera/nav).
 *  - "footer": la envuelve en <footer> e INYECTA el crédito de agencia.
 *  - "body" (default): va dentro de <main>, en el orden del array.
 * La home DEBE tener exactamente 1 header y 1 footer; las páginas interiores
 * NO los declaran (se heredan de la home).
 *
 * `component` es la key registrada en components/custom/registry.ts; `ns` su
 * namespace de copy en es.json. validate-config verifica que exista en el
 * registry y que su copy espeje.
 */
export const sectionSchema = z.object({
  id: z.literal("custom"),
  component: z.string().min(2),
  ns: z.string().min(2),
  slot: z.enum(["header", "body", "footer"]).optional(),
});

/** Slugs que el motor reserva: colisionan con rutas ya existentes en app/. */
const reservedSlugs = new Set(["aviso-de-privacidad", "api"]);
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Página interior del sitio, servida en /<slug> por app/[page]/page.tsx.
 * El header y el footer NO se declaran aquí: el motor los inyecta desde
 * `config.sections` de la home para que sean idénticos en todo el sitio.
 */
export const pageSchema = z.object({
  /** kebab-case: define la URL (/<slug>) */
  slug: z
    .string()
    .regex(slugRe, "slug en kebab-case: minúsculas, números y guiones medios")
    .refine((slug) => !reservedSlugs.has(slug), {
      message: "slug reservado por el motor (aviso-de-privacidad, api)",
    }),
  /** <title> de la página; el layout le agrega « | nombre del negocio» */
  title: z.string().min(4).max(70),
  /** meta description propia de la página */
  description: z.string().min(50).max(170),
  sections: z
    .array(sectionSchema)
    .min(1)
    .refine(
      (sections) => !sections.some((s) => s.slot === "header" || s.slot === "footer"),
      {
        message:
          "header y footer no van en pages: el motor los hereda de la home",
      },
    ),
});

export const flagsSchema = z.object({
  contactForm: z.boolean(),
  whatsappFloat: z.boolean(),
  /** Reservado para fase 2; hoy el sitio es es-only */
  multiLang: z.boolean(),
  themeToggle: z.boolean(),
});

export const siteConfigSchema = z
  .object({
    business: businessSchema,
    seo: seoSchema,
    design: designSchema,
    sections: z.array(sectionSchema).min(3),
    /** Páginas interiores (/<slug>). Opcional: la mayoría de sitios no las necesita. */
    pages: z.array(pageSchema).optional(),
    flags: flagsSchema,
    /**
     * Idiomas del sitio. El PRIMERO es el default y vive en `/` sin prefijo
     * (localePrefix "as-needed"); los demás en `/<locale>/...`. Cada locale
     * necesita su `messages/<locale>.json` con las MISMAS keys que el default.
     * Omitido = `["es"]` (sitio de un solo idioma, URLs sin prefijo, cero cambio).
     */
    locales: z.array(z.string().min(2)).min(1).default(["es"]),
  })
  .superRefine((cfg, ctx) => {
    const seen = new Set<string>();
    (cfg.pages ?? []).forEach((page, index) => {
      if (seen.has(page.slug)) {
        ctx.addIssue({
          code: "custom",
          path: ["pages", index, "slug"],
          message: `slug duplicado: "${page.slug}"`,
        });
      }
      seen.add(page.slug);
    });
    // Slots de landmark: el motor NO prescribe qué secciones hay — el
    // art-director compone libremente (cuántas secciones, qué contenido, cuántas
    // páginas). El único límite es estructural: como mucho UN header y UN footer
    // (el motor los envuelve en <header>/<footer>; el resto va en <main>). Cero
    // o uno de cada: un one-pager puede no tener nav propio, y el crédito de
    // agencia + el landmark <footer> los garantiza el motor de todos modos.
    const headers = cfg.sections.filter((s) => s.slot === "header").length;
    const footers = cfg.sections.filter((s) => s.slot === "footer").length;
    if (headers > 1) {
      ctx.addIssue({
        code: "custom",
        path: ["sections"],
        message: `a lo más 1 sección con slot "header" (hay ${headers})`,
      });
    }
    if (footers > 1) {
      ctx.addIssue({
        code: "custom",
        path: ["sections"],
        message: `a lo más 1 sección con slot "footer" (hay ${footers})`,
      });
    }
  });

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SectionConfig = z.infer<typeof sectionSchema>;
export type SectionId = SectionConfig["id"];
export type PageConfig = z.infer<typeof pageSchema>;
export type Business = z.infer<typeof businessSchema>;

/** Extrae la config de una sección concreta del union */
export type SectionOf<T extends SectionId> = Extract<SectionConfig, { id: T }>;

/**
 * Años de ejercicio, calculados — nunca los escribas a mano en el copy
 * dinámico. Devuelve null si `founded` no está en la config (dato opcional).
 */
export function yearsInBusiness(business: Business): number | null {
  if (business.founded === undefined) return null;
  return Math.max(1, new Date().getFullYear() - business.founded);
}

/** Solo dígitos, para enlaces wa.me (fallback: el teléfono del negocio). */
export function whatsappDigits(business: Business): string {
  return (business.whatsapp ?? business.phone).replace(/\D/g, "");
}

/** Dirección en una línea, para mapas y JSON-LD */
export function fullAddress(business: Business): string {
  const a = business.address;
  return `${a.street}, ${a.colonia}, ${a.zip} ${a.city}, ${a.state}, México`;
}
