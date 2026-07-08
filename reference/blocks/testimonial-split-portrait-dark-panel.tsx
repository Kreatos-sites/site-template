import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Star } from "lucide-react";

export function TestimonialSplitPortraitDarkPanel({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const rating = t.raw("rating") as number;

  return (
    <section className="border-t border-border bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-foreground px-6 py-16 lg:px-16 lg:py-24">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>

            <div className="mt-6 flex items-center gap-1" role="img" aria-label={t("ratingLabel")}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className="size-4 text-primary"
                  strokeWidth={1.5}
                  fill={i < rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <blockquote>
              <p className="mt-8 font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] tracking-tight text-balance text-background">
                {t("quote")}
              </p>
            </blockquote>

            <div className="mt-10 border-t border-background/20 pt-6">
              <p className="font-display text-base text-background">{t("name")}</p>
              <p className="mt-1 text-sm text-background/60">
                {t("role")} · {t("company")}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <SmartImage
            src={t("image")}
            alt={t("imageAlt")}
            className="aspect-[4/5] h-full min-h-[420px] w-full rounded-none lg:aspect-auto"
          />
        </Reveal>
      </div>
    </section>
  );
}
