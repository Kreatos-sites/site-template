import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight, CalendarDays } from "lucide-react";

type PortfolioProject = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  year: string;
};

export function PortfolioStaggeredCardsOffsetAiry({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const projects = t.raw("projects") as PortfolioProject[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const column = i % 3;
            const offsetClass =
              column === 1 ? "lg:mt-16" : column === 2 ? "lg:mt-4" : "lg:mt-0";

            return (
              <li key={i} className={offsetClass}>
                <Reveal delay={i * 60}>
                  <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <SmartImage
                      src={project.image}
                      alt={project.imageAlt}
                      className="aspect-[4/5] rounded-none"
                    />
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-center justify-between gap-3 text-xs font-medium tracking-[0.15em] text-primary uppercase">
                        <span>{project.category}</span>
                        <ArrowUpRight
                          className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </div>
                      <h3 className="font-display text-lg text-foreground">
                        {project.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                        <span>{project.year}</span>
                      </div>
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
