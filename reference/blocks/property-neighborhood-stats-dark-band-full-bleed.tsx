import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { Footprints, GraduationCap, TrainFront, Timer } from "lucide-react";

/**
 * Banda a sangre completa en bg-foreground oscuro con retícula sutil tipo
 * plano arquitectónico (blueprint grid) de fondo. Cifras grandes centradas
 * sobre el vecindario: caminabilidad, escuelas, transporte, tiempo al centro.
 * Layout centrado, motivo técnico, sin fotografía.
 */

type Stat = { icon: string; value: string; label: string; caption: string };

const ICONS: Record<string, typeof Footprints> = {
  walk: Footprints,
  school: GraduationCap,
  transit: TrainFront,
  commute: Timer,
};

export function PropertyNeighborhoodStatsDarkBandFullBleed({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--background) 1px, transparent 1px), linear-gradient(to bottom, var(--background) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-foreground via-transparent to-foreground opacity-80"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-background/70">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden border border-background/15 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = ICONS[stat.icon] ?? Footprints;
            return (
              <div
                key={stat.label}
                className="border-b border-background/15 bg-foreground last:border-b-0 sm:border-b-0 sm:[&:nth-child(2)]:border-l sm:[&:nth-child(4)]:border-l lg:[&:nth-child(2)]:border-l lg:[&:nth-child(3)]:border-l lg:[&:nth-child(4)]:border-l"
              >
                <Reveal delay={i * 60}>
                  <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
                    <Icon
                      className="size-5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <dd className="font-display text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] leading-none tracking-tight text-background tabular-nums">
                      {stat.value}
                    </dd>
                    <dt className="text-sm font-medium text-background/85">
                      {stat.label}
                    </dt>
                    <p className="text-xs leading-relaxed text-background/55">
                      {stat.caption}
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
