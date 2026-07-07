import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type Integration = { name: string };
type Cta = { label: string; href: string };

/**
 * BLOQUE: integrations-trust-cta — CTA de cierre rodeado de un anillo de
 * plataformas/proveedores con los que ya se integra la operación. El grid de
 * placas tipográficas (sin logos reales) enmarca arriba y abajo un bloque
 * central con título, descripción y botón, para generar confianza justo
 * antes del llamado a la acción. Hermano de `cta-band-centered` pero con
 * prueba social de integraciones en vez de banda plana sola.
 *
 * ns: { eyebrow, title, description?, integrations: [{ name }], cta: { label, href } }
 */
export function IntegrationsTrustCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const description = t.raw("description") as string | undefined;
  const integrations = t.raw("integrations") as Integration[];
  const cta = t.raw("cta") as Cta;

  const half = Math.ceil(integrations.length / 2);
  const topRow = integrations.slice(0, half);
  const bottomRow = integrations.slice(half);

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap) text-secondary-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <ul className="grid grid-cols-2 border-t border-l border-border/70 sm:grid-cols-3 lg:grid-cols-4">
            {topRow.map((item) => (
              <li
                key={item.name}
                className="flex h-20 items-center justify-center border-r border-b border-border/70 px-4 text-center sm:h-24"
              >
                <span className="font-display text-sm text-muted-foreground sm:text-base">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="mx-auto max-w-2xl py-12 text-center sm:py-16">
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          {description ? (
            <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {description}
            </p>
          ) : null}
          <a
            href={cta.href}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium tracking-tight text-primary-foreground ring-1 ring-primary/20 transition-colors hover:bg-primary/90"
          >
            {cta.label}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>

        <Reveal delay={140}>
          <ul className="grid grid-cols-2 border-t border-l border-border/70 sm:grid-cols-3 lg:grid-cols-4">
            {bottomRow.map((item) => (
              <li
                key={item.name}
                className="flex h-20 items-center justify-center border-r border-b border-border/70 px-4 text-center sm:h-24"
              >
                <span className="font-display text-sm text-muted-foreground sm:text-base">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
