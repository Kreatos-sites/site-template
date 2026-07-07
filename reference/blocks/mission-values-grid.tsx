import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  Compass,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

type Value = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  handshake: Handshake,
  lightbulb: Lightbulb,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  users: Users,
};

export function MissionValuesGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const missionBody = t.raw("missionBody") as string[];
  const values = t.raw("values") as Value[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Columna misión: imagen + relato */}
          <Reveal>
            <div className="relative">
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] w-full rounded-sm object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 h-px w-24 bg-primary"
              />
            </div>
          </Reveal>

          <div className="lg:pl-2">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4">
              {missionBody.map((paragraph, index) => (
                <Reveal key={index} delay={index * 60}>
                  <p className="text-[1.02rem] leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de valores con iconos */}
        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4 lg:mt-20">
          {values.map((value, index) => {
            const Icon = ICONS[value.icon] ?? Sparkles;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-5 bg-card p-7">
                    <span
                      className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
