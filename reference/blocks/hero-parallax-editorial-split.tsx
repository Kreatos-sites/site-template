import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

export function HeroParallaxEditorialSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                {t("badge")}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h1 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("primaryCta.label")}
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center justify-center rounded-sm border border-border px-8 py-4 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {(t.raw("stats") as { value: string; label: string }[]).map(
                  (stat, i) => (
                    <div key={i}>
                      <dt className="font-display text-2xl text-foreground">
                        {stat.value}
                      </dt>
                      <dd className="mt-1 text-xs text-muted-foreground">
                        {stat.label}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={160}>
              <div className="relative">
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="aspect-[4/5] rounded-sm"
                  priority
                />
                <div className="absolute -bottom-6 -left-6 hidden max-w-[14rem] rounded-sm border border-border bg-card p-5 shadow-sm sm:block">
                  <p className="text-sm leading-relaxed text-foreground">
                    {t("floatingNote")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
