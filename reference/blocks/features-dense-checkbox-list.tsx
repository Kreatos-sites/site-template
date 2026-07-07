import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiCheckboxCircleFill } from "@remixicon/react";

type Item = { title: string; description: string };

export function FeaturesDenseCheckboxList({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <div className="flex gap-4 border-t border-border pt-6">
                  <RiCheckboxCircleFill
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
