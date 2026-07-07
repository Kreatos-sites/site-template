import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { CalendarIcon, ClockIcon, LinkIcon, MailIcon, GlobeIcon } from "lucide-react";

type Paragraph = { type: "p"; text: string };
type Heading = { type: "h3"; text: string };
type Quote = { type: "quote"; text: string; cite: string };
type ListBlock = { type: "list"; items: string[] };
type BodyBlock = Paragraph | Heading | Quote | ListBlock;

type Tag = { label: string };
type ShareLink = { label: string; icon: string; href: string };

const SHARE_ICONS: Record<string, typeof LinkIcon> = {
  link: LinkIcon,
  mail: MailIcon,
  web: GlobeIcon,
};

export function BlogArticleCenteredEditorialAuthorMetaShare({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const body = t.raw("body") as BodyBlock[];
  const tags = t.raw("tags") as Tag[];
  const shareLinks = t.raw("shareLinks") as ShareLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("category")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("deck")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-border py-5">
            <SmartImage
              src={t("authorAvatar")}
              alt={t("authorAvatarAlt")}
              className="aspect-square w-11 shrink-0 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {t("authorName")}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("authorRole")}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="size-3.5" />
                {t("publishedDate")}
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="size-3.5" />
                {t("readTime")}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <SmartImage
            src={t("coverImage")}
            alt={t("coverImageAlt")}
            className="mt-10 aspect-[16/9] w-full rounded-sm"
          />
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {body.map((block, i) => {
            if (block.type === "h3") {
              return (
                <Reveal key={i} delay={i * 40}>
                  <h3 className="font-display text-xl text-foreground">
                    {block.text}
                  </h3>
                </Reveal>
              );
            }
            if (block.type === "quote") {
              return (
                <Reveal key={i} delay={i * 40}>
                  <blockquote className="border-l-2 border-primary bg-secondary py-4 pl-6 pr-4">
                    <p className="font-display text-lg leading-snug text-foreground">
                      {block.text}
                    </p>
                    <cite className="mt-3 block text-sm not-italic text-muted-foreground">
                      {block.cite}
                    </cite>
                  </blockquote>
                </Reveal>
              );
            }
            if (block.type === "list") {
              return (
                <Reveal key={i} delay={i * 40}>
                  <ul className="flex flex-col gap-2 pl-5">
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        className="list-disc text-base leading-relaxed text-muted-foreground marker:text-primary"
                      >
                        {item}
                      </li>
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

        <Reveal delay={140}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <li key={i}>
                  <span className="rounded-sm bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {tag.label}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="flex items-center gap-3">
              {shareLinks.map((link, i) => {
                const Icon = SHARE_ICONS[link.icon] ?? LinkIcon;
                return (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      aria-label={link.label}
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
