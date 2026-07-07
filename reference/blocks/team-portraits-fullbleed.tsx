import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type Member = {
  name: string;
  role: string;
  quote: string;
  image: string;
  imageAlt: string;
};

export function TeamPortraitsFullbleed({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

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

        {/* Retratos fullbleed alternados: el rostro ocupa casi todo el
            ancho de su columna a tamaño grande, con la cita personal
            como contrapeso tipográfico. Se alterna imagen/texto por
            fila para que no lea como una rejilla de tarjetas. */}
        <ul className="mt-16 flex flex-col gap-16 lg:gap-24">
          {members.map((member, index) => {
            const reversed = index % 2 === 1;

            return (
              <li key={member.name}>
                <Reveal delay={index * 60}>
                  <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-4">
                    <div
                      className={cn(
                        "lg:col-span-7",
                        reversed ? "order-1 lg:order-2" : "order-1",
                      )}
                    >
                      <SmartImage
                        src={member.image}
                        alt={member.imageAlt}
                        className="aspect-[16/11] w-full rounded-sm"
                        sizes="(min-width: 1024px) 60vw, 100vw"
                      />
                    </div>

                    <div
                      className={cn(
                        "flex flex-col justify-center lg:col-span-5",
                        reversed
                          ? "order-2 lg:order-1 lg:pr-8"
                          : "order-2 lg:pl-8",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-12 bg-primary"
                      />
                      <p className="mt-6 max-w-md font-display text-xl leading-snug text-balance text-foreground">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                      <h3 className="mt-8 font-display text-lg tracking-tight text-foreground">
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
