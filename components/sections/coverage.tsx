import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

type Zone = { name: string; detail: string };

/** Zonas o rutas de servicio (útil en logística, construcción, distribución). */
export function Coverage() {
  const t = useTranslations("coverage");
  const zones = t.raw("zones") as Zone[];

  return (
    <section id="cobertura" className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:pb-1">
              {t("intro")}
            </p>
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone, index) => (
            <li key={zone.name} className="bg-background p-7">
              <Reveal delay={index * 60}>
                <MapPin className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl tracking-tight">{zone.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {zone.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
