import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type InlineTier = {
  name: string;
  price: string;
  period: string;
  note: string;
  featured?: boolean;
};

export function PricingInlineSingleRowBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tiers = t.raw("tiers") as InlineTier[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </div>
            <a
              href="#contacto"
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
            >
              {t("cta")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col divide-y divide-border border-t border-b border-border lg:flex-row lg:divide-x lg:divide-y-0">
          {tiers.map((tier, index) => (
            <Reveal key={index} delay={index * 60} className="flex-1">
              <div
                className={cn(
                  "flex h-full flex-col gap-4 px-6 py-8 lg:px-8",
                  tier.featured && "bg-card",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    {tier.name}
                  </span>
                  {tier.featured ? (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-primary-foreground uppercase">
                      {t("featuredLabel")}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{tier.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
