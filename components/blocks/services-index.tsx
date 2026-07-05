import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type Item = { name: string; note?: string };

export function ServicesIndex({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <span
              aria-hidden="true"
              className="hidden font-display text-sm tabular-nums text-muted-foreground/70 md:block"
            >
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="mt-14 border-t border-border/70">
          {items.map((item, index) => (
            <li key={item.name}>
              <Reveal delay={index * 60}>
                <div className="group flex items-baseline gap-5 border-b border-border/70 py-7 transition-colors sm:gap-8 md:py-8 hover:bg-secondary/40">
                  <span
                    aria-hidden="true"
                    className="w-12 shrink-0 font-display text-lg leading-none tabular-nums text-muted-foreground/60 transition-colors group-hover:text-primary sm:w-16 sm:text-xl"
                  >
                    {String(index).padStart(2, "0")}
                  </span>

                  <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <h3 className="font-display text-2xl leading-tight tracking-tight text-balance transition-transform duration-300 group-hover:translate-x-1 sm:text-[clamp(1.75rem,3vw,2.5rem)]">
                      {item.name}
                    </h3>
                    {item.note ? (
                      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-right">
                        {item.note}
                      </p>
                    ) : null}
                  </div>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 self-start text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:size-6"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
