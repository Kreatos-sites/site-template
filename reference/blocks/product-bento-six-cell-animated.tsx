import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  PackageIcon,
  TruckIcon,
  WarehouseIcon,
  BarcodeIcon,
  ClockCountdownIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type BentoItem = {
  icon: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

const ICONS: Record<string, PhosphorIcon> = {
  package: PackageIcon,
  truck: TruckIcon,
  warehouse: WarehouseIcon,
  barcode: BarcodeIcon,
  clock: ClockCountdownIcon,
  shield: ShieldCheckIcon,
};

/**
 * Bento grid de 6 celdas para catálogo de producto: una celda destacada
 * (imagen + copy) que ocupa dos columnas/filas en desktop, y cinco celdas
 * de icono + texto. Entradas escalonadas con Reveal, sin JS de scroll.
 */
export function ProductBentoSixCellAnimated({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as BentoItem[];

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

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? PackageIcon;
            const isFeatured = Boolean(item.featured);

            return (
              <li
                key={i}
                className={cn(
                  "contents",
                  isFeatured && "lg:[grid-column:span_2] lg:[grid-row:span_2]",
                )}
              >
                <Reveal delay={i * 60} className="h-full">
                  <article
                    className={cn(
                      "relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-8",
                      isFeatured && "min-h-[20rem]",
                    )}
                  >
                    {isFeatured && item.image ? (
                      <div className="absolute inset-0">
                        <SmartImage
                          src={item.image}
                          alt={item.imageAlt ?? ""}
                          className="h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
                      </div>
                    ) : null}

                    <div className="relative z-10 flex items-center justify-between">
                      <Icon
                        className="size-6 text-primary"
                        weight="light"
                      />
                    </div>

                    <div className="relative z-10 mt-8">
                      <h3
                        className={cn(
                          "font-display text-foreground",
                          isFeatured ? "text-2xl" : "text-lg",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
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
