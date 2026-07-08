import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";

type ScheduleRow = { day: string; hours: string };

export function ClinicHoursLocationMapSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const schedule = t.raw("schedule") as ScheduleRow[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          {/* Izquierda: horario de atención, dirección y teléfono */}
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
              <div className="mt-10 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                <ClockIcon
                  aria-hidden="true"
                  className="size-4 text-primary"
                  weight="regular"
                />
                {t("scheduleLabel")}
              </div>
              <table className="mt-4 w-full border-collapse text-sm">
                <tbody className="divide-y divide-border border-t border-border">
                  {schedule.map((row) => (
                    <tr key={row.day}>
                      <th
                        scope="row"
                        className="py-3 pr-4 text-left font-normal text-foreground"
                      >
                        {row.day}
                      </th>
                      <td className="py-3 text-right text-muted-foreground">
                        {row.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal delay={140}>
              <dl className="mt-10 flex flex-col gap-5 border-t border-border pt-8">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
                  >
                    <MapPinIcon className="size-4" weight="regular" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {t("addressLabel")}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-foreground">
                      {t("address")}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
                  >
                    <PhoneIcon className="size-4" weight="regular" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {t("phoneLabel")}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-foreground">
                      {t("phone")}
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Derecha: imagen/mapa de ubicación de altura completa */}
          <Reveal delay={120} className="min-h-[22rem] lg:min-h-0">
            <SmartImage
              src={t("mapImage")}
              alt={t("mapImageAlt")}
              className="h-full min-h-[22rem] rounded-sm lg:min-h-0"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
