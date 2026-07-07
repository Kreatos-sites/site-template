import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = {
  title: string;
  description: string;
  status: "done" | "current" | "upcoming";
};

/**
 * Stepper vertical con nodos numerados conectados por un riel, para
 * describir el flujo de un procedimiento o tratamiento clínico. Cada
 * nodo refleja su estado (completado, actual, próximo) con estilos
 * semánticos derivados del theme.
 */
export function TreatmentProcedureStepsVertical({ ns }: { ns: string }) {
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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ol className="mt-16 max-w-2xl">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-10 left-5 h-[calc(100%-2.5rem)] w-px -translate-x-1/2",
                      step.status === "done" ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
                <Reveal delay={index * 60} className="contents">
                  <span
                    className={cn(
                      "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                      step.status === "done" &&
                        "border-primary bg-primary text-primary-foreground",
                      step.status === "current" &&
                        "border-primary bg-background text-primary ring-4 ring-primary/15",
                      step.status === "upcoming" &&
                        "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {step.status === "done" ? (
                      <Check className="size-4" strokeWidth={2.25} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <div className="pt-1.5">
                    <h3
                      className={cn(
                        "font-display text-lg text-foreground",
                        step.status === "upcoming" && "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
