import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiAddLine } from "@remixicon/react";

/**
 * BLOQUE: faq-grid-cards-6tile-hover-expandable — grid de 6 tarjetas FAQ
 * expandibles (2x3) con efecto hover lift, cada una en tarjeta independiente.
 * Archetype: pensado para escanear tópicos frecuentes por tema antes de
 * pricing, con tarjetas que se separan visualmente (distinto del acordeón de
 * una sola columna, que es una lista continua sin bordes de tarjeta).
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     items: [{ question: string, answer: string }] (6 elementos) }
 */
type Item = { question: string; answer: string };

export function FaqGridCards6tileHoverExpandable({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

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

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={index} className="contents">
              <Reveal delay={index * 60}>
                <details className="group h-full rounded-md border border-border bg-card p-6 transition-transform duration-300 ease-out hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <h3 className="font-display text-base leading-snug tracking-tight text-balance text-foreground sm:text-lg">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                    >
                      <RiAddLine className="size-4" />
                    </span>
                  </summary>
                  <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
