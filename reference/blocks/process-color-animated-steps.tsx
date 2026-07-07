import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  Compass,
  Hammer,
  PackageCheck,
  Search,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  compass: Compass,
  clipboard: ClipboardList,
  hammer: Hammer,
  package: PackageCheck,
};

/**
 * Cinco pasos con fondo alternado (card/secondary) para diferenciar cada
 * etapa a simple vista, numeración grande y entrada escalonada por paso.
 */
export function ProcessColorAnimatedSteps({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

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

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon] ?? Search;
            const alternate = index % 2 === 1;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article
                    className={cn(
                      "flex h-full min-h-[16rem] flex-col justify-between gap-8 p-8",
                      alternate ? "bg-secondary" : "bg-card",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                        aria-hidden="true"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span
                        className="font-display text-2xl tabular-nums text-primary/40"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
