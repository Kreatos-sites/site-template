import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiDoubleQuotesL } from "@remixicon/react";

type Author = {
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
};

export function TestimonialFeaturedCenteredQuote({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const author = t.raw("author") as Author;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8 text-center">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex justify-center">
            <RiDoubleQuotesL
              className="size-10 text-primary"
              aria-hidden="true"
            />
          </div>
          <h2 className="mt-6 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] tracking-tight text-balance text-foreground">
            {t("quote")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <SmartImage
              src={author.avatar}
              alt={author.avatarAlt}
              className="aspect-square w-16 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium text-foreground">{author.name}</p>
              <p className="text-muted-foreground">{author.role}</p>
            </div>
            <p className="mt-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {t("company")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
