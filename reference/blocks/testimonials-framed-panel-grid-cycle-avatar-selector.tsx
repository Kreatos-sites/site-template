import { useTranslations } from "next-intl";
import { RiDoubleQuotesL } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: testimonials-framed-panel-grid-cycle-avatar-selector — panel
 * enmarcado con fondo de retícula (grid pattern), cita central que rota
 * entre testimonios y chips de avatar interactivos para elegir cuál se
 * muestra. 100% CSS (radios nativos ocultos + selector :has()), sin JS de
 * cliente: cada avatar es un <label> asociado a un <input type="radio">; vía
 * :has() en el contenedor se cruza la opacidad entre citas y se resalta el
 * avatar activo con un anillo. El arquetipo de origen usa motion/framer para
 * el crossfade; aquí se logra el mismo efecto con transición CSS de opacidad
 * sobre paneles apilados.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, selectorLabel: string,
 *     testimonials: [{ quote: string, author: string, role: string, company: string, avatar: string, avatarAlt: string }] }
 */
type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  avatarAlt: string;
};

export function TestimonialsFramedPanelGridCycleAvatarSelector({
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
        .tf-${idPrefix}:has(#${idPrefix}-f-${i}:checked) .tf-panel-${idPrefix}-${i} {
          opacity: 1;
          z-index: 10;
          pointer-events: auto;
        }
        .tf-${idPrefix}:has(#${idPrefix}-f-${i}:checked) .tf-chip-${idPrefix}-${i} {
          box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--primary);
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
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className={`tf-${idPrefix} relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-lg border border-border bg-card`}
          >
            {testimonials.map((_, i) => (
              <input
                key={i}
                type="radio"
                id={`${idPrefix}-f-${i}`}
                name={`${idPrefix}-testimonial`}
                defaultChecked={i === 0}
                className="sr-only"
              />
            ))}

            {/* fondo de retícula */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                backgroundSize: "2.5rem 2.5rem",
                maskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 85%)",
              }}
            />

            <div className="relative min-h-80 p-8 sm:min-h-64 sm:p-14">
              <RiDoubleQuotesL
                aria-hidden="true"
                className="size-9 text-primary/30"
              />

              {testimonials.map((item, i) => (
                <figure
                  key={i}
                  className={`tf-panel-${idPrefix}-${i} absolute inset-0 flex flex-col justify-center gap-8 p-8 opacity-0 transition-opacity duration-700 ease-in-out sm:p-14`}
                >
                  <blockquote>
                    <p className="font-display text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <SmartImage
                      src={item.avatar}
                      alt={item.avatarAlt}
                      className="size-10 shrink-0 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div
              className="relative flex flex-wrap items-center gap-4 border-t border-border bg-secondary/40 px-8 py-6 sm:px-14"
              role="group"
              aria-label={t("selectorLabel")}
            >
              {testimonials.map((item, i) => (
                <label
                  key={i}
                  htmlFor={`${idPrefix}-f-${i}`}
                  className={`tf-chip-${idPrefix}-${i} cursor-pointer rounded-full transition-shadow`}
                >
                  <SmartImage
                    src={item.avatar}
                    alt={item.avatarAlt}
                    className="size-11 rounded-full"
                  />
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
