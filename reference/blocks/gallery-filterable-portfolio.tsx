import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Project = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  description: string;
};

/**
 * Grid de proyectos de portafolio con categorías visibles y fila de
 * disciplinas a modo de leyenda. Hermano de gallery-hover-reveal-portfolio
 * (esa revela el copy al hover; aquí el copy va siempre visible bajo la
 * imagen y las categorías se listan arriba como tabs estáticos).
 * Copy vía next-intl: ns → { eyebrow, title, categories: [string],
 * projects: [{ image, imageAlt, title, category, description }] }.
 */
export function GalleryFilterablePortfolio({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as string[];
  const projects = t.raw("projects") as Project[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <ul className="mt-10 flex flex-wrap gap-3 border-y border-border py-5">
            {categories.map((category, i) => (
              <li key={i}>
                <span
                  className={
                    i === 0
                      ? "inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground"
                      : "inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
                  }
                >
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col">
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    className="aspect-[4/5] rounded-sm"
                  />
                  <div className="mt-5">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {project.description}
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
