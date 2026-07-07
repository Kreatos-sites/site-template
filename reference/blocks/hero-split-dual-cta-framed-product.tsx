import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  ArrowUpRightIcon,
  ChartLineUpIcon,
  ClipboardTextIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: hero-split-dual-cta-framed-product — hero a dos columnas: eyebrow,
 * headline y subheadline a la izquierda con dos CTAs (primario + secundario)
 * flanqueando visualmente una vista de producto/proyecto enmarcada a la
 * derecha, con dos tarjetas de métrica flotando en las esquinas superior e
 * inferior de la imagen. Se apila en mobile.
 *
 * ns: { eyebrow, title, subtitle, primaryCta: {label, href}, secondaryCta:
 *       {label, href}, image, imageAlt, topStat: {icon, value, label},
 *       bottomStat: {icon, value, label} }
 */
export function HeroSplitDualCtaFramedProduct({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Columna texto */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("primaryCta.label")}
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna vista de producto/proyecto enmarcada, flanqueada por dos tarjetas de métrica */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="relative">
                <div className="absolute -top-6 -left-6 z-10 hidden items-center gap-3 rounded-sm border border-border bg-card p-4 shadow-sm sm:flex">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <ChartLineUpIcon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg leading-none tracking-tight text-foreground tabular-nums">
                      {t("topStat.value")}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {t("topStat.label")}
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                  <SmartImage
                    src={t("image")}
                    alt={t("imageAlt")}
                    className="aspect-[4/3]"
                  />
                </div>

                <div className="absolute -right-6 -bottom-6 z-10 hidden items-center gap-3 rounded-sm border border-border bg-card p-4 shadow-sm sm:flex">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <ClipboardTextIcon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg leading-none tracking-tight text-foreground tabular-nums">
                      {t("bottomStat.value")}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {t("bottomStat.label")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
