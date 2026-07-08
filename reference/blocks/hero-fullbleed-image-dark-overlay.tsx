import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero a sangre completa: fotografía de planta/equipo/ciudad cubriendo todo
 * el viewport con overlay oscuro en gradiente de abajo hacia arriba y
 * contenido centrado en tono claro (eyebrow, título grande, subtítulo, un
 * solo CTA). Denso y dramático, sin columnas.
 */
export function HeroFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative border-t border-border py-(--section-gap)">
      <div className="absolute inset-0">
        <SmartImage
          src={t("image")}
          alt={t("imageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30"
        />
      </div>

      <div className="relative mx-auto flex min-h-[36rem] w-full max-w-6xl flex-col items-center justify-end px-6 py-20 text-center lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,4vw+1rem,4.25rem)] leading-[1.03] tracking-tight text-balance text-background">
            {t("title")}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/85 text-pretty sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a
            href={t("ctaHref")}
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
          >
            {t("cta")}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
