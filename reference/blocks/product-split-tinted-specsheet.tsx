import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Gauge } from "lucide-react";

type Spec = { label: string; value: string };

export function ProductSplitTintedSpecsheet({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const specs = t.raw("specs") as Spec[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={60}>
            <div className="relative flex h-full min-h-[22rem] items-center justify-center rounded-sm bg-secondary p-8 sm:p-12">
              <div className="absolute top-6 left-6 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {t("modelLabel")}
              </div>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] w-full max-w-xs rounded-sm shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-sm border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <Gauge className="size-4 text-primary" strokeWidth={1.75} />
                <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                  {t("specsheetLabel")}
                </span>
              </div>
              <dl className="divide-y divide-border font-mono">
                {specs.map((s, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4 px-5 py-3">
                    <dt className="shrink-0 text-xs tracking-[0.05em] text-muted-foreground uppercase">{s.label}</dt>
                    <dd className="truncate text-right text-sm text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto border-t border-border px-5 py-4">
                <p className="text-xs leading-relaxed text-muted-foreground">{t("footnote")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
