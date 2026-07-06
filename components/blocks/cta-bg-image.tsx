import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";

type Cta = { label: string; href: string };

/**
 * BLOQUE: cta-bg-image — cierre de conversión sobre FONDO DE IMAGEN + overlay.
 * Hermano de `cta-band-centered` (color sólido) y `split-cta`: úsalo cuando el
 * cierre gana con una foto de operación/obra detrás en vez de una banda plana.
 *
 * ns: { eyebrow?, title, description?, cta: { label, href }, image, imageAlt }
 */
export function CtaBgImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const eyebrow = t.raw("eyebrow") as string | undefined;
  const description = t.raw("description") as string | undefined;
  const cta = t.raw("cta") as Cta;

  return (
    <section className="relative isolate flex min-h-[56svh] items-center overflow-hidden bg-card py-(--section-gap) text-primary-foreground">
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
        className="absolute inset-0 -z-10 bg-foreground/55"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          {eyebrow ? (
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground/75">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-[clamp(2rem,1.3rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-tight text-balance">
            {t("title")}
          </h2>
          {description ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 text-pretty sm:text-lg">
              {description}
            </p>
          ) : null}
          <a
            href={cta.href}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-sm font-medium tracking-wide text-primary transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
          >
            {cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
