import { useTranslations } from "next-intl";
import { PackageSearch, ArrowRight, LifeBuoy } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

export function EmptyStateDualActionCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-lg border border-border bg-card p-10 text-center sm:p-14">
            <div className="relative flex size-16 items-center justify-center rounded-md bg-secondary">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-md bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,var(--border)_6px,var(--border)_7px)] opacity-40"
              />
              <PackageSearch
                aria-hidden="true"
                className="relative size-7 text-primary"
                strokeWidth={1.5}
              />
            </div>

            <p className="mt-6 text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("description")}
            </p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
              <a
                href={t("primaryHref")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:w-auto"
              >
                {t("primaryCta")}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={t("secondaryHref")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:w-auto"
              >
                {t("secondaryCta")}
              </a>
            </div>

            <div className="mt-8 flex w-full items-center justify-center gap-2 border-t border-border pt-6">
              <LifeBuoy aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t("supportText")}{" "}
                <a
                  href={t("supportHref")}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t("supportCta")}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
