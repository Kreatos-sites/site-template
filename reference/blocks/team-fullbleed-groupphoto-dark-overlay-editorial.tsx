import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Member = {
  name: string;
  role: string;
};

/**
 * Retrato de equipo a sangre completa: una sola fotografía grupal cubre
 * toda la sección, con degradado oscuro de abajo hacia arriba y un overlay
 * tenue sobre el resto de la imagen. Título y la lista de nombres/roles se
 * apilan en tipografía editorial en la esquina inferior izquierda, sin
 * tarjetas ni rejilla. Tono oscuro, motivo de portada de revista; úsala
 * cuando se busca presentar al equipo como una sola declaración visual en
 * vez de un directorio.
 */
export function TeamFullbleedGroupphotoDarkOverlayEditorial({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section className="relative isolate w-full overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/25"
      />

      <div className="relative flex min-h-[85vh] w-full flex-col justify-end py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <Reveal>
                <p className="text-xs font-medium tracking-[0.25em] text-background/80 uppercase">
                  {t("eyebrow")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
                  {t("title")}
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-background/80 text-pretty">
                  {t("caption")}
                </p>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <ul className="flex flex-col gap-4 border-t border-background/25 pt-6 lg:min-w-[18rem] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                {members.map((member) => (
                  <li
                    key={member.name}
                    className="flex items-baseline justify-between gap-6"
                  >
                    <span className="font-display text-base tracking-tight text-background">
                      {member.name}
                    </span>
                    <span className="text-xs tracking-[0.1em] text-background/70 uppercase">
                      {member.role}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
