import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { BookOpen, Clock, ArrowRight, Quote } from "lucide-react";

type TocItem = { id: string; label: string };
type ArticleSection = { id: string; heading: string; body: string };

export function ArticleEditorialStickySidebarTocSync({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const toc = t.raw("toc") as TocItem[];
  const sections = t.raw("sections") as ArticleSection[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-6 border-y border-border py-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
              {t("author.initials")}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-foreground">
                {t("author.name")}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("author.role")}
              </span>
            </span>
          </div>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 text-primary" />
            {t("meta.readingTime")}
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4 text-primary" />
            {t("meta.date")}
          </span>
        </div>

        <div className="mt-14 grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          <aside className="lg:col-span-3">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {t("tocLabel")}
                </p>
                <nav className="mt-5">
                  <ul className="flex flex-col border-l border-border">
                    {toc.map((item, index) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="group -ml-px flex items-center gap-3 border-l-2 border-transparent py-2.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none"
                        >
                          <span className="text-xs text-primary tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{item.label}</span>
                          <ArrowRight className="size-3.5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Reveal>
          </aside>

          <div className="flex flex-col divide-y divide-border lg:col-span-9">
            {sections.map((section, index) => (
              <Reveal key={section.id} delay={index * 60}>
                <article
                  id={section.id}
                  className="scroll-mt-28 py-10 first:pt-0 last:pb-0"
                >
                  <h3 className="font-display text-2xl leading-snug tracking-tight text-balance text-foreground">
                    {section.heading}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </article>
              </Reveal>
            ))}

            <Reveal delay={sections.length * 60}>
              <figure className="border-l-2 border-primary py-10 pl-6">
                <Quote className="size-5 text-primary" strokeWidth={1.75} />
                <blockquote className="mt-4 font-display text-xl leading-snug text-balance text-foreground">
                  {t("quote.text")}
                </blockquote>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  {t("quote.attribution")}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
