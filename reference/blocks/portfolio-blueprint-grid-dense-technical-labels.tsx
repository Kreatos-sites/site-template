import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Portafolio denso tono técnico-industrial: fondo con retícula sutil tipo
 * plano (blueprint) y tarjetas pequeñas en grid apretado, cada una con
 * código de proyecto monoespaciado sobre la imagen y una ficha de
 * especificaciones (label / valor) debajo. Pensado para constructoras e
 * ingeniería: alta densidad, cero fotografía protagónica, mucho dato.
 */

type Spec = { label: string; value: string };

type Project = {
  image: string;
  imageAlt: string;
  code: string;
  title: string;
  specs: Spec[];
};

export function PortfolioBlueprintGridDenseTechnicalLabels({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const projects = t.raw("projects") as Project[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "var(--foreground)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
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

        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, i) => (
            <li key={project.code} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col bg-card">
                  <div className="relative">
                    <SmartImage
                      src={project.image}
                      alt={project.imageAlt}
                      className="aspect-square rounded-none"
                    />
                    <span className="absolute top-0 left-0 border-r border-b border-border bg-background/90 px-2 py-1 font-mono text-[0.65rem] tracking-[0.1em] text-primary uppercase">
                      {project.code}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="font-display text-sm leading-snug text-foreground">
                      {project.title}
                    </h3>
                    <dl className="mt-auto flex flex-col gap-1 border-t border-border pt-2">
                      {project.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-baseline justify-between gap-2 font-mono text-[0.65rem] tracking-[0.05em]"
                        >
                          <dt className="text-muted-foreground uppercase">
                            {spec.label}
                          </dt>
                          <dd className="truncate text-foreground">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
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
