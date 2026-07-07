import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export function PricingDuoTierSplitFilledPlain({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as PricingTier[];

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
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {tiers.map((tier, index) => (
            <Reveal key={index} delay={index * 60}>
              <article
                className={cn(
                  "flex h-full flex-col gap-8 rounded-lg p-8 lg:p-10",
                  tier.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground",
                )}
              >
                <div>
                  <h3
                    className={cn(
                      "font-display text-xl tracking-tight",
                      tier.featured ? "text-primary-foreground" : "text-foreground",
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      tier.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl tracking-tight">{tier.price}</span>
                  <span
                    className={cn(
                      "text-sm",
                      tier.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {tier.period}
                  </span>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.featured ? "text-primary-foreground" : "text-primary",
                        )}
                        aria-hidden="true"
                      />
                      <span className={tier.featured ? "text-primary-foreground/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={cn(
                    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium transition-colors",
                    tier.featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {tier.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
