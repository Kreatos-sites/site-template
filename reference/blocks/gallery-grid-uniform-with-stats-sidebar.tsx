import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  BuildingsIcon,
  CalendarBlankIcon,
  RulerIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type GalleryImage = {
  image: string;
  imageAlt: string;
};

type Metric = {
  icon: string;
  value: string;
  label: string;
};

const ICONS: Record<string, Icon> = {
  buildings: BuildingsIcon,
  calendar: CalendarBlankIcon,
  ruler: RulerIcon,
  users: UsersThreeIcon,
};

export function GalleryGridUniformWithStatsSidebar({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const images = t.raw("images") as GalleryImage[];
  const metrics = t.raw("metrics") as Metric[];

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
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem]">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, i) => (
              <li key={i} className="contents">
                <Reveal delay={i * 50}>
                  <figure className="overflow-hidden rounded-sm border border-border bg-card">
                    <SmartImage
                      src={img.image}
                      alt={img.imageAlt}
                      className="aspect-square"
                    />
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={images.length * 50}>
            <div className="h-full rounded-sm border border-border bg-card">
              <h3 className="border-b border-border px-6 py-5 font-display text-lg text-foreground">
                {t("metricsTitle")}
              </h3>
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-border">
                  {metrics.map((metric, i) => {
                    const MetricIcon = ICONS[metric.icon] ?? BuildingsIcon;
                    return (
                      <tr key={i}>
                        <td className="w-10 py-4 pl-6">
                          <MetricIcon
                            className="size-5 text-primary"
                            weight="regular"
                          />
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">
                          {metric.label}
                        </td>
                        <td className="py-4 pr-6 text-right font-display text-xl tabular-nums text-foreground">
                          {metric.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
