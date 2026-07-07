import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type Member = { name: string; role: string; image: string; imageAlt: string };

export function TeamGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section
      data-demo="equipo"
      className="border-t border-border py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Encabezado editorial: eyebrow + título a la izquierda, intro
            colgando a la derecha para romper el bloque simétrico. */}
        <Reveal>
          <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.03] tracking-tight text-balance">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end lg:text-right">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        {/* Rejilla con ritmo desplazado: las columnas pares descienden un
            escalón en desktop, creando una cadencia editorial en vez de una
            cuadrícula plana. Filete numerado sobre cada retrato. */}
        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-8">
          {members.map((member, index) => (
            <li
              key={member.name}
              className={cn(
                "group",
                index % 2 === 1 && "lg:mt-16",
              )}
            >
              <Reveal delay={index * 60}>
                <figure>
                  <div className="relative overflow-hidden bg-muted">
                    <SmartImage
                      src={member.image}
                      alt={member.imageAlt}
                      className="aspect-[4/5] w-full"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary/70"
                    />
                  </div>

                  <figcaption className="mt-5">
                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="font-display text-xs text-primary tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 translate-y-[-0.2em] bg-border"
                      />
                    </div>
                    <h3 className="mt-2 font-display text-lg leading-tight tracking-tight text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
