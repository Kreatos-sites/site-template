import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiCheckboxCircleFill,
  RiAlertFill,
  RiCloseCircleFill,
  RiPulseLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Service = {
  status: string;
  name: string;
  description: string;
  uptime: string;
};

const STATUS_ICONS: Record<string, RemixiconComponentType> = {
  operational: RiCheckboxCircleFill,
  degraded: RiAlertFill,
  outage: RiCloseCircleFill,
};

const STATUS_DOT: Record<string, string> = {
  operational: "bg-primary",
  degraded: "bg-secondary-foreground",
  outage: "bg-foreground",
};

const STATUS_TEXT: Record<string, string> = {
  operational: "text-primary",
  degraded: "text-secondary-foreground",
  outage: "text-foreground",
};

/**
 * Resumen de estado operativo: banner general + lista de servicios con
 * porcentaje de uptime (90 días) e indicador de color por renglón.
 * Sin JS de conteo ni polling: el estado es copy estático del sitio.
 */
export function StatusServicesUptimeMetricsList({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const services = t.raw("services") as Service[];
  const bannerStatus = t("bannerStatus");
  const BannerIcon = STATUS_ICONS[bannerStatus] ?? RiCheckboxCircleFill;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-sm border border-border bg-card p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <BannerIcon
                className={cn("size-6", STATUS_TEXT[bannerStatus] ?? "text-primary")}
                aria-hidden="true"
              />
              <div>
                <p className="font-display text-lg text-foreground">
                  {t("bannerTitle")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("bannerDescription")}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
              <RiPulseLine className="size-3.5 text-primary" aria-hidden="true" />
              {t("bannerMeta")}
            </span>
          </div>
        </Reveal>

        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
          {services.map((service, index) => {
            const dotClass = STATUS_DOT[service.status] ?? "bg-primary";
            return (
              <li key={service.name} className="contents">
                <Reveal delay={index * 50}>
                  <article className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className={cn("size-2.5 shrink-0 rounded-full", dotClass)}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-display text-base text-foreground">
                          {service.name}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-6 sm:pl-0">
                      <span className="font-display text-2xl tracking-tight text-foreground tabular-nums">
                        {service.uptime}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t("uptimeLabel")}
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
