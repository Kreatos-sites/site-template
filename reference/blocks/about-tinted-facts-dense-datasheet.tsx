import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { Building2 } from "lucide-react";

type Fact = { label: string; value: string };

export function AboutTintedFactsDenseDatasheet({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const facts = t.raw("facts") as Fact[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal delay={60}>
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-foreground">{t("paragraphOne")}</p>
              <p className="text-base leading-relaxed text-muted-foreground">{t("paragraphTwo")}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-sm border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <Building2 className="size-4 text-primary" strokeWidth={1.75} />
                <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                  {t("datasheetLabel")}
                </span>
              </div>
              <dl className="divide-y divide-border">
                {facts.map((f, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4 px-5 py-3.5">
                    <dt className="shrink-0 text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
                      {f.label}
                    </dt>
                    <dd className="text-right font-display text-sm text-foreground">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
