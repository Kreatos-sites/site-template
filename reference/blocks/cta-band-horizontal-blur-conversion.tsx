import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiArrowRightLine, RiPhoneLine } from "@remixicon/react";

export function CtaBandHorizontalBlurConversion({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 rounded-lg border border-border bg-card px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-14">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-shrink-0">
              <a
                href={t("primaryHref")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                {t("primaryLabel")}
                <RiArrowRightLine className="size-4" />
              </a>
              <a
                href={t("secondaryHref")}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-background"
              >
                <RiPhoneLine className="size-4 text-primary" />
                {t("secondaryLabel")}
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-3">
          {(t.raw("stats") as { value: string; label: string }[]).map((stat, i) => (
            <li key={i} className="contents">
              <Reveal delay={240 + i * 60}>
                <div className="flex flex-col gap-1 border-t border-border px-2 py-6 text-center sm:border-t-0 sm:border-l sm:first:border-l-0">
                  <span className="font-display text-3xl text-foreground">{stat.value}</span>
                  <span className="text-xs tracking-wide text-muted-foreground uppercase">{stat.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
