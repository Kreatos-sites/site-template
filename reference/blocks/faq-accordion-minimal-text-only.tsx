import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { Plus } from "lucide-react";

/**
 * BLOQUE: faq-accordion-minimal-text-only — acordeón de preguntas frecuentes
 * minimalista, solo texto, sin tarjetas ni fondo tintado. Archetype: lista
 * vertical austera con encabezado alineado a la izquierda y un signo "+"
 * como único indicador visual, ideal para secciones de dudas donde el sitio
 * ya tiene abundante jerarquía y solo requiere resolver preguntas de forma
 * directa (distinto de accordion-faq-single-column, que centra el encabezado).
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function FaqAccordionMinimalTextOnly({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-t border-border">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 60}>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <span className="font-display text-base leading-snug tracking-tight text-balance text-foreground sm:text-lg">
                    {item.question}
                  </span>
                  <Plus
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                    strokeWidth={1.75}
                  />
                </summary>
                <p className="max-w-xl pb-6 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
