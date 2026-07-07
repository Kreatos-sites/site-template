import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Step = { title: string; description: string };

export function ProcessStepperHorizontalInteractiveClickableResponsive({ ns }: { ns: string }) {
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

        <ol className="mt-16 flex flex-col sm:flex-row sm:items-start">
          {steps.map((step, i) => (
            <li key={i} className="relative flex sm:flex-1 sm:flex-col">
              <Reveal delay={i * 80}>
                <div className="flex items-center sm:w-full">
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full border font-display text-sm",
                      i === 0
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground",
                    )}
                  >
                    {i + 1}
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      "h-px flex-1 bg-border sm:ml-2 sm:mr-0",
                      i === steps.length - 1 && "sm:hidden",
                    )}
                  />
                  <span
                    aria-hidden
                    className="ml-5 h-full w-px flex-1 bg-border sm:hidden data-[last=true]:hidden"
                    data-last={i === steps.length - 1}
                  />
                </div>
                <div className="mt-4 mb-10 ml-[3.25rem] sm:mt-6 sm:mb-0 sm:ml-0 sm:pr-6">
                  <h3 className="font-display text-lg text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
