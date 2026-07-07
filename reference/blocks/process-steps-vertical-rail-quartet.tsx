import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  ClipboardList,
  Compass,
  Hammer,
  PackageCheck,
  FileSignature,
  Truck,
  ShieldCheck,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  clipboard: ClipboardList,
  compass: Compass,
  hammer: Hammer,
  package: PackageCheck,
  contract: FileSignature,
  truck: Truck,
  shield: ShieldCheck,
  phone: PhoneCall,
};

/**
 * Riel vertical conectado de pasos numerados con círculo de icono
 * delimitado (borde, sin relleno) y contador monoespaciado separado del
 * título. Pensado para un recorrido de proceso detallado (4 pasos) donde
 * cada etapa necesita título + descripción de una línea.
 */
export function ProcessStepsVerticalRailQuartet({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ol className="mt-16 max-w-3xl">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon] ?? ClipboardList;
            const isLast = index === steps.length - 1;

            return (
              <Reveal key={index} delay={index * 60}>
                <li className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <span
                      className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
                      aria-hidden="true"
                    >
                      <Icon className="size-6 text-primary" strokeWidth={1.75} />
                    </span>
                    {!isLast && (
                      <span
                        className="mt-1 w-px flex-1 bg-border"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className={isLast ? "pb-0" : "pb-14"}>
                    <span className="font-mono text-sm tracking-wide text-muted-foreground tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-xl tracking-tight text-balance text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
