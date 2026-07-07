import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: faq-grid-cards-expandable — grid expandible de tarjetas FAQ (2x3
 * en desktop) con efecto hover lift, ideal para escaneo visual rápido de
 * muchos temas antes de una sección de precios o de contacto. Distinto de
 * accordion-faq-single-column (lista vertical de una sola columna): aquí
 * cada tarjeta vive en el grid y se levanta ligeramente al pasar el mouse.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, subtitle?: string,
 *     items: [{ question: string, answer: string }] }
 */
type Item = { question: string; answer: string };

export function FaqGridCardsExpandable({ ns }: { ns: string }) {
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

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={index} className="contents">
              <Reveal delay={index * 60}>
                <details className="group h-full rounded-lg border border-border bg-card p-6 transition-transform duration-300 ease-out hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                    >
                      <PlusIcon className="size-4" weight="bold" />
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
