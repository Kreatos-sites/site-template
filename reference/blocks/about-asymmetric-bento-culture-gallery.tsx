import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type BentoTile = {
  image: string;
  imageAlt: string;
  caption: string;
};

export function AboutAsymmetricBentoCultureGallery({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const large = t.raw("large") as BentoTile;
  const smallOne = t.raw("smallOne") as BentoTile;
  const smallTwo = t.raw("smallTwo") as BentoTile;
  const smallThree = t.raw("smallThree") as BentoTile;

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

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-3">
          <Reveal>
            <article className="group flex h-full min-h-[16rem] flex-col overflow-hidden rounded-sm border border-border lg:row-span-3">
              <SmartImage
                src={large.image}
                alt={large.imageAlt}
                className="aspect-[4/5] flex-1 lg:aspect-auto"
              />
              <p className="border-t border-border bg-card px-5 py-4 text-xs leading-relaxed text-muted-foreground">
                {large.caption}
              </p>
            </article>
          </Reveal>

          <Reveal delay={60}>
            <div className="flex h-full flex-col justify-center gap-4 rounded-sm border border-border bg-secondary p-8 lg:col-span-2">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("cell.eyebrow")}
              </p>
              <h3 className="font-display text-2xl leading-tight text-balance text-foreground">
                {t("cell.title")}
              </h3>
              <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>{t("cell.lineOne")}</p>
                <p>{t("cell.lineTwo")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <article className="group flex h-full min-h-[10rem] flex-col overflow-hidden rounded-sm border border-border">
              <SmartImage
                src={smallOne.image}
                alt={smallOne.imageAlt}
                className="aspect-[4/3] flex-1 lg:aspect-auto"
              />
              <p className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                {smallOne.caption}
              </p>
            </article>
          </Reveal>

          <Reveal delay={180}>
            <article className="group flex h-full min-h-[10rem] flex-col overflow-hidden rounded-sm border border-border">
              <SmartImage
                src={smallTwo.image}
                alt={smallTwo.imageAlt}
                className="aspect-[4/3] flex-1 lg:aspect-auto"
              />
              <p className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                {smallTwo.caption}
              </p>
            </article>
          </Reveal>

          <Reveal delay={240}>
            <article className="group flex h-full min-h-[10rem] flex-col overflow-hidden rounded-sm border border-border lg:col-span-2">
              <SmartImage
                src={smallThree.image}
                alt={smallThree.imageAlt}
                className="aspect-[16/9] flex-1 lg:aspect-auto"
              />
              <p className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                {smallThree.caption}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
