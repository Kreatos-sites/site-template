import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * Hero editorial minimalista: fondo sólido sin imagen, headline tipográfico
 * oversized centrado que domina casi todo el ancho, subtítulo corto y un
 * único CTA. Extremadamente aireado. Úsalo para aperturas de marca que
 * quieren dejar que la tipografía hable por sí sola, sin ruido visual.
 */
export function HeroCenteredMinimalOversizedType({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl py-16 text-center sm:py-24">
          <Reveal>
            <h1 className="font-display text-[clamp(2.75rem,9vw,8rem)] leading-[0.98] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-12 flex justify-center">
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
