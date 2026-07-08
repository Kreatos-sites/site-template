import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Feather } from "lucide-react";

/**
 * Catálogo editorial de productos insignia: filas apiladas a todo el ancho,
 * alternando imagen/texto por producto (imagen-texto, texto-imagen), sobre
 * fondo con patrón sutil de líneas diagonales de baja opacidad. Aireado,
 * cálido, pensado para 3-4 productos con storytelling extenso.
 */

type Product = {
  number: string;
  name: string;
  tagline: string;
  description: string;
  detailLabel: string;
  detail: string;
  image: string;
  imageAlt: string;
};

export function ProductStackedRowsPatternBg({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const products = t.raw("products") as Product[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 22px)",
          color: "var(--foreground)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col divide-y divide-border">
          {products.map((product, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={product.number} className="py-14 first:pt-0 sm:py-16">
                <Reveal delay={i * 80}>
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className={reversed ? "lg:order-2" : ""}>
                      <SmartImage
                        src={product.image}
                        alt={product.imageAlt}
                        className="aspect-[4/5] w-full rounded-sm"
                      />
                    </div>

                    <div className={reversed ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-primary">
                          {product.number}
                        </span>
                        <Feather
                          className="size-4 text-primary"
                          strokeWidth={1.75}
                        />
                      </div>
                      <h3 className="mt-4 font-display text-2xl leading-tight text-balance text-foreground sm:text-3xl">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium tracking-[0.1em] text-primary uppercase">
                        {product.tagline}
                      </p>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                        {product.description}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 border-t border-border pt-4">
                        <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                          {product.detailLabel}
                        </span>
                        <span className="text-sm text-foreground">
                          {product.detail}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
