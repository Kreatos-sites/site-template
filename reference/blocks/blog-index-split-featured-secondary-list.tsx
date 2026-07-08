import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type SecondaryPost = {
  image: string;
  imageAlt: string;
  title: string;
  date: string;
};

export function BlogIndexSplitFeaturedSecondaryList({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const secondaryPosts = t.raw("secondaryPosts") as SecondaryPost[];

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

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          <Reveal className="lg:col-span-2">
            <article className="group flex h-full flex-col">
              <SmartImage
                src={t("featured.image")}
                alt={t("featured.imageAlt")}
                className="aspect-[16/10] rounded-sm"
              />
              <div className="mt-6">
                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  {t("featured.category")}
                </p>
                <h2 className="mt-3 font-display text-2xl leading-tight text-balance text-foreground sm:text-3xl">
                  {t("featured.title")}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {t("featured.excerpt")}
                </p>
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col divide-y divide-border border-t border-border lg:border-t-0">
            {secondaryPosts.map((post, i) => (
              <Reveal key={post.title} delay={i * 60}>
                <article className="flex items-start gap-4 py-5 first:pt-0 lg:first:pt-0">
                  <SmartImage
                    src={post.image}
                    alt={post.imageAlt}
                    className="aspect-square w-16 shrink-0 rounded-sm"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-sm leading-snug text-balance text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
