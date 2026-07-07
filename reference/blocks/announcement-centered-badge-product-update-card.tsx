import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiArrowRightLine, RiSparkling2Line } from "@remixicon/react";

export function AnnouncementCenteredBadgeProductUpdateCard({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-lg border border-border bg-card px-8 py-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium tracking-wide text-secondary-foreground uppercase">
              <RiSparkling2Line className="size-3.5 text-primary" aria-hidden="true" />
              {t("badge")}
            </span>

            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>

            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("description")}
            </p>

            <p className="text-xs text-muted-foreground">{t("meta")}</p>

            <a
              href={t("ctaHref")}
              className="mt-2 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {t("ctaLabel")}
              <RiArrowRightLine className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
