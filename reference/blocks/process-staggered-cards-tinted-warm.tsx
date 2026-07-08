import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Compass,
  NotePencil,
  Handshake,
  Rocket,
  ChartLineUp,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Step = { number: string; icon: string; title: string; description: string };

const ICONS: Record<string, PhosphorIcon> = {
  compass: Compass,
  note: NotePencil,
  handshake: Handshake,
  rocket: Rocket,
  chart: ChartLineUp,
  wrench: Wrench,
};

export function ProcessStaggeredCardsTintedWarm({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
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

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon] ?? Compass;
            const isOffset = index % 2 === 1;
            return (
              <li
                key={index}
                className={cn("sm:mt-0", isOffset && "sm:mt-14")}
              >
                <Reveal delay={index * 70}>
                  <div className="rounded-lg bg-card p-8 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-md bg-secondary">
                        <Icon
                          className="size-6 text-primary"
                          weight="duotone"
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className="font-display text-3xl text-primary/40"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl tracking-tight text-balance text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
