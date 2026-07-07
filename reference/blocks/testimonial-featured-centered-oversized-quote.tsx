import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";

export function TestimonialFeaturedCenteredOversizedQuote({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 flex flex-col items-center text-center">
            <QuotesIcon
              className="size-10 text-primary/40"
              weight="fill"
              aria-hidden="true"
            />

            <blockquote className="mt-8">
              <p className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.2] tracking-tight text-balance text-foreground">
                {t("quote")}
              </p>
            </blockquote>

            <div className="mt-10 flex flex-col items-center gap-4">
              <SmartImage
                src={t("avatar")}
                alt={t("avatarAlt")}
                className="size-20 rounded-full"
              />
              <div>
                <p className="font-display text-lg text-foreground">
                  {t("name")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("role")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-8">
              <SmartImage
                src={t("logo")}
                alt={t("logoAlt")}
                className="h-6 w-28 rounded-none opacity-80"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
