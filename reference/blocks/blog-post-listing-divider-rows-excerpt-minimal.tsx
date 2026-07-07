import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { RiArrowRightLine } from "@remixicon/react";

type BlogPost = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorInitials: string;
  readMoreLabel: string;
};

export function BlogPostListingDividerRowsExcerptMinimal({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const posts = t.raw("posts") as BlogPost[];

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
        </Reveal>

        <ul className="mt-16 flex flex-col border-t border-border lg:mt-20">
          {posts.map((post, i) => (
            <li key={post.title} className="border-b border-border">
              <Reveal delay={i * 60}>
                <article className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>

                    <h3 className="mt-4 font-display text-xl text-foreground sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {post.authorInitials}
                      </span>
                      <span className="text-sm text-foreground">{post.authorName}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
                      {post.readMoreLabel}
                      <RiArrowRightLine className="size-4" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
