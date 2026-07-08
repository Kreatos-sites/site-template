import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

export function CtaFullbleedImageDarkOverlayCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden border-t border-border py-(--section-gap)">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />

      <div className="relative mx-auto flex min-h-[28rem] w-full max-w-6xl flex-col items-center justify-end px-6 py-16 text-center lg:px-8 lg:py-24">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-background/80 uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/85">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <a
            href={t("cta.href")}
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-background focus-visible:outline-none"
          >
            {t("cta.label")}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
