import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * Muro de aliados/clientes en cuadrícula con bordes compartidos: cada celda
 * muestra el nombre tipográfico centrado. Variante estática del logo-marquee,
 * sin imágenes. Copy: { eyebrow, logos: [{ name }] }.
 */
export function LogoGridBordered({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Logo = { name: string };
  const logos = t.raw("logos") as Logo[];

  return (
    <section className="border-t border-border py-(--section-gap)" data-demo="clientes">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-border sm:mb-2 sm:ml-8 sm:block"
            />
            <span className="font-display text-sm tabular-nums text-muted-foreground">
              {String(logos.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 lg:grid-cols-4">
            {logos.map((logo, index) => (
              <li
                key={logo.name}
                className={cn(
                  "group relative flex min-h-32 items-center justify-center border-r border-b border-border px-6 py-10",
                  "transition-colors hover:bg-secondary",
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-4 font-display text-[0.65rem] tabular-nums text-muted-foreground/40"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-center font-display text-lg tracking-tight text-balance text-foreground/70 transition-colors group-hover:text-foreground sm:text-xl">
                  {logo.name}
                </h3>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
