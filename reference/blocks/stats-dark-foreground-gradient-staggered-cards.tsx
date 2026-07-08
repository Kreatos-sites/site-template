import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Cpu,
  GitBranch,
  Layers,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from "lucide-react";

type Stat = { icon: string; value: string; label: string };

const ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  branch: GitBranch,
  layers: Layers,
  shield: ShieldCheck,
  timer: Timer,
};

/**
 * Banda de cifras técnicas sobre fondo bg-foreground (oscuro), con un
 * gradiente radial sutil hacia el color primary anclado en la esquina
 * superior derecha (truco text-primary + currentColor, sin hex). Grid de
 * 4-5 tarjetas hairline con desplazamiento vertical alternado: las
 * tarjetas pares bajan medio paso (translate-y) para romper la retícula.
 * Cada tarjeta trae ícono, cifra oversized en tono claro y label. Densidad
 * media, motivo técnico/SaaS.
 */
export function StatsDarkForegroundGradientStaggeredCards({
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
        className="pointer-events-none absolute inset-0 text-primary opacity-25 [background-image:radial-gradient(ellipse_60%_55%_at_92%_8%,currentColor,transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-background/70">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
          {stats.map((stat, index) => {
            const Icon = ICONS[stat.icon] ?? Cpu;
            const isStaggered = index % 2 === 1;
            return (
              <li key={index} className={isStaggered ? "lg:translate-y-10" : undefined}>
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-5 rounded-sm border border-background/15 bg-background/[0.04] p-6">
                    <span className="inline-flex size-9 items-center justify-center rounded-sm border border-background/15 bg-background/5">
                      <Icon className="size-4 text-primary" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] leading-none tracking-tight text-background tabular-nums">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-xs font-medium tracking-[0.15em] text-background/60 uppercase">
                        {stat.label}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
