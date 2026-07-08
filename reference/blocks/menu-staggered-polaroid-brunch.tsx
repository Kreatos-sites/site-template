import { useTranslations } from "next-intl";

import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: menu-staggered-polaroid-brunch — grid lúdico de tarjetas estilo
 * polaroid con rotación alterna (+/-3deg), marco blanco grueso, foto del
 * platillo y etiqueta manuscrita-style con nombre y precio debajo. Fondo
 * pastel muy aireado con espaciado generoso. Úsalo para menús de brunch,
 * repostería o cafetería con tono editorial/lúdico.
 *
 * ns: {
 *   eyebrow, title, description,
 *   items: [{ image, imageAlt, name, price, note }]
 * }
 */
type PolaroidItem = {
  image: string;
  imageAlt: string;
  name: string;
  price: string;
  note: string;
};

const ROTATIONS = [
  "-rotate-3",
  "rotate-2",
  "rotate-3",
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
];

export function MenuStaggeredPolaroidBrunch({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as PolaroidItem[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const rotation = ROTATIONS[index % ROTATIONS.length];
            return (
              <li key={index} className="flex justify-center">
                <Reveal delay={index * 60}>
                  <article
                    className={`${rotation} w-full max-w-xs rounded-sm border border-border bg-card p-3 pb-6 shadow-sm transition-transform duration-300 hover:rotate-0`}
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/5] rounded-sm"
                    />
                    <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
                      <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                        {item.name}
                      </h3>
                      <p className="shrink-0 text-sm font-medium tracking-wide text-primary">
                        {item.price}
                      </p>
                    </div>
                    <p className="mt-1 px-1 text-sm leading-relaxed text-muted-foreground italic">
                      {item.note}
                    </p>
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
