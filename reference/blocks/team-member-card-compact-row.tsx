import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { RiMapPinLine, RiBriefcase4Line } from "@remixicon/react";

type Member = {
  name: string;
  role: string;
  location: string;
  image: string;
  imageAlt: string;
  stats: { label: string; value: string }[];
};

export function TeamMemberCardCompactRow({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 text-center">
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-square w-20 rounded-full"
                  />
                  <div>
                    <h3 className="font-display text-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-primary">
                      <RiBriefcase4Line className="size-4" aria-hidden="true" />
                      {member.role}
                    </p>
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                      <RiMapPinLine className="size-4" aria-hidden="true" />
                      {member.location}
                    </p>
                  </div>
                  <div className="mt-2 grid w-full grid-cols-3 gap-2 border-t border-border pt-4">
                    {member.stats.map((stat, j) => (
                      <div key={j} className="flex flex-col items-center">
                        <span className="font-display text-lg text-foreground">
                          {stat.value}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
