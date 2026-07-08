import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Producto a sangre completa: la fotografía cubre toda la sección con un
 * overlay degradado transparente arriba y negro abajo. Eyebrow, título,
 * descripción corta y CTA quedan centrados en el tercio inferior, sobre el
 * área más oscura del overlay. Sin tarjetas ni grid visible; tono de
 * campaña de lanzamiento editorial, dramático y contenido.
 */
export function ProductFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative isolate w-full overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent"
      />

      <div className="relative flex min-h-[85vh] w-full flex-col justify-end py-(--section-gap)">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-background/85 text-pretty">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <a
              href={t("cta.href")}
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium tracking-tight text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
            >
              {t("cta.label")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
