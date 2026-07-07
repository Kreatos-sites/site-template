import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type GalleryImage = { src: string; alt: string; caption: string };

/**
 * gallery-duo — díptico editorial: dos fotografías grandes lado a lado
 * (apiladas en mobile) con caption numerada bajo cada una y un encabezado
 * de sección arriba. La segunda pieza cae ligeramente para romper la
 * simetría del grid y dar aire vertical. Espera EXACTAMENTE 2 imágenes.
 */
export function GalleryDuo({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const images = (t.raw("images") as GalleryImage[]).slice(0, 2);

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8" data-demo="galeria">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] tracking-tight text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:gap-8 md:grid-cols-2 md:gap-12">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 60}>
              <figure
                className={cn(
                  "group",
                  // La segunda pieza desciende para quebrar la retícula.
                  index === 1 && "md:mt-24",
                )}
              >
                <div className="overflow-hidden rounded-sm bg-muted">
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/5] w-full"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display text-sm text-primary/70 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-none w-8 translate-y-[-0.35rem] bg-border" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted-foreground text-balance">
                    {image.caption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
