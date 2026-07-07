import { useTranslations } from "next-intl";
import { Check, ShieldCheck, Headset, RefreshCw, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  description: string;
  priceMonthly: string;
  priceAnnual: string;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

type TrustItem = {
  icon: string;
  label: string;
};

const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  support: Headset,
  refresh: RefreshCw,
};

export function HeroSubscriptionSelector({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];
  const trustItems = t.raw("trustItems") as TrustItem[];

  return (
    <section className="group relative border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <input
              type="radio"
              id="hero-subscription-billing-monthly"
              name="hero-subscription-billing"
              defaultChecked
              className="peer/monthly sr-only"
            />
            <input
              type="radio"
              id="hero-subscription-billing-annual"
              name="hero-subscription-billing"
              className="peer/annual sr-only"
            />
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
              <label
                htmlFor="hero-subscription-billing-monthly"
                className="cursor-pointer rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-colors peer-checked/monthly:bg-primary peer-checked/monthly:text-primary-foreground"
              >
                {t("toggle.monthly")}
              </label>
              <label
                htmlFor="hero-subscription-billing-annual"
                className="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-colors peer-checked/annual:bg-primary peer-checked/annual:text-primary-foreground"
              >
                {t("toggle.annual")}
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-secondary-foreground uppercase">
                  {t("toggle.annualBadge")}
                </span>
              </label>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={240 + index * 60} className="flex">
              <article
                className={cn(
                  "relative flex w-full flex-col p-8 lg:p-10",
                  plan.featured
                    ? "bg-primary text-primary-foreground lg:-my-4 lg:py-14"
                    : "bg-card",
                )}
              >
                <h2
                  className={cn(
                    "font-display text-xl tracking-tight",
                    plan.featured ? "text-primary-foreground" : "text-foreground",
                  )}
                >
                  {plan.name}
                </h2>

                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {plan.description}
                </p>

                <div className="mt-8 flex items-baseline gap-1">
                  <span
                    className={cn(
                      "font-display tracking-tight tabular-nums",
                      plan.featured ? "text-5xl" : "text-4xl",
                      "hidden group-has-[#hero-subscription-billing-annual:checked]:inline",
                    )}
                  >
                    {plan.priceAnnual}
                  </span>
                  <span
                    className={cn(
                      "font-display tracking-tight tabular-nums",
                      plan.featured ? "text-5xl" : "text-4xl",
                      "inline group-has-[#hero-subscription-billing-annual:checked]:hidden",
                    )}
                  >
                    {plan.priceMonthly}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.featured ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {plan.period}
                  </span>
                </div>

                <div
                  aria-hidden="true"
                  className={cn(
                    "mt-8 h-px w-full",
                    plan.featured ? "bg-primary-foreground/20" : "bg-border",
                  )}
                />

                <ul className="mt-8 flex flex-1 flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          plan.featured ? "text-primary-foreground" : "text-primary",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm leading-snug",
                          plan.featured
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
                    plan.featured
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "border border-border text-foreground hover:bg-secondary",
                  )}
                >
                  {plan.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={420}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustItems.map((item, index) => {
              const Icon = ICONS[item.icon] ?? ShieldCheck;
              return (
                <li key={index} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4 text-primary" strokeWidth={1.75} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
