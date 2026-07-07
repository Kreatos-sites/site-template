import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function BorderedConversionPanelSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="border border-border">
            <div className="flex flex-col gap-8 p-6 md:p-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 max-w-xl">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-foreground">
                  {t("title")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
                  {t("description")}
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:shrink-0">
                <Link
                  href={t("primaryCta.href")}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("primaryCta.label")}
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("secondaryCta.label")}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-border px-6 py-4 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
              <span>{t("footnote")}</span>
              <span>{t("reference")}</span>
            </div>

            <Reveal delay={80}>
              <div className="bg-primary px-6 py-3 text-primary-foreground md:px-10">
                <p className="text-[11px] tracking-[0.25em] uppercase">{t("trustLine")}</p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
