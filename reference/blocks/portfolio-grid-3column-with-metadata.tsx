import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiCalendarLine, RiBriefcaseLine, RiPriceTag3Line } from "@remixicon/react";

type PortfolioItem = {
  title: string;
  category: string;
  client: string;
  date: string;
  image: string;
  imageAlt: string;
};

export function PortfolioGrid3ColumnWithMetadata({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as PortfolioItem[];

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

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col bg-card">
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-[4/3] rounded-none"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-primary uppercase">
                      <RiPriceTag3Line className="size-3.5" aria-hidden />
                      <span>{item.category}</span>
                    </div>
                    <h3 className="font-display text-lg text-foreground">
                      {item.title}
                    </h3>
                    <div className="mt-auto flex flex-col gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <RiBriefcaseLine className="size-3.5 shrink-0" aria-hidden />
                        {item.client}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <RiCalendarLine className="size-3.5 shrink-0" aria-hidden />
                        {item.date}
                      </span>
                    </div>
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
