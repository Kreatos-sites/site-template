import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight } from "lucide-react";

type BlogPost = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readMoreLabel: string;
};

const ASPECTS = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]"];

export function BlogIndexStaggeredMasonryTinted({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const posts = t.raw("posts") as BlogPost[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 columns-1 gap-10 sm:columns-2 lg:mt-20 lg:columns-3">
          {posts.map((post, i) => (
            <div key={post.title} className="mb-10 break-inside-avoid">
              <Reveal delay={i * 60}>
                <article>
                  <div className="relative overflow-hidden rounded-sm">
                    <SmartImage
                      src={post.image}
                      alt={post.imageAlt}
                      className={`${ASPECTS[i % ASPECTS.length]} rounded-sm`}
                    />
                    <span className="absolute top-4 left-4 rounded-sm bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                      {post.category}
                    </span>
                  </div>

                  <div className="mt-5">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <h3 className="mt-2 font-display text-xl leading-tight text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {post.readMoreLabel}
                      <ArrowUpRight className="size-4" strokeWidth={1.75} />
                    </span>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
