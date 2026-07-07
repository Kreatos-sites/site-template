import { RiDoubleQuotesL } from "@remixicon/react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

/**
 * Muro tipo masonry de reseñas: tarjetas de altura variable (citas cortas y
 * largas) repartidas en columnas CSS, cada una con atribución de avatar
 * (inicial), rol y empresa. A diferencia de TestimonialGrid (2-3 citas en
 * grid simétrico), aquí la prueba social es un mosaico denso de 6-7 voces
 * distintas — útil cuando el negocio tiene volumen real de clientes que
 * mostrar. Las citas deben ser verificables, nunca inventadas.
 */
export function TestimonialsMasonryVariedHeight({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.author}
              delay={index * 60}
              className="mb-6 break-inside-avoid"
            >
              <figure className="flex flex-col gap-6 rounded-lg border border-border bg-card p-7">
                <RiDoubleQuotesL
                  className="size-7 text-primary/50"
                  aria-hidden="true"
                />
                <blockquote className="text-sm leading-relaxed text-secondary-foreground text-balance">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {item.author.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {item.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.role} · {item.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
