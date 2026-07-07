import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiArrowRightUpLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiMapPin2Line,
} from "@remixicon/react";

type Item = {
  category: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  location: string;
};

export function ItemListRowMetadata({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

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

        <ul className="mt-16 divide-y divide-border border-t border-border">
          {items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 60}>
                <article className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center rounded-sm border border-border bg-secondary px-2.5 py-1 text-xs font-medium tracking-wide text-secondary-foreground uppercase">
                      {item.category}
                    </span>
                    <h3 className="mt-3 font-display text-xl tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    <dl className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <RiPriceTag3Line
                          className="size-4 text-primary"
                          aria-hidden="true"
                        />
                        <dt className="sr-only">{t("priceLabel")}</dt>
                        <dd className="tabular-nums">{item.price}</dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RiTimeLine
                          className="size-4 text-primary"
                          aria-hidden="true"
                        />
                        <dt className="sr-only">{t("durationLabel")}</dt>
                        <dd className="tabular-nums">{item.duration}</dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RiMapPin2Line
                          className="size-4 text-primary"
                          aria-hidden="true"
                        />
                        <dt className="sr-only">{t("locationLabel")}</dt>
                        <dd>{item.location}</dd>
                      </div>
                    </dl>
                  </div>

                  <span
                    className="flex size-11 shrink-0 items-center justify-center self-start rounded-full border border-border text-foreground transition-colors group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary sm:self-center"
                    aria-hidden="true"
                  >
                    <RiArrowRightUpLine className="size-5" />
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
