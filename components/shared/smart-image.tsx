import Image from "next/image";

import { cn } from "@/lib/utils";
import config from "@/site.config";

/**
 * next/image + tratamiento fotográfico global del sitio
 * (design.imageTreatment). El CSS del tratamiento vive en globals.css.
 *
 * Uso: el wrapper define tamaño/aspecto; la imagen hace fill + cover.
 *   <SmartImage src="/images/hero.svg" alt="..." className="aspect-[4/5]" />
 */
export function SmartImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn("smart-image", className)}
      data-treatment={config.design.imageTreatment}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
