import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

export function ManifestoSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];
  const points = (t.raw("points") as string[] | undefined) ?? [];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 max-w-[15ch] font-display text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.98] tracking-tight text-balance text-foreground">
                {t("statement")}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <div className="lg:border-l lg:border-border lg:pl-12">
              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <Reveal key={index} delay={index * 60}>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              {points.length > 0 && (
                <ul className="mt-12 space-y-0 border-t border-border">
                  {points.map((point, index) => (
                    <Reveal key={index} delay={index * 60}>
                      <li className="flex items-baseline gap-4 border-b border-border py-4">
                        <span
                          aria-hidden="true"
                          className="font-display text-sm tabular-nums text-primary/70"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-medium tracking-tight text-foreground">
                          {point}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
