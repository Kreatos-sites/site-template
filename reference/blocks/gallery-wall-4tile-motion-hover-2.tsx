import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Tile = {
  category: string;
  title: string;
  caption: string;
  cta: string;
  image: string;
  imageAlt: string;
};

export function GalleryWall4tileMotionHover2({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiles = t.raw("tiles") as Tile[];

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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {tiles.map((tile, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 80}>
                <figure className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-transform duration-300 ease-out will-change-transform hover:-translate-y-2 hover:shadow-lg">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={tile.image}
                      alt={tile.imageAlt}
                      className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-sm bg-background/90 px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary uppercase">
                      {tile.category}
                    </span>
                  </div>
                  <figcaption className="flex flex-1 flex-col gap-3 p-6">
                    <span className="font-display text-lg text-foreground">
                      {tile.title}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {tile.caption}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-300 ease-out group-hover:translate-x-1">
                      {tile.cta}
                      <ArrowUpRightIcon className="size-4" />
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
