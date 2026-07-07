import { useTranslations } from "next-intl";
import { ImagesIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type GalleryItem = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
};

type MetaEntry = {
  label: string;
  value: string;
};

export function GallerySpotlightCarouselThumbrail({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];
  const meta = t.raw("meta") as MetaEntry[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
          <Reveal delay={60}>
            <div>
              <div
                className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-lg [scroll-behavior:smooth]"
                role="group"
                aria-roledescription="carousel"
                aria-label={t("title")}
              >
                {items.map((item, i) => (
                  <div
                    key={i}
                    id={`gallery-slide-${i}`}
                    className="relative aspect-[4/3] w-full flex-none scroll-mt-6 snap-center overflow-hidden rounded-lg border border-border bg-card"
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/3]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                      <div>
                        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                          {item.category}
                        </p>
                        <h3 className="mt-2 font-display text-xl text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xs tabular-nums text-muted-foreground"
                      >
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(items.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <ul className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {items.map((item, i) => (
                  <li key={i} className="shrink-0">
                    <a
                      href={`#gallery-slide-${i}`}
                      className="group flex w-28 flex-col gap-2 rounded-sm border border-border p-2 transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <SmartImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="aspect-[4/3] rounded-sm"
                      />
                      <span className="truncate text-xs text-muted-foreground group-hover:text-foreground">
                        {item.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-8 rounded-lg border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <ImagesIcon className="size-5 text-primary" weight="regular" />
                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  {t("metaEyebrow")}
                </p>
              </div>
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {meta.map((entry, i) => (
                  <div key={i} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                    <dt className="text-xs text-muted-foreground">{entry.label}</dt>
                    <dd className="mt-1 font-display text-lg text-foreground">
                      {entry.value}
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
