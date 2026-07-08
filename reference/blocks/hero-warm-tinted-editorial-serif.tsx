import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type Cta = { label: string; href: string };

/**
 * Hero editorial de fondo tintado cálido (bg-secondary). Composición
 * off-center: la cita/headline en serif oversized domina como pieza
 * tipográfica, con eyebrow y CTA discreto alineados a la izquierda en
 * una columna angosta. Sin imagen, sin grid: pura jerarquía tipográfica.
 */
export function HeroWarmTintedEditorialSerif({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const primaryCta = t.raw("primaryCta") as Cta;

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="ml-0 max-w-3xl lg:ml-[8%]">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-8 font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.08] tracking-tight text-balance text-foreground">
              {t("quote")}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 text-sm font-medium tracking-[0.05em] text-muted-foreground uppercase">
              {t("attribution")}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-12 border-t border-border pt-8">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                {t("subtitle")}
              </p>
              <a
                href={primaryCta.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none"
              >
                {primaryCta.label}
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
