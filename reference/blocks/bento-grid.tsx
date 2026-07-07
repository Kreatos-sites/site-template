import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Cell = { title: string; description: string; wide?: boolean };

export function BentoGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const cells = t.raw("cells") as Cell[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(11rem,1fr)] grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {cells.map((cell, index) => (
            <Reveal
              key={cell.title}
              delay={index * 60}
              className={cn(
                "group relative flex flex-col justify-between bg-background p-7 transition-colors hover:bg-card",
                cell.wide && "sm:col-span-2 sm:row-span-2 lg:p-10",
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  "font-display leading-none text-primary/40 tabular-nums",
                  cell.wide ? "text-2xl" : "text-lg",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="mt-8">
                <h3
                  className={cn(
                    "font-display tracking-tight text-balance",
                    cell.wide
                      ? "text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight"
                      : "text-xl",
                  )}
                >
                  {cell.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 leading-relaxed text-muted-foreground",
                    cell.wide ? "max-w-md text-base" : "text-sm",
                  )}
                >
                  {cell.description}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
