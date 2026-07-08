import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  Ruler,
  PenTool,
  Cog,
  PackageCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Proceso técnico-industrial sobre fondo oscuro con retícula sutil tipo
 * plano (blueprint). Las tarjetas se disparan en diagonal ascendente
 * (cada una desplazada arriba-derecha respecto a la anterior) unidas por
 * una línea punteada de fondo. Numerales grandes en outline, iconos
 * monolínea, tono denso.
 */

type Step = {
  number: string;
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  ruler: Ruler,
  "pen-tool": PenTool,
  cog: Cog,
  "package-check": PackageCheck,
  wrench: Wrench,
};

const OFFSET_Y = [
  "lg:translate-y-0",
  "lg:-translate-y-6",
  "lg:-translate-y-12",
  "lg:-translate-y-20",
  "lg:-translate-y-28",
];

const OFFSET_X = [
  "lg:translate-x-0",
  "lg:translate-x-3",
  "lg:translate-x-6",
  "lg:translate-x-9",
  "lg:translate-x-12",
];

export function ProcessDiagonalDarkTechnicalBlueprint({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];
  const maxOffset = OFFSET_Y.length - 1;

  return (
    <section className="relative overflow-hidden border-t border-background/15 bg-foreground py-(--section-gap)">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--background) 1px, transparent 1px), linear-gradient(to bottom, var(--background) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/65">
            {t("description")}
          </p>
        </Reveal>

        <div className="relative mt-24 lg:mt-28 lg:pb-16">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-primary/50 lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line
              x1="4"
              y1="88"
              x2="96"
              y2="6"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2.5 2.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon] ?? Cog;
              const offsetIndex = Math.min(i, maxOffset);
              return (
                <li key={step.number}>
                  <Reveal delay={i * 80}>
                    <div
                      className={cn(
                        "relative border border-background/15 bg-background/[0.04] p-6",
                        OFFSET_Y[offsetIndex],
                        OFFSET_X[offsetIndex],
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-3 right-3 font-display text-6xl leading-none text-transparent select-none"
                        style={{ WebkitTextStroke: "1px var(--background)", opacity: 0.25 }}
                      >
                        {step.number}
                      </span>
                      <div className="relative flex size-11 items-center justify-center border border-primary/40 bg-foreground">
                        <Icon
                          className="size-5 text-primary"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="relative mt-6 font-mono text-xs tracking-[0.2em] text-primary uppercase">
                        {step.number}
                      </p>
                      <h3 className="relative mt-2 font-display text-lg text-background">
                        {step.title}
                      </h3>
                      <p className="relative mt-3 text-sm leading-relaxed text-background/65">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
