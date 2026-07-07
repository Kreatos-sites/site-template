import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiAwardLine,
  RiBuilding4Line,
  RiCheckLine,
  RiLandscapeLine,
} from "@remixicon/react";

type FeatureGroup = {
  label: string;
  items: string[];
};

type PropertyTier = {
  name: string;
  icon: string;
  price: string;
  period: string;
  description: string;
  statLabel: string;
  statValue: string;
  cta: string;
  featured?: boolean;
  groups: FeatureGroup[];
};

const ICONS: Record<string, typeof RiBuilding4Line> = {
  building: RiBuilding4Line,
  landscape: RiLandscapeLine,
  star: RiAwardLine,
};

export function PropertyTiersPricingCardsHighlighted({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as PropertyTier[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const Icon = ICONS[tier.icon] ?? RiBuilding4Line;
            return (
              <Reveal key={index} delay={index * 60}>
                <article
                  className={cn(
                    "flex h-full flex-col gap-8 rounded-sm border border-border bg-card p-8",
                    tier.featured && "border-primary ring-1 ring-primary lg:-translate-y-3",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "inline-flex size-10 items-center justify-center rounded-sm",
                          tier.featured
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground",
                        )}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      {tier.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-sm bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                          {t("featuredLabel")}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-5 font-display text-xl text-foreground">{tier.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl tracking-tight text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-sm bg-secondary px-4 py-3">
                    <span className="text-xs font-medium tracking-wide text-secondary-foreground uppercase">
                      {tier.statLabel}
                    </span>
                    <span className="font-display text-lg text-secondary-foreground">
                      {tier.statValue}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-6 border-t border-border pt-6">
                    {tier.groups.map((group, groupIndex) => (
                      <div key={groupIndex} className="flex flex-col gap-3">
                        <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                          {group.label}
                        </p>
                        <ul className="flex flex-col gap-3">
                          {group.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                            >
                              <RiCheckLine
                                className="mt-0.5 size-4 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contacto"
                    className={cn(
                      "inline-flex w-full items-center justify-center rounded-sm px-6 py-3 text-sm font-medium transition-colors",
                      tier.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {tier.cta}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
