import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  RiArrowRightSLine,
  RiGitCommitLine,
  RiTerminalBoxLine,
} from "@remixicon/react";

type Category = {
  label: string;
  isActive: boolean;
};

type Post = {
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

export function BlogIndexDenseRowsCategoryFilterDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as Category[];
  const posts = t.raw("posts") as Post[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-2">
            <RiTerminalBoxLine
              aria-hidden="true"
              className="size-4 text-primary"
            />
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/70 text-pretty">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <ul className="mt-10 flex flex-wrap gap-2 border-b border-background/15 pb-8">
            {categories.map((category) => (
              <li key={category.label}>
                <span
                  className={
                    category.isActive
                      ? "inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                      : "inline-flex items-center rounded-full border border-background/20 px-4 py-1.5 text-xs font-medium text-background/60"
                  }
                >
                  {category.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="flex flex-col">
          {posts.map((post, i) => (
            <li key={post.title} className="border-b border-background/15">
              <Reveal delay={i * 40}>
                <a
                  href="#"
                  className="group grid grid-cols-[3rem_1fr] items-center gap-4 py-4 transition-colors hover:bg-background/[0.05] focus-visible:bg-background/[0.05] focus-visible:outline-none sm:grid-cols-[3.5rem_1fr_auto_auto] sm:gap-6 sm:py-3.5"
                >
                  <SmartImage
                    src={post.image}
                    alt={post.imageAlt}
                    className="aspect-square rounded-sm sm:size-14"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <RiGitCommitLine
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-primary"
                      />
                      <span className="truncate text-[0.6875rem] font-medium tracking-[0.15em] text-primary uppercase">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mt-1 truncate font-display text-base text-background sm:text-lg">
                      {post.title}
                    </h3>
                  </div>

                  <span className="hidden shrink-0 text-xs text-background/50 sm:block sm:text-sm">
                    {post.date}
                  </span>

                  <span className="hidden shrink-0 items-center gap-3 text-xs text-background/50 sm:flex sm:text-sm">
                    {post.readTime}
                    <RiArrowRightSLine
                      aria-hidden="true"
                      className="size-4 text-background/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
