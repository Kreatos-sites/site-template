import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Item = { title: string; text: string };

export function FeatureAlternatingList({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];
  const intro = t.raw("intro") as string | undefined;

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
                {t("title")}
              </h2>
              {intro ? (
                <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground text-pretty">
                  {intro}
                </p>
              ) : null}
              <span
                aria-hidden="true"
                className="mt-8 hidden h-px w-24 bg-border lg:block"
              />
            </Reveal>
          </div>

          <ol className="border-t border-border">
            {items.map((item, index) => (
              <li key={item.title} className="border-b border-border">
                <Reveal delay={index * 60}>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-9 md:gap-x-10 md:py-11">
                    <span
                      aria-hidden="true"
                      className="font-display text-3xl leading-none text-primary/40 tabular-nums md:text-4xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl tracking-tight text-balance md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
