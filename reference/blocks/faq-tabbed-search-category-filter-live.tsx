import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  QuestionIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

const ICONS: Record<string, Icon> = {
  question: QuestionIcon,
  receipt: ReceiptIcon,
  shield: ShieldCheckIcon,
};

type FaqItem = { question: string; answer: string };
type FaqCategory = {
  id: string;
  label: string;
  icon: string;
  items: FaqItem[];
};

export function FaqTabbedSearchCategoryFilterLive({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as FaqCategory[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        {/*
          Tabs por categoría implementados con radios ocultos + peer-checked
          (sin JS de cliente). El input de búsqueda es decorativo y refuerza
          el patrón visual del arquetipo (barra de búsqueda sobre FAQs
          organizadas por tema); el filtrado real ocurre al elegir categoría.
        */}
        <div className="relative mt-12">
          {categories.map((category, index) => (
            <input
              key={`cat-radio-${category.id}`}
              type="radio"
              name="faq-category"
              id={`faqtsl-tab-${category.id}`}
              defaultChecked={index === 0}
              className={cn("peer sr-only", `peer/${category.id}`)}
            />
          ))}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                <MagnifyingGlassIcon className="size-4 shrink-0" aria-hidden="true" />
                <span>{t("searchPlaceholder")}</span>
              </div>

              <nav className="flex flex-row flex-wrap gap-2 lg:flex-col">
                {categories.map((category) => {
                  const Icon = ICONS[category.icon] ?? QuestionIcon;
                  return (
                    <label
                      key={`cat-label-${category.id}`}
                      htmlFor={`faqtsl-tab-${category.id}`}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-sm border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors",
                        `peer-checked/${category.id}:border-primary peer-checked/${category.id}:bg-primary peer-checked/${category.id}:text-primary-foreground`,
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        {category.label}
                      </span>
                      <span className="text-xs tabular-nums opacity-70">
                        {category.items.length}
                      </span>
                    </label>
                  );
                })}
              </nav>
            </div>

            <div>
              {categories.map((category) => (
                <div
                  key={`cat-panel-${category.id}`}
                  className={cn("hidden flex-col gap-3", `peer-checked/${category.id}:flex`)}
                >
                  {category.items.map((item, itemIndex) => (
                    <Reveal key={itemIndex} delay={itemIndex * 60}>
                      <details className="group rounded-sm border border-border bg-card px-6 [&_summary::-webkit-details-marker]:hidden">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
