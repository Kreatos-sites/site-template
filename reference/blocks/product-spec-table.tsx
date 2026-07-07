import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type SpecRow = { label: string; value: string };
type SpecGroup = { heading: string; rows: SpecRow[] };

export function ProductSpecTable({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const groups = t.raw("groups") as SpecGroup[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,20rem)_1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <div className="mt-8 h-px w-16 bg-primary/70" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="flex flex-col">
            {groups.map((group, groupIndex) => (
              <Reveal key={group.heading} delay={groupIndex * 80}>
                <div className="border-t border-border pt-8 pb-10 first:border-t-0 first:pt-0">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-display text-sm tabular-nums text-muted-foreground/70"
                      aria-hidden="true"
                    >
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl tracking-tight text-foreground">
                      {group.heading}
                    </h3>
                  </div>

                  <dl className="mt-6 divide-y divide-border/70">
                    {group.rows.map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8"
                      >
                        <dt className="text-sm text-muted-foreground">
                          {row.label}
                        </dt>
                        <dd className="text-sm font-medium text-foreground text-pretty sm:text-base">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
