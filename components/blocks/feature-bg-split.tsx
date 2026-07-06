import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: feature-bg-split — sección a dos mitades: una columna es una IMAGEN
 * DE FONDO a sangre (bleed al borde de la pantalla) y la otra el contenido
 * (relato + puntos). Hermano de `feature-split-sticky`/`feature-zigzag` pero
 * con la imagen a sangre (no enmarcada): da un momento fotográfico fuerte sin
 * ser un hero. La imagen va a la derecha en desktop, arriba en mobile.
 *
 * ns: { eyebrow?, title, body: [string], points?: [string], image, imageAlt }
 */
export function FeatureBgSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const eyebrow = t.raw("eyebrow") as string | undefined;
  const body = t.raw("body") as string[];
  const points = (t.raw("points") as string[] | undefined) ?? [];

  return (
    <section className="relative overflow-hidden border-y border-border bg-card">
      <div className="mx-auto grid w-full max-w-none grid-cols-1 lg:grid-cols-2">
        {/* Contenido: acotado al lado izquierdo del max-w del sitio */}
        <div className="flex items-center px-6 py-(--section-gap) lg:px-12 xl:px-16">
          <Reveal className="mx-auto w-full max-w-xl lg:ml-auto lg:mr-16">
            {eyebrow ? (
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-4 font-display text-[clamp(1.9rem,1.2rem+2.6vw,3.5rem)] leading-[1.04] tracking-tight text-balance">
              {t("title")}
            </h2>
            <div className="mt-6 space-y-4">
              {body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-muted-foreground text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {points.length > 0 ? (
              <ul className="mt-8 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="leading-relaxed text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>

        {/* Imagen a sangre: alto mínimo en mobile, altura completa en desktop */}
        <div className="relative min-h-[60svh] lg:min-h-full lg:order-last">
          <SmartImage
            src={t("image")}
            alt={t("imageAlt")}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
