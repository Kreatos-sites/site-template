import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function CtaDiagonalSplitForegroundDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm bg-foreground">
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative z-10 flex flex-col justify-center px-8 py-16 sm:px-12 lg:py-20">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-5 max-w-md font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
                  {t("title")}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-background/70">
                  {t("description")}
                </p>
              </div>

              <div
                className={cn(
                  "relative flex flex-col items-start justify-center gap-8 bg-primary px-8 py-16 sm:px-12 lg:py-20",
                  "[clip-path:polygon(0_100%,0_18%,100%_0,100%_100%)] lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]",
                )}
              >
                <div>
                  <p className="font-display text-4xl leading-none tracking-tight text-primary-foreground">
                    {t("statValue")}
                  </p>
                  <p className="mt-2 text-xs tracking-[0.1em] text-primary-foreground/70 uppercase">
                    {t("statLabel")}
                  </p>
                </div>

                <a
                  href={t("ctaHref")}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-7 py-3.5 text-sm font-medium text-secondary-foreground transition-colors hover:opacity-90"
                >
                  {t("ctaLabel")}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
