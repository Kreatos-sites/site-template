import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type ThumbnailItem = {
  image: string;
  imageAlt: string;
  label: string;
};

export function LogoGalleryFeaturedThumbnailRail({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as ThumbnailItem[];

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

        <Reveal delay={80}>
          <div className="mt-16 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 border-b border-border px-5 py-3">
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="ml-3 rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium tracking-wide text-secondary-foreground">
                {t("featured.badge")}
              </span>
            </div>
            <SmartImage
              src={t("featured.image")}
              alt={t("featured.imageAlt")}
              className="aspect-[16/9]"
            />
            <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              {t("featured.caption")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group w-40 flex-none snap-start">
                  <div className="overflow-hidden rounded-md border border-border bg-card">
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/3] opacity-80 grayscale transition-all duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-2 text-center text-xs font-medium tracking-wide text-muted-foreground">
                    {item.label}
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
