import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type ScatterItem = {
  image: string;
  imageAlt: string;
  title: string;
  caption: string;
};

/** Offset vertical alterno por columna, efecto "esparcidas sobre una mesa" */
const OFFSETS = ["sm:mt-0", "sm:mt-12", "sm:mt-4", "sm:mt-16"];
/** Leve rotación alterna por tarjeta, sutil, nunca en la misma dirección seguidas */
const TILTS = ["sm:-rotate-1", "sm:rotate-1", "sm:rotate-0", "sm:-rotate-2", "sm:rotate-2"];

export function GalleryTintedStaggeredCardsWarmScatter({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as ScatterItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="relative overflow-hidden bg-secondary">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 [background-image:radial-gradient(color-mix(in_oklab,var(--color-foreground)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            {t.has("description") ? (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
                {t("description")}
              </p>
            ) : null}
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => {
              const offset = OFFSETS[i % OFFSETS.length];
              const tilt = TILTS[i % TILTS.length];
              return (
                <Reveal key={item.title} delay={i * 60}>
                  <figure
                    className={cn(
                      "group flex flex-col rounded-sm border border-border bg-card p-3 pb-5 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-0 hover:shadow-lg",
                      offset,
                      tilt,
                    )}
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/5] rounded-sm"
                    />
                    <figcaption className="mt-4 flex flex-col gap-1 px-1">
                      <span className="font-display text-base text-foreground">
                        {item.title}
                      </span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {item.caption}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
