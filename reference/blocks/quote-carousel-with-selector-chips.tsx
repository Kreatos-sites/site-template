import { useTranslations } from "next-intl";
import { Quote as QuotesIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: quote-carousel-with-selector-chips — carrusel de testimonios con
 * chips de avatar para navegación manual entre voces. La transición entre
 * citas es 100% CSS (radios nativos ocultos + selector :has()), sin JS de
 * cliente: cada chip es un <label> asociado a un <input type="radio"> que,
 * vía :has() en el contenedor, controla qué cita se muestra y qué chip
 * queda resaltado. El arquetipo de origen incluye auto-advance temporizado;
 * al ser un componente de servidor sin listeners de cliente, aquí la
 * rotación es manual (clic en el chip), que es la adaptación fiel dentro
 * de las reglas del template.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     quotes: [{ quote: string, author: string, role: string, avatar: string, avatarAlt: string }] }
 */
type QuoteItem = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  avatarAlt: string;
};

export function QuoteCarouselWithSelectorChips({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const quotes = t.raw("quotes") as QuoteItem[];
  const idPrefix = ns.replace(/[^a-zA-Z0-9]/g, "-");

  const styleRules = quotes
    .map(
      (_, i) => `
        .qc-${idPrefix}:has(#${idPrefix}-q-${i}:checked) .quote-panel-${i} {
          display: flex;
        }
        .qc-${idPrefix}:has(#${idPrefix}-q-${i}:checked) .quote-chip-${i} {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary);
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
          <div className={`qc-${idPrefix} relative mt-16`}>
            {quotes.map((_, i) => (
              <input
                key={i}
                type="radio"
                id={`${idPrefix}-q-${i}`}
                name={`${idPrefix}-quote`}
                defaultChecked={i === 0}
                className="sr-only"
              />
            ))}

            <div className="relative min-h-56 rounded-lg border border-border bg-card p-8 sm:p-12">
              <QuotesIcon
                aria-hidden="true"
                className="size-8 text-primary/30"
                strokeWidth={1.5}
              />
              {quotes.map((q, i) => (
                <blockquote
                  key={i}
                  className={`quote-panel-${i} hidden flex-col gap-8`}
                >
                  <p className="font-display text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
                    {q.quote}
                  </p>
                  <footer className="mt-auto flex items-center gap-4">
                    <SmartImage
                      src={q.avatar}
                      alt={q.avatarAlt}
                      className="size-12 shrink-0 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {q.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {q.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {quotes.map((q, i) => (
                <label
                  key={i}
                  htmlFor={`${idPrefix}-q-${i}`}
                  className={`quote-chip-${i} group cursor-pointer rounded-full border-2 border-transparent p-0.5 transition-colors`}
                >
                  <SmartImage
                    src={q.avatar}
                    alt={q.avatarAlt}
                    className="size-11 rounded-full"
                  />
                  <span className="sr-only">{q.author}</span>
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
