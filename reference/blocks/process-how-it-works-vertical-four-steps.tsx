import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiFileTextLine,
  RiSearchEyeLine,
  RiToolsLine,
  RiCheckboxCircleLine,
} from "@remixicon/react";

type Step = {
  title: string;
  description: string;
  icon: string;
};

const ICONS: Record<string, typeof RiFileTextLine> = {
  file: RiFileTextLine,
  search: RiSearchEyeLine,
  tools: RiToolsLine,
  check: RiCheckboxCircleLine,
};

export function ProcessHowItWorksVerticalFourSteps({ ns }: { ns: string }) {
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
        </Reveal>

        <ol className="relative mt-16 flex max-w-2xl flex-col lg:mt-20">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? RiFileTextLine;
            const isLast = i === steps.length - 1;
            return (
              <li key={i} className="relative flex gap-6 pb-12 last:pb-0">
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute top-12 left-6 h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-border"
                  />
                )}
                <Reveal delay={i * 60} className="contents">
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-2 pt-1.5">
                    <span className="font-mono text-xs tracking-wide text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl text-foreground">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
