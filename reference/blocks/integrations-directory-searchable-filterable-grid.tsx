import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  Boxes,
  Calculator,
  CreditCard,
  Landmark,
  PlugZap,
  ShoppingBag,
  Truck,
  Users,
  SearchIcon,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  calculator: Calculator,
  card: CreditCard,
  landmark: Landmark,
  plug: PlugZap,
  bag: ShoppingBag,
  truck: Truck,
  users: Users,
};

type Category = { id: string; label: string };
type Integration = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
};

export function IntegrationsDirectorySearchableFilterableGrid({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as Category[];
  const integrations = t.raw("integrations") as Integration[];
  const categoryLabels = Object.fromEntries(
    categories.map((category) => [category.id, category.label]),
  );

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        {/*
          Filtro por categoría 100% CSS: un radio "todas" + un radio por
          categoría, todos hermanos del contenedor. Cada tarjeta declara
          peer-checked/<id>:block para las categorías con las que hace match
          y queda oculta por defecto salvo con "todas". El buscador es
          decorativo (etiqueta el propósito de la sección para el lector de
          pantalla); sin JavaScript de cliente no filtra en vivo.
        */}
        <div className="relative mt-12">
          <input
            type="radio"
            name="integrations-category"
            id="integrations-category-all"
            defaultChecked
            className="peer sr-only peer/all"
          />
          {categories.map((category) => (
            <input
              key={`cat-radio-${category.id}`}
              type="radio"
              name="integrations-category"
              id={`integrations-category-${category.id}`}
              className={cn("peer sr-only", `peer/${category.id}`)}
            />
          ))}

          <Reveal delay={60}>
            <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
              <label
                htmlFor="integrations-search"
                className="relative flex w-full max-w-xs items-center"
              >
                <SearchIcon className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                <input
                  type="search"
                  id="integrations-search"
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                  className="w-full rounded-sm border border-border bg-card py-2 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                <label
                  htmlFor="integrations-category-all"
                  className={cn(
                    "cursor-pointer rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors",
                    "peer-checked/all:border-primary peer-checked/all:bg-primary peer-checked/all:text-primary-foreground",
                  )}
                >
                  {t("allLabel")}
                </label>
                {categories.map((category) => (
                  <label
                    key={`cat-label-${category.id}`}
                    htmlFor={`integrations-category-${category.id}`}
                    className={cn(
                      "cursor-pointer rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors",
                      `peer-checked/${category.id}:border-primary peer-checked/${category.id}:bg-primary peer-checked/${category.id}:text-primary-foreground`,
                    )}
                  >
                    {category.label}
                  </label>
                ))}
              </div>
            </div>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration, index) => {
              const Icon = ICONS[integration.icon] ?? PlugZap;
              return (
                <li key={integration.id} className="contents">
                  <Reveal delay={index * 60}>
                    <article
                      className={cn(
                        "hidden h-full flex-col gap-4 rounded-sm border border-border bg-card p-6",
                        "peer-checked/all:flex",
                        `peer-checked/${integration.category}:flex`,
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-secondary">
                          <Icon className="size-5 text-primary" strokeWidth={1.75} />
                        </span>
                        <div>
                          <h3 className="font-display text-base text-foreground">
                            {integration.name}
                          </h3>
                          <p className="text-xs font-medium text-muted-foreground">
                            {categoryLabels[integration.category]}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {integration.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
