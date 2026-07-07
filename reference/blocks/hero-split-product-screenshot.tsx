import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiArrowRightUpLine, RiShieldCheckLine } from "@remixicon/react";

/**
 * BLOQUE: hero-split-product-screenshot — hero a dos columnas: headline,
 * subheadline y dos CTAs a la izquierda; captura de pantalla de producto o
 * dashboard enmarcada a la derecha, con una tarjeta flotante de estatus
 * (icono + valor) sobrepuesta en la esquina. Se apila en mobile.
 *
 * ns: { eyebrow, title, subtitle, primaryCta: {label, href}, secondaryCta:
 *       {label, href}, trustNote, image, imageAlt, floatingCard: {label, value} }
 */
export function HeroSplitProductScreenshot({ ns }: { ns: string }) {
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
                  <RiArrowRightUpLine className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-12 flex items-center gap-3 border-t border-border pt-8">
                <RiShieldCheckLine
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("trustNote")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Columna captura de producto */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="relative">
                <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                  <SmartImage
                    src={t("image")}
                    alt={t("imageAlt")}
                    className="aspect-[4/3]"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-sm border border-border bg-card p-4 shadow-sm sm:flex">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <RiShieldCheckLine className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg leading-none tracking-tight text-foreground tabular-nums">
                      {t("floatingCard.value")}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {t("floatingCard.label")}
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
