import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type Tile = {
  title: string;
  category: string;
  image: string;
  imageAlt: string;
};

export function GalleryWallHoverReveal({ ns }: { ns: string }) {
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
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiles.map((tile, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group relative overflow-hidden rounded-sm border border-border">
                  <SmartImage
                    src={tile.image}
                    alt={tile.imageAlt}
                    className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 p-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <div>
                      <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                        {tile.category}
                      </p>
                      <h3 className="mt-1 font-display text-lg text-foreground">
                        {tile.title}
                      </h3>
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ArrowUpRightIcon className="size-4" weight="bold" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
