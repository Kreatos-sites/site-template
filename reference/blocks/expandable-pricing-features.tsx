import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "@remixicon/react";

type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  featured?: boolean;
  features: string[];
};

export function ExpandablePricingFeatures({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as PricingTier[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
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

        <div className="mt-14 flex flex-col gap-3">
          {tiers.map((tier, index) => (
            <Reveal key={index} delay={index * 60}>
              <details
                className={cn(
                  "group rounded-sm border border-border bg-card px-6 [&_summary::-webkit-details-marker]:hidden",
                  tier.featured && "border-primary",
                )}
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none flex-col gap-4 py-6 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground"
                    >
                      <span className="absolute h-px w-3 bg-current" />
                      <span className="absolute h-3 w-px bg-current transition-opacity duration-200 group-open:opacity-0" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                        {tier.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-1 pl-11 sm:pl-0">
                    <span className="font-display text-2xl tracking-tight text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>
                </summary>
                <ul className="flex flex-col gap-3 border-t border-border py-6 pl-11">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <RiCheckLine className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
