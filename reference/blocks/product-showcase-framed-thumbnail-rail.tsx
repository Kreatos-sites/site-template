import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiCheckboxCircleFill } from "@remixicon/react";

type Thumbnail = {
  image: string;
  imageAlt: string;
  label: string;
};

export function ProductShowcaseFramedThumbnailRail({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const thumbnails = t.raw("thumbnails") as Thumbnail[];

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
          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <RiCheckboxCircleFill className="size-4 text-primary" />
                {t("badge")}
              </div>
              <p className="text-xs text-muted-foreground">{t("caption")}</p>
            </div>
            <SmartImage
              src={t("mainImage")}
              alt={t("mainImageAlt")}
              className="aspect-16/9 border-b border-border sm:aspect-21/9"
            />
            <ul className="grid grid-cols-3 gap-px bg-border sm:grid-cols-5">
              {thumbnails.map((thumb, i) => (
                <li key={i} className="bg-card">
                  <Reveal delay={100 + i * 60}>
                    <figure className="group flex flex-col gap-2 p-4">
                      <SmartImage
                        src={thumb.image}
                        alt={thumb.imageAlt}
                        className="aspect-4/3 rounded-sm ring-1 ring-border transition-all duration-300 ease-out group-hover:ring-primary"
                      />
                      <figcaption className="text-center text-xs text-muted-foreground">
                        {thumb.label}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
