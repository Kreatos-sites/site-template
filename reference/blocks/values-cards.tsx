import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Value = { title: string; description: string };

export function ValuesCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const values = t.raw("values") as Value[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 60}>
              <article
                className={cn(
                  "group relative flex h-full min-h-[16rem] flex-col justify-between bg-card p-8 lg:p-10",
                  "transition-colors duration-500 hover:bg-secondary",
                )}
              >
                <div
                  aria-hidden="true"
                  className="flex items-baseline gap-3"
                >
                  <span className="font-display text-[clamp(2.75rem,6vw,4rem)] leading-none tracking-tight text-primary/40 tabular-nums transition-colors duration-500 group-hover:text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 translate-y-[-0.35em] bg-border" />
                </div>

                <div className="mt-10">
                  <h3 className="font-display text-xl tracking-tight text-balance text-foreground lg:text-2xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                    {value.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
