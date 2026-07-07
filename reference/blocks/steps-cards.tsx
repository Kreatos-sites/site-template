import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  ClipboardCheck,
  Compass,
  Handshake,
  LineChart,
  Lightbulb,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Step = { icon: string; title: string; description: string };

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  compass: Compass,
  target: Target,
  lightbulb: Lightbulb,
  settings: Settings2,
  clipboard: ClipboardCheck,
  shield: ShieldCheck,
  handshake: Handshake,
  chart: LineChart,
  rocket: Rocket,
  sparkles: Sparkles,
};

export function StepsCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon] ?? Sparkles;
            const featured = index === 0;

            return (
              <li
                key={step.title}
                className={cn(
                  "bg-card",
                  featured && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
                )}
              >
                <Reveal delay={index * 60} className="h-full">
                  <article
                    className={cn(
                      "group relative flex h-full flex-col justify-between gap-10 p-8 transition-colors lg:p-10",
                      featured
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-muted/40",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute top-6 right-7 font-display text-6xl leading-none tabular-nums lg:text-7xl",
                        featured ? "text-primary/40" : "text-muted-foreground/15",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "inline-flex size-12 items-center justify-center rounded-lg border",
                        featured
                          ? "border-primary-foreground/20 bg-background/10 text-primary-foreground"
                          : "border-border bg-background text-primary",
                      )}
                    >
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>

                    <div>
                      <h3 className="flex items-start gap-2 font-display text-xl tracking-tight text-balance">
                        {step.title}
                        {featured && (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="mt-0.5 size-5 shrink-0 text-primary"
                            strokeWidth={1.5}
                          />
                        )}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed",
                          featured
                            ? "text-secondary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
