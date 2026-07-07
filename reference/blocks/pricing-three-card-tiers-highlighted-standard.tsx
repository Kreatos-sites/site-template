import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiCheckLine, RiStarFill } from "@remixicon/react";

type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export function PricingThreeCardTiersHighlightedStandard({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as PricingTier[];

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

        <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal key={index} delay={index * 60}>
              <article
                className={cn(
                  "relative flex h-full flex-col gap-8 rounded-md border border-border bg-card p-8",
                  tier.featured && "border-primary bg-secondary lg:-translate-y-3",
                )}
              >
                {tier.featured ? (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <RiStarFill className="size-3.5" aria-hidden="true" />
                    {t("featuredLabel")}
                  </span>
                ) : null}

                <div>
                  <h3 className="font-display text-xl text-foreground">{tier.name}</h3>
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

                <ul className="flex flex-1 flex-col gap-3 border-t border-border pt-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <RiCheckLine
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
