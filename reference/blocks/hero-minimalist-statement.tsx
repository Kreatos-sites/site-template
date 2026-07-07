import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

export function HeroMinimalistStatement({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.03] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex justify-center">
              <a
                href={t("cta.href")}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t("cta.label")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
