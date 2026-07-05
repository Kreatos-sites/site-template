import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function FeatureListChecks({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as string[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] leading-[1.05] tracking-tight text-balance">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("intro")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:pt-2">
            <ul className="grid gap-x-10 gap-y-px sm:grid-cols-2">
              {items.map((item, index) => (
                <li key={item}>
                  <Reveal delay={index * 40}>
                    <div
                      className={cn(
                        "group flex items-start gap-4 border-t border-border/70 py-4",
                        "transition-colors",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20"
                      >
                        <Check className="size-3.5" strokeWidth={2.5} />
                      </span>
                      <h3 className="text-[0.95rem] leading-snug font-medium text-foreground">
                        {item}
                      </h3>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
