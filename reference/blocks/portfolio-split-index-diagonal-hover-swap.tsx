import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Hash } from "lucide-react";

/**
 * BLOQUE: portfolio-split-index-diagonal-hover-swap — layout técnico de dos
 * columnas: a la izquierda un índice numerado de proyectos sobre fondo
 * sólido (bg-secondary), a la derecha un panel de imagen grande recortado en
 * diagonal (clip-path) que cambia de foto al pasar el cursor sobre cada fila
 * del índice. Sin JS de cliente: el swap se resuelve con CSS puro usando
 * :has() (grupo nombrado "portfolio" + clases estáticas "row-N" leídas por
 * el JIT de Tailwind). En mobile el panel diagonal se colapsa a una sola
 * imagen fija (la del primer proyecto) bajo el índice.
 *
 * ns: { eyebrow: string, title: string,
 *       projects: [{ index, title, category, year, image, imageAlt }] }
 *   (soporta hasta 8 proyectos; el resto se ignora)
 */
type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
};

// Clases "consumidoras" de Tailwind: deben aparecer literalmente en el
// código fuente para que el JIT las genere (no se pueden armar con template
// strings dinámicos). El proyecto 0 es la imagen base siempre visible; los
// proyectos 1-7 se superponen encima cuando su fila (.row-N) está en hover.
const ROW_CLASS = [
  "row-0",
  "row-1",
  "row-2",
  "row-3",
  "row-4",
  "row-5",
  "row-6",
  "row-7",
];

const IMAGE_HOVER_CLASS = [
  "", // índice 0: imagen base, sin condición
  "opacity-0 group-has-[.row-1:hover]/portfolio:opacity-100",
  "opacity-0 group-has-[.row-2:hover]/portfolio:opacity-100",
  "opacity-0 group-has-[.row-3:hover]/portfolio:opacity-100",
  "opacity-0 group-has-[.row-4:hover]/portfolio:opacity-100",
  "opacity-0 group-has-[.row-5:hover]/portfolio:opacity-100",
  "opacity-0 group-has-[.row-6:hover]/portfolio:opacity-100",
  "opacity-0 group-has-[.row-7:hover]/portfolio:opacity-100",
];

const ROW_ACTIVE_CLASS = [
  "group-has-[.row-0:hover]/portfolio:bg-card group-has-[.row-0:hover]/portfolio:text-foreground",
  "group-has-[.row-1:hover]/portfolio:bg-card group-has-[.row-1:hover]/portfolio:text-foreground",
  "group-has-[.row-2:hover]/portfolio:bg-card group-has-[.row-2:hover]/portfolio:text-foreground",
  "group-has-[.row-3:hover]/portfolio:bg-card group-has-[.row-3:hover]/portfolio:text-foreground",
  "group-has-[.row-4:hover]/portfolio:bg-card group-has-[.row-4:hover]/portfolio:text-foreground",
  "group-has-[.row-5:hover]/portfolio:bg-card group-has-[.row-5:hover]/portfolio:text-foreground",
  "group-has-[.row-6:hover]/portfolio:bg-card group-has-[.row-6:hover]/portfolio:text-foreground",
  "group-has-[.row-7:hover]/portfolio:bg-card group-has-[.row-7:hover]/portfolio:text-foreground",
];

export function PortfolioSplitIndexDiagonalHoverSwap({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const projects = (t.raw("projects") as Project[]).slice(0, 8);
  const base = projects[0];

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
      </div>

      <Reveal delay={80}>
        <div className="group/portfolio relative mt-14 lg:mt-16">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
              {/* Índice numerado */}
              <div className="lg:col-span-5 lg:pr-6">
                <ol className="border-y border-border bg-secondary lg:border">
                  {projects.map((project, i) => (
                    <li
                      key={project.title + i}
                      className={cn(
                        ROW_CLASS[i],
                        "group/row flex items-center justify-between gap-4 border-b border-border px-6 py-5 text-secondary-foreground transition-colors last:border-b-0 lg:px-8 lg:py-6",
                        ROW_ACTIVE_CLASS[i],
                      )}
                    >
                      <div className="flex min-w-0 items-baseline gap-4 lg:gap-6">
                        <span className="flex items-center gap-1 font-display text-sm tabular-nums text-primary">
                          <Hash className="size-3" strokeWidth={2} aria-hidden="true" />
                          {project.index}
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-lg text-foreground lg:text-xl">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-xs tracking-[0.1em] text-muted-foreground uppercase">
                            {project.category} · {project.year}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="size-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:text-primary group-hover/row:opacity-100"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ol>
              </div>

              {/* Panel de imagen — mobile: fija; lg: diagonal + hover swap */}
              <div className="mt-10 lg:col-span-7 lg:mt-0">
                <div className="lg:hidden">
                  <SmartImage
                    src={base.image}
                    alt={base.imageAlt}
                    className="aspect-[4/3] rounded-sm"
                  />
                </div>

                <div className="relative hidden h-full min-h-[520px] overflow-hidden [clip-path:polygon(9%_0,100%_0,100%_100%,0%_100%)] lg:block">
                  {projects.map((project, i) => (
                    <SmartImage
                      key={project.title + i}
                      src={project.image}
                      alt={project.imageAlt}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-500 ease-out",
                        IMAGE_HOVER_CLASS[i],
                      )}
                      priority={i === 0}
                    />
                  ))}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
