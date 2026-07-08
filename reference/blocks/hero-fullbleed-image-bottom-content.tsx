import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero a sangre completa estilo portada de revista: imagen de fondo oscurecida
 * con overlay, contenido anclado al borde inferior del viewport en vez de
 * centrado. Eyebrow pequeño arriba del título, título grande y denso pegado
 * abajo, CTA alineado a la derecha del título en pantallas amplias. Úsalo
 * como hero de apertura cuando se busca un tratamiento editorial y con
 * carácter en lugar de un hero centrado convencional.
 */
export function HeroFullbleedImageBottomContent({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative isolate min-h-[90vh] w-full overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/20"
      />

      <div className="relative flex min-h-[90vh] w-full flex-col justify-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-12 lg:px-8 lg:pb-16">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-background/80 uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <div className="mt-5 flex flex-col items-start gap-8 border-t border-background/20 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <Reveal delay={80} className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.98] font-semibold tracking-tight text-balance text-background">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal
              delay={160}
              className="flex shrink-0 flex-col items-start gap-4 lg:items-end"
            >
              <p className="max-w-xs text-sm leading-relaxed text-background/75 text-pretty lg:text-right">
                {t("description")}
              </p>
              <a
                href={t("ctaHref")}
                className="group inline-flex items-center gap-2 rounded-sm bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
              >
                {t("cta")}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
