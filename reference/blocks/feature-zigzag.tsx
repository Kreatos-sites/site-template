import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: feature-zigzag — filas que alternan imagen izquierda/derecha, cada
 * una respira. Archetype: feature alterno. Editorial, con aire; nada de grid de
 * tarjetas iguales.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, intro?: string,
 *     features: [{ title: string, description: string, image: string, imageAlt: string }] }
 * `image` = ruta en /images/ (p. ej. "/images/servicio-1.webp").
 */
type Feature = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function FeatureZigzag({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const features = t.raw("features") as Feature[];
  const intro = t.raw("intro") as string | undefined;

  return (
    <section className="py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,1.2rem+2.5vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
            {intro ? (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {intro}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 40}>
              <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <SmartImage
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="aspect-[4/3] w-full"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="font-display text-5xl leading-none text-primary/40 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-2xl tracking-tight lg:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
