import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: portfolio-fullbleed-image-dark-overlay-stacked — casos apilados en
 * secciones a pantalla completa, cada una con la fotografía del proyecto a
 * sangre y un overlay oscuro degradado de abajo hacia arriba; título,
 * cliente y año flotan en blanco sobre la esquina inferior izquierda. Un
 * proyecto por scroll, tono oscuro y cinematográfico. Úsalo como el cuerpo
 * principal de una página de portafolio/casos de estudio.
 *
 * ns: {
 *   eyebrow, title,
 *   projects: [{ image, imageAlt, title, client, year, description }]
 * }
 */
type Project = {
  image: string;
  imageAlt: string;
  title: string;
  client: string;
  year: string;
  description: string;
};

export function PortfolioFullbleedImageDarkOverlayStacked({
  ns,
}: {
  ns: string;
}) {
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
      </div>

      {/* Casos apilados a sangre: cada uno se rompe del contenedor central
          para ocupar el ancho completo del viewport, con la fotografía
          cubriendo toda la sección y el copy flotando sobre un degradado
          oscuro. Se separan con un borde tenue para marcar el corte entre
          proyectos sin perder el efecto de sangre continua. */}
      <ul className="mt-16 flex flex-col">
        {projects.map((project, i) => (
          <li key={i}>
            <Reveal delay={i * 60}>
              <article
                className={
                  "relative left-1/2 right-1/2 -mx-[50vw] w-screen min-h-[85vh] overflow-hidden border-t border-border first:border-t-0 lg:min-h-screen"
                }
              >
                <SmartImage
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-[85vh] w-full rounded-none lg:h-screen"
                  sizes="100vw"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent"
                />

                <span className="absolute top-6 left-6 font-display text-sm text-background/70 lg:top-10 lg:left-12">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-12">
                  <div className="mx-auto max-w-6xl">
                    <p className="text-xs font-medium tracking-[0.25em] text-background/70 uppercase">
                      {project.client} — {project.year}
                    </p>
                    <h3 className="mt-3 max-w-2xl font-display text-2xl leading-tight text-balance text-background md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-background/80">
                      {project.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
