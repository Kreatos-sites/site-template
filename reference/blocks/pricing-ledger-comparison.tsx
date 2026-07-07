import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiCheckLine, RiArrowRightLine } from "@remixicon/react";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
};

export function PricingLedgerComparison({ ns }: { ns: string }) {
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
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 grid grid-cols-1 border-t border-l border-border md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={cn(
                  "flex h-full flex-col gap-6 border-r border-b border-border p-8",
                  plan.highlighted && "bg-primary text-primary-foreground",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "text-xs font-medium tracking-[0.2em] uppercase",
                      plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {plan.name}
                  </p>
                  {plan.highlighted && plan.badge ? (
                    <span className="rounded-none border border-primary-foreground/30 px-2 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-4xl tracking-tight tabular-nums">{plan.price}</span>
                  <span
                    className={cn(
                      "font-mono text-xs",
                      plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {plan.description}
                </p>

                <ul>
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className={cn(
                        "flex items-center gap-2 border-t py-2.5 text-sm",
                        plan.highlighted ? "border-primary-foreground/30" : "border-border",
                      )}
                    >
                      <RiCheckLine
                        className={cn(
                          "size-3.5 shrink-0",
                          plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      />
                      <span className="min-w-0">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={cn(
                    "mt-auto flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors",
                    plan.highlighted
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      : "border border-border text-foreground hover:bg-secondary",
                  )}
                >
                  {plan.cta}
                  <RiArrowRightLine className="size-4" />
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
