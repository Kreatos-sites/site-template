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
  name: z.string().min(2),
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
  whatsapp: z.string().min(8),
  /** Opcional: los leads de Google Maps rara vez lo publican. Nunca inventarlo. */
  email: z.email().optional(),
  hours: z.array(hoursSchema).min(1),
  maps: z.object({
    /** URL pública de la ficha de Google Maps */
    uri: z.url(),
    placeId: z.string().min(4),
    rating: z.number().min(0).max(5),
    reviewsCount: z.number().int().nonnegative(),
  }),
  /**
   * Año de fundación (los años de experiencia se calculan en el motor).
   * Opcional: si el dato no es verificable, omítelo — nunca lo inventes.
   */
  founded: z.number().int().min(1900).max(2100).optional(),
  social: z.object({
    facebook: z.url().optional(),
    linkedin: z.url().optional(),
    instagram: z.url().optional(),
  }),
});

export const seoSchema = z.object({
  /** Sin protocolo: "lopezyasociados.mx" */
  domain: z.string().min(3),
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(170),
  /** Subtipo schema.org de LocalBusiness: "AccountingService", "GeneralContractor", "MovingCompany"... */
  jsonLdType: z.string().min(3),
  keywords: z.array(z.string()).min(3),
});

export const designSchema = z.object({
  /** Nombre del preset copiado a app/theme.css (ver themes/) */
  preset: z.string().min(2),
  /** Par tipográfico activo en app/fonts.ts */
  fontPair: z.string().min(2),
  defaultMode: z.enum(["light", "dark"]),
  density: z.enum(["airy", "compact"]),
  imageTreatment: z.enum(["duotone-accent", "bw", "warm", "none"]),
});

/**
 * El orden del array `sections` ES el orden de render.
 * navbar y footer se colocan fuera de <main> automáticamente.
 */
export const sectionSchema = z.discriminatedUnion("id", [
  z.object({
    id: z.literal("navbar"),
    variant: z.enum(["minimal", "split", "centered-logo"]).optional(),
  }),
  z.object({
    id: z.literal("hero"),
    variant: z.enum(["editorial", "split-image", "full-bleed", "stat-led"]).optional(),
    image: z.string().optional(),
  }),
  z.object({ id: z.literal("trust-bar") }),
  z.object({
    id: z.literal("services"),
    variant: z.enum(["numbered-list", "asym-grid", "bordered-table"]).optional(),
    count: z.number().int().positive().optional(),
  }),
  z.object({
    id: z.literal("about"),
    variant: z.enum(["portrait", "timeline", "plain"]).optional(),
    image: z.string().optional(),
  }),
  z.object({
    id: z.literal("process"),
    count: z.number().int().positive().optional(),
  }),
  z.object({
    id: z.literal("portfolio"),
    variant: z.enum(["masonry", "rows"]).optional(),
    images: z.array(z.string()).optional(),
  }),
  z.object({ id: z.literal("coverage") }),
  z.object({
    id: z.literal("testimonials"),
    count: z.number().int().positive().optional(),
  }),
  z.object({
    id: z.literal("faq"),
    count: z.number().int().positive().optional(),
  }),
  z.object({ id: z.literal("cta-band") }),
  z.object({
    id: z.literal("contact"),
    showMap: z.boolean().optional(),
  }),
  z.object({ id: z.literal("footer") }),
]);

export const flagsSchema = z.object({
  contactForm: z.boolean(),
  whatsappFloat: z.boolean(),
  /** Reservado para fase 2; hoy el sitio es es-only */
  multiLang: z.boolean(),
  themeToggle: z.boolean(),
});

export const siteConfigSchema = z.object({
  business: businessSchema,
  seo: seoSchema,
  design: designSchema,
  sections: z.array(sectionSchema).min(3),
  flags: flagsSchema,
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SectionConfig = z.infer<typeof sectionSchema>;
export type SectionId = SectionConfig["id"];
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

/** Solo dígitos, para enlaces wa.me */
export function whatsappDigits(business: Business): string {
  return business.whatsapp.replace(/\D/g, "");
}

/** Dirección en una línea, para mapas y JSON-LD */
export function fullAddress(business: Business): string {
  const a = business.address;
  return `${a.street}, ${a.colonia}, ${a.zip} ${a.city}, ${a.state}, México`;
}
