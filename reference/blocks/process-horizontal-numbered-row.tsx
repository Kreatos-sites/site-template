import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Search01Icon,
  PencilEdit02Icon,
  RocketIcon,
} from "@hugeicons/core-free-icons";

type Step = { icon: string; title: string; description: string };

const ICONS: Record<string, IconSvgElement> = {
  discover: Search01Icon,
  design: PencilEdit02Icon,
  launch: RocketIcon,
};

export function ProcessHorizontalNumberedRow({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => {
            const icon = ICONS[step.icon] ?? Search01Icon;
            return (
              <li key={i} className="relative">
                <Reveal delay={i * 60}>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <HugeiconsIcon icon={icon} className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-5.5 left-full hidden h-px w-8 -translate-x-1/2 bg-border sm:block"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
