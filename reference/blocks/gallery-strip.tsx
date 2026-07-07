import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryImage = { src: string; alt: string; caption?: string };

/**
 * Galería como filmstrip horizontal: en mobile es una tira con scroll-x
 * (snap por foto); en desktop se despliega en una fila de anchos
 * desiguales para dar ritmo cinematográfico (evita el grid uniforme).
 * Copy vía next-intl; imágenes con su ruta en el propio copy.
 */
export function GalleryStrip({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const images = t.raw("images") as GalleryImage[];

  return (
    <section
      data-demo="galeria"
      className="overflow-hidden border-t border-border py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
                {t("title")}
              </h2>
            </div>
            <div
              aria-hidden="true"
              className="hidden items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase sm:flex"
            >
              <span className="h-px w-10 bg-border" />
              {String(images.length).padStart(2, "0")}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Filmstrip: sangra a bleed en mobile para que la tira "salga" del margen */}
      <Reveal className="mt-12">
        <ul
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:mx-auto lg:w-full lg:max-w-6xl lg:snap-none lg:overflow-visible lg:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <li
              key={image.src}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:shrink lg:grow lg:basis-0 lg:snap-align-none"
            >
              <figure className="group">
                <div className="overflow-hidden">
                  {/* Aspect UNIFORME para toda la tira: en un carrusel/strip
                      las imágenes deben tener el MISMO alto sin importar el
                      tamaño de origen (object-cover de SmartImage recorta). */}
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/5] w-full"
                    sizes="(min-width: 1024px) 30vw, 78vw"
                  />
                </div>
                {image.caption ? (
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-sm text-primary tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {image.caption}
                    </span>
                  </figcaption>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
