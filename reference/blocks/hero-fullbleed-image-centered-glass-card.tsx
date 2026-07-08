import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero a sangre completa: fotografía cubriendo todo el viewport con un
 * overlay oscuro leve y uniforme, y al centro una tarjeta glassmorphism
 * (fondo translúcido con blur y borde sutil) flotando sobre la imagen con
 * eyebrow, título, subtítulo y CTA. Tono premium y de alto contraste.
 */
export function HeroFullbleedImageCenteredGlassCard({ ns }: { ns: string }) {
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
          className="absolute inset-0 bg-foreground/65"
        />
      </div>

      <div className="relative mx-auto flex min-h-[38rem] w-full max-w-6xl items-center justify-center px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="mx-auto w-full max-w-2xl rounded-lg border border-background/20 bg-background/10 px-8 py-12 text-center backdrop-blur-xl sm:px-12 sm:py-14">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.2rem,3.6vw+1rem,3.75rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-background/85 text-pretty">
              {t("subtitle")}
            </p>

            <a
              href={t("ctaHref")}
              className="group mt-9 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
            >
              {t("cta")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
