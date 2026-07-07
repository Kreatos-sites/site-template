import { useTranslations } from "next-intl";
import { RiMapPin2Line, RiTimeLine, RiArrowRightUpLine } from "@remixicon/react";

import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: department-based-jobs-listing — bolsa de trabajo (careers page)
 * agrupada por departamento; cada vacante muestra puesto, ubicación,
 * tipo de jornada y CTA para postular.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description?: string,
 *     departments: [{ name: string, jobs: [{ title: string, location: string,
 *       type: string, href: string }] }] }
 */
type Job = {
  title: string;
  location: string;
  type: string;
  href: string;
};

type Department = {
  name: string;
  jobs: Job[];
};

export function DepartmentBasedJobsListing({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const departments = t.raw("departments") as Department[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-16 space-y-14">
          {departments.map((department, di) => (
            <Reveal key={department.name} delay={di * 60}>
              <div>
                <h3 className="font-display text-lg text-foreground">
                  {department.name}
                </h3>
                <ul className="mt-6 divide-y divide-border border-t border-border">
                  {department.jobs.map((job) => (
                    <li key={job.title}>
                      <a
                        href={job.href}
                        className="group flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                      >
                        <div className="min-w-0">
                          <p className="font-display text-base text-foreground group-hover:text-primary">
                            {job.title}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <RiMapPin2Line
                                className="size-4 text-primary"
                                aria-hidden="true"
                              />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <RiTimeLine
                                className="size-4 text-primary"
                                aria-hidden="true"
                              />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          {t("apply")}
                          <RiArrowRightUpLine className="size-4" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
