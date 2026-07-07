import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  RiCpuLine,
  RiFileList3Line,
  RiKeyLine,
  RiMapPinLine,
  RiNotification3Line,
  RiRouteLine,
  RiShieldCheckLine,
  RiTruckLine,
  RiWifiLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type Category = {
  label: string;
  features: Feature[];
};

const ICONS: Record<string, RemixiconComponentType> = {
  truck: RiTruckLine,
  route: RiRouteLine,
  "map-pin": RiMapPinLine,
  cpu: RiCpuLine,
  wifi: RiWifiLine,
  bell: RiNotification3Line,
  shield: RiShieldCheckLine,
  key: RiKeyLine,
  clipboard: RiFileList3Line,
};

export function FeatureTabbedGridCategorySwap({ ns }: { ns: string }) {
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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-3">
          {categories.map((category, i) => (
            <Reveal key={category.label} delay={i * 60}>
              <details
                className="group border border-border bg-card open:bg-card"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 select-none">
                  <span className="font-display text-lg text-foreground">
                    {category.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-border px-6 pb-8 pt-6">
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {category.features.map((feature) => {
                      const Icon = ICONS[feature.icon] ?? RiShieldCheckLine;
                      return (
                        <li key={feature.title} className="contents">
                          <article
                            className={cn(
                              "flex h-full flex-col gap-4 rounded-sm bg-secondary p-6",
                            )}
                          >
                            <div className="flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                              <Icon className="size-5" />
                            </div>
                            <div>
                              <h3 className="font-display text-base text-foreground">
                                {feature.title}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
