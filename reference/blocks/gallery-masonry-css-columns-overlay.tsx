import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type MasonryTile = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  ratio: string;
};

const RATIOS: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  tall: "aspect-[2/3]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
};

/**
 * gallery-masonry-css-columns-overlay — masonry con columnas CSS nativas
 * (sin grid), cada tile con su propia proporción y una caption que aparece
 * sobre un overlay al pasar el cursor. Pensado para portafolio fotográfico,
 * catálogo de proyectos o galería de espacios/obra.
 */
export function GalleryMasonryCssColumnsOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiles = t.raw("tiles") as MasonryTile[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {tiles.map((tile, index) => (
            <Reveal
              key={index}
              delay={index * 60}
              className="mb-5 break-inside-avoid"
            >
              <article
                className={cn(
                  "group relative overflow-hidden rounded-sm bg-card",
                  RATIOS[tile.ratio] ?? "aspect-[3/4]",
                )}
              >
                <SmartImage
                  src={tile.image}
                  alt={tile.imageAlt}
                  className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                    {tile.category}
                  </span>
                  <h3 className="mt-1 font-display text-lg leading-snug text-balance text-foreground">
                    {tile.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
