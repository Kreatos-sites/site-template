import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";

type Metric = { value: string; label: string };

export function HeroLeftAlignedDualCtaMetricsInline({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={t("primaryCta.href")}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("primaryCta.label")}
              </a>
              <a
                href={t("secondaryCta.href")}
                className="group inline-flex items-center gap-2 rounded-sm border border-border px-8 py-4 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("secondaryCta.label")}
                <ArrowRightIcon
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  weight="bold"
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <dl className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-6 border-t border-border pt-8">
            {metrics.map((m, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <dd className="font-display text-3xl tracking-tight text-foreground">
                  {m.value}
                </dd>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
