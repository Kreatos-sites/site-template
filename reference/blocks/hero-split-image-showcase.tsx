import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  ArrowUpRightIcon,
  TrendUpIcon,
  UsersThreeIcon,
  ClockCountdownIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: hero-split-image-showcase — hero a dos columnas: headline,
 * subheadline y dos CTAs a la izquierda; a la derecha una captura de
 * producto/proyecto enmarcada en un viewport con barra superior tipo
 * navegador, con dos tarjetas de estadística flotando sobre los bordes
 * inferior y superior de la imagen. Se apila en mobile.
 *
 * ns: { eyebrow, title, subtitle, primaryCta: {label, href}, secondaryCta:
 *       {label, href}, image, imageAlt, stats: [{icon, value, label}] (2 items) }
 */
export function HeroSplitImageShowcase({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as { icon: string; value: string; label: string }[];

  const ICONS: Record<string, typeof TrendUpIcon> = {
    trend: TrendUpIcon,
    users: UsersThreeIcon,
    clock: ClockCountdownIcon,
  };

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Columna texto */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("primaryCta.label")}
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna viewport con imagen y tarjetas de estadística */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="relative pt-6 pb-10">
                <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                  <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-3">
                    <span className="size-2 rounded-full bg-muted-foreground/30" />
                    <span className="size-2 rounded-full bg-muted-foreground/30" />
                    <span className="size-2 rounded-full bg-muted-foreground/30" />
                  </div>
                  <SmartImage
                    src={t("image")}
                    alt={t("imageAlt")}
                    className="aspect-[4/3]"
                  />
                </div>

                {stats.map((stat, i) => {
                  const Icon = ICONS[stat.icon] ?? TrendUpIcon;
                  return (
                    <div
                      key={stat.label}
                      className={
                        i === 0
                          ? "absolute -top-2 -left-2 hidden items-center gap-3 rounded-sm border border-border bg-card p-4 shadow-sm sm:flex"
                          : "absolute -right-2 -bottom-2 hidden items-center gap-3 rounded-sm border border-border bg-card p-4 shadow-sm sm:flex"
                      }
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-lg leading-none tracking-tight text-foreground tabular-nums">
                          {stat.value}
                        </p>
                        <p className="mt-1.5 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
