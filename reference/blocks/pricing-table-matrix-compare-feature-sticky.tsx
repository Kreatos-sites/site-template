import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  highlight: boolean;
};

type Feature = {
  label: string;
  values: (string | boolean)[];
};

type FeatureGroup = {
  title: string;
  features: Feature[];
};

export function PricingTableMatrixCompareFeatureSticky({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];
  const groups = t.raw("groups") as FeatureGroup[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-card">
                <tr>
                  <th scope="col" className="w-64 border-b border-border bg-card p-6 align-bottom">
                    <span className="sr-only">{t("plansLabel")}</span>
                  </th>
                  {plans.map((plan, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "border-b border-border p-6 align-bottom",
                        plan.highlight ? "bg-primary/5" : "bg-card",
                      )}
                    >
                      <div className="flex flex-col gap-2">
                        {plan.highlight ? (
                          <span className="w-fit rounded-sm bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                            {t("popularLabel")}
                          </span>
                        ) : null}
                        <span className="font-display text-lg text-foreground">{plan.name}</span>
                        <span className="flex items-baseline gap-1">
                          <span className="font-display text-2xl text-foreground">{plan.price}</span>
                          <span className="text-sm text-muted-foreground">{plan.period}</span>
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">{plan.description}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((group, gi) => (
                  <Fragment key={`group-${gi}`}>
                    <tr className="bg-secondary">
                      <th
                        scope="colgroup"
                        colSpan={plans.length + 1}
                        className="border-b border-border px-6 py-3 text-left text-xs font-medium tracking-[0.15em] text-foreground uppercase"
                      >
                        {group.title}
                      </th>
                    </tr>
                    {group.features.map((feature, fi) => (
                      <tr key={`feature-${gi}-${fi}`} className="border-b border-border last:border-b-0">
                        <th scope="row" className="p-6 text-sm font-normal text-foreground">
                          {feature.label}
                        </th>
                        {feature.values.map((value, vi) => {
                          const plan = plans[vi];
                          return (
                            <td
                              key={vi}
                              className={cn("p-6 text-sm text-foreground", plan?.highlight ? "bg-primary/5" : undefined)}
                            >
                              {typeof value === "boolean" ? (
                                value ? (
                                  <Check className="size-5 text-primary" aria-label={t("includedLabel")} strokeWidth={1.75} />
                                ) : (
                                  <Minus className="size-5 text-muted-foreground" aria-label={t("notIncludedLabel")} strokeWidth={1.75} />
                                )
                              ) : (
                                <span>{value}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))}
                <tr>
                  <td className="p-6"></td>
                  {plans.map((plan, i) => (
                    <td key={i} className={cn("p-6", plan.highlight ? "bg-primary/5" : undefined)}>
                      <a
                        href="#contacto"
                        className={cn(
                          "inline-flex w-full items-center justify-center rounded-sm px-4 py-2.5 text-sm font-medium transition-colors",
                          plan.highlight
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border border-border text-foreground hover:bg-secondary",
                        )}
                      >
                        {plan.cta}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
