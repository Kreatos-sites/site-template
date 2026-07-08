import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { Compass, Crosshair } from "lucide-react";

/**
 * Sección "Nosotros" tono técnico-industrial: fondo con retícula sutil tipo
 * plano (blueprint) + coordenadas decorativas en las esquinas, contenido en
 * dos columnas con numeración de ficha técnica (01, 02, 03...) para misión,
 * alcance y compromiso. Sin fotografía, denso, con acentos monoespaciados.
 */

type Entry = { number: string; title: string; text: string };

export function AboutBlueprintTechnicalGridPattern({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const entries = t.raw("entries") as Entry[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "var(--foreground)",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-6 hidden font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase sm:block"
      >
        {t("coordinates.topLeft")}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-6 hidden font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase sm:block"
      >
        {t("coordinates.topRight")}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-6 hidden font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase sm:block"
      >
        {t("coordinates.bottomLeft")}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-6 hidden font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase sm:block"
      >
        {t("coordinates.bottomRight")}
      </span>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5">
                <Compass className="size-3.5 text-primary" strokeWidth={1.75} />
                <p className="font-mono text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
              <div className="mt-8 flex items-center gap-2 border-t border-border pt-6 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                <Crosshair className="size-3.5 text-primary" strokeWidth={1.75} />
                {t("refCode")}
              </div>
            </div>
          </Reveal>

          <ol className="flex flex-col">
            {entries.map((entry, i) => (
              <li key={entry.number}>
                <Reveal delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 first:border-t-0 sm:py-10">
                    <span className="font-mono text-sm text-primary">
                      {entry.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {entry.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {entry.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
