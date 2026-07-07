import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  ArrowUpRight,
  Boxes,
  Layers,
  PackageSearch,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Category = {
  icon: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
};

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  layers: Layers,
  package: PackageSearch,
  shield: ShieldCheck,
  truck: Truck,
  wrench: Wrench,
};

export function ProductCategoriesAnimated({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const categories = t.raw("categories") as Category[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = ICONS[category.icon] ?? Boxes;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors duration-300 hover:border-primary/40">
                    <div className="relative overflow-hidden">
                      <SmartImage
                        src={category.image}
                        alt={category.imageAlt}
                        className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <span
                        className="absolute top-4 left-4 inline-flex size-10 items-center justify-center rounded-full bg-background/90 text-primary ring-1 ring-inset ring-border"
                        aria-hidden="true"
                      >
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {category.summary}
                      </p>
                      <span
                        className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="size-4" strokeWidth={2} />
                      </span>
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
