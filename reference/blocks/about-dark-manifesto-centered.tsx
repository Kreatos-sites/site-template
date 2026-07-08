import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Metric = {
  value: string;
  label: string;
};

export function AboutDarkManifestoCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.08] tracking-tight text-balance text-background">
            {t("statement")}
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <ul className="mt-20 grid w-full grid-cols-2 gap-x-6 gap-y-10 border-t border-background/15 pt-10 sm:grid-cols-4">
            {metrics.map((metric, i) => (
              <li key={i} className="flex flex-col items-center">
                <p className="font-display text-3xl text-background sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs tracking-[0.1em] text-background/60 uppercase">
                  {metric.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
