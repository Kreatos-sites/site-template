import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight } from "lucide-react";

/**
 * CTA de cierre en tono oscuro (bg-foreground) con motivo técnico/industrial:
 * retícula SVG a baja opacidad con cruces marcando las intersecciones, sin
 * fotografía. Eyebrow monoespaciado tipo código de referencia, título
 * centrado y un único CTA con borde. Pensado para logística, manufactura
 * o ingeniería.
 */

export function CtaPatternGridTechnicalDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-background opacity-[0.07]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="cta-technical-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 0 0 L 8 0 M 0 0 L 0 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-technical-grid)" />
      </svg>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 text-base leading-relaxed text-background/70">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex items-center justify-center">
              <a
                href={t("ctaHref")}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-background/30 px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-background/10 focus-visible:ring-2 focus-visible:ring-background focus-visible:outline-none"
              >
                {t("ctaLabel")}
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 font-mono text-xs tracking-[0.15em] text-background/50 uppercase">
              {t("refCode")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
