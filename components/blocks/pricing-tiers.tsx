import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export function PricingTiers({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as Tier[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw+1rem,3.25rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 60} className="flex">
              <article
                className={cn(
                  "relative flex w-full flex-col p-8 lg:p-10",
                  tier.featured
                    ? "bg-primary text-primary-foreground lg:-my-4 lg:py-14"
                    : "bg-card",
                )}
              >
                {tier.featured && (
                  <span className="mb-6 inline-flex w-fit items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-[0.7rem] font-medium tracking-[0.18em] uppercase">
                    {tier.name}
                  </span>
                )}

                {!tier.featured && (
                  <h3 className="font-display text-xl tracking-tight">
                    {tier.name}
                  </h3>
                )}

                <div className={cn("flex items-baseline gap-1", tier.featured ? "mt-0" : "mt-6")}>
                  <span
                    className={cn(
                      "font-display tracking-tight tabular-nums",
                      tier.featured ? "text-6xl" : "text-5xl",
                    )}
                  >
                    {tier.price}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-5 text-sm leading-relaxed",
                    tier.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {tier.description}
                </p>

                <div
                  aria-hidden="true"
                  className={cn(
                    "mt-8 h-px w-full",
                    tier.featured ? "bg-primary-foreground/20" : "bg-border",
                  )}
                />

                <ul className="mt-8 flex flex-1 flex-col gap-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.featured ? "text-primary-foreground" : "text-primary",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm leading-snug",
                          tier.featured
                            ? "text-primary-foreground/90"
                            : "text-secondary-foreground",
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={cn(
                    "mt-10 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium tracking-tight transition-colors",
                    tier.featured
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "border border-border text-foreground hover:bg-secondary",
                  )}
                >
                  {t("cta")}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
