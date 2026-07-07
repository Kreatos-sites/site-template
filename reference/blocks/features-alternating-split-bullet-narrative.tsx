import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "@remixicon/react";

type Row = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export function FeaturesAlternatingSplitBulletNarrative({ ns }: { ns: string }) {
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
              <article
                key={i}
                className={cn(
                  "grid grid-cols-1 gap-10 border-t border-border py-14 first:pt-0 lg:grid-cols-2 lg:gap-16",
                  i === 0 && "border-t-0",
                )}
              >
                <Reveal
                  delay={i * 60}
                  className={cn("order-1", reversed ? "lg:order-2" : "lg:order-1")}
                >
                  <SmartImage
                    src={row.image}
                    alt={row.imageAlt}
                    className="aspect-[4/5] rounded-sm"
                  />
                </Reveal>

                <Reveal
                  delay={i * 60 + 60}
                  className={cn(
                    "order-2 flex flex-col justify-center",
                    reversed ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                    {row.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                    {row.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {row.description}
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {row.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <RiCheckLine className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-sm leading-relaxed text-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
