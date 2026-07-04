import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionOf } from "@/lib/config";

type Step = { title: string; description: string };

export function Process({ count, ns }: SectionOf<"process">) {
  const t = useTranslations(ns ?? "process");
  const allSteps = t.raw("steps") as Step[];
  const steps = count ? allSteps.slice(0, count) : allSteps;

  return (
    <section id="proceso" className="border-t border-border bg-card py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-primary pt-6">
              <Reveal delay={index * 90}>
                <span
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-primary/60 tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
