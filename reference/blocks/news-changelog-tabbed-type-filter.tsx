import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiAddCircleLine,
  RiArrowUpCircleLine,
  RiCheckboxCircleLine,
  type RemixiconComponentType,
} from "@remixicon/react";

/**
 * BLOQUE: news-changelog-tabbed-type-filter — registro de cambios con
 * pestañas que filtran las entradas por tipo (Todas, Nuevas, Mejoras,
 * Arregladas). Cada entrada muestra versión, fecha, insignia de tipo,
 * título y descripción. Pensado para una página de novedades/changelog
 * de producto o servicio.
 *
 * El filtrado es 100% CSS (radios ocultos + selector :has()), sin "use
 * client" ni listeners: al marcar un radio, la regla :has() del bloque
 * <style> oculta las entradas cuyo data-type no coincide.
 *
 * ns esperado:
 *   { eyebrow: string, title: string,
 *     filters: { all: string, added: string, improved: string, fixed: string },
 *     entries: [{ version: string, date: string, type: "added"|"improved"|"fixed",
 *                 title: string, description: string }] }
 */
type EntryType = "added" | "improved" | "fixed";
type Entry = {
  version: string;
  date: string;
  type: EntryType;
  title: string;
  description: string;
};
type Filters = { all: string; added: string; improved: string; fixed: string };

const TYPE_ICON: Record<EntryType, RemixiconComponentType> = {
  added: RiAddCircleLine,
  improved: RiArrowUpCircleLine,
  fixed: RiCheckboxCircleLine,
};

const TAB_PEER_CLASS: Record<keyof Filters, string> = {
  all: "peer/all",
  added: "peer/added",
  improved: "peer/improved",
  fixed: "peer/fixed",
};

const TAB_ACTIVE_CLASS: Record<keyof Filters, string> = {
  all: "peer-checked/all:border-primary peer-checked/all:bg-primary peer-checked/all:text-primary-foreground",
  added:
    "peer-checked/added:border-primary peer-checked/added:bg-primary peer-checked/added:text-primary-foreground",
  improved:
    "peer-checked/improved:border-primary peer-checked/improved:bg-primary peer-checked/improved:text-primary-foreground",
  fixed:
    "peer-checked/fixed:border-primary peer-checked/fixed:bg-primary peer-checked/fixed:text-primary-foreground",
};

const TAB_ORDER: (keyof Filters)[] = ["all", "added", "improved", "fixed"];

export function NewsChangelogTabbedTypeFilter({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const filters = t.raw("filters") as Filters;
  const entries = t.raw("entries") as Entry[];

  const uid = `cl-${ns.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const rootId = `${uid}-root`;
  const idFor = (key: keyof Filters) => `${uid}-${key}`;

  const hideRules = (["added", "improved", "fixed"] as EntryType[])
    .map(
      (type) =>
        `#${rootId}:has(#${idFor(type)}:checked) [data-changelog-type]:not([data-changelog-type="${type}"]) { display: none; }`,
    )
    .join("\n");

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div id={rootId}>
          <style>{hideRules}</style>

          <Reveal delay={60}>
            <div className="mt-10 flex flex-wrap gap-2" role="tablist">
              {TAB_ORDER.map((key) => (
                <span key={key}>
                  <input
                    type="radio"
                    name={`${uid}-filter`}
                    id={idFor(key)}
                    defaultChecked={key === "all"}
                    className={`${TAB_PEER_CLASS[key]} sr-only`}
                  />
                  <label
                    htmlFor={idFor(key)}
                    className={`cursor-pointer rounded-sm border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${TAB_ACTIVE_CLASS[key]}`}
                  >
                    {filters[key]}
                  </label>
                </span>
              ))}
            </div>
          </Reveal>

          <ol className="mt-12 space-y-10 border-t border-border pt-10">
            {entries.map((entry, index) => {
              const Icon = TYPE_ICON[entry.type];
              return (
                <li key={index} data-changelog-type={entry.type}>
                  <Reveal delay={index * 60}>
                    <article className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-display text-sm text-foreground">
                          {entry.version}
                        </span>
                        <span aria-hidden="true">·</span>
                        <time>{entry.date}</time>
                        <span className="inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2.5 py-1 text-secondary-foreground">
                          <Icon
                            aria-hidden="true"
                            className="size-3.5 text-primary"
                          />
                          {filters[entry.type]}
                        </span>
                      </div>
                      <h3 className="font-display text-xl text-foreground">
                        {entry.title}
                      </h3>
                      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
