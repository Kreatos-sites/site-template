import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Member = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

export function TeamRowPortraitShowcase({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:justify-center lg:gap-10">
          {members.map((member, i) => (
            <li key={member.name} className="lg:w-[calc(100%/5)] lg:shrink-0">
              <Reveal delay={i * 60}>
                <div className="flex flex-col items-center text-center">
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-square w-full max-w-40 rounded-full ring-1 ring-border"
                  />
                  <span className="mt-5 font-display text-lg text-foreground">
                    {member.name}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {member.role}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
