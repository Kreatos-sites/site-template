import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Sección "Nosotros" a sangre completa: fotografía del equipo o instalaciones
 * cubre toda la sección con un overlay oscuro degradado de abajo hacia
 * arriba. Eyebrow, título y manifiesto de 2-3 líneas quedan centrados sobre
 * la imagen en texto claro, sin tarjetas ni columnas. Tono oscuro, denso y
 * cinematográfico; úsala cuando se busca declarar identidad de marca con
 * una sola imagen fuerte en vez de narrativa en columnas.
 */
export function AboutFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const manifesto = t.raw("manifesto") as string[];

  return (
    <section className="relative isolate w-full overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full grayscale"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/85 to-foreground/40"
      />

      <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center py-(--section-gap)">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-background/80 uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4 border-t border-background/20 pt-8">
            {manifesto.map((line, i) => (
              <Reveal key={i} delay={160 + i * 60}>
                <p className="text-base leading-relaxed text-background/85 text-pretty">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
