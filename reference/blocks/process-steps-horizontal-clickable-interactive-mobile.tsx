import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Step = { title: string; summary: string; detail: string };

export function ProcessStepsHorizontalClickableInteractiveMobile({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];
  const activeIndex = 0;
  const progressPercent = steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 0;

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

        <div className="mt-16">
          <div className="relative hidden sm:block">
            <div className="absolute top-5 right-0 left-0 h-px bg-border" aria-hidden />
            <div
              className="absolute top-5 left-0 h-px bg-primary transition-[width]"
              style={{ width: `${progressPercent}%` }}
              aria-hidden
            />
            <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
              {steps.map((step, i) => (
                <li key={i} className="flex flex-col items-start pr-6 last:pr-0">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full border bg-background font-display text-sm",
                      i === activeIndex
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.summary}</p>
                </li>
              ))}
            </ol>
          </div>

          <ol className="flex flex-col gap-px bg-border sm:mt-10 sm:gap-px">
            {steps.map((step, i) => (
              <li key={i} className="bg-background">
                <Reveal delay={i * 60}>
                  <details className="group" open={i === activeIndex}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-card px-6 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:px-8">
                      <span className="flex items-center gap-4">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border font-display text-xs text-foreground sm:hidden">
                          {i + 1}
                        </span>
                        <span className="font-display text-base text-foreground">{step.title}</span>
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-lg text-primary transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 sm:px-8">
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                    </div>
                  </details>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
