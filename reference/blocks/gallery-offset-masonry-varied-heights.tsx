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

const ASPECTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-square"];
const OFFSETS = ["", "lg:mt-12", "lg:mt-6"];

export function GalleryOffsetMasonryVariedHeights({ ns }: { ns: string }) {
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

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const column = i % 3;
            return (
              <Reveal key={i} delay={i * 60}>
                <figure
                  className={cn(
                    "group relative isolate overflow-hidden rounded-sm bg-card",
                    OFFSETS[column],
                  )}
                >
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    className={cn(
                      ASPECTS[i % ASPECTS.length],
                      "transition-transform duration-500 ease-out group-hover:scale-[1.04]",
                    )}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col gap-1 p-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
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
