import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiArrowRightSLine,
  RiCalendarLine,
  RiTimeLine,
  RiRefreshLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCodeSSlashLine,
} from "@remixicon/react";

type Breadcrumb = { label: string };
type Paragraph = { type: "paragraph"; text: string };
type CodeBlock = { type: "code"; language: string; code: string };
type Quote = { type: "quote"; text: string };
type BodyBlock = Paragraph | CodeBlock | Quote;
type AdjacentArticle = { label: string; title: string };

export function BlogArticleDocsBreadcrumbMetaPagination({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const breadcrumbs = t.raw("breadcrumbs") as Breadcrumb[];
  const body = t.raw("body") as BodyBlock[];
  const previous = t.raw("previous") as AdjacentArticle;
  const next = t.raw("next") as AdjacentArticle;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <nav aria-label={t("breadcrumbNav")}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <RiArrowRightSLine
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-muted-foreground/60"
                    />
                  ) : null}
                  <span
                    className={
                      index === breadcrumbs.length - 1 ? "text-foreground" : ""
                    }
                  >
                    {crumb.label}
                  </span>
                </li>
              ))}
            </ol>
          </nav>

          <p className="mt-8 text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-md border border-border bg-card px-5 py-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <RiCalendarLine
                aria-hidden="true"
                className="size-4 text-primary"
              />
              {t("publishedOn")}
            </span>
            <span aria-hidden="true" className="text-border">
              &middot;
            </span>
            <span className="flex items-center gap-2">
              <RiRefreshLine aria-hidden="true" className="size-4 text-primary" />
              {t("updatedOn")}
            </span>
            <span aria-hidden="true" className="text-border">
              &middot;
            </span>
            <span className="flex items-center gap-2">
              <RiTimeLine aria-hidden="true" className="size-4 text-primary" />
              {t("readingTime")}
            </span>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {body.map((block, index) => {
            if (block.type === "code") {
              return (
                <Reveal key={index} delay={index * 60}>
                  <div className="overflow-hidden rounded-md border border-border bg-card">
                    <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                      <RiCodeSSlashLine
                        aria-hidden="true"
                        className="size-3.5 text-primary"
                      />
                      <span className="text-xs text-muted-foreground">
                        {block.language}
                      </span>
                    </div>
                    <pre className="overflow-x-auto px-4 py-4 text-[0.85rem] leading-relaxed text-foreground">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                </Reveal>
              );
            }
            if (block.type === "quote") {
              return (
                <Reveal key={index} delay={index * 60}>
                  <blockquote className="border-l-2 border-primary bg-secondary px-6 py-5 text-[1.05rem] leading-relaxed text-foreground italic">
                    {block.text}
                  </blockquote>
                </Reveal>
              );
            }
            return (
              <Reveal key={index} delay={index * 60}>
                <p className="text-[1.05rem] leading-relaxed text-muted-foreground">
                  {block.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2">
            <a
              href="#"
              className="group flex items-start gap-4 rounded-md border border-border bg-card p-5 transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform group-hover:-translate-x-1">
                <RiArrowLeftLine aria-hidden="true" className="size-4" />
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {previous.label}
                </span>
                <span className="font-display text-base text-foreground">
                  {previous.title}
                </span>
              </span>
            </a>

            <a
              href="#"
              className="group flex items-start justify-end gap-4 rounded-md border border-border bg-card p-5 text-right transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none"
            >
              <span className="flex flex-col items-end gap-1.5">
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {next.label}
                </span>
                <span className="font-display text-base text-foreground">
                  {next.title}
                </span>
              </span>
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform group-hover:translate-x-1">
                <RiArrowRightLine aria-hidden="true" className="size-4" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
