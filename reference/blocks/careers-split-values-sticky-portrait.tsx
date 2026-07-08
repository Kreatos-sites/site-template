import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Value = {
  number: string;
  title: string;
  description: string;
};

export function CareersSplitValuesStickyPortrait({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const values = t.raw("values") as Value[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,20rem)_1fr]">
          <div>
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>

            <ol className="mt-12 flex flex-col gap-10">
              {values.map((value, index) => (
                <li key={value.title} className="border-t border-border pt-6 first:border-t-0 first:pt-0">
                  <Reveal delay={index * 60}>
                    <span
                      aria-hidden="true"
                      className="font-display text-sm text-primary tabular-nums"
                    >
                      {value.number}
                    </span>
                    <h3 className="mt-3 font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {value.description}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={80}>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-sm lg:aspect-[3/4]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
