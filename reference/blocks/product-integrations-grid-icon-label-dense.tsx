import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  Boxes,
  Truck,
  Warehouse,
  PackageCheck,
  ClipboardList,
  Route,
  Container,
  ScanBarcode,
  Fuel,
  MapPin,
  ShieldCheck,
  Wrench,
  Forklift,
  CircleGauge,
  Radar,
  Anchor,
  Plane,
  Ship,
  type LucideIcon,
} from "lucide-react";

type Product = {
  icon: string;
  name: string;
};

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  truck: Truck,
  warehouse: Warehouse,
  "package-check": PackageCheck,
  "clipboard-list": ClipboardList,
  route: Route,
  container: Container,
  "scan-barcode": ScanBarcode,
  fuel: Fuel,
  "map-pin": MapPin,
  "shield-check": ShieldCheck,
  wrench: Wrench,
  forklift: Forklift,
  "circle-gauge": CircleGauge,
  radar: Radar,
  anchor: Anchor,
  plane: Plane,
  ship: Ship,
};

export function ProductIntegrationsGridIconLabelDense({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const products = t.raw("products") as Product[];

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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {products.map((product, index) => {
            const Icon = ICONS[product.icon] ?? Boxes;
            return (
              <li key={index} className="contents">
                <Reveal delay={(index % 12) * 40}>
                  <article className="group flex aspect-square flex-col items-center justify-center gap-3 bg-card p-4 text-center transition-colors duration-300 hover:bg-secondary">
                    <Icon
                      className="size-6 text-primary transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.75}
                    />
                    <span className="text-xs leading-tight font-medium text-foreground">
                      {product.name}
                    </span>
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
