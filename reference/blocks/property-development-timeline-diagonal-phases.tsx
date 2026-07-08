import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  FileSignature,
  HardHat,
  Building2,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

/**
 * property-development-timeline-diagonal-phases
 *
 * Franjas diagonales alternadas (clip-path) que narran las fases del
 * desarrollo inmobiliario -preventa, cimentación, obra gris, entrega- con
 * barra de progreso y fecha por fase, sobre fondo en gradiente del color
 * primario del theme. Layout asimétrico denso, motivo técnico de bitácora
 * de obra: cada panel alterna dirección de corte e indentación lateral,
 * generando ritmo visual sin depender de una línea de tiempo vertical
 * convencional.
 *
 * ns: { eyebrow, title, description, phases: { code, name, date, progress,
 *       description }[] (4 items) }
 */

const PHASE_ICONS: LucideIcon[] = [FileSignature, HardHat, Building2, KeyRound];

type Phase = {
  code: string;
  name: string;
  date: string;
  progress: number;
  description: string;
};

export function PropertyDevelopmentTimelineDiagonalPhases({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const phases = t.raw("phases") as Phase[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-br from-primary/20 via-background to-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, var(--foreground) 0px, var(--foreground) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ol className="mt-16 flex flex-col gap-4">
          {phases.map((phase, i) => {
            const Icon = PHASE_ICONS[i % PHASE_ICONS.length];
            const isEven = i % 2 === 0;
            const onPrimary = isEven;
            const clipPath = isEven
              ? "polygon(0 0, 100% 0, 96% 100%, 0% 100%)"
              : "polygon(4% 0, 100% 0, 100% 100%, 0% 100%)";

            return (
              <li
                key={phase.code}
                className={cn(
                  "w-[92%] sm:w-[80%] lg:w-[70%]",
                  isEven ? "self-start" : "self-end",
                )}
              >
                <Reveal delay={i * 70}>
                  <div
                    style={{ clipPath }}
                    className={cn(
                      "border border-border px-8 py-8 sm:px-12",
                      onPrimary
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground",
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-sm border",
                            onPrimary
                              ? "border-primary-foreground/30 bg-primary-foreground/10"
                              : "border-border bg-secondary",
                          )}
                        >
                          <Icon className="size-5" strokeWidth={1.75} />
                        </span>
                        <span
                          className={cn(
                            "font-mono text-xs tracking-[0.2em] uppercase",
                            onPrimary
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground",
                          )}
                        >
                          {phase.code}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "font-mono text-xs tracking-wide",
                          onPrimary
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {phase.date}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl sm:text-2xl">
                      {phase.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-xl text-sm leading-relaxed",
                        onPrimary
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {phase.description}
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      <div
                        className={cn(
                          "h-1.5 flex-1 overflow-hidden rounded-sm",
                          onPrimary ? "bg-primary-foreground/20" : "bg-secondary",
                        )}
                      >
                        <div
                          className={cn(
                            "h-full rounded-sm",
                            onPrimary ? "bg-primary-foreground" : "bg-primary",
                          )}
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "shrink-0 font-mono text-xs tabular-nums",
                          onPrimary
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {phase.progress}%
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
