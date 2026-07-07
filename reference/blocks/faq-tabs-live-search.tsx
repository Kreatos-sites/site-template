import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiQuestionLine,
  RiFileTextLine,
  RiShieldCheckLine,
  RiTruckLine,
  RiWallet3Line,
  RiSearchLine,
  type RemixiconComponentType,
} from "@remixicon/react";

const ICONS: Record<string, RemixiconComponentType> = {
  question: RiQuestionLine,
  file: RiFileTextLine,
  shield: RiShieldCheckLine,
  truck: RiTruckLine,
  wallet: RiWallet3Line,
};

type FaqTag = { id: string; label: string };
type FaqItem = { question: string; answer: string; tags: string[] };
type FaqCategory = {
  id: string;
  label: string;
  icon: string;
  tags: FaqTag[];
  items: FaqItem[];
};

export function FaqTabsLiveSearch({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as FaqCategory[];
  const allLabel = t("allLabel");

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        {/*
          Pestañas por categoría + filtro por tema, 100% CSS (radios ocultos +
          peer-checked). Cada input, cada etiqueta y cada panel viven como
          hermanos directos de su contenedor para que los selectores
          `peer-checked/<id>` se alcancen entre sí sin JavaScript de cliente.
          El filtro por tema simula la búsqueda en vivo: al elegir un tema,
          solo quedan visibles las preguntas etiquetadas con ese tema.
        */}
        <div className="relative mt-12">
          {categories.map((category, index) => (
            <input
              key={`cat-radio-${category.id}`}
              type="radio"
              name="faq-category"
              id={`faq-tab-${category.id}`}
              defaultChecked={index === 0}
              className={cn("peer sr-only", `peer/${category.id}`)}
            />
          ))}

          <div className="flex flex-wrap gap-2 border-b border-border pb-6">
            {categories.map((category) => {
              const Icon = ICONS[category.icon] ?? RiQuestionLine;
              return (
                <label
                  key={`cat-label-${category.id}`}
                  htmlFor={`faq-tab-${category.id}`}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors",
                    `peer-checked/${category.id}:border-primary peer-checked/${category.id}:bg-primary peer-checked/${category.id}:text-primary-foreground`,
                  )}
                >
                  <Icon className="size-4" />
                  {category.label}
                </label>
              );
            })}
          </div>

          {categories.map((category) => (
            <div
              key={`cat-panel-${category.id}`}
              className={cn("hidden", `peer-checked/${category.id}:block`)}
            >
              {/* filtro por tema (radios anidados: "todas" + una por etiqueta) */}
              <div className="relative mt-8">
                <input
                  type="radio"
                  name={`faq-tag-${category.id}`}
                  id={`faq-tag-${category.id}-all`}
                  defaultChecked
                  className={cn("peer sr-only", `peer/${category.id}-all`)}
                />
                {category.tags.map((tag) => (
                  <input
                    key={`tag-radio-${category.id}-${tag.id}`}
                    type="radio"
                    name={`faq-tag-${category.id}`}
                    id={`faq-tag-${category.id}-${tag.id}`}
                    className={cn("peer sr-only", `peer/${category.id}-${tag.id}`)}
                  />
                ))}

                <div className="flex flex-wrap items-center gap-2">
                  <RiSearchLine className="mr-1 size-4 shrink-0 text-muted-foreground" />
                  <label
                    htmlFor={`faq-tag-${category.id}-all`}
                    className={cn(
                      "cursor-pointer rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors",
                      `peer-checked/${category.id}-all:border-primary peer-checked/${category.id}-all:bg-primary peer-checked/${category.id}-all:text-primary-foreground`,
                    )}
                  >
                    {allLabel}
                  </label>
                  {category.tags.map((tag) => (
                    <label
                      key={`tag-label-${category.id}-${tag.id}`}
                      htmlFor={`faq-tag-${category.id}-${tag.id}`}
                      className={cn(
                        "cursor-pointer rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors",
                        `peer-checked/${category.id}-${tag.id}:border-primary peer-checked/${category.id}-${tag.id}:bg-primary peer-checked/${category.id}-${tag.id}:text-primary-foreground`,
                      )}
                    >
                      {tag.label}
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {category.items.map((item, itemIndex) => (
                    <Reveal key={itemIndex} delay={itemIndex * 60}>
                      <details
                        className={cn(
                          "group hidden rounded-sm border border-border bg-card px-6 [&_summary::-webkit-details-marker]:hidden",
                          `peer-checked/${category.id}-all:block`,
                          ...item.tags.map((tagId) => `peer-checked/${category.id}-${tagId}:block`),
                        )}
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
                          <h3 className="font-display text-base leading-snug tracking-tight text-balance text-foreground sm:text-lg">
                            {item.question}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground"
                          >
                            <span className="absolute h-px w-3 bg-current" />
                            <span className="absolute h-3 w-px bg-current transition-opacity duration-200 group-open:opacity-0" />
                          </span>
                        </summary>
                        <div className="max-w-2xl pr-10 pb-6 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </div>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
