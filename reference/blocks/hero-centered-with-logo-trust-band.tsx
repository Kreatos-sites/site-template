import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowRightIcon } from "lucide-react";

type Cta = { label: string; href: string };

export function HeroCenteredWithLogoTrustBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const primaryCta = t.raw("primaryCta") as Cta;
  const secondaryCta = t.raw("secondaryCta") as Cta;
  const logos = t.raw("logos") as string[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02] tracking-tight text-balance text-foreground">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              {primaryCta.label}
              <ArrowRightIcon className="size-4" />
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {secondaryCta.label}
            </a>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-20 border-t border-border pt-10">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {t("trustLabel")}
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {logos.map((logo, i) => (
                <li
                  key={i}
                  className="font-display text-lg font-semibold tracking-tight text-muted-foreground"
                >
                  {logo}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
