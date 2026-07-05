import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type Step = { title: string; description: string };

export function ProcessVertical({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <div
                className="mt-8 h-px w-24 bg-primary/70"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <ol className="relative border-l border-border">
            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 60}>
                <li className="relative pl-10 pb-14 last:pb-0 sm:pl-14">
                  <span
                    className="absolute top-1 left-0 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card font-display text-sm text-primary"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl tracking-tight text-balance text-foreground sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
