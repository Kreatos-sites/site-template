import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  CalendarIcon,
  ClockIcon,
  StethoscopeIcon,
} from "@phosphor-icons/react/dist/ssr";

type SpecialtyOption = { value: string; label: string };
type TimeOption = { value: string; label: string };

export function ClinicSplitBookingFormImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const specialties = t.raw("specialties") as SpecialtyOption[];
  const times = t.raw("times") as TimeOption[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          {/* Izquierda: tarjeta de formulario de cita */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 max-w-md font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <form className="mt-10 flex flex-col gap-6 rounded-sm bg-secondary p-8 sm:p-10">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="specialty"
                    className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                  >
                    <StethoscopeIcon
                      aria-hidden="true"
                      className="size-4 text-primary"
                      weight="regular"
                    />
                    {t("specialtyLabel")}
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    {specialties.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="date"
                      className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                    >
                      <CalendarIcon
                        aria-hidden="true"
                        className="size-4 text-primary"
                        weight="regular"
                      />
                      {t("dateLabel")}
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="time"
                      className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                    >
                      <ClockIcon
                        aria-hidden="true"
                        className="size-4 text-primary"
                        weight="regular"
                      />
                      {t("timeLabel")}
                    </label>
                    <select
                      id="time"
                      name="time"
                      className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      {times.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("submitLabel")}
                </button>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t("disclaimer")}
                </p>
              </form>
            </Reveal>
          </div>

          {/* Derecha: imagen de altura completa de la clínica */}
          <Reveal delay={120} className="min-h-[22rem] lg:min-h-0">
            <SmartImage
              src={t("image")}
              alt={t("imageAlt")}
              className="h-full min-h-[22rem] rounded-sm lg:min-h-0"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
