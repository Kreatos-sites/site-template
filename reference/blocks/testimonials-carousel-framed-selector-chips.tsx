import { useTranslations } from "next-intl";
import { RiDoubleQuotesL } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: testimonials-carousel-framed-selector-chips — carrusel cíclico de
 * testimonios enmarcado, con transición crossfade entre citas y chips
 * numerados para navegación manual. 100% CSS (radios nativos ocultos +
 * selector :has()), sin JS de cliente: cada chip es un <label> asociado a un
 * <input type="radio">; vía :has() en el contenedor se cruza la opacidad
 * entre paneles (crossfade) y se resalta el chip activo. El arquetipo de
 * origen trae auto-advance temporizado; al ser componente de servidor sin
 * listeners, aquí el avance es manual por chip (clic) — adaptación fiel
 * dentro de las reglas del template.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     testimonials: [{ quote: string, author: string, role: string, company: string }] }
 */
type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export function TestimonialsCarouselFramedSelectorChips({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const testimonials = t.raw("testimonials") as Testimonial[];
  const idPrefix = ns.replace(/[^a-zA-Z0-9]/g, "-");

  const styleRules = testimonials
    .map(
      (_, i) => `
        .tc-${idPrefix}:has(#${idPrefix}-t-${i}:checked) .tc-panel-${idPrefix}-${i} {
          opacity: 1;
          z-index: 10;
          pointer-events: auto;
        }
        .tc-${idPrefix}:has(#${idPrefix}-t-${i}:checked) .tc-chip-${idPrefix}-${i} {
          background-color: var(--primary);
          color: var(--primary-foreground);
          border-color: var(--primary);
        }
      `,
    )
    .join("");

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={`tc-${idPrefix} relative mx-auto mt-16 max-w-3xl`}>
            {testimonials.map((_, i) => (
              <input
                key={i}
                type="radio"
                id={`${idPrefix}-t-${i}`}
                name={`${idPrefix}-testimonial`}
                defaultChecked={i === 0}
                className="sr-only"
              />
            ))}

            {/* marco */}
            <div className="pointer-events-none absolute -inset-3 hidden sm:block">
              <span className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-primary/40" />
              <span className="absolute top-0 right-0 size-8 border-t-2 border-r-2 border-primary/40" />
              <span className="absolute bottom-0 left-0 size-8 border-b-2 border-l-2 border-primary/40" />
              <span className="absolute right-0 bottom-0 size-8 border-r-2 border-b-2 border-primary/40" />
            </div>

            <div className="relative min-h-72 overflow-hidden rounded-lg border border-border bg-card p-8 sm:min-h-64 sm:p-14">
              <RiDoubleQuotesL
                aria-hidden="true"
                className="size-9 text-primary/30"
              />

              {testimonials.map((item, i) => (
                <figure
                  key={i}
                  className={`tc-panel-${idPrefix}-${i} absolute inset-0 flex flex-col justify-center gap-8 p-8 opacity-0 transition-opacity duration-700 ease-in-out sm:p-14`}
                >
                  <blockquote>
                    <p className="font-display text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-auto">
                    <p className="text-sm font-semibold text-foreground">
                      {item.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.role} · {item.company}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              role="group"
              aria-label={t("selectorLabel")}
            >
              {testimonials.map((item, i) => (
                <label
                  key={i}
                  htmlFor={`${idPrefix}-t-${i}`}
                  className={`tc-chip-${idPrefix}-${i} flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-secondary text-sm font-medium text-secondary-foreground transition-colors`}
                >
                  {String(i + 1).padStart(2, "0")}
                  <span className="sr-only">{item.author}</span>
                </label>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{styleRules}</style>
    </section>
  );
}
