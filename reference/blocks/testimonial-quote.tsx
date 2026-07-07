import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

/**
 * testimonial-quote — pull-quote protagónica.
 * Una sola cita real, grande, en font-display, con autor y rol debajo.
 * Marca decorativa: un glifo de comilla sobredimensionado tras el texto y
 * una regla fina que ancla la firma. Mucho aire; nada de grid de tarjetas.
 */
export function TestimonialQuote({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="bg-secondary text-secondary-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <figure className="relative mx-auto max-w-4xl text-center">
          <Quote
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 left-1/2 size-28 -translate-x-1/2 text-primary/40 lg:-top-12 lg:size-40"
            strokeWidth={1}
          />

          <Reveal>
            <blockquote className="relative">
              <h2 className="sr-only">{t("author")}</h2>
              <p className="font-display text-balance text-[clamp(1.75rem,4.5vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-secondary-foreground">
                {t("quote")}
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={120}>
            <figcaption className="mt-12 flex flex-col items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-12 bg-primary/70"
              />
              <span className="text-base font-medium tracking-tight text-secondary-foreground">
                {t("author")}
              </span>
              <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("role")}
              </span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
