import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { RiArrowRightUpLine } from "@remixicon/react";

type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
};

/**
 * Galería masónica (CSS columns, alturas variadas) con overlay de caption
 * que aparece en hover: scrim degradado + título/categoría + icono.
 * Copy vía next-intl: ns → { eyebrow, title, items: [{ image, imageAlt, title, category }] }.
 * Server component: la revelación es solo CSS (group-hover), sin JS de cliente.
 */
export function GalleryMasonryHoverOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

  // Ritmo de alturas: rompe la retícula para que no lea como grid uniforme.
  const aspects = [
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[1/1]",
    "aspect-[4/3]",
    "aspect-[5/4]",
  ];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {items.map((item, index) => (
            <Reveal key={item.image + index} delay={index * 60}>
              <figure className="group relative overflow-hidden rounded-sm">
                <SmartImage
                  src={item.image}
                  alt={item.imageAlt}
                  className={cn(
                    "w-full transition-transform duration-500 ease-out group-hover:scale-105",
                    aspects[index % aspects.length],
                  )}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {item.category}
                    </p>
                    <p className="mt-1 font-display text-lg text-foreground">
                      {item.title}
                    </p>
                  </div>
                  <RiArrowRightUpLine
                    className="size-5 shrink-0 text-foreground"
                    aria-hidden="true"
                  />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
