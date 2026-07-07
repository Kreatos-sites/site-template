import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Quote } from "lucide-react";

type Author = {
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
};

export function TestimonialFeaturedCenteredQuoteCompanyLogo({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const author = t.raw("author") as Author;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-lg border border-border bg-card px-8 py-16 text-center sm:px-16">
            <SmartImage
              src={t("logo")}
              alt={t("logoAlt")}
              className="h-8 w-32 rounded-none"
            />

            <Quote
              className="size-10 text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <blockquote>
              <p className="font-display text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.15] tracking-tight text-balance text-foreground">
                {t("quote")}
              </p>
            </blockquote>

            <figcaption className="mt-4 flex flex-col items-center gap-4">
              <SmartImage
                src={author.avatar}
                alt={author.avatarAlt}
                className="size-20 rounded-full ring-4 ring-primary/10"
              />
              <div>
                <p className="font-display text-lg text-foreground">
                  {author.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {author.role}
                </p>
              </div>
            </figcaption>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
