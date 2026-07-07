import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Metric = {
  value: string;
  label: string;
  detail?: string;
};

export function MetricsColumns({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const eyebrow = t("eyebrow");
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {eyebrow ? (
          <Reveal>
            <p className="mb-14 max-w-md text-xs font-medium uppercase tracking-[0.25em] text-primary">
              {eyebrow}
            </p>
          </Reveal>
        ) : null}

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal key={index} delay={index * 60}>
              <div
                className={cn(
                  "flex h-full flex-col gap-5 py-2 sm:py-0",
                  "sm:border-l sm:border-border sm:pl-8",
                  "lg:pl-10",
                  index % 2 === 0 ? "sm:border-l-0 sm:pl-0 lg:border-l lg:pl-10" : null,
                  index === 0 ? "lg:border-l-0 lg:pl-0" : null,
                )}
              >
                <dd className="font-display text-[clamp(2.75rem,6vw,4.25rem)] font-semibold leading-none tracking-tight text-balance text-foreground">
                  {metric.value}
                </dd>
                <div className="flex flex-col gap-2">
                  <dt className="text-sm font-medium tracking-tight text-foreground">
                    {metric.label}
                  </dt>
                  {metric.detail ? (
                    <p className="max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
                      {metric.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
