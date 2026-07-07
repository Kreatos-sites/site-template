import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check, Sparkle } from "lucide-react";

type PricingTier = {
  name: string;
  description: string;
  priceMonthly: string;
  priceAnnual: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

// Clases literales (Tailwind escanea el texto crudo: no admite template literals con
// variables interpoladas). Soporta hasta 4 planes, el caso típico de este bloque.
const PEER_CLASS = [
  "peer/plan-0",
  "peer/plan-1",
  "peer/plan-2",
  "peer/plan-3",
];

const CHIP_ACTIVE_CLASS = [
  "peer-checked/plan-0:bg-card peer-checked/plan-0:text-foreground",
  "peer-checked/plan-1:bg-card peer-checked/plan-1:text-foreground",
  "peer-checked/plan-2:bg-card peer-checked/plan-2:text-foreground",
  "peer-checked/plan-3:bg-card peer-checked/plan-3:text-foreground",
];

const PANEL_VISIBLE_CLASS = [
  "hidden group-has-[#plan-0:checked]/pricing:block",
  "hidden group-has-[#plan-1:checked]/pricing:block",
  "hidden group-has-[#plan-2:checked]/pricing:block",
  "hidden group-has-[#plan-3:checked]/pricing:block",
];

export function PricingTierCenteredSelectorToggleBilling({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = (t.raw("tiers") as PricingTier[]).slice(0, PEER_CLASS.length);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="group/pricing mx-auto w-full max-w-3xl px-6 lg:px-8">
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

        <Reveal delay={60}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-sm border border-border bg-secondary p-1">
              {tiers.map((tier, index) => (
                <div key={index} className="contents">
                  <input
                    type="radio"
                    id={`plan-${index}`}
                    name="plan-select"
                    defaultChecked={index === 0}
                    className={cn(PEER_CLASS[index], "sr-only")}
                  />
                  <label
                    htmlFor={`plan-${index}`}
                    className={cn(
                      "cursor-pointer rounded-sm px-4 py-2 text-sm font-medium text-muted-foreground transition-colors",
                      CHIP_ACTIVE_CLASS[index],
                    )}
                  >
                    {tier.name}
                  </label>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-1 rounded-sm border border-border bg-secondary p-1">
              <input
                type="radio"
                id="billing-monthly"
                name="billing-cycle"
                defaultChecked
                className="peer/monthly sr-only"
              />
              <label
                htmlFor="billing-monthly"
                className="cursor-pointer rounded-sm px-4 py-2 text-sm font-medium text-muted-foreground transition-colors peer-checked/monthly:bg-card peer-checked/monthly:text-foreground"
              >
                {t("toggle.monthly")}
              </label>
              <input
                type="radio"
                id="billing-annual"
                name="billing-cycle"
                className="peer/annual sr-only"
              />
              <label
                htmlFor="billing-annual"
                className="cursor-pointer rounded-sm px-4 py-2 text-sm font-medium text-muted-foreground transition-colors peer-checked/annual:bg-card peer-checked/annual:text-foreground"
              >
                {t("toggle.annual")}
              </label>
            </div>
            <p className="text-xs text-muted-foreground">{t("toggle.annualNote")}</p>
          </div>
        </Reveal>

        <div className="relative mt-12">
          {tiers.map((tier, index) => (
            <div key={index} className={cn(index === 0 ? "block" : "hidden", PANEL_VISIBLE_CLASS[index])}>
              <Reveal delay={index * 60}>
                <article
                  className={cn(
                    "flex flex-col gap-8 rounded-sm border border-border bg-card p-10",
                    tier.featured && "border-primary ring-1 ring-primary",
                  )}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <h3 className="font-display text-2xl text-foreground">{tier.name}</h3>
                      {tier.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-sm bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                          <Sparkle className="size-3.5" aria-hidden="true" />
                          {t("featuredLabel")}
                        </span>
                      ) : null}
                    </div>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-5xl tracking-tight text-foreground group-has-[#billing-annual:checked]/pricing:hidden">
                      {tier.priceMonthly}
                    </span>
                    <span className="hidden font-display text-5xl tracking-tight text-foreground group-has-[#billing-annual:checked]/pricing:inline">
                      {tier.priceAnnual}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <span className="group-has-[#billing-annual:checked]/pricing:hidden">
                        {t("toggle.periodMonthly")}
                      </span>
                      <span className="hidden group-has-[#billing-annual:checked]/pricing:inline">
                        {t("toggle.periodAnnual")}
                      </span>
                    </span>
                  </div>

                  <ul className="mx-auto grid w-full max-w-md flex-1 grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    className={cn(
                      "mx-auto inline-flex w-full max-w-md items-center justify-center rounded-sm px-6 py-3 text-sm font-medium transition-colors",
                      tier.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {tier.cta}
                  </a>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
