import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  HeartPulse,
  Home,
  GraduationCap,
  PiggyBank,
  Bus,
  Utensils,
  CalendarCheck,
  Gift,
} from "lucide-react";

const ICONS = {
  HeartPulse,
  Home,
  GraduationCap,
  PiggyBank,
  Bus,
  Utensils,
  CalendarCheck,
  Gift,
} as const;

type BenefitIcon = keyof typeof ICONS;

type Benefit = {
  icon: BenefitIcon;
  title: string;
  description: string;
};

export function CareersBenefitsIconGridTinted({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const benefits = t.raw("benefits") as Benefit[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = ICONS[benefit.icon];
            return (
              <li key={benefit.title}>
                <Reveal delay={index * 60}>
                  <div className="flex h-full flex-col items-center rounded-sm border border-border bg-card px-6 py-10 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-display text-lg text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
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
