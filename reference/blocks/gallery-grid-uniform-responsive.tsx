import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiImageLine } from "@remixicon/react";

type GalleryItem = {
  image: string;
  imageAlt: string;
  caption: string;
  tag: string;
};

export function GalleryGridUniformResponsive({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

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

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col gap-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-card">
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/5]"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-sm bg-background/90 px-2 py-1 text-[10px] font-medium tracking-[0.15em] text-foreground uppercase">
                      <RiImageLine className="size-3.5 text-primary" />
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.caption}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
