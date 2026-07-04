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
    preset: "obsidiana",
    fontPair: "fraunces-albert",
    defaultMode: "dark",
    density: "airy",
    imageTreatment: "duotone-accent",
    // Sobrio y editorial, coherente con obsidiana: entrada discreta al scroll.
    motion: "subtle",
  },

  // El orden de este array ES el orden de render en la página.
  sections: [
    { id: "navbar", variant: "minimal" },
    { id: "hero", variant: "editorial", image: "/images/hero.svg" },
    { id: "trust-bar" },
    { id: "services", variant: "numbered-list" },
    { id: "about", variant: "portrait", image: "/images/about.svg" },
    // Sección custom (components/custom/credentials-band.tsx, registrada
    // en components/custom/registry.ts): el gesto propio de este sitio.
    { id: "custom", component: "credentials-band", ns: "credentials-band" },
    { id: "process" },
    { id: "testimonials", count: 3 },
    { id: "faq" },
    { id: "cta-band" },
    { id: "contact", showMap: true },
    { id: "footer" },
  ],

  // Páginas interiores (/<slug>). navbar y footer se heredan de `sections`.
  // Toda sección de página DEBE declarar `ns` (namespace en es.json bajo
  // pages.<slug>.*) para no reutilizar el copy de la home.
  pages: [
    {
      slug: "servicios",
      title: "Servicios contables y fiscales en Torreón",
      description:
        "Contabilidad mensual, impuestos, nómina e IMSS, defensa ante el SAT y devoluciones de IVA e ISR. El detalle de cada servicio del despacho en Torreón.",
      sections: [
        { id: "page-header", ns: "pages.servicios.header" },
        { id: "services", variant: "bordered-table", ns: "pages.servicios.services" },
        { id: "faq", ns: "pages.servicios.faq" },
        { id: "cta-band", ns: "pages.servicios.cta-band" },
      ],
    },
  ],

  flags: {
    contactForm: true,
    whatsappFloat: true,
    multiLang: false,
    themeToggle: true,
  },
};

export default config;
