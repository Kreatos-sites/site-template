import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Step = { title: string; description: string };

export function ProcessHorizontal({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];
  const total = steps.length;

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ol className="relative mt-16 grid gap-x-8 gap-y-12 md:grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
          style={{ ["--steps" as string]: total }}
        >
          {steps.map((step, index) => {
            const isLast = index === total - 1;
            return (
              <li key={step.title} className="relative">
                <Reveal delay={index * 90}>
                  <div className="relative">
                    {/* Línea conectora horizontal (solo desktop, no en el último) */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute top-4 left-[calc(2rem+0.75rem)] hidden h-px w-[calc(100%-2rem)] border-t border-dashed border-border md:block"
                      />
                    )}

                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background font-display text-sm text-primary tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-border md:hidden"
                      />
                    </div>

                    <div className="mt-6 md:pr-8">
                      <h3 className="font-display text-lg tracking-tight text-balance">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
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
