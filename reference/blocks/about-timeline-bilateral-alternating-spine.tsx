import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  Flag,
  Building2,
  Handshake,
  Award,
  Rocket,
  Globe,
  type LucideIcon,
} from "lucide-react";

type Milestone = {
  year: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
};

const ICONS: Record<string, LucideIcon> = {
  flag: Flag,
  building: Building2,
  handshake: Handshake,
  award: Award,
  rocket: Rocket,
  globe: Globe,
};

export function AboutTimelineBilateralAlternatingSpine({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Milestone[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="relative mt-16 lg:mt-20">
          <div
            aria-hidden
            className="absolute top-0 left-4 h-full w-px bg-border lg:left-1/2"
          />

          <ol className="flex flex-col gap-12 lg:gap-16">
            {items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Flag;
              const isEven = i % 2 === 0;
              return (
                <li key={i} className="relative lg:grid lg:grid-cols-2 lg:gap-16">
                  <div
                    aria-hidden
                    className="absolute top-1 left-4 z-10 -translate-x-1/2 lg:left-1/2"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-primary">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                  </div>

                  <div
                    className={cn(
                      "pl-14 lg:pl-0",
                      isEven ? "lg:order-1 lg:col-start-1 lg:pr-16 lg:text-right" : "lg:order-2 lg:col-start-2 lg:pl-16",
                    )}
                  >
                    <Reveal delay={i * 60}>
                      <article
                        className={cn(
                          "flex flex-col gap-3 rounded-sm border border-border bg-card p-6",
                          isEven ? "lg:items-end" : "lg:items-start",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-3",
                            isEven ? "lg:flex-row-reverse" : "",
                          )}
                        >
                          <span className="font-display text-2xl tracking-tight text-foreground">
                            {item.year}
                          </span>
                          <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium tracking-wide text-secondary-foreground uppercase">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </article>
                    </Reveal>
                  </div>

                  <div
                    className={cn(
                      "hidden lg:block",
                      isEven ? "lg:order-2 lg:col-start-2" : "lg:order-1 lg:col-start-1",
                    )}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
