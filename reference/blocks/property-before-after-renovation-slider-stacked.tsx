import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowsLeftRightIcon } from "@phosphor-icons/react/dist/ssr";

type Pair = {
  label: string;
  beforeImage: string;
  beforeImageAlt: string;
  beforeTag: string;
  afterImage: string;
  afterImageAlt: string;
  afterTag: string;
  note: string;
};

export function PropertyBeforeAfterRenovationSliderStacked({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const pairs = t.raw("pairs") as Pair[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-28">
          {pairs.map((pair, i) => (
            <Reveal key={pair.label} delay={i * 80}>
              <div className="mx-auto flex max-w-xl flex-col">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl text-foreground">
                    {pair.label}
                  </h3>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {pair.note}
                  </span>
                </div>

                <div className="relative mt-6 flex flex-col rounded-sm border border-border bg-card">
                  <div className="relative">
                    <SmartImage
                      src={pair.beforeImage}
                      alt={pair.beforeImageAlt}
                      className="aspect-[4/3] rounded-t-sm"
                    />
                    <span className="absolute top-4 left-4 rounded-sm border border-border bg-background px-2.5 py-1 text-xs font-medium tracking-[0.15em] text-foreground uppercase">
                      {pair.beforeTag}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center justify-center">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
                    <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground">
                      <ArrowsLeftRightIcon
                        className="size-5 rotate-90"
                        weight="bold"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <div className="relative">
                    <SmartImage
                      src={pair.afterImage}
                      alt={pair.afterImageAlt}
                      className="aspect-[4/3] rounded-b-sm"
                    />
                    <span className="absolute top-4 left-4 rounded-sm border border-border bg-primary px-2.5 py-1 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase">
                      {pair.afterTag}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
