import { useTranslations } from "next-intl";
import { BellRing, CalendarDays, Sparkle } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type CountdownUnit = { value: string; label: string };

/**
 * Hero de cuenta regresiva para campañas o lanzamientos: fondo con
 * gradiente sutil en el color primary del theme, insignia "Próximamente"
 * con la fecha destacada, título centrado y una fila de unidades de
 * cuenta regresiva (días, horas, minutos, segundos u otro desglose
 * temporal) seguida de un CTA para activar notificaciones.
 */
export function HeroCountdownLaunchTeaser({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const units = t.raw("units") as CountdownUnit[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary uppercase">
              <Sparkle className="size-3.5" strokeWidth={1.75} />
              {t("badge")}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CalendarDays className="size-4 text-primary" strokeWidth={1.75} />
              {t("date")}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,4vw+1rem,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <ul className="mt-12 grid grid-cols-4 gap-3 sm:gap-5">
              {units.map((unit, i) => (
                <li
                  key={i}
                  className="flex flex-col items-center rounded-sm border border-border bg-card px-3 py-5 sm:px-6"
                >
                  <span className="font-display text-3xl tracking-tight text-foreground tabular-nums sm:text-4xl">
                    {unit.value}
                  </span>
                  <span className="mt-2 text-[0.6875rem] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                    {unit.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 flex flex-col items-center gap-3">
              <a
                href={t("ctaHref")}
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <BellRing
                  className="size-4 transition-transform group-hover:-rotate-12"
                  strokeWidth={1.75}
                />
                {t("ctaLabel")}
              </a>
              <p className="text-xs text-muted-foreground">{t("ctaNote")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
