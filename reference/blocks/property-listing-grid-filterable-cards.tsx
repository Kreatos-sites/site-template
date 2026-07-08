import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { BedDouble, Bath, Ruler, MapPin, ChevronDown } from "lucide-react";

type Property = {
  image: string;
  imageAlt: string;
  price: string;
  status: string;
  title: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
};

type FilterGroup = {
  label: string;
  options: string[];
};

export function PropertyListingGridFilterableCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const properties = t.raw("properties") as Property[];
  const filters = t.raw("filters") as FilterGroup[];

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

        <Reveal delay={60}>
          <div className="mt-10 flex flex-wrap items-center gap-3 border border-border bg-card p-4 rounded-sm">
            {filters.map((group, i) => (
              <details
                key={i}
                className="group relative rounded-sm border border-border bg-background"
              >
                <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2 text-xs font-medium tracking-[0.1em] text-foreground uppercase [&::-webkit-details-marker]:hidden">
                  {group.label}
                  <ChevronDown
                    className="size-3.5 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </summary>
                <ul className="absolute top-full left-0 z-10 mt-2 min-w-[10rem] rounded-sm border border-border bg-card p-2 shadow-sm">
                  {group.options.map((option, j) => (
                    <li key={j}>
                      <span className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                        {option}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <span className="ml-auto text-xs text-muted-foreground">
              {t("resultsLabel")}
            </span>
          </div>
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={property.image}
                      alt={property.imageAlt}
                      className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-sm bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                      {property.price}
                    </span>
                    <span className="absolute top-3 right-3 rounded-sm bg-background/90 px-2.5 py-1 text-xs font-medium tracking-[0.1em] text-foreground uppercase">
                      {property.status}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h3 className="font-display text-lg leading-snug text-foreground">
                        {property.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin
                          className="size-3.5 shrink-0 text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {property.location}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <BedDouble
                          className="size-4 text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath
                          className="size-4 text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {property.bathrooms}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Ruler
                          className="size-4 text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {property.area}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
