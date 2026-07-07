import type { SiteConfig } from "@/lib/config";

/**
 * ÚNICA fuente de datos y estructura del sitio.
 * El copy NO vive aquí: vive en messages/es.json, espejando `sections` por id.
 *
 * Cliente de ejemplo: Despacho López y Asociados (ficticio), Torreón, Coahuila.
 * Lee AGENT.md antes de personalizar.
 */
const config: SiteConfig = {
  business: {
    name: "Despacho López y Asociados",
    // Marca corta para header/footer; la razón social queda para lo legal.
    shortName: "López y Asociados",
    category: "Despacho contable",
    address: {
      street: "Blvd. Independencia 1240 Ote.",
      colonia: "Centro",
      city: "Torreón",
      state: "Coahuila",
      zip: "27000",
    },
    geo: { lat: 25.5393, lng: -103.4344 },
    phone: "+52 871 712 3456",
    whatsapp: "+52 871 234 5678",
    email: "contacto@lopezyasociados.mx",
    hours: [
      {
        days: "Lunes a viernes",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        open: "09:00",
        close: "18:00",
      },
      {
        days: "Sábado",
        dayOfWeek: ["Saturday"],
        open: "09:00",
        close: "13:00",
      },
    ],
    maps: {
      uri: "https://maps.google.com/?cid=8412973650124873215",
      placeId: "ChIJVVVVVVVVVVVRlopez_ejemplo",
      rating: 4.8,
      reviewsCount: 124,
    },
    founded: 2003,
    social: {
      facebook: "https://www.facebook.com/lopezyasociadostrc",
      linkedin: "https://www.linkedin.com/company/despacho-lopez-y-asociados",
    },
  },

  seo: {
    domain: "lopezyasociados.mx",
    title: "López y Asociados | Despacho contable en Torreón",
    description:
      "Despacho contable en Torreón desde 2003. Contabilidad, impuestos, nómina e IMSS para empresas de La Laguna. Calificación 4.8 con 124 reseñas en Google.",
    jsonLdType: "AccountingService",
    keywords: [
      "despacho contable Torreón",
      "contador público Torreón",
      "contabilidad para empresas La Laguna",
      "declaraciones SAT Torreón",
      "nómina IMSS Torreón",
    ],
  },

  design: {
    // El theme se genera a la medida (app/theme.css + app/fonts.ts); ya no
    // hay presets ni pares fijos. preset/fontPair quedaron opcionales.
    defaultMode: "dark",
    density: "airy",
    imageTreatment: "duotone-accent",
    motion: "subtle",
  },

  // TODA sección es CUSTOM: escrita a la medida para ESTE sitio. Esta lista es
  // UN EJEMPLO de composición (la del demo), NO un esqueleto obligatorio — el
  // art-director decide para cada sitio real qué secciones hay, cuántas y en qué
  // orden. El orden del array ES el orden de render. `slot` ubica header/footer
  // en sus landmarks; el resto va en <main> como body.
  sections: [
    { id: "custom", component: "site-header", ns: "site-header", slot: "header" },
    { id: "custom", component: "hero-editorial", ns: "hero-editorial" },
    { id: "custom", component: "services-ledger", ns: "services-ledger" },
    { id: "custom", component: "credentials-band", ns: "credentials-band" },
    { id: "custom", component: "cta-panel", ns: "cta-panel" },
    { id: "custom", component: "contact-split", ns: "contact-split" },
    { id: "custom", component: "site-footer", ns: "footer", slot: "footer" },
  ],

  // Páginas interiores (/<slug>). El header y el footer se heredan de la home
  // (no se declaran aquí). Toda sección de página DEBE declarar `ns` bajo
  // pages.<slug>.* para no reutilizar el copy de la home. Cuántas páginas y qué
  // secciones llevan también lo decide el art-director.
  pages: [
    {
      slug: "servicios",
      title: "Servicios contables y fiscales en Torreón",
      description:
        "Contabilidad mensual, impuestos, nómina e IMSS, defensa ante el SAT y devoluciones de IVA e ISR. El detalle de cada servicio del despacho en Torreón.",
      sections: [
        { id: "custom", component: "page-intro", ns: "pages.servicios.header" },
        { id: "custom", component: "services-ledger", ns: "pages.servicios.services" },
        { id: "custom", component: "cta-panel", ns: "pages.servicios.cta" },
      ],
    },
  ],

  flags: {
    contactForm: true,
    whatsappFloat: true,
    multiLang: false,
    themeToggle: true,
  },
  // Idiomas del sitio. El primero es el default (vive en "/" sin prefijo).
  // Un solo idioma = URLs limpias sin cambio. Para bilingüe: ["es", "en"] +
  // messages/en.json con las mismas keys.
  locales: ["es"],
};

export default config;
