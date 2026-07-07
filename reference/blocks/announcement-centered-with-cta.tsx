import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiSparklingLine, RiArrowRightLine } from "@remixicon/react";

export function AnnouncementCenteredWithCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-lg border border-border bg-card px-8 py-14 sm:px-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
              <RiSparklingLine className="size-3.5 text-primary" />
              {t("badge")}
              <span className="text-muted-foreground">{t("version")}</span>
            </span>

            <div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>

            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              {t("meta")}
            </p>

            <a
              href={t("ctaHref")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              {t("ctaLabel")}
              <RiArrowRightLine className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
