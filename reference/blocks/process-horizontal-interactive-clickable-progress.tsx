import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiFileList3Line,
  RiCalculatorLine,
  RiTruckLine,
  RiCheckboxCircleLine,
  type RemixiconComponentType,
} from "@remixicon/react";

/**
 * BLOQUE: process-horizontal-interactive-clickable-progress — stepper
 * horizontal con barra de progreso rellenada y pasos clickeables (radios
 * nativos, sin JS de cliente) que se colapsa a lista vertical en mobile.
 * Al hacer clic en un paso se resalta su círculo, se rellena la barra hasta
 * ahí y se muestra su descripción debajo. Asume exactamente 4 pasos.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, groupLabel: string,
 *     steps: [{ icon: string, title: string, description: string }] (4) }
 */
type Step = { icon: string; title: string; description: string };

const ICONS: Record<string, RemixiconComponentType> = {
  request: RiFileList3Line,
  quote: RiCalculatorLine,
  execution: RiTruckLine,
  delivery: RiCheckboxCircleLine,
};

// Clases "consumidoras" de Tailwind: deben aparecer literalmente en el
// código fuente para que el escaneo JIT las genere (no se pueden armar
// con template strings dinámicos).
const CIRCLE_ACTIVE = [
  "peer-checked/step-0:bg-primary peer-checked/step-0:text-primary-foreground peer-checked/step-0:border-primary",
  "peer-checked/step-1:bg-primary peer-checked/step-1:text-primary-foreground peer-checked/step-1:border-primary",
  "peer-checked/step-2:bg-primary peer-checked/step-2:text-primary-foreground peer-checked/step-2:border-primary",
  "peer-checked/step-3:bg-primary peer-checked/step-3:text-primary-foreground peer-checked/step-3:border-primary",
];

const LABEL_ACTIVE = [
  "peer-checked/step-0:text-foreground",
  "peer-checked/step-1:text-foreground",
  "peer-checked/step-2:text-foreground",
  "peer-checked/step-3:text-foreground",
];

// Segmento i (entre el paso i y el i+1) se rellena si CUALQUIER paso
// posterior está seleccionado.
const SEGMENT_ACTIVE = [
  "peer-checked/step-1:bg-primary peer-checked/step-2:bg-primary peer-checked/step-3:bg-primary",
  "peer-checked/step-2:bg-primary peer-checked/step-3:bg-primary",
  "peer-checked/step-3:bg-primary",
];

const PANEL_ACTIVE = [
  "peer-checked/step-0:block",
  "peer-checked/step-1:block",
  "peer-checked/step-2:block",
  "peer-checked/step-3:block",
];

export function ProcessHorizontalInteractiveClickableProgress({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const steps = (t.raw("steps") as Step[]).slice(0, 4);

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <fieldset className="mt-16 border-0 p-0">
            <legend className="sr-only">{t("groupLabel")}</legend>

            {steps.map((_, i) => (
              <input
                key={`radio-${i}`}
                type="radio"
                id={`hiwcp-step-${i}`}
                name="hiwcp-progress"
                defaultChecked={i === 0}
                className={`peer/step-${i} sr-only`}
              />
            ))}

            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-0">
              {steps.map((step, i) => {
                const Icon = ICONS[step.icon] ?? RiFileList3Line;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-1 flex-row items-center gap-4 sm:flex-col sm:items-stretch sm:gap-0",
                    )}
                  >
                    <div className="flex items-center sm:w-full">
                      <label
                        htmlFor={`hiwcp-step-${i}`}
                        aria-label={step.title}
                        className={cn(
                          "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors focus-within:ring-2 focus-within:ring-primary",
                          CIRCLE_ACTIVE[i],
                        )}
                      >
                        <Icon className="size-5" />
                      </label>
                      {i < steps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "hidden h-px flex-1 bg-border transition-colors sm:mx-3 sm:block",
                            SEGMENT_ACTIVE[i],
                          )}
                        />
                      )}
                    </div>

                    <label
                      htmlFor={`hiwcp-step-${i}`}
                      className={cn(
                        "mt-0 cursor-pointer text-sm font-medium text-muted-foreground transition-colors sm:mt-4",
                        LABEL_ACTIVE[i],
                      )}
                    >
                      {step.title}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 border-t border-border pt-10">
              {steps.map((step, i) => (
                <div key={i} className={cn("hidden", PANEL_ACTIVE[i])}>
                  <h3 className="font-display text-xl text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </fieldset>
        </Reveal>
      </div>
    </section>
  );
}
