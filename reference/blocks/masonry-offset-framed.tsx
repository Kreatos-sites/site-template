import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type FramedTile = {
  image: string;
  imageAlt: string;
  category: string;
  title: string;
};

/**
 * masonry-offset-framed — masonry de columnas desfasadas verticalmente
 * (cada columna arranca a distinta altura) con cada pieza montada en un
 * marco de borde y aire interior, revelado direccional por columna y un
 * foco activado al hover: la pieza bajo el cursor se atenúa menos y muestra
 * categoría + título, mientras el resto de la retícula se atenúa. Pensado
 * para portafolio fotográfico, estudio creativo o casos de arquitectura.
 */
export function MasonryOffsetFramed({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiles = t.raw("tiles") as FramedTile[];

  // Alturas variables por posición dentro de cada columna, y desfase
  // vertical distinto por columna para romper la retícula.
  const heights = [
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[1/1]",
    "aspect-[5/4]",
    "aspect-[4/3]",
  ];
  const columnOffset = ["lg:translate-y-0", "lg:translate-y-12", "lg:-translate-y-6"];

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

        <div className="group/gallery mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile, index) => (
            <Reveal
              key={index}
              delay={(index % 3) * 90 + Math.floor(index / 3) * 60}
              className={cn(columnOffset[index % columnOffset.length])}
            >
              <figure
                className={cn(
                  "group/tile relative border border-border bg-card p-2 transition-opacity duration-300",
                  "opacity-100 group-has-[.tile-link:hover]/gallery:opacity-45 has-[.tile-link:hover]:opacity-100",
                )}
              >
                <a href="#" className="tile-link block overflow-hidden rounded-sm">
                  <SmartImage
                    src={tile.image}
                    alt={tile.imageAlt}
                    className={cn(
                      "w-full transition-transform duration-500 group-hover/tile:scale-105",
                      heights[index % heights.length],
                    )}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-2 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100">
                    <div>
                      <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                        {tile.category}
                      </span>
                      <p className="mt-1 font-display text-lg leading-snug text-balance text-foreground">
                        {tile.title}
                      </p>
                    </div>
                    <ArrowUpRightIcon
                      className="size-5 shrink-0 text-foreground"
                      weight="regular"
                    />
                  </div>
                </a>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
