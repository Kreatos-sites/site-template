import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Figure = { value: string; label: string; detail: string };

/**
 * Sección CUSTOM de ejemplo (ver AGENT.md → "Secciones custom").
 * Banda de credenciales con layout asimétrico: claim editorial a la
 * izquierda, cifras verificables en columna con reglas a la derecha.
 * Ninguna variante del motor produce este gesto; por eso es custom.
 *
 * Sirve de patrón para nuevas secciones custom:
 * - server component (sin "use client"); la interactividad, solo como isla;
 * - copy 100% vía next-intl con el `ns` que llega por props;
 * - solo tokens semánticos del theme (cero colores literales);
 * - motion con los primitives del motor (Reveal), nunca listeners propios;
 * - headings jerárquicos (h2 aquí: el h1 es del hero/page-header).
 */
export function CredentialsBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const figures = t.raw("figures") as Figure[];

  return (
    <section id="credenciales" className="border-t border-border bg-card py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] leading-[1.1] tracking-tight text-balance">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </Reveal>
        </div>

        <ul className="lg:col-span-6 lg:col-start-7">
          {figures.map((figure, index) => (
            <li key={figure.label} className="border-t border-border first:border-t-0 lg:first:border-t">
              <Reveal delay={index * 60}>
                <div className="flex items-baseline gap-6 py-6">
                  <span className="w-24 shrink-0 font-display text-4xl text-primary tabular-nums">
                    {figure.value}
                  </span>
                  <div>
                    <h3 className="font-display text-lg tracking-tight">{figure.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {figure.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
