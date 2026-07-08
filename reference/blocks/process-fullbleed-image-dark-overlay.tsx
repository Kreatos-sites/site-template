import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Sección de proceso a sangre completa: fotografía de obra/planta/oficina
 * cubre todo el fondo con overlay oscuro en gradiente (oscuro abajo,
 * transparente arriba). Los pasos se listan a la izquierda como números XL
 * en outline sobre el overlay, separados por una línea divisoria vertical
 * delgada entre cada uno. Tono oscuro, editorial-cinematográfico.
 */
export function ProcessFullbleedImageDarkOverlay({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as {
    number: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="relative border-t border-border py-(--section-gap)">
      <div className="absolute inset-0">
        <SmartImage
          src={t("backgroundImage")}
          alt={t("backgroundImageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/10"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/85 text-pretty">
            {t("description")}
          </p>
        </Reveal>

        <ol className="mt-16 flex flex-col divide-y divide-background/20 border-t border-background/20 sm:mt-20 sm:flex-row sm:divide-x sm:divide-y-0 sm:border-t-0">
          {steps.map((step, i) => (
            <li key={step.number} className="flex-1 py-8 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <Reveal delay={200 + i * 80}>
                <span
                  aria-hidden="true"
                  className="block font-display text-6xl leading-none font-light tracking-tight text-transparent [-webkit-text-stroke:1px_var(--color-background)] sm:text-7xl"
                >
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-xl text-background">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-background/75">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
