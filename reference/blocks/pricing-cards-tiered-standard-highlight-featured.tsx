import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check, Sparkle } from "lucide-react";

type Plan = {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

export function PricingCardsTieredStandardHighlightFeatured({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article
                  className={cn(
                    "flex h-full flex-col gap-8 rounded-lg border p-8",
                    plan.highlighted
                      ? "border-primary bg-primary text-primary-foreground shadow-lg"
                      : "border-border bg-card text-card-foreground",
                  )}
                >
                  <div className="flex flex-col gap-2">
                    {plan.highlighted && plan.badge ? (
                      <span
                        className={cn(
                          "inline-flex w-fit items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-medium tracking-wide uppercase",
                          "bg-primary-foreground/15 text-primary-foreground",
                        )}
                      >
                        <Sparkle className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                        {plan.badge}
                      </span>
                    ) : null}
                    <h3 className="font-display text-xl text-inherit">{plan.name}</h3>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground",
                      )}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-end gap-1.5">
                    <span className="font-display text-4xl tracking-tight text-inherit">{plan.price}</span>
                    <span
                      className={cn(
                        "pb-1 text-sm",
                        plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm leading-relaxed">
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.highlighted ? "text-primary-foreground" : "text-primary",
                          )}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span className={plan.highlighted ? "text-primary-foreground/90" : "text-foreground"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    className={cn(
                      "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium transition-colors",
                      plan.highlighted
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {plan.cta}
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
