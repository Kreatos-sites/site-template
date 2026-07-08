import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
};

export function TeamPatternWarmStackedRows({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          color: "var(--primary)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-16 flex flex-col">
          {members.map((member, i) => (
            <li key={i}>
              <Reveal delay={i * 60}>
                <div className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:gap-10 sm:py-12">
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-square w-28 shrink-0 rounded-full sm:w-32"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-display text-xl text-foreground sm:text-2xl">{member.name}</p>
                    <p className="mt-1 text-sm font-medium tracking-wide text-primary uppercase">{member.role}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
              {i < members.length - 1 ? <div className="h-px w-full bg-border" /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
