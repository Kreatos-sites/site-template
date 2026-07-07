import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryItem = {
  image: string;
  imageAlt: string;
  caption: string;
};

export function GalleryGridResponsiveUniform({ ns }: { ns: string }) {
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

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group relative aspect-square overflow-hidden rounded-sm bg-card">
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-square scale-100 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-foreground/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-medium text-background">
                      {item.caption}
                    </p>
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
