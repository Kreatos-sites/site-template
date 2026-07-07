import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { RiCheckLine, RiArrowRightLine } from "@remixicon/react";

type PlanFeature = {
  label: string;
};

export function ProductPlanSpotlightSingleCenteredChecklist({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as PlanFeature[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 rounded-lg border border-border bg-card p-8 lg:p-10">
            <div className="flex flex-col items-center gap-2 border-b border-border pb-8 text-center">
              <span className="rounded-full bg-primary px-3 py-1 text-[0.65rem] font-medium tracking-wide text-primary-foreground uppercase">
                {t("planLabel")}
              </span>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-5xl tracking-tight text-foreground">
                  {t("price")}
                </span>
                <span className="text-sm text-muted-foreground">{t("period")}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t("priceNote")}</p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <RiCheckLine
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-foreground">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("cta")}
              <RiArrowRightLine className="size-4" aria-hidden="true" />
            </a>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              {t("footnote")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
