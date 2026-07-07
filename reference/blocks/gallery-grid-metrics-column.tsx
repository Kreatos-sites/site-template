import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Metric = {
  value: string;
  label: string;
};

type GalleryImage = {
  image: string;
  imageAlt: string;
};

export function GalleryGridMetricsColumn({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];
  const images = t.raw("images") as GalleryImage[];

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

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <Reveal>
            <table className="w-full border-t border-border">
              <tbody>
                {metrics.map((metric, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="py-5 pr-4 align-baseline font-display text-3xl text-foreground tabular-nums">
                      {metric.value}
                    </td>
                    <td className="py-5 align-baseline text-sm leading-snug text-muted-foreground">
                      {metric.label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, i) => (
              <li key={i} className={i === 0 ? "col-span-2 row-span-2 sm:col-span-2" : "contents"}>
                <Reveal delay={i * 60}>
                  <div
                    className={
                      i === 0
                        ? "h-full"
                        : ""
                    }
                  >
                    <SmartImage
                      src={img.image}
                      alt={img.imageAlt}
                      className={
                        i === 0
                          ? "aspect-square rounded-sm sm:aspect-[4/5]"
                          : "aspect-square rounded-sm"
                      }
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
