import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

type FeatureRow = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export function FeatureAlternatingSplitImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const rows = t.raw("rows") as FeatureRow[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {rows.map((row, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={i}
              className={cn(
                "grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16",
                i > 0 && "border-t border-border",
              )}
            >
              <Reveal
                delay={i * 60}
                className={cn(reversed && "lg:order-2")}
              >
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {row.eyebrow}
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                  {row.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {row.body}
                </p>
                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {row.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={1.75}
                      />
                      <span className="text-sm leading-relaxed text-foreground">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal
                delay={i * 60 + 60}
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
    </section>
  );
}
