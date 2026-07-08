import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Apertura de menú a sangre completa: fotografía de platillo o mesa servida
 * cubre todo el ancho/alto con overlay oscuro en gradiente de abajo hacia
 * arriba; eyebrow, título y descripción centrados en la mitad inferior,
 * con un indicador de scroll sutil. Tono oscuro, aireado, cinematográfico.
 */
export function MenuFullbleedImageDarkOverlay({ ns }: { ns: string }) {
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
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/65 to-foreground/10"
        />
      </div>

      <div className="relative mx-auto flex min-h-[38rem] w-full max-w-6xl flex-col items-center justify-end px-6 py-20 text-center lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-background/85 text-pretty">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-14 flex flex-col items-center gap-2 text-background/70">
            <span className="text-[0.65rem] font-medium tracking-[0.3em] uppercase">
              {t("scrollHint")}
            </span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 animate-bounce"
              strokeWidth={1.75}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
