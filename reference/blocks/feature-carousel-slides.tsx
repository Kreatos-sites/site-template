import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  Boxes,
  Compass,
  Gauge,
  Route,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

type Slide = {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  compass: Compass,
  gauge: Gauge,
  route: Route,
  truck: Truck,
  warehouse: Warehouse,
};

export function FeatureCarouselSlides({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const slides = t.raw("slides") as Slide[];

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
            {t("intro")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14">
            <ol className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
              {slides.map((slide, i) => {
                const Icon = ICONS[slide.icon] ?? Compass;
                return (
                  <li
                    key={slide.id}
                    id={slide.id}
                    className="flex w-[85%] flex-none snap-start scroll-ml-6 flex-col overflow-hidden rounded-sm border border-border bg-card sm:w-[60%] lg:w-[calc((100%-3rem)/2)] lg:scroll-ml-0"
                  >
                    <SmartImage
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="aspect-[16/10]"
                    />
                    <div className="flex flex-1 flex-col gap-4 p-8">
                      <div className="flex items-center gap-3">
                        <Icon
                          className="size-5 text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span
                          aria-hidden="true"
                          className="font-display text-xs text-muted-foreground tabular-nums"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display text-xl text-foreground">
                        {slide.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                        {slide.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <nav
              aria-label={t("navLabel")}
              className="mt-8 flex items-center gap-2"
            >
              {slides.map((slide, i) => (
                <a
                  key={slide.id}
                  href={`#${slide.id}`}
                  aria-label={t("goToSlide", { number: i + 1 })}
                  className={cn(
                    "h-1.5 w-8 rounded-full bg-border transition-colors",
                    "hover:bg-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  )}
                />
              ))}
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
