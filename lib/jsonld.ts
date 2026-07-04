import { fullAddress, type SiteConfig } from "./config";

/**
 * Structured data LocalBusiness (o subtipo vía config.seo.jsonLdType).
 * Se inyecta una sola vez en app/layout.tsx.
 */
export function buildJsonLd(config: SiteConfig) {
  const { business, seo } = config;
  const sameAs = Object.values(business.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": seo.jsonLdType,
    "@id": `https://${seo.domain}/#business`,
    name: business.name,
    description: seo.description,
    url: `https://${seo.domain}`,
    telephone: business.phone,
    email: business.email,
    foundingDate: String(business.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street}, ${business.address.colonia}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    hasMap: business.maps.uri,
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.open,
      closes: h.close,
    })),
    ...(business.maps.reviewsCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: business.maps.rating,
            reviewCount: business.maps.reviewsCount,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Nota: fullAddress se re-exporta para quien construya embeds de mapa. */
export { fullAddress };
