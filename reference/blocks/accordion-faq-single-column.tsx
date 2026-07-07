import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: accordion-faq-single-column — acordeón de preguntas frecuentes en
 * una sola columna centrada, sin panel de encabezado sticky ni fondo tintado.
 * Archetype: lista vertical simple de <details>/<summary>, ideal cuando el
 * sitio ya tiene mucho aire visual y solo necesita resolver dudas de forma
 * directa y escaneable (distinto de faq-editorial, que lleva sidebar sticky).
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function AccordionFaqSingleColumn({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 60}>
              <details className="group border-b border-border first:border-t [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground sm:text-xl">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                  >
                    <PlusIcon className="size-4" weight="bold" />
                  </span>
                </summary>
                <div className="max-w-2xl pb-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
