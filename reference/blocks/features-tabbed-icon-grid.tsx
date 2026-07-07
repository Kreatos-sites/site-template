import { useTranslations } from "next-intl";
import {
  Boxes,
  Truck,
  Warehouse,
  ShieldCheck,
  Radar,
  Clock,
  Route,
  Thermometer,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: features-tabbed-icon-grid — galería de características agrupadas
 * por categoría con pestañas y grid de tres columnas (icono, título,
 * descripción) por categoría. La navegación entre pestañas es 100% CSS
 * (radios nativos ocultos + selector :has() en el contenedor), sin JS de
 * cliente: cada pestaña es un <label> asociado a un <input type="radio">
 * que, vía :has(), controla qué panel de features se muestra y qué pestaña
 * queda resaltada.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     categories: [{ label: string, items: [{ icon: string, title: string, description: string }] }] }
 */
type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

type Category = {
  label: string;
  items: FeatureItem[];
};

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  truck: Truck,
  warehouse: Warehouse,
  shield: ShieldCheck,
  radar: Radar,
  clock: Clock,
  route: Route,
  thermometer: Thermometer,
  chart: BarChart3,
};

export function FeaturesTabbedIconGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as Category[];
  const idPrefix = ns.replace(/[^a-zA-Z0-9]/g, "-");

  const styleRules = categories
    .map(
      (_, i) => `
        .ft-${idPrefix}:has(#${idPrefix}-cat-${i}:checked) .ft-panel-${i} {
          display: grid;
        }
        .ft-${idPrefix}:has(#${idPrefix}-cat-${i}:checked) .ft-tab-${i} {
          border-color: var(--primary);
          background: var(--card);
          color: var(--foreground);
        }
      `,
    )
    .join("");

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

        <Reveal delay={80}>
          <div className={`ft-${idPrefix} relative mt-16`}>
            {categories.map((_, i) => (
              <input
                key={i}
                type="radio"
                id={`${idPrefix}-cat-${i}`}
                name={`${idPrefix}-category`}
                defaultChecked={i === 0}
                className="sr-only"
              />
            ))}

            <div
              role="tablist"
              className="flex flex-wrap gap-2 border-b border-border pb-4"
            >
              {categories.map((c, i) => (
                <label
                  key={i}
                  htmlFor={`${idPrefix}-cat-${i}`}
                  className={`ft-tab-${i} cursor-pointer rounded-sm border border-border bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground transition-colors`}
                >
                  {c.label}
                </label>
              ))}
            </div>

            <div className="mt-10">
              {categories.map((c, i) => (
                <ul
                  key={i}
                  className={`ft-panel-${i} hidden grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3`}
                >
                  {c.items.map((f, j) => {
                    const Icon = ICONS[f.icon] ?? Boxes;
                    return (
                      <li key={j} className="contents">
                        <article className="flex h-full flex-col gap-6 bg-card p-8">
                          <Icon
                            className="size-5 text-primary"
                            strokeWidth={1.75}
                          />
                          <div>
                            <h3 className="font-display text-xl text-foreground">
                              {f.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {f.description}
                            </p>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{styleRules}</style>
    </section>
  );
}
