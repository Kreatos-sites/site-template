import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * Banda de certificaciones/normas como placas tipográficas. Sin imágenes:
 * el peso lo carga el nombre corto de la norma (font-display) apoyado por un
 * detalle chico y un índice hairline. Composición asimétrica — título fijo a
 * la izquierda, placas separadas por reglas finas a la derecha — para que no
 * lea como grid de tarjetas iguales.
 */
export function CertificationsBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Cert = { name: string; detail?: string };
  const items = t.raw("items") as Cert[];

  return (
    <section
      data-demo="certificaciones"
      className="border-t border-border bg-secondary py-(--section-gap) text-secondary-foreground"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <Reveal className="lg:pt-2">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
            <span
              aria-hidden="true"
              className="mt-6 hidden h-px w-24 bg-border lg:block"
            />
          </Reveal>

          <ul className="flex flex-col border-t border-border/70">
            {items.map((item, index) => (
              <Reveal key={item.name} delay={index * 60}>
                <li className="group flex items-baseline gap-5 border-b border-border/70 py-6 sm:gap-8 sm:py-7">
                  <span
                    aria-hidden="true"
                    className="w-8 shrink-0 pt-1 font-display text-xs text-muted-foreground tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none tracking-tight text-balance">
                      {item.name}
                    </h3>
                    {item.detail ? (
                      <p className="max-w-xs text-sm text-muted-foreground sm:text-right">
                        {item.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
