import { useTranslations } from "next-intl";
import { CalendarCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero a sangre completa de un desarrollo inmobiliario insignia: fotografía
 * cubriendo todo el viewport con overlay oscuro en gradiente de abajo hacia
 * arriba, título editorial alineado a la izquierda y una tarjeta flotante
 * translúcida con precio-desde y CTA de agendar visita anclada en la
 * esquina inferior derecha. Tono oscuro, motivo de lujo.
 */
export function PropertyHeroFullbleedImageDarkOverlayFloatingPrice({
  ns,
}: {
  ns: string;
}) {
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
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/65 to-foreground/20"
        />
      </div>

      <div className="relative mx-auto flex min-h-[38rem] w-full max-w-6xl flex-col justify-end px-6 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4vw+1rem,4.25rem)] leading-[1.03] tracking-tight text-balance text-background">
            {t("title")}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-background/85 text-pretty sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-12 flex flex-col gap-6 rounded-sm border border-background/15 bg-background/10 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between lg:absolute lg:right-6 lg:bottom-0 lg:mt-0 lg:max-w-sm lg:translate-y-0 lg:flex-col lg:items-start lg:gap-4 lg:p-7 xl:right-8">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-background/70 uppercase">
                {t("priceLabel")}
              </p>
              <p className="mt-2 font-display text-3xl tracking-tight text-background">
                {t("priceValue")}
              </p>
            </div>
            <a
              href={t("ctaHref")}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
            >
              <CalendarCheck aria-hidden="true" className="size-4" />
              {t("cta")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
