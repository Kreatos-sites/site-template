import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Step = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function ProcessStickyImageSteps({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,20rem)_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <span
                aria-hidden="true"
                className="mt-8 hidden h-px w-24 bg-border lg:block"
              />
            </Reveal>
          </div>

          <ol className="flex flex-col gap-16 lg:gap-24">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 60}>
                  <article className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-10">
                    <div
                      className={
                        index % 2 === 1 ? "sm:order-2" : undefined
                      }
                    >
                      <SmartImage
                        src={step.image}
                        alt={step.imageAlt}
                        className="aspect-[4/5] rounded-sm"
                      />
                    </div>
                    <div className={index % 2 === 1 ? "sm:order-1" : undefined}>
                      <span
                        aria-hidden="true"
                        className="font-display text-4xl leading-none text-primary/40 tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-display text-xl leading-snug tracking-tight text-balance text-foreground md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
