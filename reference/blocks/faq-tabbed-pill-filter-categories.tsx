import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiAddLine } from "@remixicon/react";

/**
 * BLOQUE: faq-tabbed-pill-filter-categories — FAQ organizado en categorías
 * seleccionables mediante pills (radio + label), que filtran el panel de
 * preguntas visible sin JavaScript de cliente (peer-checked de Tailwind).
 * Archetype: útil cuando el catálogo de dudas es grande y conviene agrupar
 * por tema (instalación, planes, personalización...) en vez de una lista
 * larga única (distinto de accordion-faq-single-column, sin categorías).
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string, filterLabel: string,
 *     categories: [{ id: string, label: string }],
 *     items: Record<string, [{ question: string, answer: string }]> }
 */
type Category = { id: string; label: string };
type Item = { question: string; answer: string };

// Nombres de peer literales (soporta hasta 6 categorías) para que Tailwind
// pueda detectar las clases en build time: NO se pueden interpolar dinámicamente.
const PEER_INPUT_CLASS = [
  "peer/cat-0 sr-only",
  "peer/cat-1 sr-only",
  "peer/cat-2 sr-only",
  "peer/cat-3 sr-only",
  "peer/cat-4 sr-only",
  "peer/cat-5 sr-only",
];
const PEER_LABEL_CLASS = [
  "cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary peer-checked/cat-0:border-primary peer-checked/cat-0:bg-primary peer-checked/cat-0:text-primary-foreground",
  "cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary peer-checked/cat-1:border-primary peer-checked/cat-1:bg-primary peer-checked/cat-1:text-primary-foreground",
  "cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary peer-checked/cat-2:border-primary peer-checked/cat-2:bg-primary peer-checked/cat-2:text-primary-foreground",
  "cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary peer-checked/cat-3:border-primary peer-checked/cat-3:bg-primary peer-checked/cat-3:text-primary-foreground",
  "cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary peer-checked/cat-4:border-primary peer-checked/cat-4:bg-primary peer-checked/cat-4:text-primary-foreground",
  "cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary peer-checked/cat-5:border-primary peer-checked/cat-5:bg-primary peer-checked/cat-5:text-primary-foreground",
];
const PEER_PANEL_CLASS = [
  "hidden w-full basis-full peer-checked/cat-0:block",
  "hidden w-full basis-full peer-checked/cat-1:block",
  "hidden w-full basis-full peer-checked/cat-2:block",
  "hidden w-full basis-full peer-checked/cat-3:block",
  "hidden w-full basis-full peer-checked/cat-4:block",
  "hidden w-full basis-full peer-checked/cat-5:block",
];

export function FaqTabbedPillFilterCategories({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = (t.raw("categories") as Category[]).slice(0, 6);
  const items = t.raw("items") as Record<string, Item[]>;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <fieldset className="mt-12 flex flex-wrap items-start gap-3 border-0 p-0">
            <legend className="sr-only">{t("filterLabel")}</legend>

            {categories.map((category, index) => (
              <input
                key={category.id}
                type="radio"
                name="faq-category-filter"
                id={`faq-category-${category.id}`}
                defaultChecked={index === 0}
                className={PEER_INPUT_CLASS[index]}
              />
            ))}

            {categories.map((category, index) => (
              <label
                key={category.id}
                htmlFor={`faq-category-${category.id}`}
                className={PEER_LABEL_CLASS[index]}
              >
                {category.label}
              </label>
            ))}

            {categories.map((category, index) => {
              const categoryItems = items[category.id] ?? [];
              return (
                <div key={category.id} className={PEER_PANEL_CLASS[index]}>
                  <div className="mt-10 divide-y divide-border border-t border-border">
                    {categoryItems.map((item, index) => (
                      <Reveal key={index} delay={index * 60}>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground sm:text-xl">
                              {item.question}
                            </h3>
                            <span
                              aria-hidden="true"
                              className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                            >
                              <RiAddLine className="size-4" />
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
              );
            })}
          </fieldset>
        </Reveal>
      </div>
    </section>
  );
}
