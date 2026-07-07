import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  FacebookLogoIcon,
  XLogoIcon,
  LinkedinLogoIcon,
  LinkIcon,
} from "@phosphor-icons/react/dist/ssr";

export function ArticleFooterSocialShareTags({ ns }: { ns: string }) {
  const t = useTranslations(ns);
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
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8">
            <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              {t("tagsLabel")}
            </span>
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
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
            <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              {t("shareLabel")}
            </span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label={t("shareFacebookAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <FacebookLogoIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label={t("shareTwitterAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <XLogoIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label={t("shareLinkedinAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <LinkedinLogoIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label={t("shareCopyLinkAria")}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <LinkIcon className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
