import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  RiFacebookFill,
  RiTwitterXFill,
  RiLinkedinFill,
  RiLinkM,
} from "@remixicon/react";

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

type Author = {
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
};

export function BlogArticleCenteredAuthorShare({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const author = t.raw("author") as Author;
  const body = t.raw("body") as ContentBlock[];
  const tags = t.raw("tags") as string[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("deck")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex items-center gap-4 border-y border-border py-6">
            <SmartImage
              src={author.avatar}
              alt={author.avatarAlt}
              className="aspect-square w-12 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium text-foreground">{author.name}</p>
              <p className="text-muted-foreground">{author.role}</p>
            </div>
            <div className="ml-auto text-right text-sm text-muted-foreground">
              <p>{t("date")}</p>
              <p>{t("readTime")}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SmartImage
            src={t("image")}
            alt={t("imageAlt")}
            className="mt-10 aspect-[16/9] rounded-sm"
          />
        </Reveal>

        <div className="mt-10 space-y-6">
          {body.map((block, i) => {
            if (block.type === "heading") {
              return (
                <Reveal key={i} delay={i * 40}>
                  <h3 className="font-display text-2xl text-foreground">
                    {block.text}
                  </h3>
                </Reveal>
              );
            }
            if (block.type === "quote") {
              return (
                <Reveal key={i} delay={i * 40}>
                  <blockquote className="border-l-2 border-primary py-1 pl-6 text-lg leading-relaxed text-foreground italic">
                    {block.text}
                    {block.cite ? (
                      <footer className="mt-2 text-sm text-muted-foreground not-italic">
                        {block.cite}
                      </footer>
                    ) : null}
                  </blockquote>
                </Reveal>
              );
            }
            if (block.type === "list") {
              return (
                <Reveal key={i} delay={i * 40}>
                  <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              );
            }
            return (
              <Reveal key={i} delay={i * 40}>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {block.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <li
                  key={i}
                  className="rounded-sm bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                {t("shareLabel")}
              </span>
              <a
                href="#"
                aria-label={t("shareFacebookAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <RiFacebookFill className="size-4" />
              </a>
              <a
                href="#"
                aria-label={t("shareTwitterAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <RiTwitterXFill className="size-4" />
              </a>
              <a
                href="#"
                aria-label={t("shareLinkedinAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <RiLinkedinFill className="size-4" />
              </a>
              <a
                href="#"
                aria-label={t("shareCopyLinkAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <RiLinkM className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
