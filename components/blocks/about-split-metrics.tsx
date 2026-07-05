import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Metric = { value: string; label: string };

export function AboutSplitMetrics({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const body = t.raw("body") as string[];
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section id="nosotros" className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Columna imagen */}
          <Reveal>
            <div className="relative">
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] w-full rounded-sm object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              {/* Filete de acento: gesto de composición, no decoración vacía */}
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 h-px w-24 bg-primary"
              />
            </div>
          </Reveal>

          {/* Columna relato */}
          <div className="lg:pl-2">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,1.2rem+2.6vw,3rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4">
              {body.map((paragraph, index) => (
                <Reveal key={index} delay={index * 60}>
                  <p className="text-[1.02rem] leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Fila de métricas */}
            <Reveal delay={body.length * 60}>
              <dl className="mt-10 grid grid-cols-3 gap-x-6 border-t border-border pt-8">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd className="font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-none tracking-tight text-primary tabular-nums">
                      {metric.value}
                    </dd>
                    <p className="mt-2 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
