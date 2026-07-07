import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiAddLine } from "@remixicon/react";

/**
 * BLOQUE: faq-accordion-two-column-balanced — FAQ en dos columnas balanceadas,
 * cada pregunta es un acordeón <details>/<summary> nativo separado por reglas
 * de borde. Distinto de accordion-faq-single-column (una sola columna
 * centrada): aquí las preguntas se reparten en dos columnas para listas más
 * largas, con líneas divisorias que dan estructura editorial.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function FaqAccordionTwoColumnBalanced({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            {t.has("description") && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            )}
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className={colIndex === 0 ? "lg:border-r lg:border-border lg:pr-12" : "lg:pl-12"}>
              {column.map((item, index) => {
                const globalIndex = colIndex === 0 ? index : mid + index;
                return (
                  <Reveal key={globalIndex} delay={globalIndex * 60}>
                    <details className="group border-b border-border first:border-t [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                          {item.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                        >
                          <RiAddLine className="size-4" />
                        </span>
                      </summary>
                      <div className="max-w-xl pb-7 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </div>
                    </details>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
