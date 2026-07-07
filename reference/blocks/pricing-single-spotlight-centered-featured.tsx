import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { RiCheckLine, RiStarSmileFill } from "@remixicon/react";

type SpotlightPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
};

export function PricingSingleSpotlightCenteredFeatured({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const plan = t.raw("plan") as SpotlightPlan;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 flex flex-col items-center gap-8 border border-border bg-card px-8 py-12 sm:px-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-medium tracking-wide text-primary-foreground uppercase">
              <RiStarSmileFill className="size-3.5" aria-hidden="true" />
              {t("badge")}
            </span>

            <div className="text-center">
              <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {plan.name}
              </span>
              <div className="mt-3 flex items-baseline justify-center gap-1.5">
                <span className="font-display text-5xl tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>
            </div>

            <ul className="mt-2 flex w-full max-w-sm flex-col gap-3 border-t border-border pt-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <RiCheckLine
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className="mt-2 inline-flex w-full max-w-sm items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {plan.cta}
            </a>

            <p className="text-xs leading-relaxed text-muted-foreground">{t("socialProof")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
