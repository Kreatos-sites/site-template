import { useTranslations } from "next-intl";
import { BadgeCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

/**
 * Grid denso de insignias de acreditación sobre fondo oscuro (bg-foreground)
 * con motivo técnico: retícula de líneas divisorias, ícono de verificación,
 * nombre de la norma/certificación y año en tipografía monospace. Sin
 * fotografías; tratamiento tipo dossier regulatorio para transmitir rigor
 * clínico y cumplimiento normativo (ISO, COFEPRIS, etc.).
 */
export function ClinicAccreditationBadgesGridTechnical({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Badge = { name: string; issuer: string; year: string };
  const badges = t.raw("badges") as Badge[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-background/70">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-background/15 bg-background/15 sm:grid-cols-3 lg:grid-cols-4">
            {badges.map((badge, index) => (
              <li key={index} className="contents">
                <div className="flex flex-col justify-between gap-6 bg-foreground px-5 py-6">
                  <div className="flex items-center justify-between">
                    <BadgeCheck
                      className="size-5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs tracking-[0.05em] text-background/50 tabular-nums">
                      {badge.year}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-base leading-tight text-background">
                      {badge.name}
                    </p>
                    <p className="mt-1 text-xs tracking-[0.08em] text-background/50 uppercase">
                      {badge.issuer}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
