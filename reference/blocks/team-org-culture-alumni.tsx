import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  Compass,
  HeartHandshake,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

type Pillar = { icon: string; title: string; description: string };
type Member = { name: string; role: string; image: string; imageAlt: string };
type Alumnus = { name: string; role: string };

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  heart: HeartHandshake,
  sparkles: Sparkles,
  users: Users,
};

export function TeamOrgCultureAlumni({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const pillars = t.raw("pillars") as Pillar[];
  const members = t.raw("members") as Member[];
  const alumni = t.raw("alumni") as Alumnus[];

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
            <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        {/* Pilares de cultura */}
        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = ICONS[pillar.icon] ?? Sparkles;
            return (
              <li key={pillar.title} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-5 bg-card p-8">
                    <span
                      className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug tracking-tight text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Retratos del equipo directivo */}
        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {members.map((member, index) => (
            <li key={member.name}>
              <Reveal delay={index * 60}>
                <figure>
                  <div className="relative overflow-hidden bg-muted">
                    <SmartImage
                      src={member.image}
                      alt={member.imageAlt}
                      className="aspect-[4/5] w-full"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <h3 className="font-display text-base leading-tight tracking-tight text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Franja de alumni y colaboradores */}
        <Reveal delay={120}>
          <div className="mt-20 border-t border-border pt-10">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("alumniLabel")}
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {alumni.map((alumnus) => (
                <li
                  key={alumnus.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {alumnus.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {alumnus.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
