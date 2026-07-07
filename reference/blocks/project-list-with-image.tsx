import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight } from "lucide-react";

type Project = {
  year: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  linkHref: string;
  linkLabel: string;
};

export function ProjectListWithImage({ ns }: { ns: string }) {
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

        <ul className="mt-16 flex flex-col divide-y divide-border border-t border-border">
          {projects.map((project, index) => (
            <li key={index}>
              <Reveal delay={index * 60}>
                <a
                  href={project.linkHref}
                  className="group grid grid-cols-1 items-center gap-6 py-10 sm:grid-cols-[7rem_1fr_auto] sm:gap-8 lg:grid-cols-[9rem_1fr_auto]"
                >
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    className="aspect-[4/5] w-28 rounded-sm sm:w-full lg:w-full"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {project.year}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug tracking-tight text-balance text-foreground sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 group-hover:text-primary group-hover:underline sm:justify-self-end">
                    {project.linkLabel}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
