import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight } from "lucide-react";

type Feature = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export function FeatureCardsImageGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as Feature[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </div>
            <a
              href={t("linkHref")}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {t("linkLabel")}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li key={index}>
              <Reveal delay={index * 60}>
                <article className="flex h-full flex-col gap-6">
                  <SmartImage
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="aspect-[4/5] rounded-sm"
                  />
                  <div>
                    <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
