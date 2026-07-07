import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: reviews-carousel-selector-chips-blur-rotate — carrusel de reseñas
 * con chips de selección manual (nombre + empresa del cliente) y transición
 * de crossfade con desenfoque entre voces. El arquetipo de origen
 * (@nusaiba/testimonials-2) usa auto-avance por temporizador de cliente;
 * como este es un componente de servidor sin JS de cliente, la rotación es
 * manual vía radios nativos ocultos + selector :has(), y el efecto "blur
 * crossfade" se logra apilando los paneles en la misma celda (grid) con
 * opacity + filter: blur en transición, controlados por el radio checked.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     reviews: [{ quote: string, author: string, role: string, company: string, rating: number }] }
 */
type Review = {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
};

export function ReviewsCarouselSelectorChipsBlurRotate({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const reviews = t.raw("reviews") as Review[];
  const idPrefix = ns.replace(/[^a-zA-Z0-9]/g, "-");

  const styleRules = reviews
    .map(
      (_, i) => `
        .rc-${idPrefix}:has(#${idPrefix}-r-${i}:checked) .review-panel-${i} {
          opacity: 1;
          filter: blur(0);
          z-index: 10;
          pointer-events: auto;
        }
        .rc-${idPrefix}:has(#${idPrefix}-r-${i}:checked) .review-chip-${i} {
          border-color: var(--primary);
          background-color: var(--primary);
          color: var(--primary-foreground);
        }
      `,
    )
    .join("");

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className={`rc-${idPrefix} relative mt-16`}>
            {reviews.map((_, i) => (
              <input
                key={i}
                type="radio"
                id={`${idPrefix}-r-${i}`}
                name={`${idPrefix}-review`}
                defaultChecked={i === 0}
                className="sr-only"
              />
            ))}

            <div className="relative grid min-h-64 rounded-lg border border-border bg-card p-8 sm:p-12">
              {reviews.map((r, i) => (
                <blockquote
                  key={i}
                  className={`review-panel-${i} col-start-1 row-start-1 flex flex-col gap-8 opacity-0 blur-sm transition-all duration-700 ease-out`}
                >
                  <div className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={
                          s < r.rating
                            ? "size-4 fill-primary text-primary"
                            : "size-4 fill-transparent text-muted-foreground"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="font-display text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
                    {r.quote}
                  </p>
                  <footer className="mt-auto">
                    <p className="text-sm font-medium text-foreground">{r.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.role} · {r.company}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {reviews.map((r, i) => (
                <label
                  key={i}
                  htmlFor={`${idPrefix}-r-${i}`}
                  className={`review-chip-${i} cursor-pointer rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors`}
                >
                  {r.author}
                  <span className="sr-only"> — {r.company}</span>
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
