import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiFileTextLine, RiFolderOpenLine, RiNewspaperLine, RiBookOpenLine } from "@remixicon/react";

type Result = {
  type: string;
  title: string;
  snippet: string;
  date: string;
};

const TYPE_ICONS: Record<string, typeof RiFileTextLine> = {
  guia: RiBookOpenLine,
  articulo: RiNewspaperLine,
  caso: RiFolderOpenLine,
};

export function ArticleSearchResultsCardsSnippetBadgeDate({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const results = t.raw("results") as Result[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <span className="sr-only">{t("searchLabel")}</span>
              <input
                type="search"
                readOnly
                value=""
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchLabel")}
                className="w-full rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </label>
            <p className="text-sm text-muted-foreground">{t("resultsCount", { count: results.length })}</p>
          </div>
        </Reveal>

        <ul className="mt-10 flex flex-col gap-4">
          {results.map((r, i) => {
            const Icon = TYPE_ICONS[r.type] ?? RiFileTextLine;
            return (
              <li key={i}>
                <Reveal delay={i * 60}>
                  <article className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                          <Icon className="size-3.5" />
                          {t(`typeLabels.${r.type}`)}
                        </span>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg text-foreground">{r.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.snippet}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
