import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ClipboardList,
  Compass,
  Handshake,
  Hammer,
  Rocket,
  Search,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  compass: Compass,
  clipboard: ClipboardList,
  handshake: Handshake,
  hammer: Hammer,
  workflow: Workflow,
  rocket: Rocket,
  sparkles: Sparkles,
};

export function ProcessSidebarRailSteps({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ol className="mt-16 max-w-3xl">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon] ?? Sparkles;
            const isLast = index === steps.length - 1;

            return (
              <Reveal key={index} delay={index * 60}>
                <li className="relative flex gap-6 pb-12 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <span
                      className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    {!isLast && (
                      <span
                        className="mt-2 w-px flex-1 bg-border"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="pt-1 pb-2">
                    <span
                      className="font-mono text-[0.6875rem] tracking-[0.25em] text-muted-foreground/70 tabular-nums"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-xl tracking-tight text-balance text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
