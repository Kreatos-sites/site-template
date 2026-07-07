import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = {
  title: string;
  description: string;
  status: "done" | "current" | "upcoming";
};

export function ProcessStepperHorizontalNumberedCompletedState({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, i) => (
            <li key={i} className="relative">
              <Reveal delay={i * 80}>
                <div className="flex items-center gap-3 lg:block">
                  <div className="relative flex items-center lg:mb-6 lg:w-full">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                        step.status === "done" &&
                          "border-primary bg-primary text-primary-foreground",
                        step.status === "current" &&
                          "border-primary bg-background text-primary ring-2 ring-primary/30",
                        step.status === "upcoming" &&
                          "border-border bg-secondary text-muted-foreground",
                      )}
                    >
                      {step.status === "done" ? <Check className="size-4" strokeWidth={2} /> : i + 1}
                    </span>
                    {i < steps.length - 1 && (
                      <span
                        className={cn(
                          "hidden h-px flex-1 lg:ml-3 lg:block",
                          step.status === "done" ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
