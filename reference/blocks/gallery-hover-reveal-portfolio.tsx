import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type Project = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  description: string;
};

export function GalleryHoverRevealPortfolio({ ns }: { ns: string }) {
  const t = useTranslations(ns);
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

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article
                  className={cn(
                    "group relative overflow-hidden rounded-sm",
                    i === 0 ? "sm:col-span-2 lg:col-span-2" : undefined,
                  )}
                >
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    className={cn(
                      "transition-transform duration-500 ease-out group-hover:scale-105",
                      i === 0 ? "aspect-[16/10]" : "aspect-[4/5]",
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 ease-out group-hover:translate-y-0 md:p-8">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-foreground md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity delay-75 duration-500 group-hover:opacity-100">
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
