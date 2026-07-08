import { useTranslations } from "next-intl";
import { Play } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Cta = {
  label: string;
  href: string;
};

export function HeroCenteredVideoFrameMockup({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const ctaPrimary = t.raw("ctaPrimary") as Cta;
  const ctaSecondary = t.raw("ctaSecondary") as Cta;

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
            <h1 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-tight text-primary-foreground ring-1 ring-inset ring-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {ctaPrimary.label}
              </a>
              <a
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium tracking-tight text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {ctaSecondary.label}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="flex items-center gap-4 border-b border-border bg-secondary px-4 py-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="hidden flex-1 items-center justify-center sm:flex">
                  <span className="w-full max-w-xs rounded-sm border border-border bg-background px-3 py-1 text-center text-xs text-muted-foreground">
                    {t("browserUrl")}
                  </span>
                </div>
              </div>

              <div className="relative">
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="aspect-video rounded-none"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                  <span
                    aria-hidden="true"
                    className="flex size-16 items-center justify-center rounded-full bg-background/90 text-foreground ring-1 ring-border"
                  >
                    <Play className="ml-0.5 size-6" strokeWidth={1.75} />
                  </span>
                  <span className="sr-only">{t("playLabel")}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
