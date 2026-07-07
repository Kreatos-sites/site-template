import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type ServiceLine = { name: string; description: string };

/**
 * Sección CUSTOM: los servicios del despacho como una RELACIÓN contable
 * —un ledger editorial— en lugar de las típicas cards. Cada servicio es un
 * renglón de estado de cuenta: folio tabular a la izquierda, concepto (h3)
 * y detalle en columnas asimétricas, separados por reglas finas que abren
 * y cierran la lista como un asiento. El folio, parco al reposo, se enciende
 * en primary al pasar el cursor (transición de color CSS, sin JS).
 *
 * Cumple el contrato de secciones custom:
 * - server component (sin "use client"); motion solo vía <Reveal> con stagger;
 * - copy 100% por next-intl con el `ns` de props (eyebrow, title, items[]);
 * - tokens semánticos del theme, cero colores literales;
 * - jerarquía de headings correcta (h2 de sección, h3 por servicio).
 */
export function ServicesLedger({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as ServiceLine[];

  return (
    <section id="servicios" className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-9">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] leading-[1.1] tracking-tight text-balance">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <ol className="mt-14 lg:mt-20">
          {items.map((item, index) => (
            <li key={item.name} className="border-t border-border last:border-b">
              <Reveal delay={index * 60}>
                <div className="group grid grid-cols-[3.25rem_1fr] items-baseline gap-x-5 gap-y-3 py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-12 lg:gap-x-8 lg:py-10">
                  <span className="font-display text-3xl leading-none text-muted-foreground tabular-nums transition-colors duration-300 group-hover:text-primary lg:col-span-2 lg:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl tracking-tight text-balance lg:col-span-4 lg:text-2xl">
                    {item.name}
                  </h3>
                  <p className="col-start-2 col-end-3 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
