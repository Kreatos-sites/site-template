import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  FileSearch,
  Ruler,
  HardHat,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  "file-search": FileSearch,
  ruler: Ruler,
  "hard-hat": HardHat,
  "key-round": KeyRound,
};

export function ProcessHowItWorksVerticalBorderedRail({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ol className="mt-16 flex flex-col">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? FileSearch;
            const isLast = i === steps.length - 1;
            return (
              <li key={i} className="relative flex gap-6 sm:gap-8">
                <Reveal delay={i * 80} className="flex flex-col items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                    <Icon className="size-5 text-primary" strokeWidth={1.75} />
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={cn("mt-1 w-px flex-1 bg-border")}
                    />
                  )}
                </Reveal>
                <Reveal
                  delay={i * 80 + 40}
                  className={cn("min-w-0 flex-1 pb-12", isLast && "pb-0")}
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                    {t("stepLabel", { number: String(i + 1).padStart(2, "0") })}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
