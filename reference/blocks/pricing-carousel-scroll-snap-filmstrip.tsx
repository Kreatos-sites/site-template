import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "@remixicon/react";

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  featured?: boolean;
  features: string[];
  cta: string;
};

export function PricingCarouselScrollSnapFilmstrip({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as PricingPlan[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div
          className={cn(
            "mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6",
            "[scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5",
            "px-[calc(50%-9.5rem)] sm:px-[calc(50%-11rem)]",
          )}
        >
          {plans.map((plan, index) => (
            <Reveal key={index} delay={index * 60} className="shrink-0 snap-center">
              <article
                tabIndex={0}
                className={cn(
                  "group flex h-full w-[19rem] shrink-0 flex-col gap-6 rounded-lg border border-border bg-card p-8",
                  "transition-transform duration-300 ease-out will-change-transform",
                  "hover:z-10 hover:scale-105 hover:shadow-xl focus-visible:z-10 focus-visible:scale-105 focus-visible:shadow-xl focus-visible:outline-none",
                  plan.featured && "scale-105 border-primary shadow-xl",
                )}
              >
                <div>
                  <h3 className="font-display text-xl text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="flex flex-1 flex-col gap-3 border-t border-border pt-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <RiCheckLine className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className={cn(
                    "mt-2 inline-flex w-full items-center justify-center rounded-sm border px-5 py-3 text-sm font-medium",
                    plan.featured
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-secondary-foreground",
                  )}
                >
                  {plan.cta}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
