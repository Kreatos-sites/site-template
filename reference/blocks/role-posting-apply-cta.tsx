import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: role-posting-apply-cta — página detallada de una vacante
 * corporativa: rol, metadata (departamento/ubicación/tipo/compensación),
 * descripción, requisitos y CTA destacado de candidatura.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, department: string, location: string,
 *     type: string, compensation?: string, description: string,
 *     requirementsTitle: string, requirements: string[],
 *     ctaTitle: string, ctaDescription: string, ctaLabel: string, ctaHref: string }
 */
export function RolePostingApplyCta({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const requirements = t.raw("requirements") as string[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseIcon className="size-4 text-primary" aria-hidden="true" />
              {t("department")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-4 text-primary" aria-hidden="true" />
              {t("location")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-4 text-primary" aria-hidden="true" />
              {t("type")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CurrencyDollarIcon className="size-4 text-primary" aria-hidden="true" />
              {t("compensation")}
            </span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>

              <h3 className="mt-12 font-display text-lg text-foreground">
                {t("requirementsTitle")}
              </h3>
              <ul className="mt-6 space-y-4">
                {requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-sm bg-card p-8">
              <h3 className="font-display text-xl text-foreground">
                {t("ctaTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t("ctaDescription")}
              </p>
              <a
                href={t("ctaHref")}
                className="mt-8 inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("ctaLabel")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
