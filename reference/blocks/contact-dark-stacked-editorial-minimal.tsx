import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

export function ContactDarkStackedEditorialMinimal({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-background/70 text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-20 flex w-full flex-col items-center gap-10 sm:mt-24 sm:gap-12">
          <Reveal delay={180}>
            <a
              href={`mailto:${t("email")}`}
              className="font-mono text-[clamp(1.5rem,5vw,2.75rem)] leading-none tracking-tight text-background underline decoration-primary/40 decoration-1 underline-offset-8 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {t("email")}
            </a>
          </Reveal>

          <Reveal delay={240}>
            <a
              href={`tel:${t("phoneRaw")}`}
              className="font-mono text-[clamp(1.5rem,5vw,2.75rem)] leading-none tracking-tight text-background underline decoration-primary/40 decoration-1 underline-offset-8 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {t("phone")}
            </a>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <p className="mt-20 text-xs tracking-[0.2em] text-background/50 uppercase sm:mt-24">
            {t("footnote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
