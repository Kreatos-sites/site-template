import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiAddLine, RiStethoscopeLine } from "@remixicon/react";

/**
 * BLOQUE: clinic-patient-faq-accordion-dense — acordeón denso de preguntas
 * frecuentes para pacientes de clínica. Archetype: columna angosta y
 * centrada sobre fondo sólido claro, sin imágenes, filas compactas
 * agrupadas por categoría (primera visita, síntomas, cobertura de seguro)
 * con un rótulo de categoría discreto por fila; tono clínico/técnico
 * (distinto de faq-accordion-minimal-text-only, que no agrupa por
 * categoría ni usa rótulos).
 *
 * ns esperado:
 *   { eyebrow: string, title: string, intro: string,
 *     items: [{ category: string, question: string, answer: string }] }
 */
type Item = { category: string; question: string; answer: string };

export function ClinicPatientFaqAccordionDense({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-2xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-2">
            <RiStethoscopeLine
              aria-hidden="true"
              className="size-4 text-primary"
            />
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </div>
          <h2 className="mt-5 text-center font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </Reveal>

        <div className="mt-10 divide-y divide-border border-t border-b border-border">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 40}>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <span className="min-w-0">
                    <span className="block text-[0.6875rem] font-medium tracking-[0.15em] text-primary uppercase">
                      {item.category}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-balance text-foreground">
                      {item.question}
                    </span>
                  </span>
                  <RiAddLine
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="pb-3.5 pl-0 text-sm leading-relaxed text-muted-foreground">
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
