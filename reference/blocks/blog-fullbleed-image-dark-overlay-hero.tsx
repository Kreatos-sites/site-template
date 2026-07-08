import { useTranslations } from "next-intl";
import { Calendar, Clock, User } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero de artículo a sangre completa: la fotografía de portada cubre el
 * 100% del ancho y alto de la sección, con degradado oscuro de arriba hacia
 * abajo (transparente en la zona superior, negro en la inferior) para
 * garantizar contraste. Categoría en badge, título editorial de gran
 * formato y meta (autor, fecha, tiempo de lectura) flotan sobre la imagen
 * en la esquina inferior izquierda, con motivo de portada de revista: sin
 * tarjeta, sin marco, tono oscuro y tipografía dominante.
 */
export function BlogFullbleedImageDarkOverlayHero({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative isolate min-h-[92vh] w-full overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/60 to-foreground"
      />

      <div className="relative flex min-h-[92vh] w-full flex-col justify-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-14 lg:px-8 lg:pb-20">
          <Reveal>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase">
              {t("category")}
            </span>
          </Reveal>

          <Reveal delay={80} className="mt-6 max-w-3xl">
            <h1 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.02] font-semibold tracking-tight text-balance text-background">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={160} className="mt-7">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-background/80">
              <li className="flex items-center gap-2">
                <User aria-hidden="true" className="size-4 text-background/60" strokeWidth={1.75} />
                {t("author")}
              </li>
              <li className="flex items-center gap-2">
                <Calendar aria-hidden="true" className="size-4 text-background/60" strokeWidth={1.75} />
                {t("date")}
              </li>
              <li className="flex items-center gap-2">
                <Clock aria-hidden="true" className="size-4 text-background/60" strokeWidth={1.75} />
                {t("readTime")}
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
