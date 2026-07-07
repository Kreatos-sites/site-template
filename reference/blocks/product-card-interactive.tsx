import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  Boxes,
  CircleCheck,
  Layers,
  Ruler,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

/**
 * BLOQUE: product-card-interactive — tarjeta de producto individual de
 * catálogo B2B con mini-galería de imágenes, selector de variante (acabado
 * / color) y selector de presentación, ambos resueltos con CSS puro
 * (radio + :has()), sin JS de cliente. Pensado para distribuidores,
 * fabricantes o proveedores industriales con ficha técnica por producto.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, category: string, sku: string,
 *     description: string, price: string, compareAtPrice: string,
 *     availability: string,
 *     images: [{ image: string, imageAlt: string }],
 *     specs: [{ icon: string, label: string }],
 *     variants: [{ label: string, description: string }],
 *     presentations: [{ label: string }],
 *     ctaLabel: string, secondaryCtaLabel: string, note: string }
 */
type GalleryImage = { image: string; imageAlt: string };
type Spec = { icon: string; label: string };
type Variant = { label: string; description: string };
type Presentation = { label: string };

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  check: CircleCheck,
  layers: Layers,
  ruler: Ruler,
  shield: ShieldCheck,
  truck: Truck,
};

export function ProductCardInteractive({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const images = t.raw("images") as GalleryImage[];
  const specs = t.raw("specs") as Spec[];
  const variants = t.raw("variants") as Variant[];
  const presentations = t.raw("presentations") as Presentation[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <article className="mt-16 grid grid-cols-1 gap-10 border border-border bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">
            {/* Galería */}
            <div>
              <SmartImage
                src={images[0]?.image}
                alt={images[0]?.imageAlt}
                className="aspect-[4/5] rounded-sm"
              />
              {images.length > 1 && (
                <ul className="mt-4 grid grid-cols-4 gap-3">
                  {images.slice(1, 5).map((img, i) => (
                    <li key={i}>
                      <SmartImage
                        src={img.image}
                        alt={img.imageAlt}
                        className="aspect-square rounded-sm border border-border"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Detalle */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  {t("category")}
                </p>
                <p className="text-xs tracking-wide text-muted-foreground">
                  {t("sku")}
                </p>
              </div>

              <p className="mt-3 font-display text-2xl tracking-tight text-balance text-foreground">
                {t("title")}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-3xl text-foreground">
                  {t("price")}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {t("compareAtPrice")}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t("note")}</p>

              <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                <CircleCheck className="size-3.5 text-primary" strokeWidth={2} aria-hidden="true" />
                {t("availability")}
              </span>

              {/* Especificaciones */}
              <ul className="mt-8 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
                {specs.map((spec, i) => {
                  const Icon = ICONS[spec.icon] ?? CircleCheck;
                  return (
                    <li key={i} className="flex items-center gap-2.5">
                      <Icon
                        className="size-4 shrink-0 text-primary"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="text-sm text-muted-foreground">
                        {spec.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Variante */}
              <fieldset className="mt-8 border-t border-border pt-6">
                <legend className="text-xs font-medium tracking-[0.2em] text-foreground uppercase">
                  {t("variantLabel")}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {variants.map((variant, i) => (
                    <label
                      key={i}
                      className="group cursor-pointer rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground"
                    >
                      <input
                        type="radio"
                        name={`${ns}-variant`}
                        defaultChecked={i === 0}
                        className="sr-only"
                        aria-label={variant.description}
                      />
                      {variant.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Presentación */}
              <fieldset className="mt-6">
                <legend className="text-xs font-medium tracking-[0.2em] text-foreground uppercase">
                  {t("presentationLabel")}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {presentations.map((presentation, i) => (
                    <label
                      key={i}
                      className={cn(
                        "cursor-pointer border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${ns}-presentation`}
                        defaultChecked={i === 0}
                        className="sr-only"
                      />
                      {presentation.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t("ctaLabel")}
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCtaLabel")}
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
