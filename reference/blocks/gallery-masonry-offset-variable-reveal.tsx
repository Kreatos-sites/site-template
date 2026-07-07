import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
};

/** Alturas de fila por tile (grid-flow-dense rellena los huecos): crea el
 * efecto masonry real de tamaños variables en vez de una sola relación de
 * aspecto pareja. */
const ROW_SPANS = [
  "row-span-2",
  "row-span-1",
  "row-span-3",
  "row-span-2",
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-3",
];

/** Columnas en las que empieza cada tile en desktop, para reforzar el
 * escalonado (offset) del muro. */
const COL_STARTS = ["", "", "lg:col-start-2", "", "lg:col-start-3", "", "", "lg:col-start-1"];

export function GalleryMasonryOffsetVariableReveal({ ns }: { ns: string }) {
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

        {/* group/gallery: al pasar el cursor sobre el muro, los tiles no
            enfocados se atenúan y el que sí tiene :hover recupera opacidad
            total y se adelanta (efecto "spotlight" de foco direccional). */}
        <div className="group/gallery mt-16 grid auto-rows-[6.5rem] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-flow-dense lg:grid-cols-4">
          {items.map((item, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            return (
              <Reveal key={i} delay={(col + row) * 90}>
                <figure
                  className={cn(
                    "group relative isolate h-full overflow-hidden rounded-sm bg-card opacity-100 transition-all duration-300 ease-out group-hover/gallery:opacity-50 hover:z-10 hover:opacity-100 hover:shadow-lg",
                    ROW_SPANS[i % ROW_SPANS.length],
                    COL_STARTS[i % COL_STARTS.length],
                  )}
                >
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col gap-1 p-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
                      {item.category}
                    </span>
                    <span className="font-display text-lg text-foreground">{item.title}</span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
