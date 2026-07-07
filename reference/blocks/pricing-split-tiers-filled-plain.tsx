import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
};

export function PricingSplitTiersFilledPlain({ ns }: { ns: string }) {
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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <article
                className={cn(
                  "flex h-full flex-col gap-8 rounded-lg border p-8 lg:p-10",
                  plan.featured
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-card-foreground",
                )}
              >
                <div>
                  <h3 className="font-display text-2xl">{plan.name}</h3>
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
                  <span className="font-display text-5xl tracking-tight">{plan.price}</span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.featured ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Check
                        className={cn("mt-0.5 size-4 shrink-0", plan.featured ? "text-primary-foreground" : "text-primary")}
                        strokeWidth={2}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition-colors",
                    plan.featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="size-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
