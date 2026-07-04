import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionOf } from "@/lib/config";
import { cn } from "@/lib/utils";

type ServiceItem = { title: string; description: string };

export function Services({ variant = "numbered-list", count, ns }: SectionOf<"services">) {
  const t = useTranslations(ns ?? "services");
  const allItems = t.raw("items") as ServiceItem[];
  const items = count ? allItems.slice(0, count) : allItems;

  return (
    <section id="servicios" className="py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:pb-1">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        {variant === "numbered-list" && (
          <ol className="mt-14 border-t border-border">
            {items.map((item, index) => (
              <li key={item.title} className="border-b border-border">
                <Reveal delay={index * 60}>
                  <div className="group grid gap-3 py-8 transition-colors sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-card">
                    <span
                      aria-hidden="true"
                      className="font-display text-5xl leading-none text-primary/60 tabular-nums transition-colors group-hover:text-primary sm:col-span-2 sm:text-6xl lg:text-7xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl tracking-tight sm:col-span-4">
                      {item.title}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-muted-foreground sm:col-span-6">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        )}

        {variant === "asym-grid" && (
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "bg-background p-8",
                  index === 0 && "sm:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-end",
                )}
              >
                <Reveal delay={index * 60}>
                  <span
                    aria-hidden="true"
                    className="font-display text-3xl text-primary/60 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={cn(
                      "mt-4 font-display tracking-tight",
                      index === 0 ? "text-3xl" : "text-xl",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        )}

        {variant === "bordered-table" && (
          <div className="mt-14 border border-border">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div
                  className={cn(
                    "grid gap-2 px-6 py-6 sm:grid-cols-2 sm:gap-10",
                    index > 0 && "border-t border-border",
                  )}
                >
                  <h3 className="font-display text-lg tracking-tight">
                    <span aria-hidden="true" className="mr-3 text-primary tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
