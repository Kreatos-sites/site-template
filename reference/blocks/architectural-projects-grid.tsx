import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Project = {
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  imageAlt: string;
};

export function ArchitecturalProjectsGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const projects = t.raw("projects") as Project[];

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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={project.image}
                      alt={project.imageAlt}
                      className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-sm bg-background/90 px-3 py-1 text-xs font-medium tracking-[0.15em] text-foreground uppercase">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="font-display text-xl text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.location} — {project.year}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
