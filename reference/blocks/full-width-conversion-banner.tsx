import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiArrowRightLine, RiPhoneLine } from "@remixicon/react";

export function FullWidthConversionBanner({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden border-t border-border bg-primary py-(--section-gap) text-primary-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-primary-foreground/15" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/70 text-pretty sm:text-lg">
              {t("description")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href={t("primaryHref")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-sm font-medium tracking-wide text-primary transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
            >
              {t("primaryCta")}
              <RiArrowRightLine
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={t("secondaryHref")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
            >
              <RiPhoneLine aria-hidden="true" className="size-4" />
              {t("secondaryCta")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
