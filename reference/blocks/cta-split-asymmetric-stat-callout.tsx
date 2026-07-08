import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowRight } from "lucide-react";

export function CtaSplitAsymmetricStatCallout({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center lg:gap-16">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <a
                href={t("ctaHref")}
                className="mt-9 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                {t("ctaLabel")}
                <ArrowRight className="size-4" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="border-t border-border pt-10 lg:col-span-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
              <p className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-medium tracking-tight text-primary">
                {t("statValue")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t("statLabel")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
