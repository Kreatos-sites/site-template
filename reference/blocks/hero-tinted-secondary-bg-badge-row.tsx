import { useTranslations } from "next-intl";
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type Cta = { label: string; href: string };
type Badge = { icon: string; label: string };

/**
 * Hero con fondo sólido tintado (bg-secondary) de ancho completo,
 * contenido centrado y una fila de badges de confianza justo debajo del
 * CTA. Sin imagen: aireado y claro, para transmitir credibilidad
 * inmediata en la primera pantalla.
 */
export function HeroTintedSecondaryBgBadgeRow({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const primaryCta = t.raw("primaryCta") as Cta;
  const badges = t.raw("badges") as Badge[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02] tracking-tight text-balance text-foreground">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex justify-center">
            <a
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              {primaryCta.label}
              <ArrowRightIcon className="size-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 border-t border-border pt-10">
            {badges.map((badge, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <ShieldCheckIcon
                  className="size-4 shrink-0 text-primary"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {badge.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
