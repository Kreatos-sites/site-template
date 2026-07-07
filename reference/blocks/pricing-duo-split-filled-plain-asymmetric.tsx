import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "@remixicon/react";

/**
 * BLOQUE: pricing-duo-split-filled-plain-asymmetric — dos planes lado a
 * lado en contraste directo: el plan izquierdo (recomendado) va relleno
 * con bg-primary, el derecho va plano sobre bg-card. Sin grid de tres
 * columnas ni encabezado extenso: solo eyebrow + título breve y el par
 * de tarjetas asimétricas.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     plans: [{ name: string, price: string, period: string,
 *                description: string, features: string[],
 *                ctaLabel: string, featured: boolean }] }
 */
type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  featured: boolean;
};

export function PricingDuoSplitFilledPlainAsymmetric({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];

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
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={index * 60}>
              <article
                className={cn(
                  "flex h-full flex-col gap-8 rounded-lg p-8 sm:p-10",
                  plan.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-card-foreground",
                )}
              >
                <div>
                  <h3 className="font-display text-xl text-inherit">{plan.name}</h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      plan.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-tight text-inherit">
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

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-sm leading-relaxed">
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
                    "mt-auto inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium transition-colors",
                    plan.featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  {plan.ctaLabel}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
