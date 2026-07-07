import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

export function NarrativeStaggeredPhotos({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Prosa narrativa + estadísticas */}
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-6">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>

            <div className="mt-8 max-w-prose space-y-5 text-[1.05rem] leading-relaxed text-muted-foreground">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            {stats.length > 0 && (
              <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-3xl text-foreground">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>

        {/* Galería fotográfica escalonada */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:gap-6">
          <div className="flex flex-col gap-4 lg:gap-6">
            <Reveal delay={60}>
              <SmartImage
                src={t("imagePrimary")}
                alt={t("imagePrimaryAlt")}
                className="aspect-[3/4] rounded-sm"
              />
            </Reveal>
            <Reveal delay={180}>
              <SmartImage
                src={t("imageTertiary")}
                alt={t("imageTertiaryAlt")}
                className="aspect-square rounded-sm"
              />
            </Reveal>
          </div>
          <div className="flex flex-col gap-4 pt-10 lg:gap-6 lg:pt-16">
            <Reveal delay={120}>
              <SmartImage
                src={t("imageSecondary")}
                alt={t("imageSecondaryAlt")}
                className="aspect-square rounded-sm"
              />
            </Reveal>
            <Reveal delay={240}>
              <SmartImage
                src={t("imageQuaternary")}
                alt={t("imageQuaternaryAlt")}
                className="aspect-[3/4] rounded-sm"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
