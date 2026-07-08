import { useTranslations } from "next-intl";
import { ArrowRight, Sparkle } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

export function CtaGradientThemeRadialCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-primary opacity-25 [background-image:radial-gradient(ellipse_55%_50%_at_50%_45%,currentColor,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-primary opacity-10 [background-image:radial-gradient(circle_at_50%_0%,currentColor,transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card/70 px-8 py-14 text-center shadow-sm backdrop-blur-md sm:px-14 sm:py-16">
            <span className="mx-auto inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkle className="size-5" strokeWidth={1.75} />
            </span>

            <p className="mt-6 text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>

            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={t("primaryCta.href")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("primaryCta.label")}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
              <a
                href={t("secondaryCta.href")}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("secondaryCta.label")}
              </a>
            </div>

            <p className="mt-8 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              {t("note")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
