import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * cta-fullbleed-image-dark-overlay-centered — cierre a sangre completa con
 * fotografía de obra/proyecto de fondo y overlay en gradiente oscuro (de
 * negro intenso abajo a transparente arriba). Contenido centrado y claro:
 * eyebrow, título grande, descripción breve y un único botón primario de
 * alto contraste. Tratamiento editorial y dramático para el cierre de un
 * sitio corporativo (constructoras, despachos, obra).
 */
export function CtaFullbleedImageDarkOverlayCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/10"
      />

      <div className="relative mx-auto flex min-h-[30rem] w-full max-w-6xl flex-col items-center justify-end px-6 py-16 text-center lg:px-8 lg:py-24">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-background/80 uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/85 text-pretty">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <a
            href={t("cta.href")}
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-sm font-medium tracking-tight text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
          >
            {t("cta.label")}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
