import type { Business } from "@/lib/config";
import { mapEmbedSrc } from "@/lib/map";

/**
 * Mapa embebido HEADLESS: un <iframe> SIN opinión visual. La sección custom
 * pasa su propio `className` (marco, aspecto, bordes, alto) y su `title` (i18n).
 * Es plomería compartida — el DISEÑO del marco lo pone cada sitio, así el mapa
 * deja de verse "siempre igual" sin que nadie reimplemente el embed.
 */
export function MapEmbed({
  business,
  title,
  className,
}: {
  business: Business;
  /** Título accesible del iframe (desde i18n). */
  title: string;
  /** Estilos del marco — enteramente a cargo de la sección custom. */
  className?: string;
}) {
  return (
    <iframe
      src={mapEmbedSrc(business)}
      title={title}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
    />
  );
}
