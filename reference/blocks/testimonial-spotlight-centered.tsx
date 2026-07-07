import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiDoubleQuotesL } from "@remixicon/react";

export function TestimonialSpotlightCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>

            <RiDoubleQuotesL
              aria-hidden="true"
              className="mt-8 size-10 text-primary/40"
            />

            <blockquote className="mt-6">
              <p className="font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.15] tracking-tight text-balance text-foreground">
                {t("quote")}
              </p>
            </blockquote>

            <figcaption className="mt-10 flex flex-col items-center gap-4">
              <SmartImage
                src={t("avatar")}
                alt={t("avatarAlt")}
                className="aspect-square w-16 rounded-full"
              />
              <div>
                <cite className="block text-sm font-semibold text-foreground not-italic">
                  {t("name")}
                </cite>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("role")}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <SmartImage
                  src={t("companyLogo")}
                  alt={t("companyLogoAlt")}
                  className="aspect-[3/1] w-28 rounded-sm"
                />
              </div>
            </figcaption>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
