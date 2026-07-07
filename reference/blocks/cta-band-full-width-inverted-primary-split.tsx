import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowRight, PhoneCall } from "lucide-react";

export function CtaBandFullWidthInvertedPrimarySplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-primary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
                {t("description")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-shrink-0">
              <a
                href={t("primaryHref")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-7 py-3.5 text-sm font-medium text-secondary-foreground transition-colors hover:opacity-90"
              >
                {t("primaryLabel")}
                <ArrowRight className="size-4" />
              </a>
              <a
                href={t("secondaryHref")}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <PhoneCall className="size-4" />
                {t("secondaryLabel")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
