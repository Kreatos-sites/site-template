import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { BadgeCheck, type LucideIcon } from "lucide-react";

/**
 * BLOQUE: stats-bento-narrative — bento con imagen ancha, narrativa indentada
 * y grid 2×2 de cifras contextuales con marca de validación (check).
 *
 * ns esperado:
 *   {
 *     eyebrow: string,
 *     title: string,
 *     lead: string,
 *     body: string[],
 *     image: string,
 *     imageAlt: string,
 *     stats: [{ value: string, label: string, description: string }]  // 4 items
 *   }
 */
type Stat = { value: string; label: string; description: string };

const MARK_ICON: LucideIcon = BadgeCheck;

export function StatsBentoNarrative({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const body = t.raw("body") as string[];
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Imagen ancha */}
          <Reveal className="lg:col-span-7">
            <SmartImage
              src={t("image")}
              alt={t("imageAlt")}
              className="aspect-[16/11] w-full rounded-sm"
            />
          </Reveal>

          {/* Narrativa indentada */}
          <div className="lg:col-span-5 lg:pl-6">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 border-l-2 border-primary pl-5 font-display text-[clamp(1.9rem,1.2rem+2.6vw,3rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={60}>
              <p className="mt-6 border-l-2 border-primary pl-5 text-lg leading-relaxed text-foreground">
                {t("lead")}
              </p>
            </Reveal>

            <div className="mt-4 space-y-4 border-l-2 border-border pl-5">
              {body.map((paragraph, index) => (
                <Reveal key={index} delay={(index + 2) * 60}>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Grid 2x2 de cifras con marca de validación */}
        <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 60} className="contents">
              <div className="flex flex-col gap-3 bg-card p-8">
                <div className="flex items-center gap-2">
                  <MARK_ICON
                    className="size-4 text-primary"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                </div>
                <dd className="font-display text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-none tracking-tight text-foreground tabular-nums">
                  {stat.value}
                </dd>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
