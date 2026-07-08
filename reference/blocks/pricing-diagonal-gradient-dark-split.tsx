import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

/**
 * BLOQUE: pricing-diagonal-gradient-dark-split — sección oscura
 * (bg-foreground) cruzada por un corte diagonal con gradiente del color
 * primario, de esquina superior derecha a inferior izquierda. El plan
 * destacado se apoya sobre el bloque de gradiente, en tamaño mayor y
 * desplazado hacia arriba; los otros dos planes quedan más pequeños,
 * alineados abajo, sobre el área plana oscura. Layout asimétrico, no en
 * grid parejo de tres columnas.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     featuredLabel: string,
 *     plans: [{ name: string, price: string, period: string,
 *                description: string, features: string[], cta: string,
 *                featured?: boolean }] }
 */
type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export function PricingDiagonalGradientDarkSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plans = t.raw("plans") as Plan[];

  const featuredPlan = plans.find((plan) => plan.featured) ?? plans[0];
  const otherPlans = plans.filter((plan) => plan !== featuredPlan);
  const description = t("description");

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/70">
            {description}
          </p>
        </Reveal>

        <div className="relative mt-16 lg:mt-20">
          {/* Corte diagonal con gradiente primary, de esquina superior derecha a inferior izquierda */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden [clip-path:polygon(38%_0,100%_0,100%_100%,4%_100%)] bg-gradient-to-bl from-primary via-primary to-primary/30 lg:block"
          />

          <div className="relative flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pt-10">
            {/* Planes no destacados: pequeños, alineados abajo sobre el área plana oscura */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:w-[50%] lg:shrink-0">
              {otherPlans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 60}>
                  <article className="flex h-full flex-col gap-6 rounded-sm border border-background/15 p-6 sm:p-7">
                    <div>
                      <h3 className="font-display text-lg text-background">{plan.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-background/65">
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl tracking-tight text-background">
                        {plan.price}
                      </span>
                      <span className="text-sm text-background/60">{plan.period}</span>
                    </div>

                    <ul className="flex flex-col gap-2.5">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-background/80"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            strokeWidth={1.75}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contacto"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-sm border border-background/25 px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-background/10"
                    >
                      {plan.cta}
                      <ArrowRight className="size-4" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Plan destacado: mayor, desplazado hacia arriba, sobre el bloque de gradiente */}
            <Reveal delay={120}>
              <article className="relative flex flex-col gap-8 rounded-sm border border-border bg-background p-8 shadow-lg sm:p-10 lg:w-[380px] lg:shrink-0 lg:-translate-y-12">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-sm bg-primary px-3 py-1 text-[0.65rem] font-medium tracking-[0.15em] text-primary-foreground uppercase">
                  {t("featuredLabel")}
                </span>

                <div>
                  <h3 className="font-display text-xl text-foreground">{featuredPlan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {featuredPlan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-tight text-foreground">
                    {featuredPlan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{featuredPlan.period}</span>
                </div>

                <ul className="flex flex-col gap-3 border-t border-border pt-6">
                  {featuredPlan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.75} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={cn(
                    "mt-auto inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
                  )}
                >
                  {featuredPlan.cta}
                  <ArrowRight className="size-4" />
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
