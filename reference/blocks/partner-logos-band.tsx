import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Fila de logos de aliados/clientes en escala de grises con opacidad parcial;
 * al pasar el cursor el logo recupera color y opacidad completa. Título fijo
 * a la izquierda, logos en grid a la derecha, separados por una regla hairline
 * superior para anclar la banda al resto del corpus.
 */
export function PartnerLogosBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Partner = { name: string; logo: string; logoAlt: string };
  const partners = t.raw("partners") as Partner[];

  return (
    <section
      data-demo="aliados"
      className="border-t border-border bg-background py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start">
          <Reveal className="lg:pt-2">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>

          <ul className="grid grid-cols-2 gap-px border-t border-l border-border/70 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <li key={partner.name} className="contents">
                <Reveal delay={index * 60}>
                  <div className="group flex h-28 items-center justify-center border-r border-b border-border/70 bg-card px-6 sm:h-32">
                    <SmartImage
                      src={partner.logo}
                      alt={partner.logoAlt}
                      className="aspect-[3/1] w-full [&_img]:grayscale [&_img]:opacity-60 [&_img]:transition [&_img]:duration-300 group-hover:[&_img]:grayscale-0 group-hover:[&_img]:opacity-100"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
