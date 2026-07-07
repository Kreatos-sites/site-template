import { fullAddress, type Business } from "@/lib/config";

/**
 * URL del embed de Google Maps desde la dirección del negocio. PLOMERÍA de
 * datos, no diseño: la sección custom decide CÓMO enmarca el mapa (aspecto,
 * bordes, overlay) o si lo sustituye por otra cosa; esta función solo construye
 * la fuente a partir de site.config.ts. `fullAddress` añade el país para que el
 * geocoding de Google resuelva el pin.
 */
export function mapEmbedSrc(business: Business): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(business))}&output=embed`;
}
