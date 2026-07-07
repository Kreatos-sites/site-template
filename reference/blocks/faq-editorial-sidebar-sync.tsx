import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: faq-editorial-sidebar-sync — FAQ editorial con panel lateral
 * sticky que actúa como índice de temas, enlazado por ancla nativa (href="#id")
 * a cada grupo del acordeón principal. Archetype: navegación de página larga
 * sin JS de cliente (el navegador hace scroll-to-anchor + scroll-margin-top
 * resuelve el offset del header); cada tema muestra un contador de preguntas
 * para orientar antes de saltar. Distinto de accordion-faq-single-column
 * (sin sidebar) y faq-accordion-minimal-text-only (lista plana sin temas).
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     categories: [{ id: string, label: string,
 *       items: [{ question: string, answer: string }] }] }
 */
type FaqItem = { question: string; answer: string };
type Category = { id: string; label: string; items: FaqItem[] };

export function FaqEditorialSidebarSync({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as Category[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <nav
            aria-label={t("navAriaLabel")}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <ul className="flex flex-wrap gap-2 border-b border-border pb-6 lg:flex-col lg:gap-1 lg:border-b-0 lg:pb-0">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="flex items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="truncate">{category.label}</span>
                    <span className="shrink-0 text-xs tabular-nums text-primary">
                      {category.items.length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-14">
            {categories.map((category, categoryIndex) => (
              <Reveal key={category.id} delay={categoryIndex * 80}>
                <div id={category.id} className="scroll-mt-24">
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">
                    {category.label}
                  </h3>
                  <div className="mt-4 border-t border-border">
                    {category.items.map((item, itemIndex) => (
                      <details
                        key={itemIndex}
                        className="group border-b border-border [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                          <span className="font-display text-base leading-snug text-balance text-foreground sm:text-lg">
                            {item.question}
                          </span>
                          <span
                            aria-hidden="true"
                            className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-open:rotate-45"
                          >
                            <PlusIcon className="size-4" weight="bold" />
                          </span>
                        </summary>
                        <div className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
