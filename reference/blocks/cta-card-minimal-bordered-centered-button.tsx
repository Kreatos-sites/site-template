import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiArrowRightLine } from "@remixicon/react";

export function CtaCardMinimalBorderedCenteredButton({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-lg border border-border bg-secondary px-8 py-12 text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.1] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
            <a
              href={t("ctaHref")}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
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
