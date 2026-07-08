import { useTranslations } from "next-intl";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type Case = {
  title: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  imageAlt: string;
};

/**
 * Spread editorial tipo revista: un caso por fila, apilado. Título del
 * caso en serif grande a la izquierda con una cita destacada del cliente
 * debajo; a la derecha una imagen asimétrica que se desborda del
 * contenedor de texto (columna más ancha, desplazada). Filas alternan de
 * lado en desktop para dar ritmo narrativo. Fondo cálido bg-secondary.
 * Copy vía next-intl: ns → { eyebrow, title, cases: [{ title, quote,
 * author, role, image, imageAlt }] }.
 */
export function PortfolioEditorialMagazineSpreadPullquote({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const cases = t.raw("cases") as Case[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 lg:gap-32">
          {cases.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={i}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6"
              >
                <div
                  className={cn(
                    "lg:col-span-5",
                    reversed ? "lg:order-2" : "lg:order-1"
                  )}
                >
                  <Reveal delay={i * 60}>
                    <span className="font-display text-sm text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] tracking-tight text-balance text-foreground">
                      {item.title}
                    </h3>
                    <div className="mt-8 border-l-2 border-primary pl-6">
                      <Quotes
                        className="size-6 text-primary"
                        weight="fill"
                        aria-hidden="true"
                      />
                      <p className="mt-3 font-display text-lg leading-relaxed text-pretty text-foreground italic">
                        {item.quote}
                      </p>
                      <p className="mt-4 text-sm font-medium text-foreground">
                        {item.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </Reveal>
                </div>

                <div
                  className={cn(
                    "lg:col-span-7",
                    reversed
                      ? "lg:order-1 lg:-mr-6 xl:-mr-12"
                      : "lg:order-2 lg:-ml-6 xl:-ml-12"
                  )}
                >
                  <Reveal delay={i * 60 + 100}>
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/3] rounded-sm"
                    />
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
