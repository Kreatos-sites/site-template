import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";

/**
 * Bloque full-bleed: una sola imagen a sangre completa (alto cinematográfico)
 * con overlay --hero-overlay y una declaración anclada en la esquina inferior.
 * La imagen rompe el max-w del sitio; el texto vive en un contenedor acotado.
 */
export function ImageFullbleedCaption({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const label = t.raw("label") as string | undefined;

  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-card py-(--section-gap) text-primary-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
      />

      {/* Overlay: legibilidad del texto sobre la fotografía */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--hero-overlay)]"
      />
      {/* Refuerzo de contraste hacia la esquina inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-background/70 via-background/20 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <figure className="flex flex-col gap-6">
            {label ? (
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-primary-foreground/70"
                />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground/70">
                  {label}
                </span>
              </figcaption>
            ) : null}

            <blockquote className="font-display text-balance text-[clamp(1.75rem,1rem+3vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
              {t("statement")}
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
