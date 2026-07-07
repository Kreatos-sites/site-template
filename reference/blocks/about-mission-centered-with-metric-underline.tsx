import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type Metric = { value: string; label: string };

export function AboutMissionCenteredWithMetricUnderline({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-10 border-t border-primary/40 pt-10 sm:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                  {m.value}
                </dd>
                <p className="mt-2 text-xs leading-snug text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
