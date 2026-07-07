import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type SupportingTile = {
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
};

export function GalleryBentoHeroSupportingTiles({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiles = t.raw("tiles") as SupportingTile[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal>
            <article className="group relative overflow-hidden rounded-lg border border-border">
              <SmartImage
                src={t("hero.image")}
                alt={t("hero.imageAlt")}
                className="aspect-[4/5] lg:aspect-[4/5]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-background/90 p-6 backdrop-blur-sm">
                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  {t("hero.tag")}
                </p>
                <h3 className="mt-2 font-display text-xl text-foreground sm:text-2xl">
                  {t("hero.title")}
                </h3>
              </div>
            </article>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-rows-2">
            {tiles.map((tile, i) => (
              <Reveal key={i} delay={(i + 1) * 60}>
                <article className="group relative overflow-hidden rounded-lg border border-border">
                  <SmartImage
                    src={tile.image}
                    alt={tile.imageAlt}
                    className="aspect-[16/10] sm:aspect-auto sm:h-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-background/90 p-5 backdrop-blur-sm">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {tile.tag}
                    </p>
                    <h3 className="mt-2 font-display text-lg text-foreground">
                      {tile.title}
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
