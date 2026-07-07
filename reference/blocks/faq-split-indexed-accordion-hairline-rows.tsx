import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { Plus } from "lucide-react";

/**
 * BLOQUE: faq-split-indexed-accordion-hairline-rows — Layout split: panel
 * izquierdo fijo con eyebrow/título/nota de contacto, columna derecha con
 * filas de preguntas indexadas (01, 02, 03...) separadas por divisores
 * hairline, estilo ledger denso y compacto (sin marco de tarjeta).
 * Archetype: distinto de faq-accordion-split-framed-paper (esa usa tarjeta
 * enmarcada con fondo cuadriculado); aquí las filas son planas, numeradas,
 * de bajo perfil visual.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, note: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function FaqSplitIndexedAccordionHairlineRows({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("note")}
              </p>
            </div>
          </Reveal>

          <div className="border-t border-border">
            {items.map((item, index) => (
              <Reveal key={index} delay={index * 60}>
                <details className="group border-b border-border py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground sm:text-xl">
                        {item.question}
                      </h3>
                    </div>
                    <Plus
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                      strokeWidth={2}
                    />
                  </summary>
                  <div className="max-w-2xl pt-4 pl-9 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
