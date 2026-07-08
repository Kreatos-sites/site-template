import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

/**
 * Banda angosta y densa en bg-secondary para tratamiento de confianza
 * institucional: eyebrow + título corto arriba, seguido de un grid compacto
 * de aseguradoras/instituciones en fichas bordeadas monocromáticas (sin
 * fotografías, sin logotipos de marca reales). El nombre de cada institución
 * se presenta como wordmark en mayúsculas junto a un ícono de verificación
 * discreto para reforzar el vínculo de convenio/cobertura.
 */
export function ClinicInsuranceLogosTrustBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Insurer = { name: string };
  const insurers = t.raw("insurers") as Insurer[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {insurers.map((insurer, index) => (
              <li key={index} className="contents">
                <div className="flex h-16 items-center justify-center gap-2 bg-card px-4 grayscale transition-opacity duration-300 hover:opacity-100 sm:h-20">
                  <ShieldCheck
                    className="size-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm font-medium tracking-[0.08em] text-muted-foreground uppercase">
                    {insurer.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
