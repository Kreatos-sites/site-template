import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Activity } from "lucide-react";

/**
 * BLOQUE: clinic-facility-diagonal-gallery — galería editorial de
 * instalaciones (recepción, consultorio, laboratorio) en un layout
 * escalonado: cada tarjeta usa un clip-path diagonal que alterna de
 * inclinación (par/impar) generando un ritmo visual técnico, sin overlay
 * de color sobre las fotos. Fondo claro, tipografía editorial.
 *
 * ns: { eyebrow, title, subtitle, facilities: { name, description, image,
 *       imageAlt }[] (3-4 items) }
 */
export function ClinicFacilityDiagonalGallery({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const facilities = t.raw("facilities") as {
    name: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];

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
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, i) => {
            const isEven = i % 2 === 0;
            return (
              <li key={i} className={isEven ? "sm:mt-0" : "sm:mt-12"}>
                <Reveal delay={i * 90}>
                  <div
                    className="relative overflow-hidden"
                    style={{
                      clipPath: isEven
                        ? "polygon(0 0, 100% 0, 100% 88%, 0 100%)"
                        : "polygon(0 0, 100% 0, 100% 100%, 0 88%)",
                    }}
                  >
                    <SmartImage
                      src={facility.image}
                      alt={facility.imageAlt}
                      className="aspect-[4/5] rounded-none"
                    />
                  </div>
                  <div className="mt-5 flex items-start gap-3">
                    <Activity
                      className="mt-1 size-4 shrink-0 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {facility.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
