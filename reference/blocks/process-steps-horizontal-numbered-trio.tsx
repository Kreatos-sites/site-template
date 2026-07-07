import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ClipboardList,
  Hammer,
  Truck,
  Search,
  CalendarCheck,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

type Step = { icon: string; title: string; description: string };

const ICONS: Record<string, LucideIcon> = {
  clipboard: ClipboardList,
  hammer: Hammer,
  truck: Truck,
  search: Search,
  calendar: CalendarCheck,
  check: BadgeCheck,
};

export function ProcessStepsHorizontalNumberedTrio({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="relative mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-0">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-[calc(100%/6)] left-[calc(100%/6)] hidden border-t border-dashed border-border sm:block"
          />
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? ClipboardList;
            return (
              <li key={i} className="relative">
                <Reveal delay={i * 60}>
                  <div className="flex items-center gap-3">
                    <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-2xl text-muted-foreground">
                      {t("stepNumber", { number: i + 1 })}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
