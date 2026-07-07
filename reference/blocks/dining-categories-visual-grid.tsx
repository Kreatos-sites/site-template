import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  BowlFoodIcon,
  CookingPotIcon,
  FishIcon,
  IceCreamIcon,
  MartiniIcon,
  PizzaIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type Category = {
  icon: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

const ICONS: Record<string, Icon> = {
  entradas: BowlFoodIcon,
  fuertes: CookingPotIcon,
  mariscos: FishIcon,
  postres: IceCreamIcon,
  bebidas: MartiniIcon,
  especialidades: PizzaIcon,
};

export function DiningCategoriesVisualGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as Category[];

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

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => {
            const Icon = ICONS[category.icon] ?? BowlFoodIcon;
            return (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
                    <div className="relative overflow-hidden">
                      <SmartImage
                        src={category.image}
                        alt={category.imageAlt}
                        className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-sm bg-background/90 text-primary">
                        <Icon className="size-5" weight="regular" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <h3 className="font-display text-xl text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {category.description}
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
