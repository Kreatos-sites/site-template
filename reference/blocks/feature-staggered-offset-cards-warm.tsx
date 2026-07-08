import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  Handshake,
  Scale,
  NotebookPen,
  Users,
  Compass,
  MessageCircleHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  title: string;
  text: string;
  icon: string;
};

const ICONS: Record<string, LucideIcon> = {
  handshake: Handshake,
  scale: Scale,
  notebook: NotebookPen,
  users: Users,
  compass: Compass,
  heart: MessageCircleHeart,
};

const OFFSETS = [
  "sm:translate-y-0",
  "sm:translate-y-8",
  "sm:-translate-y-3",
  "sm:translate-y-5",
  "sm:-translate-y-2",
  "sm:translate-y-9",
];

export function FeatureStaggeredOffsetCardsWarm({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const services = t.raw("services") as Service[];

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
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-8">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Handshake;
            const offset = OFFSETS[i % OFFSETS.length];
            return (
              <li key={service.title} className={cn(offset)}>
                <Reveal delay={i * 70}>
                  <div className="flex h-full flex-col gap-6 rounded-lg border border-border bg-card p-8 shadow-lg shadow-primary/5">
                    <span className="flex size-12 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
                      <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.text}
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
