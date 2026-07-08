import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

export function AboutSplitFounderPortraitQuote({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:order-1 lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <blockquote className="mt-6 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.25] tracking-tight text-balance text-foreground italic">
                “{t("quote")}”
              </blockquote>
              <div className="mt-8">
                <p className="text-base font-medium text-foreground">{t("name")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("role")}</p>
              </div>
              <div className="mt-10 space-y-5 border-t border-border pt-8">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:order-2 lg:col-span-5">
            <figure>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-sm"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
