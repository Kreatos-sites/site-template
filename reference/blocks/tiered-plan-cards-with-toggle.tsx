import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * BLOQUE: tiered-plan-cards-with-toggle — grid de tarjetas de planes con un
 * toggle de facturación (mensual/anual) compartido por todas las tarjetas y
 * un checklist de características por plan. Archetype: pricing86.
 *
 * El toggle es 100% CSS (radios nativos + selector :has()), sin JS de
 * cliente: dos <input type="radio"> ocultos controlan, vía :has() en el
 * contenedor, qué precio (data-price="monthly"|"annual") se muestra en cada
 * tarjeta y el estilo activo de cada label.
 *
 * ns esperado:
 *   { eyebrow, title, subtitle,
 *     toggle: { monthly, annual, annualBadge },
 *     plans: [{ name, description, priceMonthly, priceAnnual, period, cta,
 *               featured?: boolean, badge?: string, features: string[] }],
 *     note? }
 */
type Plan = {
  name: string;
  description: string;
  priceMonthly: string;
  priceAnnual: string;
  period: string;
  cta: string;
  featured?: boolean;
  badge?: string;
  features: string[];
};

export function TieredPlanCardsWithToggle({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];
  const note = t("note");

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
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div
            className={cn(
              "billing-toggle group/toggle relative mt-10 inline-flex items-center rounded-full border border-border bg-secondary p-1",
            )}
          >
            <input
              type="radio"
              name="billing-period"
              id="billing-monthly"
              defaultChecked
              className="sr-only"
            />
            <input
              type="radio"
              name="billing-period"
              id="billing-annual"
              className="sr-only"
            />
            <label
              htmlFor="billing-monthly"
              className="billing-label-monthly relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-colors"
            >
              {t("toggle.monthly")}
            </label>
            <label
              htmlFor="billing-annual"
              className="billing-label-annual relative z-10 flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-colors"
            >
              {t("toggle.annual")}
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {t("toggle.annualBadge")}
              </span>
            </label>
          </div>
          {/* CSS-only: los radios nativos controlan, vía :has(), qué precio
              se muestra y qué label queda resaltado. Sin JS de cliente. */}
          <style>{`
            .billing-toggle .price-monthly { display: inline; }
            .billing-toggle .price-annual { display: none; }
            .billing-toggle:has(#billing-annual:checked) .price-monthly { display: none; }
            .billing-toggle:has(#billing-annual:checked) .price-annual { display: inline; }
          `}</style>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <article
                className={cn(
                  "flex h-full flex-col gap-8 rounded-sm border p-8",
                  plan.featured
                    ? "border-primary bg-card shadow-sm lg:-my-4 lg:py-12"
                    : "border-border bg-card",
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl text-foreground">
                      {plan.name}
                    </h3>
                    {plan.badge ? (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="billing-toggle-price font-display text-4xl tracking-tight text-foreground">
                    <span className="price-monthly">{plan.priceMonthly}</span>
                    <span className="price-annual">{plan.priceAnnual}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <a
                  href="#contacto"
                  className={cn(
                    "inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  {plan.cta}
                </a>

                <ul className="flex flex-col gap-3 border-t border-border pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                      >
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">{note}</p>
      </div>

      <style>{`
        .billing-toggle:has(#billing-monthly:checked) .billing-label-monthly {
          background-color: var(--background);
          color: var(--foreground);
        }
        .billing-toggle:has(#billing-annual:checked) .billing-label-annual {
          background-color: var(--background);
          color: var(--foreground);
        }
      `}</style>
    </section>
  );
}
