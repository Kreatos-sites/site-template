import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

type TrustItem = { label: string };

/**
 * BLOQUE: hero-split-screenshot-dual-cta-side — hero a dos columnas
 * optimizado para conversión: eyebrow, headline y subheadline con dos CTAs
 * (primario + secundario) a la izquierda, y a la derecha una captura de
 * pantalla/proyecto enmarcada con barra de navegador simulada y una tarjeta
 * de confianza flotando sobre el borde inferior. Debajo de los CTAs corre una
 * fila corta de puntos de confianza (garantías, certificaciones, cobertura).
 * Se apila en mobile (texto primero, imagen después).
 *
 * ns: { eyebrow, title, subtitle, primaryCta: {label, href}, secondaryCta:
 *       {label, href}, trustItems: [{label}], image, imageAlt,
 *       trustBadge: {value, label} }
 */
export function HeroSplitScreenshotDualCtaSide({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const trustItems = t.raw("trustItems") as TrustItem[];

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
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6">
                {trustItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <ShieldCheck
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {item.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Columna screenshot enmarcado con barra de navegador y tarjeta de confianza */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="relative">
                <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                  <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-3">
                    <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  </div>
                  <SmartImage
                    src={t("image")}
                    alt={t("imageAlt")}
                    className="aspect-[4/3]"
                  />
                </div>

                <div className="absolute -bottom-6 left-6 z-10 hidden items-center gap-3 rounded-sm border border-border bg-card p-4 shadow-sm sm:flex">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg leading-none tracking-tight text-foreground tabular-nums">
                      {t("trustBadge.value")}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {t("trustBadge.label")}
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
