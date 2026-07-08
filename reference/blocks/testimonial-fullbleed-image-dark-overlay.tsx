import { useTranslations } from "next-intl";
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Reseña a sangre completa: fotografía grande del cliente o su lugar de
 * trabajo cubriendo toda la sección, con overlay oscuro en gradiente de
 * abajo hacia arriba. Sobre ella, una sola cita editorial centrada en la
 * mitad inferior y nombre/rol/logo en una línea debajo. Sin tarjetas ni
 * bordes: apertura de revista, no bloque de UI.
 */
export function TestimonialFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative border-t border-border bg-background">
      <div className="absolute inset-0">
        <SmartImage
          src={t("image")}
          alt={t("imageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/20"
        />
      </div>

      <div className="relative flex min-h-[34rem] w-full flex-col items-center justify-end px-6 py-16 text-center sm:min-h-[40rem] sm:px-10 sm:py-20 lg:px-16">
        <Reveal>
          <QuotesIcon
            className="size-9 text-background/60"
            weight="fill"
            aria-hidden="true"
          />
        </Reveal>

        <Reveal delay={80}>
          <blockquote className="mt-6 max-w-4xl">
            <p className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15] tracking-tight text-balance text-background">
              {t("quote")}
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p className="font-display text-base text-background">
              {t("name")}
            </p>
            <span aria-hidden="true" className="h-4 w-px bg-background/40" />
            <p className="text-sm text-background/75">{t("role")}</p>
            <SmartImage
              src={t("logo")}
              alt={t("logoAlt")}
              className="ml-2 h-5 w-24 rounded-none opacity-80"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
