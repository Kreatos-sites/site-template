import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: faq-accordion-split-framed-paper — FAQ en dos columnas: panel
 * izquierdo fijo con eyebrow/título/nota de contacto sobre fondo tintado,
 * columna derecha con acordeón enmarcado en tarjeta con borde (efecto
 * "hoja"), separado por líneas internas y patrón de grilla sutil de fondo.
 * Archetype: split FAQ con acordeón enmarcado, distinto de
 * accordion-faq-single-column (una sola columna centrada sin marco).
 *
 * ns esperado:
 *   { eyebrow: string, title: string, note: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function FaqAccordionSplitFramedPaper({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="relative border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
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

          <div className="rounded-lg border border-border bg-card p-2 sm:p-3">
            {items.map((item, index) => (
              <Reveal key={index} delay={index * 60}>
                <details className="group border-b border-border p-4 last:border-b-0 sm:p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground sm:text-xl">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-sm bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                    >
                      <PlusIcon className="size-4" weight="bold" />
                    </span>
                  </summary>
                  <div className="max-w-2xl pt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
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
