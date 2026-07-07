import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight } from "lucide-react";

type Project = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  location: string;
  year: string;
};

export function PortfolioGridShowcase({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const projects = t.raw("projects") as Project[];
  const categories = t.raw("categories") as string[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <ul className="flex shrink-0 flex-wrap gap-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={index}>
              <Reveal delay={index * 60}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={project.image}
                      alt={project.imageAlt}
                      className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
                    <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-foreground uppercase">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 bg-card p-6">
                    <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                      {project.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <p className="text-sm text-muted-foreground">
                        {project.location} · {project.year}
                      </p>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
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
