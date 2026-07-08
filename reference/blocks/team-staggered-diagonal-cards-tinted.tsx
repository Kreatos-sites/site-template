import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Variante de equipo sobre fondo tintado (bg-secondary) con tarjetas
 * desplazadas verticalmente por columna (translate-y escalonado) que
 * dibujan una diagonal ascendente al recorrer la grilla. Tono editorial,
 * aireado, sin velos ni hover-reveal: foto, nombre y rol siempre visibles.
 */

type Member = { name: string; role: string; image: string; imageAlt: string };

const COLUMN_OFFSETS = [
  "lg:translate-y-0",
  "lg:translate-y-10",
  "lg:translate-y-20",
  "lg:translate-y-8",
];

export function TeamStaggeredDiagonalCardsTinted({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section
      data-demo="equipo"
      className="border-t border-border bg-secondary py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-6">
          {members.map((member, index) => {
            const offset = COLUMN_OFFSETS[index % COLUMN_OFFSETS.length];
            return (
              <li key={member.name} className={offset}>
                <Reveal delay={index * 60}>
                  <article className="flex flex-col gap-4">
                    <SmartImage
                      src={member.image}
                      alt={member.imageAlt}
                      className="aspect-[4/5] rounded-sm"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div>
                      <h3 className="font-display text-lg leading-tight tracking-tight text-foreground">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
