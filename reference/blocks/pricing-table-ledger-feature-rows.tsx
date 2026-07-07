import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: pricing-table-ledger-feature-rows — tabla de precios estilo
 * "ledger" (libro contable): tres planes en columnas, filas de
 * características con hairlines finas entre cada una, y el plan
 * recomendado invertido (fondo primary sólido) para destacarlo del resto
 * de la tabla, que se mantiene en tonos neutros.
 * Archetype: tabla ledger de tres planes con filas de features y plan
 * invertido destacado (Sera series).
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     featureColumnLabel: string, highlightedLabel: string,
 *     plans: [{ name: string, price: string, period?: string, description?: string, highlighted?: boolean, cta: string, href: string }] (3 elementos),
 *     features: [{ label: string, values: (boolean | string)[] }] }
 */
type Plan = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  highlighted?: boolean;
  cta: string;
  href: string;
};

type FeatureRow = {
  label: string;
  values: (boolean | string)[];
};

function Cell({
  value,
  inverted,
}: {
  value: boolean | string;
  inverted?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className={cn(
          "size-4",
          inverted ? "text-primary-foreground" : "text-primary",
        )}
        strokeWidth={2}
        aria-hidden="true"
      />
    ) : (
      <Minus
        className={cn(
          "size-4",
          inverted
            ? "text-primary-foreground/40"
            : "text-muted-foreground/40",
        )}
        aria-hidden="true"
      />
    );
  }
  return (
    <span
      className={cn(
        "text-sm",
        inverted ? "text-primary-foreground" : "text-foreground",
      )}
    >
      {value}
    </span>
  );
}

export function PricingTableLedgerFeatureRows({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];
  const features = t.raw("features") as FeatureRow[];

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
          {t.has("description") && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          )}
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-16 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-1/4 border-b border-border bg-card p-6 align-bottom"
                  >
                    <span className="sr-only">
                      {t("featureColumnLabel")}
                    </span>
                  </th>
                  {plans.map((plan, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "border-b p-6 align-bottom",
                        plan.highlighted
                          ? "border-primary bg-primary"
                          : "border-border bg-card",
                      )}
                    >
                      <div className="flex flex-col gap-3">
                        {plan.highlighted && (
                          <span className="w-fit rounded-sm bg-primary-foreground/15 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-primary-foreground uppercase">
                            {t("highlightedLabel")}
                          </span>
                        )}
                        <span
                          className={cn(
                            "font-display text-lg",
                            plan.highlighted
                              ? "text-primary-foreground"
                              : "text-foreground",
                          )}
                        >
                          {plan.name}
                        </span>
                        <span className="flex items-baseline gap-1">
                          <span
                            className={cn(
                              "font-display text-2xl",
                              plan.highlighted
                                ? "text-primary-foreground"
                                : "text-foreground",
                            )}
                          >
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span
                              className={cn(
                                "text-xs",
                                plan.highlighted
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground",
                              )}
                            >
                              {plan.period}
                            </span>
                          )}
                        </span>
                        {plan.description && (
                          <span
                            className={cn(
                              "text-xs leading-relaxed",
                              plan.highlighted
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground",
                            )}
                          >
                            {plan.description}
                          </span>
                        )}
                        <a
                          href={plan.href}
                          className={cn(
                            "inline-flex w-fit items-center justify-center rounded-md px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            plan.highlighted
                              ? "bg-primary-foreground text-primary"
                              : "border border-border bg-transparent text-foreground",
                          )}
                        >
                          {plan.cta}
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, ri) => (
                  <tr key={ri}>
                    <th
                      scope="row"
                      className="border-b border-border bg-card p-6 text-sm font-medium text-foreground last:border-b-0"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          "border-b p-6 last:border-b-0",
                          plans[ci]?.highlighted
                            ? "border-primary/40 bg-primary"
                            : "border-border",
                        )}
                      >
                        <Cell value={value} inverted={plans[ci]?.highlighted} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
