import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiDoubleQuotesL } from "@remixicon/react";

type Author = {
  name: string;
  role: string;
  condition: string;
};

export function ClinicWarmTestimonialSplitPortrait({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const author = t.raw("author") as Author;

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SmartImage
              src={t("image")}
              alt={t("imageAlt")}
              className="aspect-[4/5] rounded-sm"
            />
          </Reveal>

          <Reveal delay={80}>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <RiDoubleQuotesL
              className="mt-6 size-9 text-primary"
              aria-hidden="true"
            />
            <blockquote>
              <p className="mt-6 font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] tracking-tight text-balance text-foreground">
                {t("quote")}
              </p>
            </blockquote>
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-display text-lg text-foreground">
                {author.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {author.role}
              </p>
              <p className="mt-3 text-xs font-medium tracking-[0.2em] text-primary uppercase">
                {author.condition}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
