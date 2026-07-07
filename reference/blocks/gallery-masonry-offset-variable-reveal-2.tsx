import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
};

/** Alturas de fila por tile (grid-flow-dense rellena huecos): el primer tile
 * es el destacado (2 columnas) y el resto varía en altura para el efecto
 * masonry escalonado. */
const ROW_SPANS = [
  "row-span-3",
  "row-span-2",
  "row-span-1",
  "row-span-2",
  "row-span-3",
  "row-span-1",
  "row-span-2",
];

/** El primer tile ocupa 2 columnas en desktop (pieza destacada del muro);
 * el resto reparte offsets de columna para reforzar el escalonado. */
const COL_SPANS = ["lg:col-span-2", "", "lg:col-start-3", "", "", "lg:col-start-2", ""];

export function GalleryMasonryOffsetVariableReveal2({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          {t.has("description") ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
          ) : null}
        </Reveal>

        {/* group/gallery: al pasar el cursor sobre el muro, los tiles sin
            foco se atenúan y el que tiene :hover recupera opacidad total,
            se adelanta y muestra el ícono de "ampliar" (foco direccional). */}
        <div className="group/gallery mt-16 grid auto-rows-[6rem] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-flow-dense lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 70}>
              <figure
                className={cn(
                  "group relative isolate h-full overflow-hidden rounded-sm border border-border bg-card opacity-100 transition-all duration-300 ease-out group-hover/gallery:opacity-45 hover:z-10 hover:border-primary/40 hover:opacity-100 hover:shadow-lg",
                  ROW_SPANS[i % ROW_SPANS.length],
                  COL_SPANS[i % COL_SPANS.length],
                )}
              >
                <SmartImage
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute top-4 right-4 flex size-9 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRightIcon className="size-4" />
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col gap-1 p-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
                    {item.category}
                  </span>
                  <span className="font-display text-lg text-foreground">{item.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
