import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { RiCheckLine } from "@remixicon/react";

/**
 * BLOQUE: feature-dense-checklist-two-column — lista de verificación densa en
 * dos columnas sin tarjetas ni imágenes: encabezado corto alineado a la
 * izquierda y, a la derecha, una retícula de renglones con cuadrado marcado,
 * etiqueta en negritas y una línea de descripción corta. Ideal para un
 * inventario de "todo lo incluido" (alcance de servicio, entregables,
 * cobertura de plan) que debe escanearse rápido sin distraerse con imágenes.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     items: [{ label: string, description: string }] }
 */
type Item = { label: string; description: string };

export function FeatureDenseChecklistTwoColumn({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("description")}
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
            {items.map((item, index) => (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground"
                    >
                      <RiCheckLine className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-base leading-snug text-foreground sm:text-lg">
                        {item.label}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
