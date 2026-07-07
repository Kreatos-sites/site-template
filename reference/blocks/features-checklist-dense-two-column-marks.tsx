import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiCheckboxFill } from "@remixicon/react";

type ChecklistItem = { title: string; description: string };

export function FeaturesChecklistDenseTwoColumnMarks({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as ChecklistItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t("description")}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 40}>
                <div className="flex items-start gap-4 border-b border-border pb-8">
                  <RiCheckboxFill className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
