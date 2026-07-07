import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Building2,
  Ruler,
  HardHat,
  Wrench,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

type Cell = {
  icon: string;
  title: string;
  description: string;
  detail: string;
};

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  ruler: Ruler,
  hardhat: HardHat,
  wrench: Wrench,
  clipboard: ClipboardCheck,
};

/**
 * Bento asimétrico: una celda flagship 2x2 + cuatro celdas periféricas 1x1.
 * Cada celda es un <details>/<summary> nativo (sin JS de cliente): al abrir
 * una, revela su detalle y difumina/atenúa a sus vecinas vía CSS puro
 * (`group-has-[details[open]]` + `open:` con important para ganar la
 * cascada sin depender del orden de generación de utilidades).
 */
export function FeatureBentoAsymmetricExpandableMotion({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const flagship = t.raw("flagship") as Cell;
  const items = t.raw("items") as Cell[];
  const FlagshipIcon = ICONS[flagship.icon] ?? Building2;

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

        <div className="group/bento mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <details className="group h-full cursor-pointer bg-card p-8 transition-all duration-300 group-has-[details[open]]/bento:opacity-40 group-has-[details[open]]/bento:blur-[1px] open:opacity-100! open:blur-none!">
              <summary className="flex list-none flex-col gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <FlagshipIcon className="size-8 text-primary" strokeWidth={1.5} />
                <div>
                  <h3 className="font-display text-2xl text-foreground">
                    {flagship.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {flagship.description}
                  </p>
                </div>
              </summary>
              <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                {flagship.detail}
              </p>
            </details>
          </Reveal>

          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Wrench;
            return (
              <Reveal key={item.title} delay={(i + 1) * 60}>
                <details className="group h-full cursor-pointer bg-card p-6 transition-all duration-300 group-has-[details[open]]/bento:opacity-40 group-has-[details[open]]/bento:blur-[1px] open:opacity-100! open:blur-none!">
                  <summary className="flex list-none flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </summary>
                  <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </details>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
