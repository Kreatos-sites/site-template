import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "@remixicon/react";

type Row = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  imageAlt: string;
};

export function FeaturesAlternatingDenseCopyImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const rows = t.raw("rows") as Row[];

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

        <div className="mt-16 flex flex-col">
          {rows.map((row, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={row.title}
                className={cn(
                  "grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16",
                  i > 0 && "border-t border-border",
                )}
              >
                <Reveal
                  delay={60}
                  className={cn(reversed && "lg:order-2")}
                >
                  <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                    {row.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-foreground lg:text-[1.75rem]">
                    {row.title}
                  </h3>
                  <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">
                    {row.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {row.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <RiCheckLine
                          className="mt-0.5 size-5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-foreground">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  delay={120}
                  className={cn(reversed && "lg:order-1")}
                >
                  <SmartImage
                    src={row.image}
                    alt={row.imageAlt}
                    className="aspect-[4/5] rounded-sm"
                  />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
