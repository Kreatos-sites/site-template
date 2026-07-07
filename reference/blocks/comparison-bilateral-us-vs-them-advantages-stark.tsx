import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type ComparisonItem = {
  label: string;
  us: string;
  them: string;
};

export function ComparisonBilateralUsVsThemAdvantagesStark({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const items = t.raw("items") as ComparisonItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 overflow-hidden rounded-lg border border-border lg:mt-24">
          <div className="grid grid-cols-2">
            <div className="flex items-center justify-center border-b border-border bg-primary px-4 py-5">
              <span className="text-sm font-semibold tracking-wide text-primary-foreground uppercase">
                {t("usLabel")}
              </span>
            </div>
            <div className="flex items-center justify-center border-b border-l border-border bg-secondary px-4 py-5">
              <span className="text-sm font-semibold tracking-wide text-secondary-foreground uppercase">
                {t("themLabel")}
              </span>
            </div>
          </div>

          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 60} className="contents">
              <div
                className={cn(
                  "grid grid-cols-2",
                  i > 0 && "border-t border-border",
                )}
              >
                <div className="flex items-start gap-3 bg-card px-6 py-6">
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">
                      {item.us}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-l border-border bg-background px-6 py-6">
                  <X
                    className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-through decoration-muted-foreground/50">
                      {item.them}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
