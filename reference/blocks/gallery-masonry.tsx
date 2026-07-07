import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type GalleryImage = { src: string; alt: string; caption?: string };

/**
 * Galería masonry (columns CSS) con alturas variadas y caption opcional.
 * Copy vía next-intl: ns → { eyebrow, title, images: [{ src, alt, caption? }] }.
 * Server component: sin hooks de estado, sin eventos; motion vía <Reveal>.
 */
export function GalleryMasonry({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const images = t.raw("images") as GalleryImage[];

  // Ritmo de alturas: rompe la retícula para que no lea como grid uniforme.
  const aspects = [
    "aspect-[3/4]",
    "aspect-[4/3]",
    "aspect-[4/5]",
    "aspect-[1/1]",
    "aspect-[5/4]",
  ];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] tracking-tight text-balance">
                {t("title")}
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="hidden font-display text-sm text-muted-foreground tabular-nums md:block"
            >
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 60}>
              <figure className="group">
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  className={cn("w-full", aspects[index % aspects.length])}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {image.caption ? (
                  <figcaption className="mt-3 flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-xs text-primary/60 tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {image.caption}
                    </span>
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
