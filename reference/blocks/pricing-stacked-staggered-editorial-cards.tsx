import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiArrowRightLine, RiCheckLine } from "@remixicon/react";

/**
 * BLOQUE: pricing-stacked-staggered-editorial-cards — columna única de
 * tarjetas de precio escalonadas en alternancia izquierda/derecha (no en
 * grid), con mucho whitespace vertical entre cada una y numeración
 * editorial grande (01, 02, 03) junto al nombre del plan. Pensado para
 * 2-3 planes con descripciones largas, tono cálido y de lectura pausada.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     plans: [{ index: string, name: string, price: string, period: string,
 *                description: string, features: string[], cta: string,
 *                featured?: boolean }] }
 */
type Plan = {
  index: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export function PricingStackedStaggeredEditorialCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const hasDescription = t.has("description");
  const plans = t.raw("plans") as Plan[];

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
          {hasDescription ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-20 flex flex-col gap-16 sm:gap-24">
          {plans.map((plan, i) => {
            const alignRight = i % 2 === 1;
            return (
              <Reveal key={i} delay={i * 80}>
                <article
                  className={cn(
                    "flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10",
                    alignRight ? "sm:ml-[12%] sm:flex-row-reverse lg:ml-[20%]" : "sm:mr-[12%] lg:mr-[20%]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-tight text-muted-foreground/30"
                  >
                    {plan.index}
                  </span>

                  <div
                    className={cn(
                      "flex-1 rounded-lg p-8 sm:p-10",
                      plan.featured
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-card-foreground",
                    )}
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-display text-2xl text-inherit">{plan.name}</h3>
                        <p
                          className={cn(
                            "mt-3 max-w-md text-sm leading-relaxed",
                            plan.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                          )}
                        >
                          {plan.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-baseline gap-2 sm:flex-col sm:items-end sm:gap-0">
                        <span className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-tight text-inherit">
                          {plan.price}
                        </span>
                        <span
                          className={cn(
                            "text-sm",
                            plan.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                          )}
                        >
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                        >
                          <RiCheckLine
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              plan.featured ? "text-primary-foreground" : "text-primary",
                            )}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contacto"
                      className={cn(
                        "mt-8 inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition-colors",
                        plan.featured
                          ? "bg-background text-foreground hover:bg-background/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                      )}
                    >
                      {plan.cta}
                      <RiArrowRightLine className="size-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
