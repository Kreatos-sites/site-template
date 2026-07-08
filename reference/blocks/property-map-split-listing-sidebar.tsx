import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  MapPin,
  School,
  ShoppingBag,
  TreePine,
  TrainFront,
  Building2,
  ArrowUpRight,
} from "lucide-react";

type Poi = { icon: string; label: string; top: string; left: string };
type Property = {
  name: string;
  address: string;
  distance: string;
  price: string;
  status: string;
};

const POI_ICONS: Record<string, typeof MapPin> = {
  school: School,
  shopping: ShoppingBag,
  park: TreePine,
  transit: TrainFront,
  landmark: Building2,
};

export function PropertyMapSplitListingSidebar({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const pois = t.raw("pois") as Poi[];
  const properties = t.raw("properties") as Property[];

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
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Izquierda: lienzo de mapa esquemático */}
          <div className="lg:col-span-6">
            <Reveal delay={60}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-secondary sm:aspect-square lg:aspect-auto lg:h-full">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full text-primary/15"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="90" y1="0" x2="90" y2="400" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="230" y1="0" x2="230" y2="400" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="330" y1="0" x2="330" y2="400" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M0 220 C 120 260, 220 140, 400 190"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>

                {/* Pin central: la propiedad */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background"
                >
                  <MapPin className="size-5" strokeWidth={2} />
                </span>

                {pois.map((poi) => {
                  const Icon = POI_ICONS[poi.icon] ?? MapPin;
                  return (
                    <span
                      key={poi.label}
                      className={cn(
                        "absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm",
                      )}
                      style={{ top: poi.top, left: poi.left }}
                    >
                      <Icon className="size-4 text-primary" strokeWidth={1.75} aria-hidden="true" />
                      <span className="sr-only">{poi.label}</span>
                    </span>
                  );
                })}

                <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-sm border border-border bg-card/95 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-sm">
                  {pois.map((poi, index) => {
                    const Icon = POI_ICONS[poi.icon] ?? MapPin;
                    return (
                      <span key={index} className="flex items-center gap-1.5">
                        <Icon className="size-3.5 text-primary" strokeWidth={1.75} aria-hidden="true" />
                        {poi.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Derecha: lista scrolleable de propiedades cercanas */}
          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <div className="flex h-full flex-col rounded-sm border border-border bg-card">
                <div className="border-b border-border px-6 py-5">
                  <h3 className="font-display text-lg tracking-tight text-foreground">
                    {t("listTitle")}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("listSubtitle")}</p>
                </div>

                <ul className="flex max-h-[26rem] flex-col divide-y divide-border overflow-y-auto">
                  {properties.map((property, index) => (
                    <li key={property.name}>
                      <Reveal delay={index * 40}>
                        <article className="flex items-start justify-between gap-4 px-6 py-5">
                          <div className="min-w-0">
                            <h4 className="truncate font-display text-base tracking-tight text-foreground">
                              {property.name}
                            </h4>
                            <p className="mt-1 text-sm text-muted-foreground">{property.address}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="size-3.5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                              {property.distance}
                              <span className="text-border">·</span>
                              <span>{property.status}</span>
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1">
                            <span className="font-display text-base tracking-tight text-foreground">
                              {property.price}
                            </span>
                            <ArrowUpRight
                              className="size-4 text-primary"
                              strokeWidth={1.75}
                              aria-hidden="true"
                            />
                          </div>
                        </article>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
