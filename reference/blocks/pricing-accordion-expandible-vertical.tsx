import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";

type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  featured?: boolean;
  cta: string;
  features: string[];
};

export function PricingAccordionExpandibleVertical({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as PricingTier[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
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

        <Reveal delay={80}>
          <div className="mt-14 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
            {tiers.map((tier, index) => (
              <details
                key={index}
                className="group [&_summary::-webkit-details-marker]:hidden"
                open={index === 0}
              >
                <summary
                  className={cn(
                    "flex cursor-pointer list-none flex-col gap-4 px-6 py-6 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6",
                    tier.featured && "bg-secondary/40",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <PlusIcon
                      aria-hidden="true"
                      weight="bold"
                      className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                          {tier.name}
                        </h3>
                        {tier.badge ? (
                          <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                            {tier.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-1 pl-8 sm:pl-0">
                    <span className="font-display text-2xl tracking-tight text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>
                </summary>
                <div className="border-t border-border px-6 py-6 pl-[3.25rem]">
                  <ul className="flex flex-col gap-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contacto"
                    className={cn(
                      "mt-6 inline-flex items-center justify-center rounded-sm border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
                      tier.featured &&
                        "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    {tier.cta}
                  </a>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
