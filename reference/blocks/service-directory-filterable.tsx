import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  CalculatorIcon,
  ScalesIcon,
  UsersThreeIcon,
  LaptopIcon,
  ShieldCheckIcon,
  GlobeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  category: string;
};

const ICONS: Record<string, Icon> = {
  calculator: CalculatorIcon,
  scales: ScalesIcon,
  team: UsersThreeIcon,
  laptop: LaptopIcon,
  shield: ShieldCheckIcon,
  globe: GlobeIcon,
};

export function ServiceDirectoryFilterable({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as string[];
  const services = t.raw("services") as ServiceItem[];
  const allLabel = t("filterAllLabel");
  const rootId = "sdf-root";

  const filterCss = [
    `#${rootId}:has(#sdf-cat-all:checked) label[for="sdf-cat-all"] { border-color: var(--primary); background-color: var(--primary); color: var(--primary-foreground); }`,
    ...categories.map(
      (_, i) =>
        `#${rootId}:has(#sdf-cat-${i}:checked) [data-sdf-item]:not([data-sdf-cat="${i}"]) { display: none; }\n#${rootId}:has(#sdf-cat-${i}:checked) label[for="sdf-cat-${i}"] { border-color: var(--primary); background-color: var(--primary); color: var(--primary-foreground); }`,
    ),
  ].join("\n");

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

        <style>{filterCss}</style>

        <div id={rootId}>
          <Reveal delay={60}>
            <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label={t("filterGroupLabel")}>
              <div className="contents">
                <input
                  type="radio"
                  name="sdf-category"
                  id="sdf-cat-all"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="sdf-cat-all"
                  className="cursor-pointer rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors"
                >
                  {allLabel}
                </label>
              </div>
              {categories.map((category, i) => (
                <div className="contents" key={category}>
                  <input
                    type="radio"
                    name="sdf-category"
                    id={`sdf-cat-${i}`}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`sdf-cat-${i}`}
                    className="cursor-pointer rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const IconCmp = ICONS[service.icon] ?? ShieldCheckIcon;
              const categoryIndex = categories.indexOf(service.category);
              return (
                <li key={i} className="contents">
                  <Reveal delay={i * 60}>
                    <article
                      data-sdf-item
                      data-sdf-cat={categoryIndex}
                      className="flex h-full flex-col gap-4 rounded-sm border border-border bg-card p-6"
                    >
                      <IconCmp className="size-5 text-primary" weight="regular" />
                      <div>
                        <h3 className="font-display text-lg text-foreground">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                      <span className="mt-auto w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {service.category}
                      </span>
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
