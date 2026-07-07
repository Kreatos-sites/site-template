import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

type ComparisonPoint = {
  text: string;
  included: boolean;
};

type ComparisonColumn = {
  badge: string;
  name: string;
  summary: string;
  highlight: boolean;
  points: ComparisonPoint[];
};

export function PropertyCompetitivePositioningBilateralSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as ComparisonColumn[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {columns.map((column, i) => (
            <Reveal key={column.name} delay={i * 80}>
              <article
                className={cn(
                  "flex h-full flex-col gap-8 rounded-lg border p-8",
                  column.highlight
                    ? "border-primary bg-card shadow-sm"
                    : "border-border bg-secondary/40",
                )}
              >
                <div>
                  <span
                    className={cn(
                      "inline-flex rounded-sm px-3 py-1 text-xs font-medium tracking-[0.15em] uppercase",
                      column.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground",
                    )}
                  >
                    {column.badge}
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-foreground">{column.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{column.summary}</p>
                </div>

                <ul className="flex flex-col gap-4">
                  {column.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      {point.included ? (
                        <CheckIcon
                          className={cn(
                            "mt-0.5 size-5 shrink-0",
                            column.highlight ? "text-primary" : "text-foreground",
                          )}
                          strokeWidth={2}
                        />
                      ) : (
                        <XIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={2} />
                      )}
                      <span
                        className={cn(
                          "text-sm leading-relaxed",
                          point.included ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
