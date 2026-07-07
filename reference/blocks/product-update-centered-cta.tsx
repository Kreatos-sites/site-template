import { useTranslations } from "next-intl";
import { RiCalendarLine, RiSparkling2Fill, RiArrowRightLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";

export function ProductUpdateCenteredCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-6 rounded-lg border border-border bg-card p-8 text-center sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
              <RiSparkling2Fill
                aria-hidden="true"
                className="size-3.5 text-primary"
              />
              {t("badge")}
            </span>

            <h2 className="mt-6 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              {t("description")}
            </p>

            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <RiCalendarLine aria-hidden="true" className="size-4 text-primary" />
              <span>
                {t("releaseLabel")} {t("releaseDate")}
              </span>
            </p>

            <a
              href={t("ctaHref")}
              aria-label={t("ctaAriaLabel")}
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              {t("cta")}
              <RiArrowRightLine
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
