import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  Target,
  ShieldCheck,
  Handshake,
  Lightning,
  Compass,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type Value = {
  title: string;
  text: string;
  icon: string;
};

const ICONS: Record<string, PhosphorIcon> = {
  target: Target,
  shield: ShieldCheck,
  handshake: Handshake,
  lightning: Lightning,
  compass: Compass,
  team: UsersThree,
};

const OFFSETS = ["sm:translate-y-0", "sm:translate-y-10", "sm:-translate-y-4", "sm:translate-y-6"];

export function AboutCardsStaggeredValuesVerticalOffset({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const values = t.raw("values") as Value[];

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-6">
          {values.map((value, i) => {
            const Icon = ICONS[value.icon] ?? Target;
            const offset = OFFSETS[i % OFFSETS.length];
            return (
              <li key={value.title} className={cn(offset)}>
                <Reveal delay={i * 60}>
                  <div className="flex h-full flex-col gap-5 rounded-md border border-border bg-card p-7">
                    <span className="flex size-11 items-center justify-center rounded-sm bg-secondary">
                      <Icon className="size-5 text-primary" weight="duotone" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {value.text}
                      </p>
                    </div>
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
