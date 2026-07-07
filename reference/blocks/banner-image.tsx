import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: banner-image — banda interstitial a sangre con FONDO DE IMAGEN +
 * overlay y una sola declaración centrada. Hermano de `banner-statement` (que
 * es color sólido): úsalo para partir el sitio con un momento fotográfico de
 * marca en vez de una banda plana. Rompe el "todo tipografía sobre fondo liso".
 *
 * ns: { statement, label?, image, imageAlt }
 */
export function BannerImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const label = t.raw("label") as string | undefined;

  return (
    <section className="relative isolate flex min-h-[52svh] items-center overflow-hidden bg-card py-(--section-gap) text-primary-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--hero-overlay)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-foreground/45"
      />

      <div className="mx-auto w-full max-w-5xl px-6 text-center lg:px-8">
        <Reveal>
          {label ? (
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-primary-foreground/75">
              {label}
            </p>
          ) : null}
          <p className="mx-auto max-w-4xl font-display text-[clamp(1.9rem,1.1rem+3.4vw,3.75rem)] font-medium leading-[1.06] tracking-tight text-balance">
            {t("statement")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
