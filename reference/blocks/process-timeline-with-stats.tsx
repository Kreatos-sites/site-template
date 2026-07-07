import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Step = {
  title: string;
  description: string;
};

type Stat = {
  value: string;
  label: string;
};

type Cta = {
  title: string;
  description: string;
  label: string;
  href: string;
};

export function ProcessTimelineWithStats({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];
  const stats = t.raw("stats") as Stat[];
  const cta = t.raw("cta") as Cta;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <div
                className="mt-8 h-px w-24 bg-primary/70"
                aria-hidden="true"
              />

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-[clamp(1.75rem,2vw,2.5rem)] leading-none tabular-nums tracking-tight text-primary">
                      {stat.value}
                    </dd>
                    <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 rounded-sm border border-border bg-card p-6">
                <h3 className="font-display text-lg tracking-tight text-balance text-foreground">
                  {cta.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cta.description}
                </p>
                <a
                  href={cta.href}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-primary"
                >
                  {cta.label}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
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
