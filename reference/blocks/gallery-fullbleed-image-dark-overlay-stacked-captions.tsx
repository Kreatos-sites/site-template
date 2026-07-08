import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Galería narrativa a sangre completa: una sola fotografía cubre toda la
 * sección con overlay oscuro en gradiente (oscuro abajo, transparente
 * arriba), tono cinematográfico. Encima, los proyectos se apilan en
 * vertical uno por tramo (no en grid): cada tramo ocupa casi la altura
 * de la ventana y su eyebrow de categoría + título quedan anclados al
 * borde inferior, separados por una línea divisoria delgada. Narrativa
 * editorial de un solo proyecto a la vez, muy densa en dirección vertical.
 */
export function GalleryFullbleedImageDarkOverlayStackedCaptions({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const projects = t.raw("projects") as {
    category: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="relative border-t border-border py-(--section-gap)">
      <div className="absolute inset-0">
        <SmartImage
          src={t("backgroundImage")}
          alt={t("backgroundImageAlt")}
          className="h-full w-full rounded-none"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/15"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col divide-y divide-background/20 border-t border-background/20 sm:mt-24">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 60}>
              <article className="flex min-h-[70svh] flex-col justify-end py-10 sm:min-h-[88svh] sm:py-14">
                <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {project.category}
                </span>
                <h3 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.05] tracking-tight text-balance text-background">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/80 text-pretty">
                  {project.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
