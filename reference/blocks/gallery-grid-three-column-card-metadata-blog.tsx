import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { CalendarIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";

type BlogPost = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

export function GalleryGridThreeColumnCardMetadataBlog({ ns }: { ns: string }) {
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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col gap-5">
                  <SmartImage
                    src={post.image}
                    alt={post.imageAlt}
                    className="aspect-[4/3] rounded-sm"
                  />
                  <div className="flex flex-1 flex-col gap-3">
                    <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                      {post.category}
                    </p>
                    <h3 className="font-display text-xl leading-snug text-foreground">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon className="size-3.5 shrink-0" aria-hidden />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ClockIcon className="size-3.5 shrink-0" aria-hidden />
                        {post.readTime}
                      </span>
                    </div>
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
