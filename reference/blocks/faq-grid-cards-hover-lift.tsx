import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";

/**
 * BLOQUE: faq-grid-cards-hover-lift — grid de tarjetas FAQ (2x3 en desktop)
 * con etiqueta de categoría por tarjeta y un lift de hover pronunciado
 * (sombra + borde primary) para dar sensación táctil al escanear temas.
 * Cada tarjeta se expande con <details>/<summary> nativo (sin JS).
 *
 * ns esperado:
 *   { eyebrow: string, title: string, subtitle?: string,
 *     items: [{ category: string, question: string, answer: string }] }
 */
type Item = { category: string; question: string; answer: string };

export function FaqGridCardsHoverLift({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

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
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={index} className="contents">
              <Reveal delay={index * 60}>
                <details className="group h-full rounded-lg border border-border bg-card p-6 shadow-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div>
                      <span className="text-[0.65rem] font-medium tracking-[0.2em] text-primary uppercase">
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                        {item.question}
                      </h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
                    >
                      <RiAddLine className="size-4 group-open:hidden" />
                      <RiSubtractLine className="hidden size-4 group-open:block" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
