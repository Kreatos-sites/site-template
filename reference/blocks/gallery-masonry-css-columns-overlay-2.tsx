import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type MasonryTile = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  year: string;
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
 * gallery-masonry-css-columns-overlay-2 — masonry editorial con columnas CSS
 * nativas (sin grid) y proporciones variables por tile. Al pasar el cursor,
 * un overlay revela categoría, título, año y un indicador de "ver proyecto".
 * Pensado para portafolio de estudio creativo, agencia o despacho con
 * trabajo por proyecto (branding, arquitectura, campañas).
 */
export function GalleryMasonryCssColumnsOverlay2({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiles = t.raw("tiles") as MasonryTile[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
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
                  "group relative overflow-hidden rounded-sm bg-card ring-1 ring-border",
                  RATIOS[tile.ratio] ?? "aspect-[3/4]",
                )}
              >
                <SmartImage
                  src={tile.image}
                  alt={tile.imageAlt}
                  className="absolute inset-0 h-full w-full grayscale-[15%] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 ring-1 ring-border backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:ring-primary">
                  <ArrowUpRightIcon className="size-4" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {tile.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tile.year}
                    </span>
                  </div>
                  <h3 className="font-display text-lg leading-snug text-balance text-foreground">
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
