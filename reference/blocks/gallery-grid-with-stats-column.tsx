import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryImage = {
  image: string;
  imageAlt: string;
  caption: string;
};

type Stat = {
  value: string;
  label: string;
};

export function GalleryGridWithStatsColumn({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const images = t.raw("images") as GalleryImage[];
  const stats = t.raw("stats") as Stat[];

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

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_18rem]">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((img, i) => (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <figure className="group relative overflow-hidden rounded-sm border border-border bg-card">
                    <SmartImage
                      src={img.image}
                      alt={img.imageAlt}
                      className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-background/90 px-3 py-2 text-xs font-medium text-foreground">
                      {img.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={images.length * 60}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-sm border border-border bg-card p-6">
              <h3 className="font-display text-lg text-foreground">
                {t("statsTitle")}
              </h3>
              <dl className="flex flex-col divide-y divide-border">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-2xl tabular-nums text-primary">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
