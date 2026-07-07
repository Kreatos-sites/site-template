import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  MagnifyingGlassIcon,
  FileTextIcon,
  HandshakeIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as Icon } from "@phosphor-icons/react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, Icon> = {
  search: MagnifyingGlassIcon,
  file: FileTextIcon,
  handshake: HandshakeIcon,
  rocket: RocketLaunchIcon,
};

/**
 * Horizontal stepper limited to 4 stops: the progress connectors reference the
 * fixed ids step-0..step-3 so Tailwind can statically extract the has-[] rules.
 * Clicking a step (native radio + label, no client JS) advances the active
 * marker and reveals which segments of the line are "completed".
 */
export function ProcessStepperHorizontalInteractiveProgress({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const steps = (t.raw("steps") as Step[]).slice(0, 4);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ol
            className={cn(
              "relative mt-20 flex flex-col gap-8 lg:mt-24 lg:flex-row lg:items-start lg:gap-0",
              "[&:has(#step-1:checked)_.seg-0]:bg-primary",
              "[&:has(#step-2:checked)_.seg-0]:bg-primary",
              "[&:has(#step-3:checked)_.seg-0]:bg-primary",
              "[&:has(#step-2:checked)_.seg-1]:bg-primary",
              "[&:has(#step-3:checked)_.seg-1]:bg-primary",
              "[&:has(#step-3:checked)_.seg-2]:bg-primary",
            )}
          >
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon] ?? MagnifyingGlassIcon;
              const isLast = i === steps.length - 1;

              return (
                <li
                  key={step.title}
                  className="group/step relative flex flex-1 flex-row items-start gap-4 lg:flex-col lg:items-stretch lg:gap-0"
                >
                  <input
                    type="radio"
                    name="process-step"
                    id={`step-${i}`}
                    defaultChecked={i === 0}
                    className="sr-only"
                  />

                  <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                    <label
                      htmlFor={`step-${i}`}
                      className={cn(
                        "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-card text-muted-foreground transition-colors",
                        "group-has-checked/step:border-primary group-has-checked/step:bg-primary group-has-checked/step:text-primary-foreground",
                        "group-has-[:focus-visible]/step:ring-2 group-has-[:focus-visible]/step:ring-primary group-has-[:focus-visible]/step:ring-offset-2 group-has-[:focus-visible]/step:ring-offset-background",
                      )}
                    >
                      <Icon className="size-5" weight="regular" />
                    </label>

                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className={cn(
                          `seg-${i}`,
                          "mt-0 ml-[22px] h-8 w-px bg-border transition-colors lg:mt-5 lg:ml-0 lg:h-px lg:w-full lg:flex-1",
                        )}
                      />
                    )}
                  </div>

                  <label
                    htmlFor={`step-${i}`}
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 pt-1 pr-0 lg:pt-6 lg:pr-6",
                      "text-muted-foreground group-has-checked/step:text-foreground",
                    )}
                  >
                    <span className="font-display text-lg text-foreground">
                      {step.title}
                    </span>
                    <span className="text-sm leading-relaxed">
                      {step.description}
                    </span>
                  </label>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
