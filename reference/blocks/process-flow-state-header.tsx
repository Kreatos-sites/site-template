import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "@remixicon/react";

type Step = {
  title: string;
  description: string;
  state: "completed" | "current" | "upcoming";
};

export function ProcessFlowStateHeader({ ns }: { ns: string }) {
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

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                        step.state === "completed" &&
                          "bg-primary text-primary-foreground",
                        step.state === "current" &&
                          "border-2 border-primary bg-background text-primary",
                        step.state === "upcoming" &&
                          "border border-border bg-secondary text-muted-foreground",
                      )}
                    >
                      {step.state === "completed" ? (
                        <RiCheckLine className="size-5" />
                      ) : (
                        i + 1
                      )}
                    </span>
                    {i < steps.length - 1 && (
                      <span
                        className={cn(
                          "hidden h-px flex-1 sm:block",
                          step.state === "completed"
                            ? "bg-primary"
                            : "bg-border",
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-display text-lg text-foreground",
                        step.state === "upcoming" && "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
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
